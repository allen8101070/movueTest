<template lang="pug">
  .container.mybox
    h4 YEEEEEEEEEEEE
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted (){
    //載入時自動回到網頁最上方
    $("html,body").animate({
    scrollTop:0
    },0);
  }
}
</script>


<style scoped>

h1{
  color: red;
}
</style>
