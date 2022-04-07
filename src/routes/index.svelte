

<script>
    $: data = "[Not Loaded]"

    

    //import firebase from "firebase/app";
    
    // Follow this pattern to import other Firebase services
    // import { } from 'firebase/<service>';
    

    //Create App Connection
    import { app, DB, isDoc } from "../F/fb";
    import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';

    
    //Auth
    import { EmailAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

    const auth = getAuth(app);
    //const providerEmail = new EmailAuthProvider();

    

    //DB Calls
    const dataDocRef = doc(DB, "/User/Test");
    async function run(){
        const dataDoc = await getDoc(dataDocRef);
        console.log(await isDoc(dataDocRef))
        data = dataDoc.get("name");
        //console.log(dataDoc.get("name"));
    }
    
    // Get a list of cities from your database
    /*
    async function getCities(db) {
        const citiesCol = collection(db, 'cities');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
    }
    */

    /*
    const usersDocRef = collection(DB, "/users");
    async function addUser(){
        
        const usersDoc = await setDoc(doc(usersDocRef,"abc"),{
            "auth":false,
        });
        
    }
    */
    async function addUser(){
        const usersDoc = await setDoc(doc(DB, "/users","abc"),{
            "auth":false,
        });
        
    }

</script>

<div>
    Content
    <div>Get Data</div>
    <div>{data}</div>
    <button on:click={run}>Update</button>

    <!--
    <div>More Data</div>
    <button on:click={emailLogin}>Login</button>
    -->

</div>