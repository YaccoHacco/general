<script>
    export let onSubmit;
    export let onUndo;
    export let isChanged = false;
    export let isError = false;
</script>

<div class="flex flex-row gap-1">
    {#if isChanged}
    <button class="p-1 rounded-lg bg-green-500 hover:bg-green-600 focus:bg-green-700" on:click={onSubmit}>
        <div class="flex flex-row gap-1 justify-center items-center">
            <svg class="h-5" viewBox="0 0 24 24"><path fill="#000000" d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"></path></svg>
            <div>Confirm</div>
        </div>
    </button>
    <button class="p-1 rounded-lg bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-500" on:click={onUndo}>
        <div class="flex flex-row gap-1 justify-center items-center">
            <svg class="h-5" viewBox="0 0 24 24"><path fill="#000000" d="M12 4V2.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V6c3.31 0 6 2.69 6 6c0 .79-.15 1.56-.44 2.25c-.15.36-.04.77.23 1.04c.51.51 1.37.33 1.64-.34c.37-.91.57-1.91.57-2.95c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6c0-.79.15-1.56.44-2.25c.15-.36.04-.77-.23-1.04c-.51-.51-1.37-.33-1.64.34C4.2 9.96 4 10.96 4 12c0 4.42 3.58 8 8 8v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79a.5.5 0 0 0-.85.36V18z"></path></svg>
            <div>Undo</div>
        </div>
    </button>
    {/if}
    {#if isError}
        <div class="flex flex-row justify-center items-center p-1 rounded-lg bg-orange-500 hover:bg-orange-600" title="An error occured">
            <svg class="h-5" viewBox="0 0 24 24"><path fill="#000000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
        </div>
    {/if}
</div>