<script>
    import { onMount } from "svelte"
    import db from "./index.svelte";
    import {collectionData} from "rxfire/firestore";

    import { initializeApp } from "firebase/app";
    import {getAuth, onAuthStateChanged} from "firebase/auth";
    import firebaseConfig from "../env"
    import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, signOut } from "firebase/auth";
    import { getFirestore, collection, getDocs, doc, addDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const DB = getFirestore(app);
    // Gets Authorization instance
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    //export let user;
    //export let logout;

    let username = 'Edit Username';
    let message = '';
    $: messages = [];
    /*
        {
            Username:"",
            Message:"",
        }
    */

    

    // Logs the user out
    function logout(){
        signOut(auth);
        location.href="/";
    }
    let i = 0;
    async function submitMessage(){
        await setDoc(doc(DB, "chat-main", "msg-"+ i), {
            Username: username,
            Message: message
        });
        i++;
    }
    
    const updateMessage = onSnapshot(collection(DB, "chat-main"), (chatDoc) => {
        messages = [];
        for(var i=chatDoc.docs.length-1;i>=0;i--){
            messages.push(chatDoc.docs[i].data());
        }
        messages = messages;
    });

    onMount(() => {
        console.log(auth.currentUser)
        if(auth.currentUser == null){
            //location.href = "/";
        }
    })



</script>
<div class="flex flex-col h-full max-h-full container bg-transparent">
    <div class="flex flex-row bg-blue-700 justify-end shadow-lg">
        <input class="bg-blue-800 shadow-md text-white p-2 rounded-md h-10 mx-10 my-5" bind:value={username}/>
        <div class="mx-10 my-5 shadow-md">
            <button class="bg-blue-800 text-white p-2 rounded-md" on:click|once = {logout}>
                Log Out
            </button>
        </div>
    </div>
    <div class="flex flex-row h-full max-h-full justify-center bg-transparent"><!--a justify should be added here to move the chat to the bottom
        of the screen but it aint working-->
        <div class="flex flex-col h-full  bg-transparent"> 
            <div class="flex flex-col-reverse my-2 items-start w-100 list-none overflow-y-auto hover:bg-gray-200">
                {#each messages as msg}
                    <div class="list-item py-3 leading-tight">
                        <div class="flex flex-col">
                            <strong class="mb-1">{msg.Username}</strong>
                            <small class="">{msg.Message}</small>
                        </div>
                    </div>
                {/each}
            </div>
            <div class ="flex flex-col">
                <div class="flex flex-row justify-center h-10 mb-4 items-center bg-blue-700 rounded-md">
                    <input type = "text" class=" shadow-gray-200" placeholder="Write a message!" bind:value = {message}/>
                    <button class="bg-blue-800 text-white font-bold py-2 px-4 rounded" on:click ={submitMessage}>
                        Send Message
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</div>