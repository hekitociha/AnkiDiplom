import { QueryClient } from "@tanstack/react-query";

import { request } from "./request";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        const { data } = await request.get(`${url}`);
        return data;
      },
      refetchOnWindowFocus: false,
    },
  },
});
