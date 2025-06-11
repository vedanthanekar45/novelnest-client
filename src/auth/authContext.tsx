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
    accessToken: string | null;
    loggedIn: boolean | null;
    logout: () => void;
    setLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false)
    const accessToken = localStorage.getItem("token");

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) setLoggedIn(true) 
        else setLoggedIn(false)
    }, [])
    
    const logout = async () => {
        setUser(null)
        // await axios.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true });
        localStorage.removeItem("token")
        setLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{user, setUser, loggedIn, logout, setLoggedIn, accessToken}}>
            {children}
        </AuthContext.Provider>
    );
}