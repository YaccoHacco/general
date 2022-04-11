<script>
    import StringInp from "./profile_inputs/StringInp.svelte";


    export let urprofile = {};
    export let format = {};
    let state = true;
    function swapState(){
        state = !state;
    }
</script>

<style>
    .hid {
        display: none;
    }
</style>

<div class="w-9/10 ml-1 mt-2">
    {#if format.name}
        <div class="flex flex-row gap-1 px-1 items-center transition-all rounded-md w-max bg-dark-300 hover:bg-dark-50" on:click={swapState}>
            <div class="text-lg">{format.name}</div>
            {#if format.desc}
                <div><svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="#888888" d="M12 15a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"></path></svg></div>
                <div class="text-md">{format.desc}</div>
            {/if}
            <svg class="h-4 fill-cool-gray-500" viewBox="0 0 24 24">
                {#if state}
                    <path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path>
                {:else}
                    <path d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"></path>
                {/if}
            </svg>
        </div>
    {/if}
    <div class="px-1 ml-1 border-l-2 border-black py-1 {state?"":"hid"}">
        {#each format.keys as f}
            {#if f.type == "container"}
                <svelte:self urprofile={urprofile} format={f}></svelte:self>
            {:else}
                <div>
                    <div class="flex flex-row gap-1 items-center">
                        <div class="text-lg">{f.name}</div>
                        <div><svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="#888888" d="M12 15a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"></path></svg></div>
                        <div class="text-md">{f.desc}</div>
                    </div>
                    {#if f.type == "string"}
                        <StringInp dataPath={f.path}></StringInp>
                    {:else if f.type == "string-med"}
                        <StringInp dataPath={f.path} maxLen={128}></StringInp>
                    {:else if f.type == "string-long"}
                        <StringInp dataPath={f.path} maxLen={1000}></StringInp>
                    {:else}
                        <div>Unknown Input type ({f.type})</div>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>
</div>