'use client';

import { auth } from '@/firebase.config';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoaded, setAuthLoaded] = useState(false);

    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (_user) => {
            setUser(_user);
            setAuthLoaded(true);
        });

        return () => unsub();
    }, []);

    // Sign out user
    const handleSignOut = async ({ onSignOut }) => {
        await signOut(auth);
        if (onSignOut) {
            onSignOut();
            console.log('User signed out');
            router.push('/');
        }
    };

    // Register user
    const register = async (values) => {
        const toastId = toast.loading('Creating account...');

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            if (!userCredential.user) {
                throw new Error('Something went wrong!. Please try again.');
            }
            console.log(userCredential);

            await updateProfile(userCredential.user, {
                displayName: `${values.firstName} ${values.lastName}`,
            });

            setUser(userCredential.user);

            toast.success('Account created successfully', { id: toastId });

            return userCredential.user.uid;
        } catch (error) {
            console.log(error.message);
            const message = error.code.split('/')[1].replace(/-/g, ' ');
            toast.error(message || error.message, { id: toastId });
        }
    };

    // Login user
    const login = async (values) => {
        const toastId = toast.loading('Signing in...');

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            if (!userCredential.user) {
                throw new Error('Something went wrong!. Please try again.');
            }
            console.log(userCredential);
            const token = await userCredential.user.getIdToken();
            console.log('token:', token);

            toast.success('Logged in successfully', { id: toastId });
        } catch (error) {
            console.log(error.message);
            const message = error.code.split('/')[1].replace(/-/g, ' ');
            toast.error(message || error.message, { id: toastId });
        }
    };

    const value = {
        user,
        authLoaded,
        handleSignOut,
        register,
        login,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthContextProvider');
    return context;
};
