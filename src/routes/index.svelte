<script lang="ts">
// For future reference the firebase javascript should have been placed in another file and imported for organization
import { onMount } from "svelte"
import Home from "./Home.svelte";
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseConfig from "../env"
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const DB = getFirestore(app);
    // Gets Authorization instance
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    // Initialize database service

    // Learning notes
    // Firebase v9 makes you import each individual function and call with the current Authentication instance instead of
    // importing all funcitons at once and calling the function on the Authentication object
    // Also, double slash comments are used in the <script> tag for JS, and <!-- --> comments are used in the other actual HTML tags
    import {authState} from "rxfire/auth";
    import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, signOut, signInWithCredential } from "firebase/auth";
    import { getFirestore, collection, getDocs, doc, addDoc, setDoc, updateDoc } from "firebase/firestore"


    //Brings up a google pop up to log in
    async function login(){
        /*
        var p = await signInWithPopup(auth, googleProvider);
        if(p.user == null){
            console.log("poopy")
        }
        else{
            signInWithCredential(auth, GoogleAuthProvider.credentialFromResult(p));
            location.href = "/Home"
        }
        */
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            // The signed-in user info.
            auth.updateCurrentUser(result.user);
            location.href = "/Home"
            //const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    onMount(()=>{
        if(auth.currentUser != null){
            location.href = "/Home";
        }
    })

    
</script>

<div class="h-full">
    <!-- If the user is logged in, no log in pop up appears and the the users id is displayed in a message -->
    <button class="" on:click={login}>
        <!--use <i></i> to add a google image to this button here -->
        Sign In With Google
    </button>
</div>
