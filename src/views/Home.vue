<template>
    <div>
        <h1>Automatic Test UI</h1>
        <div class="grid-container" v-bind:style="{height:height+'px'} ">
            <div class="Notes">
                <listnote @clickFile="handleClickFile" :stateChange="stateChange"/>
            </div>
            <div class="Content">
                <notecontent :fileContext="fileContext" @changeStateTestCase="changeStateTestCase"/>
            </div>
        </div>
    </div>
</template>
<script>
    import listnote from "@/components/listnote.vue";
    import notecontent from "@/components/content.vue";
    export default {
        name: "Home",
        components: {
            notecontent,
            listnote
        },
        data() {
            return {
                height: window.innerHeight,
                fileContext: [],
                stateChange: null
            };
        },
        methods: {
            handleClickFile(data) {
                this.fileContext = data
            },
            changeStateTestCase(data) {
                this.stateChange = data
            }
        },
    };
</script>
<style>
    h1{
        text-align: center;
    }
    .grid-container {
        display: grid;
        grid-template-columns: 0.3fr 1fr;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas: "Notes Content";
        height: 90vh !important;
    }

    .Notes {
        grid-area: Notes;
        border-right: 2px dotted black;
    }

    .Content {
        grid-area: Content;
        padding-left: 10px;
        height: 90vh !important;
    }
</style>