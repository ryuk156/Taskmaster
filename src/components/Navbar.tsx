import { Box, Flex, Spacer, Text, Button } from '@chakra-ui/react';
import React from 'react';

export default function Navbar() {
  return (
    <Box bg="white.500" p={4} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
      <Flex alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="Black">
          Task Master
        </Text>
        <Spacer />
        <Button mr={2}>
          Sign In
        </Button>
        <Button >
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
}
