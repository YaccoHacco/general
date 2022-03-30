<!-- Anything in here is transfered to all pages -->
<script>
    import firebaseConfig from "../env"
    import { initializeApp } from "firebase/app";
    import { GoogleAuthProvider, signOut, getAuth, signInWithPopup } from "firebase/auth";
    import { onMount } from "svelte";
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    function logout(){
        signOut(auth);
        location.href="/";
    }
    
    //$: loggedIn = false;
    //onMount(() => {
    //    loggedIn = (auth.currentUser != null);
    //});
    const googleProvider = new GoogleAuthProvider();
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
</script>
<div class="flex-none w-full bg-transparent h-full max-h-full poverflow-hidden">
    <div class="h-20 flex-none">
        <div class="flex flex-row bg-blue-700 justify-end shadow-lg w-full">
            <div class="mx-10 my-5 shadow-md">
                <!--{#if loggedIn}-->
                    <button class="bg-blue-800 text-white p-2 rounded-md" on:click|once = {logout}>
                        Log Out
                    </button>
                <!--{:else}
                    <button class="bg-blue-800 text-white p-2 rounded-md" on:click|once = {login}>
                        Log In
                    </button>
                {/if}-->
            </div>
        </div>
    </div>
    <!-- <slot> is essentail where the page being visited is fitted in so don't delete it -->
    <div class="flex-1">
        <slot></slot>
    </div>
</div>
<!-- You will need the below line for WindiCSS and any styles you want available in all your pages -->
<style windi:preflights:global windi:safelist:global>

</style>