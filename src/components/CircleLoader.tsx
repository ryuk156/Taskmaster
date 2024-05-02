import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const CircleLoader = ({text}: {text: string}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)" /* Adjust opacity as needed */
      zIndex={9999}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Box mt={1} ml={4}>{text}</Box>
    </Box>
  );
};

export default CircleLoader;
