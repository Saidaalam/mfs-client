import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../Firebase/firebase.config.js";

export const AuthContext = createContext({
    user: null,
    createUser: () => {},
    signInWithEmailPassword: () => {},
    logOut: () => {}
});

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User in the auth state changed', currentUser);
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        createUser,
        signInWithEmailPassword,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
