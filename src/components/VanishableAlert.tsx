import React, { useState } from "react";
import { Alert, AlertIcon,Text, Box, CloseButton, Flex, Spinner } from "@chakra-ui/react";
import { stat } from "fs";
import { InfoIcon } from "@chakra-ui/icons";

const VanishableAlert = ({ message, status }: { message: string, status?: any }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);

  };

  return (
    <>
      {showAlert && (
        <Box
          position="fixed"
          top="4"
          right="4"
          zIndex="9999"
          width="300px" // Adjust the width as needed
        >
          <Alert
            status= {status?status: "info"}
            variant="subtle"
            flexDirection="column"
            alignItems="start"
            textAlign="start"
            boxShadow="md"

          >
            <Flex justifyContent={"center"} alignItems={"center"}>
                
          {
            status === "loading" ?  <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            
            size="md"
            pr="2"
          /> : <InfoIcon  />
          }
            
           <Text ml={2} mr={2}> {message}</Text>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={handleClose}
            />
            </Flex>
          </Alert>
          
        </Box>
      )}
    </>
  );
};

export default VanishableAlert;
