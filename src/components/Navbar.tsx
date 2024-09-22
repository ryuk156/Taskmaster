import { Box, Flex, Spacer, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <Box bg="white.500" p={4} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
      <Flex alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="Black">
          Task Master
        </Text>
        <Spacer />
        <Button variant={"outline"} mr={2} onClick={logout} colorScheme="blue">
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
