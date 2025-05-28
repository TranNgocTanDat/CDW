import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoute from "./router/AppRoute";
const queryClient = new QueryClient();



export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoute />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
