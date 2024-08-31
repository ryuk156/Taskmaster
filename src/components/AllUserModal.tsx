import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  CircularProgress,
  Box,
  Card,
  Text,
  CardBody,
  Flex,
  Radio, // Add circular progress for loading indicator
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../store/reducers/taskSlice";
import { getRandomColor } from "../constants/constants";
import { AddIcon } from "@chakra-ui/icons";

const AllUserModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<any>();
  const loading = useSelector((state: any) => state.task.loading);
  const error = useSelector((state: any) => state.task.error);
  const users = useSelector((state: any) => state.task.users);

  

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      dispatch(getUsersAsync({ token: userToken }));
    }
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User to access this board</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <CircularProgress isIndeterminate color="blue.300" />
          ) : (
            users &&
            users.map((user: any) => (
              <Card m={1}>
                <CardBody>
                  <Flex justifyContent={"space-between"} alignItems={"center"}  >
                    <Flex justifyContent={"center"} alignItems={"center"}>

                    
                    <Box
                      border={"2px solid white"}
                      bg={getRandomColor()}
                      height={"50px"}
                      width={"50px"}
                      borderRadius={"50%"}
                      m={1}
                      mr={2}
                    >
                      <Flex justifyContent={"center"} alignItems={"center"}>
                        <Text fontSize={"30px"}>
                          {user.username.charAt(0).toUpperCase()}
                        </Text>
                      </Flex>
                    </Box>
                   

                    
                    <Text fontWeight={"bold"}>
                      {user.username.toUpperCase()}
                    </Text>

                    </Flex>

                    <Button colorScheme="blue"  variant="outline" mr={3} size={"xs"} onClick={onClose}>
            <AddIcon />
          </Button>
                   
                  </Flex>
                
                </CardBody>
                
              </Card>
            ))
          )}
          {error && <div>Error: {error}</div>} {/* Display error message */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AllUserModal;
