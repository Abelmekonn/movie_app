import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';
const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
    const posterURL = poster_url
        ? `https://image.tmdb.org/t/p/w500${poster_url}`
        : "https://via.placeholder.com/300x450?text=No+Image";

        
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className='w-32 relative pl-5'>
                <Image
                    source={{ uri: posterURL }}
                    className='w-full h-40 rounded-lg object-cover'
                    resizeMode='cover'
                />
                <View className='absolute bottom-9 -left-2 px-2 py-1 rounded-full'>
                    <MaskedView maskElement={<Text className='font-bold text-white text-6xl'>{index +1 }</Text>}>
                        <Image 
                            source={images.rankingGradient}
                            className='size-14'
                            resizeMode='cover'
                        />
                    </MaskedView>
                </View>
                <View>
                    <Text className='text-white text-sm font-bold mt-2' numberOfLines={2}>{title}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard

const styles = StyleSheet.create({})