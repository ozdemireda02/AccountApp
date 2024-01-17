import { useState } from "react";
import { update,resetPassword, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [password,setPassword] = useState("")
  const [avatar, setAvatar] = useState(user.photoURL || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password)
    if(result){
      
      setPassword("")
    }
    
  }

  return (
    <div className="grid gap-y-10 mt-7">
      <form onSubmit={handleSubmit} className="grid gap-y-4  ">
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ad-Soyad
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Mehmet Özdemir"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="mt-3 block text-sm font-medium text-gray-700">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              type="file"
              placeholder="https://www."
              className="  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Güncelle
          </button>
        </div>
       
      </form>


      <form onSubmit={handleResetSubmit} className="grid gap-y-4  ">
        <h1 className="text-xl font-bold mb-4">Parolayı Güncelle</h1>
      <div>
          <label className=" block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="min 6 karakter olmalı"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
          <button
          disabled={!password}
            type="submit"
            className="mt-5 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Parolayı Güncelle
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}
