import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import client from '../sanity';

const FeaturedRow = ({ id, title, description}) => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        client.fetch(`
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]-> {
                    _id,
                    name,
                    image,
                    address,
                    rating,
                    type-> {
                        name
                    }
                    // Don't fetch dishes here; fetch them in RestaurantScreen instead
                }
            }
        `, { id })
        .then((data) => {
            setRestaurants(data[0]?.restaurants || []);
        })
        .catch(console.error);
    }, [id]);
  return (
    <View>
        <View style={tw `mt-4 flex-row items-center justify-between px-4`}>
            <Text style={tw `font-bold text-lg`}>{title}</Text>
            <ArrowRightIcon color="#00CCBB" />
        </View>

        <Text style={tw `text-xs text-gray-500 px-4`}>{description}</Text>

        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          showsHorizontalScrollIndicator={false}
          style={tw `pt-4`}
        >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgURL={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dish={restaurant.dishes}
            rating={restaurant.rating}
            short_description={restaurant.shortDescription} // should be shortDescription, not _id
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat} // should be lat, not late
          />
        ))}

        </ScrollView>
    </View>
  )
}

export default FeaturedRow