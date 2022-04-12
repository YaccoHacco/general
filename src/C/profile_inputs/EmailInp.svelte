<script>
    import { onMount } from "svelte";
    import SubmitUndoInp from "./SubmitUndoInp.svelte";
    import { getAccountData, editAccountData, getDoc, doc, DB } from "../../F/fb";
    export let auth;
    export let dataPath;

    let inp;

    let hasError = false;
    let hasChanged = false;
    function inpChange(){
        hasChanged = true;
    }

    async function changeData(){
        await editAccountData(auth, dataPath, inp.value).then((status) => {
            if(status){
                hasChanged=false;
                hasError=false;
            }
            else{
                hasError=true;
            }
        })
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


<div class="flex flex-row gap-3">
    <input class="p-1 rounded-lg bg-true-gray-700 hover:bg-true-gray-600 focus:bg-true-gray-500" type="email" on:input={inpChange} bind:this={inp}>
    <SubmitUndoInp onSubmit={changeData} onUndo={loadData} isChanged={hasChanged} isError={hasError}/>
</div>
