import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from "../features/restaurantSlice";
import { selectBasketItems, removeFromBasket, selectBasketTotal } from '../features/basketSlice';
import tw from 'twrnc';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})

        setGroupedItemsInBasket(groupedItems);
    }, [items])

    console.log(groupedItemsInBasket);

  return (
    <SafeAreaView style={tw `flex-1 bg-white`}>
      <View style={tw `flex-1 bg-gray-100`}>
        <View style={tw `p-5 border-b border-[#00CCBB] bg-white shadow`}>
            <View>
                <Text style={tw `text-lg font-bold text-center`}>Basket</Text>
                <Text style={tw `text-center text-gray-400`}>{restaurant.title}</Text>
            </View>
            <TouchableOpacity onPress={navigation.goBack} style={tw `rounded-full bg-gray-100 absolute top-3 right-5`}>
                <XCircleIcon color="#00CCBB" height={50} width={50} />
            </TouchableOpacity>
        </View>
        <View style={tw `flex-row items-center px-4 py-3 bg-white my-5`}>
            <Image
             source={{
                uri: "https://links.papareact.com/wru"
             }}
             style={tw `mr-2 h-7 w-7 bg-gray-300 p-4 rounded-full`}
            />
            <Text style={tw `mr-2 flex-1`}>Deliver in 50-75 min</Text>
            <TouchableOpacity>
            <Text style={tw `text-[#00CCBB]`}>Change</Text>
            </TouchableOpacity>
        </View>

        <ScrollView>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <View key={key} style={tw `flex-row items-center bg-white py-2 px-5`}>
                    <Image
                      source={{ uri: urlFor(items[0].image).url()}}
                      style={tw ` mr-3 h-12 w-12 rounded-full`}
                    />
                    <Text style={tw `mr-3 flex-1`}>{items[0]?.name}</Text>

                    <Text style={tw `mr-3 text-gray-600`}>${items[0]?.price}</Text>
                    <TouchableOpacity>
                        <Text onPress={() => dispatch(removeFromBasket({ id: key }))} style={tw `text-[#00CCBB]`}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
        <View style={tw `p-5 bg-white mt-5`}>
            <View style={tw `flex-row justify-between mb-4`}>
                <Text style={tw `text-gray-400`}>Subtotal</Text>
                <Text style={tw `text-gray-400`}>${basketTotal}</Text>
            </View>
            <View style={tw `flex-row justify-between mb-4`}>
                <Text style={tw `text-gray-400`}>Delivery Fee</Text>
                <Text style={tw `text-gray-400`}>${5.99}</Text>
            </View>
            <View style={tw `flex-row justify-between mb-4`}>
                <Text>Order Total</Text>
                <Text style={tw `font-extrabold`}>${basketTotal + 5.99}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} style={tw `rounded-lg bg-[#00CCBB] p-4`}>
                <Text style={tw `text-center text-white text-lg font-bold`}>Place Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen