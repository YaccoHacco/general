<script>
    import { onMount } from "svelte";
    import SubmitUndoInp from "./SubmitUndoInp.svelte";
    import { getAccountData, editAccountData } from "../../F/fb";
    export let auth;
    export let dataPath;

    let inp;

    let hasChanged = false;
    let hasError = false;
    let hasInvalid = false;
    let state = true;

    function inpChange(){
        hasChanged = true;
        state = ((inp.value).match(/^[\w.-]+\@[\w.-]+\.[\w]{2,}$/) || inp.value==='');
    }

    async function changeData(){
        if((inp.value).match(/^[\w.-]+\@[\w.-]+\.[\w]{2,}$/) || inp.value===''){
            await editAccountData(auth, dataPath, inp.value).then((status) => {
                if(status){
                    hasChanged=false;
                    hasError=false;
                }
                else{
                    hasError=true;
                }
            })
            hasInvalid = false;
        }
        else{
            hasInvalid = true;
        }
    }

    async function loadData(){
        inp.value = "...";
        await getAccountData(auth, dataPath).then((value) => {
            inp.value=value;
            hasChanged=false;
            hasError=false;
        }).catch(() => {
            inp.value = "[Error]";
            hasError=true;
        });
    }

    onMount(loadData)
</script>


<style>
    .changed {
        @apply border-1;
    }

    .valid {
        @apply border-green-600;
    }

    .invalid {
        @apply border-1 border-red-600
    }
</style>

<div class="flex flex-row gap-3">
    <input class:changed="{hasChanged}" class:valid="{state}" class:invalid="{!state}" class="p-1 rounded-lg bg-true-gray-700 hover:bg-true-gray-600 focus:bg-true-gray-500" type="text" on:input={inpChange} bind:this={inp}>
    <SubmitUndoInp onSubmit={changeData} onUndo={loadData} isChanged={hasChanged} isInvalid={hasInvalid} isError={hasError}/>
</div>
