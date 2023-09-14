import { Button, Card, Center, Container, FormControl, FormErrorMessage, FormLabel, Icon, Input,Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/ai"
import {Form,Field, Formik } from "formik";
import { auth } from "../../config/firebase";
import {sendPasswordResetEmail} from "firebase/auth"
import * as yup from 'yup';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const forgotValidationSchema = yup.object({
      email:yup.string().email().required("Email is required for mail"),
})

const ForgotPassword = () => {
  const navigate = useNavigate()
  const eesetPasswordHandler = (email) => { 
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.info("Password Reset Link is send to your email",{
        position: toast.POSITION.TOP_CENTER
      })
      navigate(`/forgot-password-SendMail/${email}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({errorCode, errorMessage})
      toast.info("Something is wrong please try again",{
        position: toast.POSITION.TOP_CENTER
      })
    });
  }

  return (
    <Container>
    <Center minH="100vh">
      <Card>
        <Link to="/signin">
          <Icon as={AiOutlineArrowLeft} boxSize="6" />
        </Link>
        <Text mt="4" fontWeight="medium" textStyle="h1">
          Forgot Password
        </Text>
        <Text textStyle="p2" color="black.60" mt="4">
          Enter your email address for which account you want to reset your
          password.
        </Text>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values,{resetForm}) => {
            eesetPasswordHandler(values.email)
            // initailazione all field/ email  empty
            resetForm({values:""})
          }}
          validationSchema={forgotValidationSchema}
        >
          {() => (
            <Form>
              <Stack mt="8" spacing={6}>
                <Field name="email">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        name="email"
                        type="email"
                        placeholder="Enter your email...."
                      />{" "}
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button  w="full" type="submit">
                  Reset Password
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </Center>
  </Container>
  )
}

export default ForgotPassword;