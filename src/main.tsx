import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "./index.css";
import App from "./App.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "./components/toaster/toaster.tsx";
import { toaster } from "./components/toaster/index.ts";

const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  //   onError: (error, query) => {
  //     console.log("🚀 ~ query.state.data:", query.state.data);
  //     if (query.state.data !== undefined) {
  //       toaster.create({
  //         description: "File saved successfully",
  //         type: "info",
  //       });
  //     }
  //   },
  // }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <Toaster />
    </ChakraProvider>
  </StrictMode>
);
