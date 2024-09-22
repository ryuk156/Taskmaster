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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { AuthState, userLogin } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import ErrorAlert from "../ErrorAlert";
import VanishableAlert from "../VanishableAlert";

const styles = {
  container: {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "370px",
    marginTop: "10%",
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
    let response =   await dispatch<any>(userLogin(credentials));
    if(response.payload.status === 200){
      navigate('/dashboard');
    }

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
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        style={styles.container}
      >
        <Heading variant={"h8"}>Login</Heading>
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
