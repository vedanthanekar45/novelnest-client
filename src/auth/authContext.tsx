import { createContext, useState} from 'react'
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
// export const AuthContext = createContext({})

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null);

    
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