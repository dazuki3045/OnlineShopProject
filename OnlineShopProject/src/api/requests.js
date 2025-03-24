import {useQuery} from "@tanstack/react-query";

export const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    return response.json()
}


export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    })
}