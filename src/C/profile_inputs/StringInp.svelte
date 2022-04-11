<script>
import { onMount } from "svelte";

    import SubmitUndoInp from "./SubmitUndoInp.svelte";
    export let dataPath;
    export let maxLen = 32;

    let hasChanged = false;
    function inpChange(){
        hasChanged = true;
    }

    function onSubmit(){

    }

    let inp;
    function onUndo(){

    }

    onMount(async () => {
        //Get data and set it to default text
        inp.value = "...";
        
    })
</script>

{#if maxLen <= 32}
    <div class="flex flex-row gap-3">
        <input class="p-1 rounded-lg bg-true-gray-700 hover:bg-true-gray-600 focus:bg-true-gray-500" maxlength={maxLen} on:input={inpChange} bind:this={inp}>
        {#if hasChanged}<SubmitUndoInp onSubmit={onSubmit} onUndo={onUndo}/>{/if}
    </div>
{:else}
    <div class="flex flex-col gap-2">
        {#if maxLen <= 128}
            <input class="p-1 rounded-lg bg-true-gray-700 hover:bg-true-gray-600 focus:bg-true-gray-500" maxlength={maxLen} on:input={inpChange} bind:this={inp}>
        {:else}
            <textarea class="p-1 rounded-lg h-min bg-true-gray-700 hover:bg-true-gray-600 focus:bg-true-gray-500" maxlength={maxLen} on:input={inpChange} bind:this={inp}></textarea>
        {/if}
        {#if hasChanged}<SubmitUndoInp onSubmit={onSubmit} onUndo={onUndo}/>{/if}
    </div>
{/if}