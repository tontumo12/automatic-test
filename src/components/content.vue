<template>
  <section>
    <h2>Autotest screen</h2>
    <!-- <div v-for="(context, index) in fileContext" :key="index">
      {{index + 1}} - {{context}}
    </div> -->
    <div>
      <div id="viewWebDemo">
      </div>
    </div>
  </section>
</template>
<script>
import {
    responseService
} from '../services/reponse.service'

export default {
    props:{
        fileContext:{
            type: Array
        }
    },
    data() {
      return {
        url: '',
        htmlInner: null
      }
    },
    watch: {
      fileContext(){
        this.findSyntax()
      }
    },
    methods: {
      findSyntax(){
        let timeout = 1000
        this.fileContext.forEach(async (sintax, index) => {
          // this.changeActiveAction(sintax.id, 'running')
          setTimeout(() => {
            if(sintax.value.indexOf('open_web:')>-1){
              try {
                this.getHtmlWeb(sintax.value.split(' ')[1])
                this.changeActiveAction(sintax.id, 'success')
              } catch (error) {
                this.changeActiveAction(sintax.id, 'fail')
                console.log(error)
              }
            }
          }, (timeout-500));
          setTimeout(() => {
            if(sintax.value.indexOf('find_class:') > -1 && sintax.value.indexOf(' -compare- ') > -1){
              let className = sintax.value.split(' ')[1]
              if(this.getTextClass(className).text == sintax.value.split(' -compare- ')[1]){
                this.changeActiveAction(sintax.id, 'success')
              }else{
                this.changeActiveAction(sintax.id, 'fail')
              }
            }
          }, timeout*(index+1));
          setTimeout(() => {
            if(sintax.value.indexOf('find_id:') > -1 && sintax.value.indexOf(' -compare- ') > -1){
              let idName = sintax.value.split(' ')[1]
              if(this.getTextId(idName).text == sintax.value.split(' -compare- ')[1]){
                this.changeActiveAction(sintax.id, 'success')
              }else{
                this.changeActiveAction(sintax.id, 'fail')
              }
            }
          }, timeout*(index+1));
          setTimeout(() => {
            if(sintax.value.indexOf('find_xpath:') > -1 && sintax.value.indexOf(' -compare- ') > -1){
              let xPath = sintax.value.split(' ')[1]
              console.log('uyen',this.getTextXpath(xPath).innerText)
              if(this.getTextXpath(xPath).innerText == sintax.value.split(' -compare- ')[1]){
                console.log('uyen',this.getTextXpath(xPath).innerText)
                this.changeActiveAction(sintax.id, 'success')
              }else{
                this.changeActiveAction(sintax.id, 'fail')
              }
            }
          }, timeout*(index+1));
          if(sintax.value.indexOf('name:')>-1){
            this.changeActiveAction(sintax.id, 'success')
          }
          setTimeout(() => {
            if(sintax.value.indexOf('find_id:') > -1 && sintax.value.indexOf(' -input- ') > -1){
              let idName = sintax.value.split(' ')[1]
              try {
                this.getTextId(idName).value = sintax.value.split(' -input- ')[1]
                this.changeActiveAction(sintax.id, 'success')
              } catch (error) {
                this.changeActiveAction(sintax.id, 'fail')
                console.log(error)
              }
            }
          }, timeout*(index+1));
        })
      },
      getTextXpath(xpath){
        let doc = document.querySelector(xpath)
        doc.scrollIntoView()
        return doc
      },
      getTextId(id){
        let doc = document.getElementById(id)
        doc.scrollIntoView()
        return doc
      },
      getTextClass(classname) {
        let doc = document.getElementsByClassName(classname)[0]
        doc.scrollIntoView()
        return doc
      },
      getHtmlWeb(path){
        let endpoint = `http://localhost:3010/htmlContent?uri=${path}`
        let request = {
          method: 'GET',
          headers: {
            'Accept': 'text/html',
            'Content-Type': 'text/html'
          }
        }
        responseService.fetchRetry(endpoint, request, 1).then(result => {
          document.getElementById("viewWebDemo").innerHTML = result
        })
      },
      changeActiveAction(key, data){
        let dataKey = {
          id: key,
          state: data
        }
        this.$emit('changeStateTestCase', dataKey)
      }
    },
}
</script>
<style lang="css">
    #viewWebDemo{
      width: 100%;
      height: 80vh !important;
      overflow-y: auto;
    }
    h2{
      text-align: center;
    }
</style>