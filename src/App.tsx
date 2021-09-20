import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import AddressPage from "./pages/AddressPage";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AddressPage />
    </ChakraProvider>
  );
};

export default App;
