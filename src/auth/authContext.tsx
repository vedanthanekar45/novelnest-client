import { createContext, useState, ReactNode, useEffect} from 'react'
import api from './api';
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
    setAccessToken: (value: string | null) => void,
    loggedIn: boolean | null;
    logout: () => void;
    setLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await api.get("/check-auth"); // `withCredentials: true` is already set globally
            setLoggedIn(true);
            setUser(res.data.user);
          } catch (err) {
            setLoggedIn(false);
          }
        };
      
        checkAuth();
      }, []);
    
    const logout = async () => {
        setUser(null)
        await axios.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true });
        setUser(null)
        setLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loggedIn, logout, setLoggedIn, accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    );
}