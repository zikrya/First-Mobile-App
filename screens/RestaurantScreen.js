import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import client, { urlFor } from '../sanity';
import { ArrowLeftIcon, MapPinIcon, StarIcon, QuestionMarkCircleIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const { id } = params; // Get the restaurant ID from route parameters

    if (id) {
      client.fetch(`
        *[_type == "restaurant" && _id == $id] {
          ...,
          type-> {
            name
          },
          dishes[]-> {
            ...
          }
        }
      `, { id }).then(data => {
        const restaurant = data[0]; // Assuming there's always at least one match
        setRestaurantDetails(restaurant);
        dispatch(setRestaurant({
          id: restaurant._id,
          imgUrl: restaurant.image,
          title: restaurant.name,
          rating: restaurant.rating,
          genre: restaurant.type.name,
          address: restaurant.address,
          short_description: restaurant.shortDescription,
          dishes: restaurant.dishes,
          long: restaurant.long,
          lat: restaurant.lat,
        }));
      }).catch(error => {
        console.error("Error fetching restaurant details:", error);
      });
    }
  }, [params.id, dispatch]);


  if (!restaurantDetails) return <Text>Loading...</Text>;



  return (
    <>
    <BasketIcon/>
    <ScrollView>
      <View style={tw`relative`}>
        <Image
          source={{ uri: urlFor(restaurantDetails.image).url() }}
          style={tw`w-full h-56 bg-gray-300 p-4`}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}>
          <ArrowLeftIcon size={20} color='#00CCBB' />
        </TouchableOpacity>
      </View>
      <View style={tw`bg-white`}>
        <View style={tw`px-4 pt-4`}>
          <Text style={tw`text-3xl font-bold`}>{restaurantDetails.name}</Text>
          <View style={tw`flex-row items-center`}>
            <StarIcon color='green' opacity={0.5} size={22} />
            <Text style={tw`text-xs text-gray-500`}>{restaurantDetails.rating} · {restaurantDetails.type.name}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <MapPinIcon color='gray' opacity={0.5} size={22} />
            <Text style={tw`text-xs text-gray-500`}>Nearby · {restaurantDetails.address}</Text>
          </View>
          <Text style={tw`text-gray-500 mt-2 pb-4`}>{restaurantDetails.shortDescription}</Text>
        </View>
        <TouchableOpacity style={tw`flex-row items-center p-4 border-gray-300`}>
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
          <Text style={tw`pl-2 flex-1 font-bold`}>Have a food allergy?</Text>
          <ChevronRightIcon color='#00CCBB' />
        </TouchableOpacity>
      </View>
      <View style={tw`p-4 pb-36`}>
        <Text style={tw`text-xl font-bold mb-3`}>Menu</Text>
        {restaurantDetails.dishes.map(dish => (
          <DishRow key={dish._id} {...dish} />
        ))}
      </View>
    </ScrollView>
    </>
  );
};

export default RestaurantScreen;
