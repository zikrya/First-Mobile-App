import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        client.fetch(`*[_type == "featured"] {
            ...,
            restaurants[] -> {
                ...,
                dishes[]-> {
                    ...
                }
            }
        }`).then((data) => {
            setFeaturedCategories(data); // Update the state with the fetched data
            //console.log(data);
        }).catch((error) => {
            console.error("Sanity fetch error:", error);
        });
    }, []);
    return (
        <SafeAreaView style={tw`bg-white pt-5`}>
            {/* Header */}
            <View style={tw`flex-row items-center mx-4 py-5 mx-2 px-4`}>
                <Image
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full mr-2`} // Adjusted size for visibility
                />
                <View style={tw`flex-1`}>
                    <Text style={tw`font-bold text-gray-500 text-xs`}>Deliver Now!</Text>
                    <View style={tw`flex-row items-center`}>
                        <Text style={tw`font-bold text-xl`}>Current Location</Text>
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </View>
                </View>
                <UserIcon size={35} color="#00CCBB" />
            </View>
            {/* Search */}
            <View style={tw `flex-row items-center mx-2 pb-2`}>
                <View style={tw `flex-row flex-1 mx-2 bg-gray-200 p-3`}>
                    <MagnifyingGlassIcon color="gray" size={20} style={tw `mr-2`}/>
                    <TextInput placeholder='Restaurants and cuisines'
                    keyboardType='default'/>
                </View>
                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>
            {/* Body */}
            <ScrollView style={tw `bg-gray-100`}
            contentContainerStyle={{
                paddingBottom: 100,
            }}
            >
                {/* Categories */}
                <Categories />

                {/* Featured Rows */}

                {featuredCategories.map((category, index) => (
                 <FeaturedRow
                   key={category._id || index} // Use _id if available, otherwise use index
                   id={category._id}
                   title={category.name}
                   description={category.short_description}
                   />
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}