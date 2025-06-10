import { createContext, useState, useEffect} from 'react'
import axios from 'axios'

interface User {
    fullName: string;
    email: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (value: User) => void;
    // accessToken: string | null;
    // setAccessToken: (value: string | null) => void,
    loggedIn: boolean | null;
    logout: () => void;
    setLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false)
    // const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/check-auth", {
            withCredentials: true
        }).then(() => {
            setLoggedIn(true);
            console.log("Authenticated!")
        }).catch(() => {
            setLoggedIn(false);
            console.log("Not Authenticated!")
        })
    }, [])
    
    const logout = async () => {
        setUser(null)
        await axios.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true });
        setUser(null)
        setLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loggedIn, logout, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}