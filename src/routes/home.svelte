<script>
    let out = ""
    let displayLink = ""
    let buttonClicked = false
    function encrypt(str){
        var finalEncrypt = ""
        for(var i = 0; i<str.length; i++){
            if(str.charCodeAt(i) < 100){
                finalEncrypt += "0"
            }
            finalEncrypt += str.charCodeAt(i)
        }
        return finalEncrypt
    }

    function doInput(){
        out = encrypt(this.value);
    }

    function showLink(){
        displayLink = "localhost:3000/word/" + out
        buttonClicked = true
    }

    function copyClipboard(){
        navigator.clipboard.writeText(displayLink)
    }

</script>
<div class="flex flex-col justify-center items-center w-full h-screen bg-dark-400">
    <div class="text-white py-2">Enter Word</div>
    <div class="flex flex-row justify-center w-full bg-dark-400">
        <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 text-white" type="text" on:input={doInput}>
        <button class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white" on:click={showLink}>Submit</button>
    </div>
    <div class="flex flex-row justify-center w-full bg-dark-400">
        {#if buttonClicked}
            <div class="flex flex-row bg-dark-400 my-2">
                <div class="text-white py-1">{displayLink}</div>
                <button on:click={copyClipboard} class="mx-3 border-dark-100 border-1 rounded-lg py-1 px-2 text-white"> Copy to Clipboard</button>
            </div>
        {:else}
            <div></div>
        {/if}
    </div>
</div>
