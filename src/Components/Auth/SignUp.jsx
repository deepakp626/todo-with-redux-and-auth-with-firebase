import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {  createUserWithEmailAndPassword,sendEmailVerification ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from "../../config/firebase"
import { login } from "../../Store/features/authSlice"
import { useDispatch,  } from 'react-redux';


const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const validateAccount = yup.object({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string()
    .required("Please enter a password")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: yup.string().oneOf([yup.ref("password")], 'password is not match'),
})


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState()
  const [isLoading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const googleSignUpHandler = () =>{
    signInWithPopup(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // console.log({token})
      const user = result.user;
      dispatch(login({user}))
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Login is fail with google",errorMessage,errorCode)
      // ...
    });
  }

  const createUser = async ({firstName,lastName,email,confirmPassword}) => {
    setLoading(true)
    const password = confirmPassword;
     createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail((prev) => prev = user.email)
        sendEmailVerification(auth.currentUser).then(() =>{
          toast.info("Please check your email to verify your account",{
            position: toast.POSITION.TOP_CENTER
          })
        });
        dispatch(login({user}))
        toast.success('Sign Up  Successfull !', {
          position: toast.POSITION.TOP_CENTER
        });
        setLoading(false)
        navigate(`/signup-email-validation/${email}`)
        return;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)

        let msg = "Try Again later";
        if (errorMessage.toString().includes("email-already-in-use")) {
          msg = "email already in use";
        }
        toast.error(`${msg}`, {
          position: toast.POSITION.TOP_CENTER
        });
        setLoading(false)
      });
  }



  return (
    <>
      <Formik initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
        onSubmit={(values) => {
          console.log(values)
          createUser({values})
        }}
        validationSchema={validateAccount}
      >
        {({ handleSubmit, errors }) => (
          <Form >
            <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}>
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'} textAlign={'center'}>
                    Sign up
                  </Heading>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}>
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" >
                          <FormLabel>First Name</FormLabel>
                          <Input
                            as={Field}
                            type="text"
                            name="firstName"
                          />
                          <Text color="red.500"> {errors.firstName} </Text>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="lastName">
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            as={Field}
                            type="text"
                            name="lastName"
                          />
                          <Text color="red.500"> {errors.lastName} </Text>
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="email" >
                      <FormLabel>Email address</FormLabel>
                      <Input
                        as={Field}
                        name="email"
                        type="email"
                      />
                      <Text color="red.500"> {errors.email} </Text>
                    </FormControl>
                    <FormControl id="password" >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          as={Field}
                          name="password"
                          type={showPassword ? 'text' : 'password'} />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <Text color="red.500"> {errors.password} </Text>
                    </FormControl>
                    <FormControl id="confirmPassword" >
                      <FormLabel>Repeat Password</FormLabel>
                      <InputGroup>
                        <Input as={Field}
                          name="confirmPassword"
                          type="password" />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <Text color="red.500"> {errors.confirmPassword} </Text>
                    </FormControl>
                    <Stack spacing={4} pt={2}>
                      <Button
                        isLoading={isLoading}
                        type="submit"
                        loadingText="Submitting"
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}>
                        Sign up
                      </Button>
                      <Button
                        onClick={googleSignUpHandler}
                        loadingText="Submitting"
                        size="lg"
                        bg={'red.400'}
                        color={'white'}
                        _hover={{
                          bg: 'red.500',
                        }}>
                        SignUp With Google
                      </Button>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        colorScheme='facebook'
                        color={'white'}
                        _hover={{
                          bg: "blue.600",
                        }}>
                        SignUp With FaceBook
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={'center'}>
                        Already a user? <Link to="/signin" color={'blue.400'}>Login</Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </Form>
        )}
      </Formik>

    </>
  )
}

export default SignUp