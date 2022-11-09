import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@wos/client/src/utils/trpc";

type Props = { children?: React.ReactNode };

export const TRPCProvider: React.FC<Props> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );
  const url =
    process.env.REACT_APP_SERVER_URL || "http://localhost:8000/api/trpc";
  const links = [
    loggerLink(),
    httpBatchLink({
      url,
    }),
  ];
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
