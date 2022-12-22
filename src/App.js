import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import { Box, Center, Heading, Text, Flex } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box height={"100vh"} width={"100%"} display={"flex"} justifyContent="center" alignItems={"center"}>
      <Heading as={"h1"}>404 Page not found!</Heading>
    </Box>
  );
};

const App = () => {
  const MyRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };

  return (
    <div className="App">
      <Box w="100vw" bg="#b25819" p={6}>
        <Center>
          <Heading as="h1" color="#e2ded5">
            Yugi-Oh Card Deck
          </Heading>
        </Center>
      </Box>
      <MyRouter />
    </div>
  );
};

export default App;
