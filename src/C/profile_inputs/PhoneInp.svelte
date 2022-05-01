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
    
    function inpChange(){
        hasChanged = true;
    }

    async function changeData(){
        if((inp.value).match(/[0-9]{9}/) || inp.value===''){
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
        @apply valid:(border-1 border-green-600) invalid:(border-1 border-red-600);
    }
</style>

<div class="flex flex-row gap-3">
    <input class:changed = "{hasChanged}" class="p-1 rounded-lg bg-true-gray-700 hover:bg-true-gray-600 focus:bg-true-gray-500" type="tel" pattern="[0-9]{"{10}"}" on:input={inpChange} bind:this={inp}>
    <SubmitUndoInp onSubmit={changeData} onUndo={loadData} isChanged={hasChanged} isInvalid={hasInvalid} isError={hasError}/>
</div>
