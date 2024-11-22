import { auth, db } from "@/firebaseConfig";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: any;
    authenticated: boolean | undefined;
    login: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
    createUser: (email: string, password: string, userName: string, profileUrl: string) => Promise<{ success: boolean; data?: User; msg?: string }>;
    logout: () => Promise<{ success: boolean; msg?: string }>;
  }

  interface UserWithProfile extends User {
    userName?: string;
    profileUrl?: string;
    userId?:string
}

  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
  }

const AuthContextProvider = ({children}:AuthContextProviderProps) => {
    const [ user, setUser ] = useState<UserWithProfile | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, (user)=>{
        if(user){
            setAuthenticated(true)
            setUser(user);
            updateUserData(user.uid);
        }else{
            setAuthenticated(false)
            setUser(null)
        }
       })
       return unsub;
    }, [])

    const updateUserData = async(userId: string) => {
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser((user) => {
                if(!user) return null;
                return{
                ...user, 
                userName: data.userName, 
                profileUrl: data.profileUrl, 
                userId: data.userId
        }})
    }
    }

    const login = async(email:string, password:string) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email,password);
            return { success:true }
        }catch(error: unknown) {
            if (error instanceof Error) {
                let msg =  error.message;
                if(msg.includes('(auth/invalid-email)')) msg="Invalid email"
                if(msg.includes('(auth/invalid-credential)')) msg="Wrong email or password"
                return { success: false, msg: msg };
            } else {
                // Handle the case where error is not an instance of Error
                return { success: false, msg: "An unknown error occurred" };
            }
        }
    }
    const createUser = async(email:string, password:string, userName:string, profileUrl:string) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log("response.user: ", response.user)
            await setDoc(doc(db, 'users', response.user.uid),{
                userName, 
                profileUrl,
                userId: response.user.uid
            });
            return { success: true, data:response.user }
        }catch(error: unknown) {
            if (error instanceof Error) {
                let msg =  error.message;
                if(msg.includes('(auth/invalid-email)')) msg="Invalid email"
                if(msg.includes('(auth/email-already-in-use)')) msg="Entered email is already in use."
                return { success: false, msg: msg };
            } else {
                // Handle the case where error is not an instance of Error
                return { success: false, msg: "An unknown error occurred" };
            }
        }
    }

    const logout = async() => {
        try{
            await signOut(auth);
            return { success: true }
        }catch(error:unknown){
            if (error instanceof Error) {
                let msg =  error.message;
                return { success: false, msg: msg };
            } else {
                // Handle the case where error is not an instance of Error
                return { success: false, msg: "An unknown error occurred" };
            }
        }
    }
    return(
        <AuthContext.Provider value={{user, authenticated, login, logout, createUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value){
        console.log(value);
        throw new Error ('useAuth must be wrapped inside auth AuthContextProvider')
    }
    return value;
}

export default AuthContextProvider;