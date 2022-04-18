<script>
    export let character = ''
    export let activeTile = false
    export let tileStatus = 0
</script>
<div class:border-true-gray-600 = "{activeTile}" class:bg-lime-900 = "{tileStatus == 2}" class:bg-yellow-400 = "{tileStatus == 1}" class="border-dark-100 bg-dark-400 border-2 w-18 h-18 m-1 text-white capitalize">
    <div class="bg-transparent text-center py-4 w-full">{character}</div>
</div>