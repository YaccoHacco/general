
<script>

    //Create App Connection
    import firebaseConfig from "../../env";
    import { initializeApp } from 'firebase/app';
    const app = initializeApp(firebaseConfig);

    //Auth
    import { getAuth } from "firebase/auth";
    import { accountSignOut } from "../../account";
    import { onMount } from "svelte";
    const auth = getAuth(app);

    function attemptLogout(){
        accountSignOut(auth);
    }

    let isVerified = false;
    onMount(() => {
        if(auth.currentUser == null){
            location.href = "/account/new";
            return;
        }
        isVerified = true;
    });

</script>

{#if isVerified}
    <div>
        You are logged in
        <button class="bg-red-500 rounded:md p-2" on:click={attemptLogout}>Log Out</button>
    </div>
{/if}
