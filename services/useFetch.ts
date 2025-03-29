import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        let isMounted = true; // Track component mount state

        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            if (isMounted) setData(result);
        } catch (err) {
            if (isMounted) setError(err instanceof Error ? err : new Error("An error occurred"));
        } finally {
            if (isMounted) setLoading(false);
        }

        return () => {
            isMounted = false; // Prevent state updates if unmounted
        };
    };

    const reset = () => {
        setData(null);
        setError(null);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }

        return () => {
            setData(null);
            setError(null);
            setLoading(false);
        };
    }, [autoFetch]); // Removed `fetchFunction` to prevent unnecessary re-renders

    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
