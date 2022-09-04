import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getFetch } from "@trpc/client";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { trpc } from "./utils/trpc";

function AppContent() {
  const { data } = trpc.useQuery(["hello"]);
  const { mutate: createUserMutation } = trpc.useMutation("add_user", {
    onSuccess(data, variables, context) {
      console.log("Successfully created user:", { data });
      console.log({ variables, context });
    },
  });

  const handleClick = () => {
    createUserMutation({
      name: "Jonathan",
      email: "skontan@gmail.com",
      password: "Hej123",
    });
  };
  return (
    <div>
      <p>{data?.message}</p>
      <button onClick={handleClick}>Add user</button>
    </div>
  );
}

function App() {
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
      maxBatchSize: 10,
      url,
    }),
  ];
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links,
      fetch: async (input, init?) => {
        const fetch = getFetch();
        return fetch(input, {
          ...init,
          credentials: "include",
        });
      },
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
