import { User, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, FC, PropsWithChildren, useEffect,  useMemo, useState } from 'react'
import { auth, db, login, logout, register } from '../firebase'
import { Alert } from 'react-native'
import { addDoc, collection } from '@firebase/firestore'
import { async } from '@firebase/util'



interface IContext {
    user: User | null
    isLoading: boolean
    register: (email: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoadingInitial, setIsLoadingInitial] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const registerHandler = async(email:string, password:string) => {
        setIsLoading(true)
        try {
            const {user} = await register(email, password)

            await addDoc(collection(db, 'users'), {
                _id: user.uid,
                displayName: 'No name'
            })

        } catch (error: any) {
            Alert.alert('Error reg:', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const loginHandler = async (email: string, password: string) => {
          setIsLoading(true)
        try {
        await login(email, password)
        } catch (error: any) {
            Alert.alert('Error Login:', error.message)
        } finally {
            setIsLoading(false)
        }
    }

       const logoutHandler = async () => {
          setIsLoading(true)
        try {
        await logout()
        } catch (error: any) {
            Alert.alert('Error Logout:', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => 
       onAuthStateChanged(auth, user => {
        setUser(user || null)
        setIsLoadingInitial(false)
    }), 
 []
)

    const value = useMemo(() => ({
         user,
         isLoading,
         login: loginHandler,
         logout: logoutHandler,
         register: registerHandler,
         
         
    }),
     [user, isLoading]
    )

    return ( 
    <AuthContext.Provider value={value}>
        {!isLoadingInitial ? children : <></>}
    </AuthContext.Provider>
    )
}