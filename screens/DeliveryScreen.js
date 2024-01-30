import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import tw from 'twrnc';
import { XMarkIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress";
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
  return (
    <View style={tw `bg-[#00CCBB] flex-1`}>
      <SafeAreaView style={tw `z-50`}>
        <View style={tw `flex-row justify-between items-center p-5`}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XMarkIcon color="white" size={30} />
            </TouchableOpacity>
            <Text style={tw `font-light text-white text-lg`}>Order Help</Text>
        </View>
        <View style={tw `bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
            <View style={tw `flex-row justify-between`}>
            <View>
                <Text style={tw `text-lg text-gray-400`}>Estimated Arrival</Text>
                <Text style={tw `text-4xl font-bold`}>45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              style={tw `h-20 w-20`}
            />
            </View>

            <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

            <Text style={tw `mt-3 text-gray-500`}>Your order at {restaurant.title} is being prepared</Text>
        </View>
      </SafeAreaView>
      <MapView
       initialRegion={{
        latitude: 40.7128,
        longitude: 74.0060,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
       }}
       style={tw `flex-1 mt-10 z-0`}
       mapType="mutedStandard"
      >

      </MapView>
      <SafeAreaView style={tw `bg-white flex-row items-center h-28`}>
        <Image
         source={{
            uri: "https://links.papareact.com/wru"
         }}
         style={tw `mr-5 h-12 w-12 bg-gray-300 p-4 rounded-full ml-5`}
        />
        <View style={tw `flex-1`}>
            <Text style={tw `text-lg`}>Mohammad Zikrya</Text>
            <Text style={tw `text-gray-400`}>Your Rider</Text>
        </View>
        <Text style={tw `text-[#00CCBB] text-lg mr-5 font-bold`}>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen