import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

interface Movie {
    id: number;
    poster_path: string | null;
    title: string
    vote_average: number
    release_date : any
}

const MovieCard = ({ id, poster_path, title, vote_average,release_date }: Movie) => {
    const posterURL = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]" >
                <Image
                    source={{ uri: posterURL }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-5" />
                    <Text className="text-white font-bold text-sm uppercase">{Math.round(vote_average / 2)}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-light-300 font-bold text-xs mt-1">{release_date?.split('-')[0]}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
