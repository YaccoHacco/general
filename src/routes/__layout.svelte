<!-- Anything in here is transfered to all pages -->
<div class="bg-blue-400">This div here is located in __layout.svelte<br>Anything you put in __layout.svelte will be added to all pages<br>Really useful for a persistant navigation bar or soemthing</div>

<!-- <slot> is essential where the page being visited is fitted in so don't delete it -->
<slot></slot>

<!-- You will need the below line for WindiCSS and any styles you want available in all your pages -->
<style windi:preflights:global windi:safelist:global>

</style>
