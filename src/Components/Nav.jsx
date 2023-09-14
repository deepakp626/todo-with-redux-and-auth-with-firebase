import { HStack, Button, Image, AspectRatio, Avatar, useDisclosure, Menu, MenuButton, MenuList, MenuGroup, MenuItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import SignUp from './Auth/SignUp'
import { Link, useLocation, } from 'react-router-dom'
import { toast } from 'react-toastify'
import Signin from './Auth/Signin'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from "../config/firebase"
import { deleteUser } from "firebase/auth"
import { logout } from '../Store/features/authSlice'

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageComponent, setPageComponent] = useState()
  const location = useLocation()
  const { userToken } = useSelector((sate) => sate.userAndAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/*") return
    if (location.pathname === "/signin") {
      setPageComponent(<Signin />)
      onOpen()
    }
    else if (location.pathname === "/signup") {
      setPageComponent(<SignUp />)
      onOpen()
    }

  }, [location.pathname])

  const handalPage = (page) => {
    if (page == "signin") setPageComponent(<Signin />)
    if (page == "signup") setPageComponent(<SignUp />)
    onOpen()
  }

  const deleteUserHandler = () => {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
      toast.success("Your account has deleted successfully", {
        position: toast.POSITION.TOP_CENTER
      })
      dispatch(logout())
    }).catch(() => {
      toast.error("Something is wrong please try leater", {
        position: toast.POSITION.TOP_CENTER
      })
    });
  }

  const signOutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <HStack w="full" justifyContent="space-between" >
        <AspectRatio w="80px" ratio={4 / 3} border={"2px"}>
          <Image src='/logo.png' />
        </AspectRatio>
        <HStack fontSize="1.5rem" gap="1rem">
          <Link to="/">Home</Link>
          <Link to="/user-profile">Profile</Link>
        </HStack>

        {
          userToken == null ? (
            <>
              <HStack>
                <Button onClick={() => handalPage("signin")} color='blue'>Sign in</Button>
                <Button onClick={() => handalPage("signup")} color='blue'>free Sign up</Button>
              </HStack>
              <CustomModal isOpen={isOpen} onClose={onClose} >
                {pageComponent}
              </CustomModal>
            </>
          ) :
            (
              <>
                <HStack>
                  <Button onClick={signOutHandler} color='blue'>Sign out</Button>
                  <Menu>
                    <MenuButton color='pink'>
                      <Avatar />
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title='Profile'>
                        <Link to="/user-profile">
                          <MenuItem >My Account</MenuItem>
                        </Link>
                        <MenuItem onClick={signOutHandler}>Logout </MenuItem>
                        <MenuItem onClick={deleteUserHandler}>Delete Account </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </HStack>
              </>
            )
        }




      </HStack>
    </>
  )
}

export default Nav