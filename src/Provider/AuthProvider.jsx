import { createContext  } from "react"
import { useSelector } from "react-redux"

export const AuthContext = createContext(null)

const AuthProvider = ({children}) =>{
      const userToken  = useSelector((state) => state.userAndAuth.userToken)
      console.log(userToken)
      return (
        <AuthContext.Provider value={userToken}>
            {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider