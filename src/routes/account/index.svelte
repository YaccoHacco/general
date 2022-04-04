
<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import LoadDots from "../../C/LoadDots.svelte";
    import AccountButton from "../../C/AccountButton.svelte";

    //Auth
    import { app } from "../../F/fb";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { accountSignOut } from "../../F/account";
    const auth = getAuth(app);

    
    async function attemptLogout(){
        await accountSignOut(auth);
    }

    async function gotoSettings(){
        await goto("/account/settings");
    }

    async function downloadData(){
        //Redirect to unique download page for account using about:blank
    }

    async function uploadData(){
        //Open up file upload
    }

    async function gotoPrivacy(){
        await goto("/account/privacy");
    }

    async function clearData(){
        //await goto("/account/settings");
        //Popup
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

<style>
    .buttonBar {
        @apply flex flex-row gap-1 w-full h-full justify-center;
    }

    .buttonBar button {
        @apply flex flex-row gap-1 items-center transition-all duration-200 w-max h-max rounded-md p-2;
    }

    .buttonBar button svg {
        @apply h-4;
    }

    .buttonBar button svg path {
        fill: #000000;
    }


</style>

{#if isVerified}
    <div class="flex flex-col gap-2">
        <div class="text-[35px] w-full underline text-center mt-4">Ur Profile</div>
        <div class="text-center">Welcome {auth.currentUser.displayName || auth.currentUser.email}</div>
        <div class="w-full h-max">
            <!--<div class="flex flex-row gap-1 w-full h-full justify-center children:(transition-all duration-200 w-max rounded-md p-2)">-->
            <div class="buttonBar">
                <button class="bg-red-500 hover:bg-red-600" on:click={attemptLogout}>
                    <svg viewBox="0 0 24 24"><path d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path></svg>
                    <div>Log Out</div>
                </button>
                <button class="bg-gray-700 hover:bg-gray-800" on:click={gotoSettings}>
                    <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"></path></svg>
                    <div>Settings</div>
                </button>
                <button class="bg-blue-500 hover:bg-blue-700" on:click={downloadData}>
                    <svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7l7-7z"></path></svg>
                    <div>Download</div>
                </button>
                <button class="bg-yellow-200 hover:bg-yellow-400" on:click={uploadData}>
                    <svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7l-7 7z"></path></svg>
                    <div>Upload</div>
                </button>
                <button class="bg-teal-500 hover:bg-teal-700" on:click={gotoPrivacy}>
                    <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"></path></svg>
                    <div>Privacy</div>
                </button>
                <button class="bg-rose-400 hover:bg-rose-800" on:click={clearData}>
                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    <div>Clear</div>
                </button>
                <!-- Reset (with confirm popup), Download, Settings, Privacy,  -->
            </div>
        </div>
        
    </div>
{:else}
    <LoadDots />
{/if}
