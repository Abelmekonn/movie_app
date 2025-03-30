export const tmbd_config = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY, // Ensure this is correctly set in your .env file
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_ACCESS_TOKEN}`, // Ensure you use an Access Token here
    },
};

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `/search/movie?query=${encodeURIComponent(query)}&api_key=${tmbd_config.API_KEY}`
        : `/discover/movie?sort_by=popularity.desc&api_key=${tmbd_config.API_KEY}`;

    try {
        const response = await fetch(`${tmbd_config.BASE_URL}${endpoint}`, {
            method: "GET",
            headers: tmbd_config.headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.results; // Fixed: "results" is the correct key
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const fetchMovieDetails = async (movieId: string) : Promise<MovieDetails>  => {
    try {
        const response = await fetch(`${tmbd_config.BASE_URL}/movie/${movieId}?api_key=${tmbd_config.API_KEY}`,{
            method: "GET",
            headers: tmbd_config.headers,
        })
        if(!response){
            throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        throw(error)
    }
}