import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  const userLogin = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const userRegister = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserProfile = arg => {
    setUserLoading(true);
    return updateProfile(auth.currentUser, arg)
  }

  const userLogout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
    })

    return () => {
      unsubscribe();
    }
  }, []);

  const authInfo = {
    user,
    userLoading, setUserLoading,
    userLogin,
    userRegister,
    userLogout,
    updateUserProfile
  }


  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;