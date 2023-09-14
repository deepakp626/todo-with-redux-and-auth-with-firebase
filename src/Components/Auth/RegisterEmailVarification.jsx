import { Box, Button, Card, Center, Container, Icon, Text, VStack} from "@chakra-ui/react";
import { MdEmail} from "react-icons/md"
import { Link, useParams } from "react-router-dom";
import {auth} from "../../config/firebase"
import { toast } from "react-toastify";
import {sendEmailVerification} from "firebase/auth"
import { useState } from "react";


const RegisterEmailVarification = () => {
  const [isLoading,setLoading] = useState(false);
  const sendEmail = () =>{
    setLoading(true);
    sendEmailVerification(auth.currentUser).then(() =>{
      toast.info("Please check your email to verify your account",{
        position: toast.POSITION.TOP_CENTER
      } )
    }).catch(() =>{
      toast.error("Email Varify link already send to user Email",{
        position: toast.POSITION.TOP_CENTER
      })
    });
    setLoading(false)
  }

  const {email} = useParams()
  return (
    <Container>
      <Center minH="100vh">
        <Card
          p={{
            base: "4",
            md: "10",
          }}
        >
          <VStack spacing={6}>
            <Icon as={MdEmail} boxSize="48px" color="p.purple" />
            <Text textStyle="h4" fontWeight="medium" color="p.black">
              Email Verification
            </Text>
            <Text textAlign="center" textStyle="p2" color="black.60">
              We have sent you an email verification to{" "}
              <Box as="b" color="p.black">
                {email}
              </Box>
              . If you didn’t receive it, click the button below.
            </Text>
            <Button
              isLoading={isLoading}
              w="full"
              variant="outline"
              onClick={sendEmail}
            >
              Re-Send Email
            </Button>
            <Link to="/signin">
                <Button w="full">Enter the app</Button>
              </Link>
          </VStack>
        </Card>
      </Center>
    </Container>
  )
}

export default RegisterEmailVarification