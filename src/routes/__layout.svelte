<script>
    import { onMount, onDestroy } from "svelte";
    
    //Create App Connection
    import firebaseConfig from "../F/env";
    import { initializeApp } from "firebase/app";
    const app = initializeApp(firebaseConfig);
    
    //Auth
    import { authStore } from "../stores/authStore";
    import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
    let auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence);
    
    const authSub = authStore.subscribe((value) => {
        auth = value;
    })

    let linkBar = [
        ["Home","/"],
        ["Create","/create"],
        ["Edit","/edit"],
        ["Upload","/upload"],
        ["About","/about"],
        ["Account","/account"],
    ];

    onDestroy(() => {
        authSub();
    })
</script>

<!-- You will need the below line for WindiCSS and any styles you want available in all your pages -->
<style windi:preflights:global windi:safelist:global>
    
</style>


<div class="flex flex-col bg-dark-400 w-full h-auto min-h-full">
    <!-- Nav Bar -->
    <div class="flex flex-row w-full h-10 gap-3 items-center bg-dark-400 px-3 border-b-1 border-black children:(flex h-full items-center)">
        <!-- Logo -->
        <div class="w-10 min-w-10">img</div>
        <!-- Title -->
        <div class="w-22 min-w-22 hidden sm:flex">UR Profile</div>
        <!-- Nav Icons -->
        <div class="flex-row align-middle w-full gap-2 justify-center">
            {#each linkBar as l}
                <div><a href={l[1]}>{l[0]}</a></div>
            {/each}
        </div>
        <!-- Login Button || Account Button -->
        <div class="w-10 min-w-10 justify-end sm:(w-35 min-w-35)">
            {#if auth.currentUser != null}
                <!--<div>{auth.currentUser.displayName}</div>-->
                <a href="/account">{auth.currentUser.email}</a>
            {:else}
                <a href="/account/login">Login</a>
            {/if}
        </div>
    </div>


    <!-- Page Content -->
    <slot auth={auth}></slot>
    
</div>

