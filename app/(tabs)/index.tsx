import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { useCallback, useState } from "react";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies)

  const [refreshing, setRefreshing] = useState(false);

  // Refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate data fetching (replace this with actual API call)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-primary relative">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full h-full z-0" resizeMode="cover" />
  
      {/* Full-screen scrollable container */}
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={50} />
        }
      >
        <View className="px-5">
          {/* Logo */}
          <Image source={icons.logo} className="w-12 h-10 mt-12 mb-5 mx-auto" />
  
          {/* Search Bar */}
          <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
  
          {/* Trending Movies */}
          {trendingMovies && (
            <View className="mt-10">
              <Text className="text-white text-lg font-bold mb-3">Trending Movies</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator = {false}
                ItemSeparatorComponent={() =>  <View className="w-2"/>}
                data={trendingMovies}
                className="mb-4 mt-3"
                renderItem={({ item, index }) => <TrendingCard movie={item} index={index}/>}
              />
            </View>
          )}
  
          {/* Latest Movies */}
          <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
  
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              marginBottom: 20,
              paddingRight: 5,
              gap: 20,
            }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}
