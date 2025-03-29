import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary relative">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full h-full z-0" resizeMode="cover" />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20, alignSelf: "center" }} />
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-5">Error: {moviesError.message}</Text>
        ) : (
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
            ListHeaderComponent={(
              <View className="px-5">
                {/* Logo (Moves inside FlatList) */}
                <Image source={icons.logo} className="w-12 h-10 mt-12 mb-5 mx-auto" />

                {/* Search Bar (Moves inside FlatList) */}
                <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />

                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              </View>
            )}
          />
        )}
    </View>
  );
}
