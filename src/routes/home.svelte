<script>
    import { onMount } from "svelte"
    import { initializeApp } from "firebase/app";
    import firebaseConfig from "../env"
    import { GoogleAuthProvider, signOut, getAuth } from "firebase/auth";
    import { getFirestore, collection, doc, setDoc, onSnapshot } from "firebase/firestore"
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const DB = getFirestore(app);
    // Gets Authorization instance
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    let message = '';
    $: messages = [];
  

    // Logs the user out
    
    let i = 0;
    async function submitMessage(){
        var ts = (new Date()).getTime();
        await setDoc(doc(DB, "chat-main", "msg-"+ ts), {
            Username: auth.currentUser.displayName,
            Message: message,
            Image: auth.currentUser.photoURL
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
    
<!--Centers-->
<div class="flex flex-row justify-center bg-transparent">
    <div class="flex flex-col bg-transparent outline-red-900"> 
        <!--Messages-->
        <div class="flex flex-col-reverse my-2 items-start h-139 w-100 list-none overflow-y-auto">
            {#each messages as msg}
                <div class="flex flex-row w-full py-2 leading-tight border-t-1">
                    <div class="rounded-full min-w-10 mx-1.5 my-1"><img class = "rounded-full h-10 min-w-10 w-10" src={msg.Image} alt="a"></div>
                    <div class="flex flex-col">
                        <strong class="mb-1">{msg.Username}</strong>
                        <small class="break-all">{msg.Message}</small>
                    </div>
                </div>
            {/each}
        </div>
        <!--Input-->
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