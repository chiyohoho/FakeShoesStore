import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [idProduct, setIdProduct] = useState(0)
    const [userData, setUserData] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [userAPI, setUserAPI] = useState({})
    const [userReg, setUserReg] = useState({})
    const [dataAPI, setDataAPI] = useState([])
    const [bagList, setBagList] = useState([])
    const [favList, setFavList] = useState([])
    const [productAddToBag, setProductAddToBag] = useState({})
    const [currentUserData, setCurrentUserData] = useState(JSON.parse(localStorage.getItem('CURRENT_USER_DATA')) || {})

    const toast = useToast()
    const showToast = (title, description, status) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        })
    }

    return <AppContext.Provider value={{
        showToast, idProduct, setIdProduct, userData, setUserData, isLogin, setIsLogin, userAPI,
        setUserAPI, userReg, setUserReg, dataAPI, setDataAPI, productAddToBag, setProductAddToBag,
        bagList, setBagList, favList, setFavList, currentUserData, setCurrentUserData
    }}>
        {children}
    </AppContext.Provider>
}   