<template>
  <div class="listnote">
    <h2>List test case</h2>
    <div v-for="(file, index) in listfiles" :key="index">
        <a class="link-silde" href="javascript:void(0);" @click="getContentOfFile(file)">
            {{index + 1}} - {{file}}
        </a>
        <b-list-group>
            <b-list-group-item 
                v-for="(casetest, key) in listContext(file)" 
                :key="key"
                :variant="returnState(casetest.state)"
            >{{casetest.value}}
            </b-list-group-item>
        </b-list-group>
    </div>
  </div>
</template>
<script>
import {
    responseService
} from '../services/reponse.service'

export default {
    props:{
        stateChange:{
            type: Object
        }
    },
    data() {
        return {
            listfiles: [],
            testCaseName: '',
            listCase: []
        }
    },
    watch: {
        stateChange(){
            console.log(this.stateChange)
            this.changeStateTestCase()
        }
    },
    created() {
        this.takeLangues()
    },
    methods: {
        takeLangues() {
            let endpoint = `http://localhost:3010/listTestCase`
            let request = {
                method: 'GET'
            }
            responseService.fetchRetry(endpoint, request, 1).then(result => {
                let data = JSON.parse(result)
                console.log(data)
                this.listfiles = data.response
            })
        },
        getContentOfFile(fileName) {
            let endpoint = `http://localhost:3010/testCaseContent/${fileName}`
            let request = {
                method: 'GET'
            }
            this.testCaseName = fileName
            this.listCase = []
            responseService.fetchRetry(endpoint, request, 1).then(result => {
                let data = JSON.parse(result)
                for (let i = 0; i < data.response.length; i++) {
                    let casea = {
                        id: data.response[i].split(': ')[0],
                        value: data.response[i],
                        state: 'load'
                    }
                    this.listCase.push(casea)
                }
                this.$emit('clickFile', this.listCase)
            })
        },
        listContext(fileName){
            if(fileName == this.testCaseName){
                return this.listCase
            }
        },
        returnState(state){
            switch (state) {
                case 'load':
                    return ''
                case 'running':
                    return 'info'
                case 'success':
                    return 'success'
                case 'fail':
                    return 'danger'
                default:
                    return ''
            }
        },
        changeStateTestCase(){
            let cases = this.listCase.find(e => e.id == this.stateChange.id)
            cases.state = this.stateChange.state
            this.listCase = [...this.listCase]
        }
     }
}
</script>
<style lang="css">
    .listnote{
        text-align: left;
        padding-left: 5%
    }
    .link-silde{
        color: rgb(0, 153, 255) !important;
    }
</style>