<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
import navbar from './components/navbar'
import myfooter from './components/myfooter'
export default {
  name: 'app',
  components:{
    navbar,myfooter
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

}
#app {
  
}
</style>
