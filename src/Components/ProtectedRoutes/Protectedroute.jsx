import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const Protectedroute = ({ children }) => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.userAndAuth)
  console.log({userToken})
  useEffect(()=>{
    if (userToken == null) {
      navigate("/");
      toast.info("First you login  ",{
        position: toast.POSITION.TOP_CENTER
      })
    }
  })
  return (
    <>
      {
        (userToken == null) ? navigate("/") : children
      }
    </>
  )
}

export default Protectedroute