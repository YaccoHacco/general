
<script>
    import Line from "./Line.svelte"
    import wordsJSON from "../words.json"
    const words = wordsJSON.words;
    export let word = words[Math.round(Math.random()*words.length)]
    console.log(word)
    $: previous = []
    $: lineStatus = []
    $: input = ['','','','','']
    $: guessNumber = 0
    $: answerArray = ['','','','','']
    const guessMax = [0,1,2,3,4,5]
    $: keyPosition = 0;
    let epicFail = false
    let epicWin = false
    function reset(){
        previous = []
        lineStatus = []
        input = ['','','','','']
        guessNumber = 0
        answerArray = ['','','','','']
        keyPosition = 0;
        epicFail = false
        epicWin = false
        word = words[Math.round(Math.random()*words.length)]
    }
    function keyPress(event){
        if(epicWin) return;
        if((event.key.length == 1)&&(keyPosition != 5)){
            input[keyPosition] = event.key
            keyPosition++
        }
        if((event.key == "Backspace")&&(keyPosition != 0)){
            input[keyPosition - 1] = ""
            keyPosition--
        }
        if((event.key == "Enter")&&(keyPosition == 5)){
            let inputString = input.join("")
                //Add code to flip letters and check letter positions
                answerArray = word.split('')
                var newLineStatus = [0,0,0,0,0]
                //Exact Check
                if(inputString == word){
                    epicWin = true;
                    newLineStatus = [2,2,2,2,2]
                }
                else{
                    //Direct Check
                    for(var i = 0; i < 5; i++){
                        if(input[i]==answerArray[i]){
                            newLineStatus[i] = 2
                            answerArray[i] = "\u0000"
                        }
                    }
                    //Similar Check
                    for(var i = 0; i < 5; i++){
                        if(newLineStatus[i] != 0) continue;
                        if(answerArray.indexOf(input[i]) != -1){
                            newLineStatus[i] = 1
                            answerArray[answerArray.indexOf(input[i])] = "\u0000"
                        }else{
                            newLineStatus[i] = 0
                        }
                    }
                }
                lineStatus.push(newLineStatus)
                previous.push(input)
                guessNumber++
                keyPosition = 0
                input = ['','','','','']

            if((guessNumber == 6)&&(!epicWin)){
                epicFail = true
            }
        }
        
    }

    //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //let showBad = false;
    //async function badInput(){
    //    showBad = !false;
    //    await delay(2000);
    //    showBad = false;
    //}

    
    
</script>

<svelte:window on:keydown = {keyPress}></svelte:window>
<div class="fixed left-0 top-0 w-full">
    <div class="flex flex-col w-full items-center mt-10 w-full ">
        <div class="">
            {#each guessMax as d,i}
                {#if i == guessNumber}
                    <Line rowData={input} keyPosition = {keyPosition}></Line>
                {:else if i < guessNumber}
                    <Line rowData={previous[i]} lineStatus={lineStatus[i]}></Line>
                {:else}
                    <Line rowData={['', '', '', '', '']}></Line>
                {/if}
            {/each}
        </div> 
        <a href="/home" class="transition-all duration-0 border-dark-100 border-1 text-white bg-dark-400 hover:bg-yellow-400 focus:bg-lime-900 rounded-lg w-max px-2 py-1 mt-3">
            Make a custom schmordle link
        </a>
    </div>
</div>
{#if epicFail||epicWin}
<div class="absolute left-0 w-full top-14">
    <div class="flex flex-row justify-center">
        <div class="flex flex-col bg-true-gray-800 h-100 w-75 p-5 rounded-lg border-1 border-dark-600 text-true-gray-500">
            {#if epicFail}
                <div class="h-full">fail: the word is {word}</div>
            {:else if epicWin}
                <div class="h-full">good job buddy 👶</div>
            {/if}
            <button class=" self-center transition-all duration-0 border-dark-100 border-1 text-white bg-dark-400 hover:bg-yellow-400 focus:bg-lime-900 rounded-lg w-max px-2 py-1 mt-3" on:click={reset}>New Game</button>
        </div>
    </div>
</div>
{/if}
