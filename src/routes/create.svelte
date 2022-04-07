

<script>
    import Article from "../C/Article.svelte";
    import Section from "../C/Section.svelte";
    import ObjectList from "../C/ObjectList.svelte";

    import infoData from "../F/urprlfFormat.json";
    let infoObj = infoData.config;
    
</script>

<style>
    

</style>

<div>
    <div class="w-full h-full">
        <Article title="Create UR Profile">

            <Section title="Determine What Info You Want to Share">
                There are many things that your profile can contain.<br>
                Determining what you want to share is up to you and how you plan to use your profile.<br>
                Listed below are many things you might want to include in your profile.<br>
                
                <ObjectList obj={infoObj}/>
                
            </Section>
            <Section title="Fill Out Your Info">
                <Section title="Name">
                    Section stuff 2
    
                </Section>
            </Section>
            <Section title="Download UR Proile or Create UR Account">
                <div class="flex flex-row">
                    <div class="w-1/2 pr-2 border-r-1 border-gray-400">
                        <div class="text-gray-400 text-center w-full">Download</div>
                        Download your data you filled out above as a file. This file can then be uploaded to websites where you can select what data you wish to share.
                    </div>
                    <div class="w-1/2 pl-2 border-l-1 border-gray-400">
                        <div class="text-gray-400 text-center w-full">Create an Account</div>
                        Creating an account will allow you to be able to access and update your profile anywhere. It will also let websites directly link to your uploaded data so that changes made will automatically update across all linked websites.
                    </div>
                </div>
            </Section>
        </Article>
        
    </div>
</div>

