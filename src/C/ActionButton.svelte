

<script>
    export let f;

</script>


<div class="transition-all bg-dark-50 w-30 rounded-sm hover:(rounded-md bg-true-gray-400 cursor-pointer)">
    <div class="text-center" on:click={f}><slot></slot></div>
</div>