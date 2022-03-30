<script lang="ts">
// For future reference the firebase javascript should have been placed in another file and imported for organization
import { onMount } from "svelte"
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
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
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
    import { getFirestore } from "firebase/firestore"


    //Brings up a google pop up to log in
    async function login(){
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            auth.updateCurrentUser(result.user);
            location.href = "/Home"
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

<div>
    <!-- If the user is logged in, no log in pop up appears and the the users id is displayed in a message -->
    <button class="" on:click={login}>
        <!--use <i></i> to add a google image to this button here -->
        Sign In With Google
    </button>
</div>
