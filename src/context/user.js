import { 
    createContext, 
    useState,
} from "react";


export const UserContext = createContext({
    name: '',
    role: '',
    token: '',
});

const blankeUser = {
    name: '',
    role: '',
    token: '',
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(blankeUser);

    const provider = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={provider}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;