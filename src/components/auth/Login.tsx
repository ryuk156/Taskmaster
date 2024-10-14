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
  FormHelperText,
  FormErrorMessage,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { AuthState, userLogin } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import ErrorAlert from "../ErrorAlert";
import VanishableAlert from "../VanishableAlert";
import { CheckCircleIcon,  } from "@chakra-ui/icons";
import { m } from "framer-motion";

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
    marginBottom: "10px",
    padding: "10px",
    width: "300px",
  },
  button: {
    marginTop: "15px",
    width: "300px",
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUsernameError, setIsUsernameError] = useState(false); // State for username error
  const [isPasswordError, setIsPasswordError] = useState(false); // State for password error
  const { loading, error } = useSelector((state: any) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (credentials.username.trim() === "") {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }

    if (credentials.password.trim() === "") {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    if (credentials.username.trim() === "" || credentials.password.trim() === "") {
      return;
    }

    try {
     await dispatch<any>(userLogin(credentials));
    navigate('/dashboard');

    } catch (err: any) {
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    
    >
      
     
     {error && <VanishableAlert message={error.data.message} status="error" />}
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
     
     <Text fontSize={"25px"} fontWeight={"bold"} ml={2}>Login</Text> 
        <Box>
          <FormControl isRequired isInvalid={isUsernameError}>
            <FormLabel>Username</FormLabel>
            <Input
              size="lg"
              id="username"
              placeholder="Username"
              value={credentials.username}
              style={styles.input}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
              }}
            />
            {isUsernameError && (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl isRequired isInvalid={isPasswordError}>
            <FormLabel>Password</FormLabel>
            <Input
              size="lg"
              id="password"
              placeholder="Password"
              value={credentials.password}
              type="password"
              style={styles.input}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
            />
            {isPasswordError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Stack direction="row" spacing={4}>
          <Button
            isLoading={loading}
            loadingText="logging in"
            colorScheme="blue"
            variant="outline"
            onClick={handleSubmit}
            mt={1}
          >
            Login
          </Button>
        </Stack>
        <Text mt="2">
          Don't have an account?{" "}
          <Link color="blue.500" href="/signUp">
            SignUp
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};


export default Login;
