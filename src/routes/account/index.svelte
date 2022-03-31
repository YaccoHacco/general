
<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import LoadDots from "../../C/LoadDots.svelte"

    //Auth
    import { app } from "../../F/fb";
    import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
    import { accountSignOut } from "../../F/account";
    const auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence);

    
    async function attemptLogout(){
        await accountSignOut(auth);
    }

    let isVerified = false;
    onMount(() => {
        //Must be logged in otherwise go to login
        if(auth.currentUser == null){
            goto("/account/login");
            return;
        }
        onAuthStateChanged(auth, (user) => {
            if(user == null){
                goto("/");
            }
        });
        isVerified = true;
    });

</script>

{#if isVerified}
    <div>
        You are logged in<br>
        <button class="bg-red-500 rounded:md p-2" on:click={attemptLogout}>Log Out</button>
    </div>
{:else}
    <LoadDots />
{/if}
