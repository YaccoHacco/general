<script>
    import { onMount } from "svelte";
    export let f;
</script>


<button class="transition-all duration-200 w-max rounded-md p-2" on:click={f}><slot></slot></button>
