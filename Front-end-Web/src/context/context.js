import {
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
  
const Context = createContext()

export const MyContext = (prop) => {
    const [user, setUser] = useState({});

    useEffect(() => {

    }, [])

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return (
        <Context.Provider
            value={{user}}
        >
            {prop.children}
        </Context.Provider>
    )
}

export const useAuth = () => useContext(Context);

export default MyContext;
