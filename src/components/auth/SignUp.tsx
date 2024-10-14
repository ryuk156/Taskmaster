import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Text,
  Input,
  Button,
  Heading,
  Link,
  Stack,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  AuthState,
  userLogin,
  userSignUp,
} from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import ErrorAlert from "../ErrorAlert";
import VanishableAlert from "../VanishableAlert";
import { CheckCircleIcon } from "@chakra-ui/icons";

const styles = {
  container: {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "370px",
    marginTop: "2%",
  },
  Titlecontainer: {
    marginTop: "8%",
    marginBottom: "0px",
  },
  input: {
    border: "1px solid #CBD5E0",
    borderRadius: "4px",
    marginBottom: "15px",
    padding: "10px",
    width: "300px",
  },
  button: {
    marginTop: "15px",
    width: "300px",
  },
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async () => {
    try {
      await dispatch<any>(
        userSignUp({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        })
      );

      // if(error===null){
        navigate('/dashboard');
      // }else{
      //   // navigate('/signUp');
      //   // console.log(error.response.data);
      //   console.log(error.response.data);
      // }
      // Redirect to the dashboard once logged in
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      
      {error &&
        Object.keys(error.data).map((key) => (
          <VanishableAlert
            key={key}
            message={`${error.data[key][0]}`}
            status="error"
          />
        ))}

<Flex 
      
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={
        "center"
      }
      style={styles.Titlecontainer}
      >
      <CheckCircleIcon
             
              fontSize={"50px"}
              color="blue.500"
            />
             <Text fontSize={"28px"} fontWeight={"bold"} >TaskMaster</Text> 
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        style={styles.container}
      >
        <Text fontSize={"25px"} fontWeight={"bold"} ml={2}>Register</Text> 

        <Box mt={1}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              size="lg"
              id="username"
              placeholder="Username"
              style={styles.input}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>email</FormLabel>
            <Input
              size="lg"
              id="username"
              type="email"
              placeholder="Username"
              style={styles.input}
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              size="lg"
              id="password"
              placeholder="Password"
              type="password"
              style={styles.input}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
            />
          </FormControl>
        </Box>

        <Stack direction="row" spacing={4}>
          <Button
            isLoading={loading}
            loadingText="logging in"
            colorScheme="blue"
            variant="outline"
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </Stack>
        <Text mt="2">
          Alreday have account?{" "}
          <Link color="blue.500" href="/">
            Login
          </Link>
        </Text>
      </Flex>
      <Box position="fixed"  bottom={0} padding={4}>
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Guest Account Info:</AlertTitle>
            <AlertDescription>
              Username: <strong>guest</strong> | Password: <strong>guest123</strong>
            </AlertDescription>
          </Box>
        </Alert>
      </Box>
    </Flex>
  );
};

export default SignUp;
