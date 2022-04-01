
<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import LoadDots from "../../C/LoadDots.svelte";
    import ActionButton from "../../C/ActionButton.svelte";

    let LoginZone, BadInputType, BadInputArea, BadInput, eml, pass;
    let attm = 0;

    //Auth
    import { app } from "../../F/fb";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { accountEmailSignIn, accountGoogleSignIn } from "../../F/account";
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if(user != null){
            goto("/account")
        }
    });
    
    async function formSubmit(){
        if(attm > 5){return;}
        var state = "";

        //Login validation
        if(!eml.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){state = "Invalid Email";}
        else if(pass.value.length<6){state = "Invalid Email or Password";}
        else if(await accountEmailSignIn(auth, eml.value, pass.value)){eml.value = "";}
        else {state = "Invalid Email or Password";}
        
        //Bad Input
        if(state != ""){
            attm++;
            if(attm > 5){
                //Remove and Disable email login box
                eml.value = "";
                eml.readOnly = true;
                pass.value="";
                pass.readOnly = true;

                LoginZone.style.display = "none";
                
                BadInputArea.style.top = "0px";
                BadInputArea.style.padding = "16px 16px 16px 16px";
                BadInputArea.style.borderRadius = "12px";

                BadInputType.textContent = "Too many attempts";
                BadInput.innerHTML = "";
            }
            else{
                //Display Bad input warning
                BadInputArea.style.display = "block";
                BadInputArea.style.height = "100%";
                BadInputArea.style.padding = "4px 16px 16px 16px";

                BadInputType.textContent = "Some of the data entered is incorrect";
                BadInput.textContent = state;
            }
        }
        pass.value = "";
    }

    
    async function googleLogin(){
        if(!(await accountGoogleSignIn(auth))){
            BadInputArea.style.display = "block";
            BadInputArea.style.height = "100%";
            BadInputArea.style.padding = "4px 16px 16px 16px";

            BadInputType.textContent = "Some of the data entered is incorrect";
            BadInput.textContent = "Error with Google sign in";
        }
    }


    async function newUser(){
        await goto("/account/new");
    }


    let isVerified = false;
    onMount(()=>{
        //Must not be logged in otherwise go to account
        if(auth.currentUser != null){
            goto("/account");
            return;
        }
        isVerified=true;
    });

</script>


<style>
    .formRow input {
        @apply rounded-r-md border-l-4 pl-1 w-full placeholder-gray-400 valid:border-green-600 invalid:border-red-600 placeholder-shown:border-true-gray-500;
    }

    .formRow {
        @apply flex flex-row gap-1 justify-between transition-all bg-dark-50 rounded-sm pl-2;
        @apply hover:(rounded-md bg-true-gray-400);
    }


</style>

{#if isVerified}
    <div class="flex flex-col w-full h-full items-center">
        <div class="transition-all m-1 sm:m-5 md:m-20 lg:m-25"></div>
        <!-- Login Zone -->
        <div class="transition-all flex flex-col gap-2 bg-dark-100 p-4 rounded-xl w-full max-w-100" bind:this={LoginZone}>
            <div class="w-full text-center text-lg">Login</div>
            <form class="flex flex-col gap-2">
                <div class="formRow">
                    <input placeholder="Email" type="email" bind:this={eml}/>
                </div>
                <div class="formRow">
                    <input minlength="6" placeholder="Password" type="password" bind:this={pass}/>
                </div>
                <div class="flex flex-row justify-center gap-1">
                    <ActionButton f={formSubmit}>Submit</ActionButton>
                    <ActionButton f={googleLogin}>Google</ActionButton>
                    <ActionButton f={newUser}>New</ActionButton>
                </div>
            </form>
        </div>
        <!-- Bad Input -->
        <div class="transition-all duration-1000 relative top-5px bg-red-600 w-full max-w-90 rounded-b-xl overflow-hidden" style="height:0px;" bind:this={BadInputArea}>
            <div class="w-full text-center text-lg underline">Uhh oh</div>
            <div bind:this={BadInputType}></div>
            <div bind:this={BadInput}></div>
            {#if attm > 5}
                You can recover your password <a class="underline" href="account/recover">here</a>
            {/if}
        </div>
    </div>
{:else}
    <LoadDots />
{/if}