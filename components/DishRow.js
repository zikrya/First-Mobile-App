import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const buttonStyle = isPressed ? tw`bg-white p-4 border-gray-200` : tw`bg-white p-4 border border-gray-200`;

    const addItemToBasket = () => {
        const uniqueId = `${id}-${new Date().getTime()}`; // Creating a unique ID for each dish added
        dispatch(addToBasket({ id: uniqueId, dishId: id, name, description, price, image }));
    };


    const removeItemFromBasket = () => {
        if (items.length > 0) {
            // Remove the last added item of this dish type
            const lastAddedItem = items[items.length - 1];
            dispatch(removeFromBasket({ id: lastAddedItem.id }));
        }
    };

    console.log(items);
  return (
    <>
    <TouchableOpacity onPress={() => setIsPressed(!isPressed)} style={buttonStyle}>
        <View style={tw `flex-row`}>
        <View style={tw `flex-1 pr-2`}>
            <Text style={tw `text-lg mb-1`}>{name}</Text>
            <Text style={tw `text-gray-400 mt-2`}>${price}</Text>
        </View>
        <View>
        <Image
        source={{ uri: image ? urlFor(image).url() : undefined }}
        style={{...tw`h-20 w-20 bg-gray-300 p-4  mr-4`, ...styles.customImageBorder}}
      />
        </View>
        </View>
    </TouchableOpacity>
    {isPressed && (
        <View style={tw `bg-white px-4`}>
            <View style={tw `flex-row items-center mx-2 pb-3`}>
                <TouchableOpacity onPress={removeItemFromBasket}>
                    <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={40} />
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon color="#00CCBB" size={40} />
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  )
}

const styles = StyleSheet.create({
    customImageBorder: {
      borderWidth: 1,
      borderColor: '#F3F3F4',
    },
  });

export default DishRow