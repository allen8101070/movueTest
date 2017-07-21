<template>
	<div class="container mybox">
      <!-- 以下我的CSS loading -->
      <div class="cssload-container" v-if="myloading">
	      <div class="cssload-zenith"></div>
        <h2>讀取中...</h2>
      </div>
      <!-- 以下AJAX成功顯示的畫面 -->
  		<div class="row" v-if="successAJAX">
    		<div class="col-sm-12">
      			<h2>即將上映的電影</h2>
    		</div>
	    	<div class="col-xs-12 col-sm-4 col-md-3" v-for="movie in coming">
	      		<router-link :to="{ path: '/subject/'+movie.id }">
		        	<div class="myMovieCard">
		          		<div class="myMovieImg">
		            		<img v-bind:src="movie.images.large">
		          		</div>
		          		<h4>{{movie.title}}</h4>
		          		<p>上映日期：{{movie.pubdate}}</p>
		        	</div>
	      		</router-link>
	    	</div>
  		</div>
      <!-- 以下AJAX失敗顯示的畫面 -->
      <div class="row" v-if="errorAJAX">
        <h2>讀取失敗，請重新整理!</h2>
      </div>
	</div>
</template>

<script>
export default{
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      coming: {},
      myloading:true,//用來判定是否需要loading畫面
			successAJAX:null,//用來判定AJAX成功畫面
			errorAJAX:null,//用來判定AJAX失敗畫面
    }
  },
  methods:{
    getData (){
      //$(".row").html("");
      //宣告變數self保存"this"，這裡的tihs是上方data(){return裡的內容，因為下面AJAX如果用"this"會抓到AJAX自己本身
      //這樣AJAX完就可以簡單的寫 變數.coming = AJAX的JSON內容，把JSON傳給data(){return 內的物件
      var self = this 
      var comingUrl = "https://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a"
      $.ajax({
        url: comingUrl,
        type: "get",
        dataType: "jsonp",
        success: function(data) {
          console.log("要求資料成功");
          //this.coming = data.entries;這樣寫不會報錯，因為這裡的"this"指的是AJAX自己
          //但是上方data(){return裡的內容就仍然沒東西，想要傳給上方data(){return的coming，就用到AJAX前宣告的變數self保存的this
          self.coming = data.entries;
          self.successAJAX = true;
          self.myloading = false;
        },
        error: function() {
          console.log("要求資料失敗");
          self.errorAJAX = true;
        }
      });
    }
  },
  mounted (){
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a:hover {
  text-decoration: none;
}

.container.mybox {
  box-sizing: border-box;
}
.container.mybox .row {
  text-align: center;
  padding: 0px;
}
.container.mybox .row h2 {
  color: #444;
  font-weight: 900;
  margin-bottom: 30px;
}
.container.mybox .row .myMovieCard {
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 30px;
  border-bottom: 5px solid #c11501;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: #333;
  font-weight: 900;
}
.container.mybox .row .myMovieCard h4{
  font-size: 20px;
}
.container.mybox .row .myMovieCard p{
  font-size: 16px;
  margin-bottom: 0;
}
.container.mybox .row .myMovieCard:hover img {
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
  transition: 0.3s;
}

.container.mybox .row .myMovieImg {
  overflow: hidden;
  border-radius: 5px 5px 0px 0px;
  height: 0;
  padding-bottom: 300px;
}
.container.mybox .row .myMovieImg img {
  max-width: 100%;
}
@media (max-width: 768px){
  .container.mybox .row .myMovieImg{
    height: auto;
    padding-bottom: 0px;
  }
  .container.mybox .row .myMovieImg img {
    width: 100%;
    height: auto;
  }
  .container.mybox .row .col-xs-12 .myMovieCard {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}


/* CSS loading */

.cssload-container {
	width: 100%;
	height: 69px;
	text-align: center;
  margin-top: 150px;
}
.cssload-container h2{
  color: #222;
  font-size: 30px;
  margin-top: 50px;
}
.cssload-zenith {
	width: 69px;
	height: 69px;
	margin: 0 auto;
	border-radius: 50%;
	border-top-color: transparent;
	border-left-color: transparent;
	border-right-color: transparent;
	box-shadow: 4px 4px 1px rgb(77,235,68);
	animation: cssload-spin 690ms infinite linear;
		-o-animation: cssload-spin 690ms infinite linear;
		-ms-animation: cssload-spin 690ms infinite linear;
		-webkit-animation: cssload-spin 690ms infinite linear;
		-moz-animation: cssload-spin 690ms infinite linear;
}



@keyframes cssload-spin {
	100%{ transform: rotate(360deg); transform: rotate(360deg); }
}

@-o-keyframes cssload-spin {
	100%{ -o-transform: rotate(360deg); transform: rotate(360deg); }
}

@-ms-keyframes cssload-spin {
	100%{ -ms-transform: rotate(360deg); transform: rotate(360deg); }
}

@-webkit-keyframes cssload-spin {
	100%{ -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}

@-moz-keyframes cssload-spin {
	100%{ -moz-transform: rotate(360deg); transform: rotate(360deg); }
}
</style>
