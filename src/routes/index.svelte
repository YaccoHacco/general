<script>
    import Line from "../c/Line.svelte"
    import wordsJSON from "../words.json"
    const words = wordsJSON.words;

    let word = words[Math.round(Math.random()*words.length)]
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
            if(words.indexOf(inputString)!=-1){
                //Add code to flip letters and check letter positions
                answerArray = word.split('')
                var newLineStatus = [0,0,0,0,0]
                //Exaact Check
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
            }else{
                badInput()
            }

            if(guessNumber == 6){
                epicFail = true
            }
        }
        
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let showBad = false;
    async function badInput(){
        showBad = !false;
        await delay(2000);
        showBad = false;
    }
    
</script>
<svelte:window on:keydown = {keyPress}></svelte:window>
<div class="absolute w-full top-14">
    <div class="flex flex-row justify-center">
        {#if showBad}
            <div class="p-2 bg-white rounded-lg border-1 border-dark-600 text-black">Invalid Word</div>
        {/if}
    </div>
</div>
<div class="absolute w-full top-14">
    <div class="flex flex-row justify-center">
        {#if epicWin}
            <div class="bg-true-gray-800 h-100 w-75 p-5 rounded-lg border-1 border-dark-600 text-true-gray-500">good job buddy 👶</div>
        {/if}
    </div>
</div>
<div class="absolute w-full top-14">
    <div class="flex flex-row justify-center">
        {#if epicFail}
            <div class="bg-true-gray-800 h-100 w-75 p-5 rounded-lg border-1 border-dark-600 text-true-gray-500">fail: the word is {word}</div>
        {/if}
    </div>
</div>
<div class="flex flex-row justify-center h-screen w-screen bg-dark-400">
    <div class="flex flex-col justify-start mt-10">
        <div class ="grid-rows-5">
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
    </div>
    
</div>