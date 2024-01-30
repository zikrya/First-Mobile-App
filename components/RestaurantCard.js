import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ id, imgURL, title, rating, genre, address, short_description, dishes, long, lat,}) => {
  const navigation = useNavigation();
  //console.log(JSON.stringify(dishes[0]?.restaurants[1], null, 2)); // Adjust the path as needed to target a specific restaurant

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('Restaurant', { id })}
     style={tw `bg-white mr-3 shadow`}
     >
     <Image
       source={{
       uri: urlFor(imgURL).width(200).url(), // Specify size and call .url()
        }}
       style={tw`h-36 w-64 rounded-sm`}
    />
       <View style={tw `px-3 pb-4`}>
        <Text style={tw `font-bold text-lg pt-2`}>{title}</Text>
        <View style={tw `flex-row items-center mx-1`}>
            <StarIcon color='green' opacity={0.5} size={22} />
            <Text style={tw `text-xs text-gray-500`}>
                <Text style={tw `text-green-500`}>{rating}</Text> . {genre}
            </Text>
        </View>

        <View style={tw `flex-row items-center mx-1`}>
            <MapPinIcon color="gray" opacity={0.4} size={22} />
            <Text style={tw `text-xs text-gray-500`}>Nearby . {address}</Text>
        </View>
       </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard