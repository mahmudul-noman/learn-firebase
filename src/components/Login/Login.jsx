import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebaseinit';


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const handleGoogleSignIn = () => {
        console.log('Google Coming');
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then( result => {
            const loggedInUser = result.user;
            setUser(loggedInUser)
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
        <div style={{ marginTop: '20px' }}>
            {
                user ?
                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleSignOut}>Sign Out</button> :
                    <>
                        <button style={{ backgroundColor: '#0F9D58', color: 'white', marginRight: '10px' }} onClick={handleGoogleSignIn}>Login with Google</button>
                        <button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleGithubSignIn}>Login with GitHub</button>
                    </>
            }




            {
                user &&
                <div style={{ marginTop: '10px' }}>
                    <img src={user.photoURL} alt="" />
                    <h3>User: {user.displayName}</h3>
                    <p>Email: {user.email}</p>
                </div>
            }
        </div>
    );
};

export default Login;