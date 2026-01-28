import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import InternetConnectionProvider from "./providers/InternetConnectionProvider.tsx";
import { theme } from "./theme/index.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <InternetConnectionProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </InternetConnectionProvider>
  </Provider>,
);
