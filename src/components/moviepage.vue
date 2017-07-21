<template>
	<div>
      <!-- 以下我的CSS loading -->
      <div class="cssload-container" v-if="myloading">
	      <div class="cssload-zenith"></div>
        <p>讀取中...</p>
      </div>
			<!-- 以下AJAX成功顯示的畫面 -->
      <div class="container mybox" v-if="successAJAX">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-4 thismimg">
            <img v-bind:src="thisIdMovie.images.large">
          </div>
          <div class="col-xs-12 col-sm-12 col-md-8 movieMsg">
            <ul>
              <li>
                <h2>{{ thisIdMovie.title }}</h2>
              </li>
              <li>
                <p><span class="movieTag" v-for="tags in thisIdMovie.tags">{{tags}}</span>
                </p>
              </li>
              <li>
                <p>導演：{{thisIdMovie.directors[0].name}}</p>
              </li>
              <li>
                <p>主演：<span v-for="cast in thisIdMovie.casts">{{cast.name}}</span></p>
              </li>
              <li>
                <p>制片国家/地区:<span v-for="countrie in thisIdMovie.countries">{{countrie}}</span></p>
              </li>
              <li>
                <p>上映日期：<span v-for="pubdate in thisIdMovie.pubdates">{{pubdate}}</span></p>
              </li>
              <li>
                <p>片　　長：<span v-for="duration in thisIdMovie.durations">{{duration}}</span></p>
              </li>
              <li>
                <p>语言: <span v-for="language in thisIdMovie.languages">{{language}}</span></p>
              </li>
              <li>
                <p>官方連結: <a v-bind:href="thisIdMovie.alt">點我去</a></p>
              </li>
              <li>
                <h3>總評分：<span>{{thisIdMovie.rating.average}}</span>/10分</h3>
              </li>
            </ul>
          </div>
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
	name: 'moviepage',
	data (){
		return {
      myloading:true,//用來判定是否需要loading畫面
			successAJAX:null,//用來判定AJAX成功畫面
			errorAJAX:null,//用來判定AJAX失敗畫面
			thisIdMovie:{}
		}
	},
	created (){
		this.movieData()
	},
	watch:{
		'$route':'movieData'
	},
	methods:{
		movieData (){
      var self = this 
      var moviePageUrl = "https://api.douban.com/v2/movie/subject/"+this.$route.params.id+"?apikey=0df993c66c0c636e29ecbb5344252a4a"
			console.log(this.$route.params.id);
			$.ajax({
        url: moviePageUrl,
        type: "get",
        dataType: "jsonp",
        success: function(data) {
          console.log("要求資料成功");
          //this.nowPlaying = data.entries;這樣寫不會報錯，因為這裡的"this"指的是AJAX自己
          //但是上方data(){return裡的內容就仍然沒東西，想要傳給上方data(){return的nowPlaying，就用到AJAX前宣告的變數self保存的this
					self.thisIdMovie = data;
          self.successAJAX = true;
					self.myloading = false;
					console.log(self.thisIdMovie);
        },
        error: function() {
          console.log("要求資料失敗");
          self.errorAJAX = true;
        }
      });

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a:hover {
  text-decoration: none;
}

.container.mybox{
  box-sizing: border-box;
  margin-top: 80px;
  margin-bottom: 30px;
  background-image: linear-gradient( 135deg, #92FFC0 0%, #002661 100%);
  border-radius: 20px;
  color:#fff;
  box-shadow: 0px 8px 8px -5px #000;
}
.thismimg{
  text-align: center;
  margin: 20px 0px;
  
}
.thismimg img{
  max-width: 300px;
  text-align: center;
  margin: 0 auto;
  height: auto;
}
.movieMsg{
  padding: 10px;
}
.movieMsg ul{
  list-style-type: none;
  padding: 0px;
}
.movieMsg span{
  margin-right: 10px;
}
.movieMsg .movieTag{
  display: inline-block;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 5px;
  background-color: #74d34c;
  border-radius: 8px;
}
.movieMsg h2{
  margin-bottom: 0px;
  font-weight: 900;
  font-size: 34px
}
.movieMsg h3{
  font-size: 40px
}
.movieMsg p{
  font-size: 18px
}
.movieMsg a{
  color: #fff;
}
@media (max-width: 768px){
  .container.mybox{
    max-width: 80%;
  }
  .movieMsg{
    padding-left:50px;
  }

}



/* CSS loading */

.cssload-container {
	width: 100%;
	height: 69px;
	text-align: center;
  margin-top: 100px;
}
.cssload-container p{
  color: #fff;
  font-size: 30px;
  margin-top: 20px;
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
