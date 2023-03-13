import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"]
    })
}