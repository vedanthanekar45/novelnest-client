import { createContext, useState, ReactNode} from 'react'
import axios from 'axios'

interface User {
    fullName: string;
    email: string;
    username: string;
    isVerified: boolean
  }

interface AuthContextType {
    user: User | null;
    setUser: (value: User) => void;
    loggedIn: boolean | null;
    logout: () => void;
    setLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false)
    
    const logout = async () => {
        setUser(null)
        await axios.post('http://127.0.0.1:8000/api/logout/', {}, { withCredentials: true });
        setUser(null)
        setLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loggedIn, logout, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}