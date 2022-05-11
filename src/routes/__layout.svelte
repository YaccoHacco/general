<!-- Anything in here is transfered to all pages -->
<script>
    import Sidebar from "../c/Sidebar.svelte"
    let contentArray = ["About","Game Info", "Features", "Stats"]
    let sidebarContent = -1
    
</script>
<!-- <slot> is essential where the page being visited is fitted in so don't delete it -->
    <div class="flex flex-row h-screen w-screen bg-dark-400">
        
        <div class="flex flex-col gap-4 pt-4 w-16 bg-dark-700 children:(text-white) z-10">
            {#each contentArray as n,i}
                <button class="" on:click={() => sidebarContent=(sidebarContent===i?-1:i)}>{n}</button>
            {/each}
        </div>
        <slot></slot>
    </div>
    {#each contentArray as c,i}
        <Sidebar bind:sidebarContent={sidebarContent} id={i}/>
    {/each}
    
<!-- You will need the below line for WindiCSS and any styles you want available in all your pages -->
<style windi:preflights:global windi:safelist:global>

</style>