// lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

const getQueryClient = (() => {
  let client = null;
  return () => {
    if (!client) {
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: (failureCount, error) => {
              if (error instanceof Error && error.message.includes("401"))
                return false;
              return failureCount < 3;
            },
          },
        },
      });
    }
    return client;
  };
})();

export default getQueryClient;
