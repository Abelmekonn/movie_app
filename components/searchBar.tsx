import { Image, TextInput, View } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";

interface Props {
    placeholder: string;
    onPress?: () => void;
    value : string
    onChangeText?: (text:string)=>void
}

const SearchBar = ({ onPress, placeholder,value ,onChangeText}: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-3xl px-5 py-3">
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8fff"
            />
            <TextInput
                onPressIn={onPress} // Use `onPressIn` instead of `onPress` (TextInput doesn't have `onPress`)
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    );
};

export default SearchBar;
