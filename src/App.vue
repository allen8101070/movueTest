<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/navbar'
export default {
  name: 'app',
  components:{
    navbar
  }
}
// $(window).scroll(function(e){
//   if($(window).scrollTop()>0)
//     $(".navbar").removeClass("navbar-top");
//   else
//     $(".navbar").addClass("navbar-top");
// });





</script>

<style>
* {
  box-sizing: border-box;
  font-family: "微軟正黑體";
}
body {
   /* background-image: linear-gradient(135deg, #FEC163 0%, #DE4313 100%);  */
   background-color: #fcfcfc;
}
#app {
  color: #2c3e50;
  margin-top: 50px;
  height: 550px;
}
</style>
