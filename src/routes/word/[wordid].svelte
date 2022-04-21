<script>
    import Schmordle from "../../c/schmordle.svelte";
import { onMount } from "svelte"
    
    let urlStr = "";
    let word = "";

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
    function decrypt(urlStr){
        var finalDecrypt = ""
        for(var i = 0; i<urlStr.length; i +=3 ){
            //THis loop takes groups of 3 numbers to convert back to the word and adds the character to the word string
            finalDecrypt += String.fromCharCode(Number(urlStr.substring(i, i + 3)))
        }
        return finalDecrypt
    }

    $: out=""
    $: out2 = ""
    function doInput(){
        out = encrypt(this.value);
        out2 = decrypt(out)
    }

    onMount(() => {
        let splitPath = location.toString().split("/");
        urlStr = (splitPath[splitPath.length-1]);
        console.log(urlStr)
        word = decrypt(urlStr)
    })
</script>

<Schmordle word={word}></Schmordle>