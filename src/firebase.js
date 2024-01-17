import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword , updatePassword, signOut, onAuthStateChanged, updateProfile, sendEmailVerification} from "firebase/auth"
import toast from "react-hot-toast";
import store from "./store"
import { login as loginHandle, logout as logoutHandle } from "./store/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCcGloiPYGdKKT1iOAy1oHqFPJexuqeh8s",
    authDomain: "account-bc824.firebaseapp.com",
    projectId: "account-bc824",
    storageBucket: "account-bc824.appspot.com",
    messagingSenderId: "7142845427",
    appId: "1:7142845427:web:aca311871f1c8bdb4c8086"
  };

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);

export const register = async (email,password) => {
  try {
    const {user} = await createUserWithEmailAndPassword(auth,email,password) 
  return user
  } catch (error) {
    toast.error(error.message)
    
  }
}

export const login = async (email,password) => {
    try {
    const {user} = await signInWithEmailAndPassword(auth,email,password)
    return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const logout = async () => {
    try {
    await signOut(auth)
    return true
    } catch (error) {
        toast.error(error.message)
    }
}

export const update = async (data) => {
  try{
    await updateProfile(auth.currentUser, data)
    toast.success("Profil güncellendi")
    return true
  }catch(error){
    toast.error(error.message)
  }
}

export const resetPassword = async (password) => {
  try{
    await updatePassword(auth.currentUser, password)
    toast.success("Parolanız güncellendi")
    return true
  }catch(error){
    toast.error(error.message)
  }
}

export const emailVerification = async () => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`Doğrulama mail'i ${auth.currentUser.email} gönderildi.Lütfen kontrol ediniz!`)
  }catch (error){
    toast.error(error.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if(user){
      store.dispatch(loginHandle({
        displayName:user.displayName,
        email:user.email,
        emailVerified:user.emailVerified,
        photoURL:user.photoURL,
        uid:user.uid
      }))
  }else{
      store.dispatch(logoutHandle())
  }
});

export default app;