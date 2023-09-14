import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import DashBoardLayout from './DashBoardLayout';
import { SmallCloseIcon } from '@chakra-ui/icons'
// import { CgSpinner } from "react-icons/cg"
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from "react-toastify"
import { signInWithPhoneNumber, RecaptchaVerifier,updateProfile } from "firebase/auth"

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({})
  const [phoneNumber, setPhoneNumber] = useState()
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const phoneNumber = user.phoneNumber;
      console.log({ displayName, email, photoURL, emailVerified, phoneNumber })

      // console.log(user)
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;

      console.log("debug start user")
      setUserDetails({ displayName, email, photoURL, emailVerified, phoneNumber, uid })
      console.log("debug end user")
    }
  }, [])

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup()
        },
        'expired-callback': () => {

        }
      }, auth);
    }
  }

  function onSignup() {
    onCaptchVerify()

    const appVerifier = window.recaptchaVerifier;

    const formatPh = '+' + phoneNumber

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // return confirmationResult.confirm(window.recaptchaVerifier);
        console.log("opt send to phone")
      }).catch((error) => {
        console.log({ error })
      });

  }

  // const varifyPhoneNumber = (phoneNumber) => {

  //   console.log(phoneNumber)
  //   const appVerifier = window.recaptchaVerifier;


  //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       // ...
  //       console.log("Message sending")
  //     }).catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //       console.log({ error })
  //     });
  // }


  const updateUserProfile = (values) =>{
    const {displayName,phoneNumber} = values;
    console.log({ displayName, phoneNumber})
    updateProfile(auth.currentUser, {
      displayName: displayName,
      phoneNumber: phoneNumber,
    }).then(()=>{
      toast.success("Profile Updated ",{
        position: toast.POSITION.TOP_CENTER
      })
    }).catch(()=>{
      toast.success("Profile is not  updated try again ",{
        position: toast.POSITION.TOP_CENTER
      })
    })
  }

  console.log({ phoneNumber })
  return (
    <>
      <DashBoardLayout>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <div className='recaptcha-container'></div>
          <Formik initialValues={
            {
              displayName: "",
              email: "",
              photoURL: "",
              emailVerified: "",
              phoneNumber: "",
              uid: "",
            }
          }

            onSubmit={(values) => {
              console.log(values)
              // setUserDetails(values)
              updateUserProfile(values)
            }}

          >
            <Form>
              <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                  User Profile Edit
                </Heading>
                <FormControl id="userName">
                  <FormLabel>User Icon</FormLabel>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar size="xl" src="">
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full">Change Photo</Button>
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl id="userName" >
                  <FormLabel>User name</FormLabel>
                  <Input
                  as={Field}
                    readOnly={userDetails.firstname && false}
                    
                    placeholder={(userDetails.displayName == null) ? "add name" : ""  }
                    name="displayName"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="userId" isRequired>
                  <FormLabel>User Id</FormLabel>
                  <Input
                    readOnly
                    placeholder={userDetails.uid}
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    placeholder={userDetails.email}
                    readOnly
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                  />
                </FormControl>
                <FormControl id="password" >
                  <FormLabel>Phone number</FormLabel>
                  <Input
                    as={Field}
                    name="phoneNumber"
                    // onChange={(event) => setPhoneNumber(event.target.value)}
                  //  readOnly={userDetails.phoneNumber && false}   
                    placeholder={(userDetails.phoneNumber == null) ? "add no" : userDetails.phoneNumber}
                    _placeholder={{ color: 'gray.500' }}
                    type="tel"
                  />
                  <Button onClick={onSignup}>Varify Phone no</Button>
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'blue.500',
                    }}>
                     Update Profile
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </Formik>
        </Flex>
      </DashBoardLayout>
    </>
  )
}

export default UserProfile