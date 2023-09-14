import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  // chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
// import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, } from "formik";
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { login } from "../../Store/features/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";


// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

const validateLogin = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
})

const Signin = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate()
  
  const loginUser = (email,password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.accessToken);
      dispatch(login({user}))
      toast.success("Login Successfull ..",{
        position: toast.POSITION.TOP_CENTER
      })
      navigate("/user-profile")
      setLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode,errorMessage})
        toast.error("Something is wrong try again ..",{
          position: toast.POSITION.TOP_CENTER
        })
      });
      setLoading(false)
  }


  return (
    <>
      <Formik initialValues={{
        email: "",
        password: "India5634",
      }}
        onSubmit={(value) => {
          console.log(value)
          loginUser(value.email,value.password)
        }}
        validationSchema={validateLogin}
      >
        {({ errors }) => (
          <Form >
            <Flex
              flexDirection="column"
              width="100wh"
              height="100vh"
              backgroundColor="gray.200"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                  <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                  >
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          // children={<CFaUserAlt color="gray.300" />}
                        />
                        <Input as={Field} name="email" type="email" placeholder="email address" />
                      </InputGroup>
                      <FormHelperText color="red.500">{errors.email}</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          // children={<CFaLock color="gray.300" />}
                        />
                        <Input
                          as={Field}
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormHelperText color="red.500">{errors.password}</FormHelperText>
                      <FormHelperText textAlign="right">
                        <Link to="/forgot-password">forgot password?</Link>
                      </FormHelperText>
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      width="full"
                    >
                      Login
                    </Button>
                  </Stack>
                </Box>
              </Stack>
              <Box>
                New to us?{" "}
                <Link to="/signup" color="teal.500" >
                  Sign Up
                </Link>
              </Box>
            </Flex>
          </Form>
        )
        }
      </Formik>
    </>
  );
};

export default Signin
