import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebaseinit';


const Login = () => {
    const [user, setUser] = useState([null]);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        console.log('Google Coming');
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error);
            })
    }


    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleGoogleSignIn}>Login with Google</button>




            {
                user &&
                <div>
                    <img src={user.photoURL} alt="" />
                    <h3>User: {user.displayName}</h3>
                    <p>Email: {user.email}</p>
                </div>
            }
        </div>
    );
};

export default Login;