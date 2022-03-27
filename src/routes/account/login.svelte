
<script>

    let LoginZone, BadInputType, BadInputArea, BadInput, eml, pass;

    let attm = 0;

    //Create App Connection
    import firebaseConfig from "../../env";
    import { initializeApp } from 'firebase/app';
    const app = initializeApp(firebaseConfig);

    //Auth
    import { getAuth } from "firebase/auth";
    import { accountEmailSignIn } from "../../account";
    const auth = getAuth(app);


    function formSubmit(){
        if(attm > 5){return;}
        var state = 0;

        //Email validation
        if(eml.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            
            //Attempt Login
            if(accountEmailSignIn(auth, eml.value, pass.value)){
                eml.value = "";
            }
            else{state = 2;}
        }
        else{state = 1;}
        
        //Bad Input
        if(state != 0){
            attm++;
            if(attm > 5){
                LoginZone.style.display = "none";

                BadInputArea.style.top = "0px";
                BadInputArea.style.padding = "16px 16px 16px 16px";
                BadInputArea.style.borderRadius = "12px";

                BadInputType.textContent = "Too many attempts";
                BadInput.innerHTML = "";
            }
            else{
                BadInputArea.style.display = "block";
                BadInputArea.style.height = "100%";
                BadInputArea.style.padding = "4px 16px 16px 16px";

                BadInputType.textContent = "Some of the data entered is incorrect";
                if(state == 1){
                    BadInput.textContent = "Invalid email";
                }
                else{
                    BadInput.textContent = "Invalid email or password";
                }
            }
        }
        pass.value = "";
    }



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
            <div class="flex flex-row justify-center">
                <div class="transition-all bg-dark-50 w-30 rounded-sm hover:(rounded-md bg-true-gray-400 cursor-pointer)">
                    <div class="text-center" on:click={formSubmit}>Submit</div>
                </div>
            </div>
        </form>
    </div>
    <!-- Bad Input -->
    <div class="transition-all duration-1000 relative top-5px bg-red-600 w-full max-w-90 rounded-b-xl overflow-hidden" style="height:0px;" bind:this={BadInputArea}>
        <div class="w-full text-center text-lg underline">Uhh oh</div>
        <div bind:this={BadInputType}></div>
        <div bind:this={BadInput}></div>
        {#if attm > 5}
            You can recover your password <a class="underline" href="/recover">here</a>
        {/if}
    </div>
</div>
