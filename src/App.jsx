import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoardLayout from "./Components/DashBoardLayout"
import ForgottPassword from "./Components/Auth/ForgotPassword"
import RegisterEmailVarification from "./Components/Auth/RegisterEmailVarification"
import RegisterSuccess from "./Components/Auth/RegisterSuccess"
import ForgotPasswordSend from "./Components/Auth/ForgotPasswordSend"
import ResetPassword from "./Components/Auth/ResetPassword"
import ResetPasswordSuccess from "./Components/Auth/ResetPasswordSuccess"
import VarificationWithCode from "./Components/Auth/VarificationWithCode"
import UserProfile from "./Components/UserProfile"
import Protectedroute from "./Components/ProtectedRoutes/Protectedroute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout />,
  },
  {
    path: "/signin",
    element: <DashBoardLayout />,
  },
  {
    path: "/signup",
    element: <DashBoardLayout />,
  },
  {
    path: "/signup-email-validation/:email",
    element: <RegisterEmailVarification />,
  },
  {
    path: "/signup-Success",
    element: <RegisterSuccess />,
  },
  {
    path: "/forgot-password",
    element: <ForgottPassword />,
  },
  {
    path: "/forgot-password-SendMail/:email",
    element: <ForgotPasswordSend />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/reset-success",
    element: <ResetPasswordSuccess />
  },
  {
    path: "/varify-code",
    element: <VarificationWithCode />
  },
  {
    path: "/user-profile",
    element:  <Protectedroute> <UserProfile /> </Protectedroute>
  }

]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
