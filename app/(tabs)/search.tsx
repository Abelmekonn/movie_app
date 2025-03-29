import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/searchBar';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset
    } = useFetch(() => fetchMovies({
        query: searchQuery
    }), false);

    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies()
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(timeOutId)
    }, [searchQuery])

    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            const updateTimeout = setTimeout(() => {
                updateSearchCount(searchQuery, movies[0]);
            }, 5000);
    
            return () => clearTimeout(updateTimeout); // Cleanup in case of re-render
        }
    },[movies])

    return (
        <View className='bg-primary flex-1'>
            {/* Background Image */}
            <Image
                source={images.bg}
                className="absolute w-full h-full z-0" resizeMode="cover"
            />

            {/* FlatList with Content */}
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    marginBottom: 20,
                    paddingRight: 5,
                    gap: 20,
                }}
                className="mt-2 pb-32 px-5"
                ListHeaderComponent={
                    <>
                        {/* Logo Section */}
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 50 }} >
                            <Image source={icons.logo} style={{ width: 48, height: 40 }} />
                        </View>

                        {/* Search Bar */}
                        <View className='my-5' >
                            <SearchBar
                                placeholder="Search over +1000 movies"
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>

                        {/* Loading Indicator */}
                        {loading && (
                            <ActivityIndicator size="large" color="#ffffff" style={{ marginVertical: 20 }} />
                        )}

                        {/* Error Handling */}
                        {error && (
                            <Text style={{ color: 'red', paddingHorizontal: 20, marginVertical: 20 }}>
                                Error: {error.message}
                            </Text>
                        )}

                        {/* Search Term Results */}
                        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text className='text-xl text-white font-bold mb-5'>
                                Search Results for{' '}
                                <Text className='text-accent'>{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500'>
                                {searchQuery.trim() ? 'No movie found' : 'Search for movies'}
                            </Text>
                        </View>
                    ) : (
                        null
                    )
                }
            />
        </View>
    );
}

export default Search;
