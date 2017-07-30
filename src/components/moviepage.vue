<template>
  <div>
    <!-- 以下我的CSS loading -->
    <div class="cssload-container" v-if="myloading">
      <div class="cssload-zenith"></div>
      <p>讀取中...</p>
    </div>
    <!-- 以下AJAX成功顯示的畫面 -->
    <!-- v-if="successAJAX -->
    <div class="moviePage" v-if="successAJAX">
      <section class="">
        <div class="boxTop">
          <div class="col-md-12 movieTopImg" v-bind:style="{backgroundImage:'url('+thisIdMovie.trailers[0].medium+')'}"></div>
        </div>
        <div class="container myMovieBox">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-4 thismimg">
              <img v-bind:src="thisIdMovie.images.large">
            </div>
            <div class="col-xs-12 col-sm-8 col-md-8 movieMsg">
              <div class="movieName">
                <h2>{{ thisIdMovie.title }}</h2>
                <!-- <h3 v-if="">{{ thisIdMovie.original_title }}</h3> -->
              </div>
              <ul>
                <li>
                  <span class="movieTag" v-for="tag in thisIdMovie.tags" :key="tag.id">{{tag}}</span>
                </li>
                <li>
                  <p>導演：&nbsp;&nbsp;{{thisIdMovie.directors[0].name}}</p>
                </li>
                <li>
                  <p>上映日期：&nbsp;&nbsp;
                    <span v-for="pubdate in thisIdMovie.pubdates" :key="pubdate.id">{{pubdate}}&nbsp;&nbsp;</span>
                  </p>
                </li>
                <li>
                  <p>片長：&nbsp;&nbsp;
                    <span>{{thisIdMovie.durations[0]}}</span>
                  </p>
                </li>
                <li>
                  <p>语言：&nbsp;&nbsp;
                    <span v-for="language in thisIdMovie.languages" :key="language.id">{{language}}</span>
                  </p>
                </li>
                <li>
                  <p>官方連結：&nbsp;&nbsp;
                    <a v-bind:href="thisIdMovie.alt">點我去</a>
                  </p>
                </li>
              </ul>
              <div class="movieRating">
                <p>
                  <span>8.2</span>/10</p>
                <h4>總評分</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="">
        <div class="container">
          <div class="row info0">
            <div class="col-md-12">
              <h3>劇情介紹：</h3>
              <hr>
            </div>
            <div class="col-md-12">
              <p>{{thisIdMovie.summary}}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="">
        <div class="container">
          <div class="row info1">
            <div class="col-md-12">
              <h3>預告片：</h3>
              <hr>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="trailers">
                <a v-bind:href="thisIdMovie.trailers[0].alt">
                  <div class="trailersHover">
                    <p>{{thisIdMovie.trailers[0].title}}</p>
                    <span class="glyphicon glyphicon-play" aria-hidden="" true></span>
                  </div>
                </a>
                <img v-bind:src="thisIdMovie.trailers[0].medium">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="">
        <div class="container">
          <div class="row info2">
            <div class="col-md-12">
              <h3>主要演員：</h3>
              <hr>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 cast" v-for="cast in thisIdMovie.casts" :key="cast.id">
              <div class="castbox">
                <a v-bind:href="cast.alt">
                  <div class="castHover">
                    <p>{{cast.name}}</p>
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </div>
                  <img v-bind:src="cast.avatars.large">
                </a>
              </div>
            </div>
  
          </div>
        </div>
      </section>
      <section class="">
        <div class="container">
          <div class="row info3">
            <div class="col-md-12">
              <h3>心得評論：</h3>
              <hr>
            </div>
            <div class="col-sm-12 col-md-6" v-for="reviews in thisIdMovie.popular_reviews" :key="reviews.id">
              <div class="media myComments">
                <div class="media-left">
                  <a v-bind:href="reviews.author.alt">
                    <img class="media-object" v-bind:src="reviews.author.avatar">
                  </a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">{{reviews.title}}</h4>
                  <p>{{reviews.summary}}
                    <span>
                      <a v-bind:href="reviews.alt">查看更多</a>
                    </span>
                  </p>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </section>
    </div>
  
    <!-- 以下AJAX失敗顯示的畫面 -->
    <div class="row" v-if="errorAJAX">
      <h2>讀取失敗，請重新整理!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moviepage',
  data() {
    return {
      myloading: true,//用來判定是否需要loading畫面
      successAJAX: null,//用來判定AJAX成功畫面
      errorAJAX: null,//用來判定AJAX失敗畫面
      otherTitle: false,//用來判定是否顯示中文以外的原始電影名稱
      thisIdMovie: {}
    }
  },
  created() {
    this.movieData()
  },
  watch: {
    '$route': 'movieData'
  },
  methods: {
    movieData() {
      var self = this;
      var myApiKey = "?apikey=0df993c66c0c636e29ecbb5344252a4a";
      var moviePageUrl = "https://nameless-everglades-40413.herokuapp.com/movie/subject/" + this.$route.params.id + myApiKey;
      console.log(this.$route.params.id);
      $.ajax({
        url: moviePageUrl,
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log("要求資料成功");
          //this.nowPlaying = data.entries;這樣寫不會報錯，因為這裡的"this"指的是AJAX自己
          //但是上方data(){return裡的內容就仍然沒東西，想要傳給上方data(){return的nowPlaying，就用到AJAX前宣告的變數self保存的this
          self.thisIdMovie = data;
          self.successAJAX = true;
          self.myloading = false;
          if (data.title != data.original_title) {
            self.otherTitle = true;
          }
          console.log(self.thisIdMovie);
        },
        error: function () {
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

.row h3 {
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 0px;
}

.row hr {
  margin-top: 4px;
  border-top: 3px solid #f5f5f5;
}

.moviePage {
  width: 100%;
  height: auto;
  background-image: linear-gradient(135deg, #92FFC0 0%, #002661 100%);
}

.container.myMovieBox {
  color: #fff;
}

.boxTop {
  position: relative;
  height: 350px;
  overflow: hidden;
  width: 100%;
}

.movieTopImg {
  height: 100%;
  width: 100%;
  position: absolute;
  top: -30px;
  left: 0px;
  right: 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transform: skewY(-2deg);
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  filter: blur(3px);
}

.thismimg {
  margin: 20px 0px;
}

.thismimg img {
  max-width: 250px;
  height: auto;
  position: absolute;
  left: 50px;
  top: -200px;
  box-shadow: 0px 0px 10px #fff;
}

.movieMsg {
  padding: 10px;
  font-size: 18px;
  position: relative;
}

.movieMsg ul {
  list-style-type: none;
  padding: 0px;
}

.movieMsg ul span {
  display: inline-block;
}

.movieMsg .movieTag {
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  background-color: #74d34c;
  border-radius: 8px;
}

.movieMsg a {
  color: #fff;
}

.movieMsg .movieName {
  position: absolute;
  top: -200px;
}

.movieMsg .movieName h2 {
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 0px;
}

.movieMsg .movieName h3 {
  font-size: 20px;
  margin: 0px;
}

.movieMsg .movieRating {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid;
  position: absolute;
  right: 100px;
  bottom: -30px;
  text-align: center;
}

.movieMsg .movieRating p {
  font-size: 24px;
  margin-top: 18px;
  margin-bottom: 0px;
}

.movieMsg .movieRating h4 {
  margin: 0px;
  font-size: 20px;
}

.movieMsg .movieRating span {
  font-size: 46px;
  margin-right: 0px;
  font-weight: 900;
  margin-bottom: 0px;
}

@media(max-width:992px) {
  .thismimg {
    margin: 0px 0px;
    padding: 0px;
  }
  .thismimg img {
    max-width: 100%;
    height: auto;
    position: static;
  }

  .movieName {
    text-align: center;
  }
}

@media(max-width:768px) {
  .boxTop {
    display: none;
  }

  .thismimg {
    text-align: center;
  }

  .movieMsg .movieName {
    text-align: center;
    position: static;
    margin-bottom: 15px;
  }
  .movieMsg li {
    text-align: center;
  }
  .movieMsg .movieRating {
    text-align: center;
    position: static;
    margin: 20px auto 0px auto;
  }
}

.info1 {
  margin: 0 auto;
  text-align: center;
}

.info1 h3 {
  text-align: left;
}

.info1 img {
  max-width: 100%;
  height: auto;
}

.info1 .trailers {
  text-align: center;
  position: relative;
  display: inline-block;
}

.info1 .trailers:hover .trailersHover {
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
}

.info1 .trailersHover {
  transition: 0.3s;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  opacity: 0;
}

.info1 .trailersHover span {
  font-size: 70px;
  color: #00a343;
  margin-top: 10%;
}

.info1 .trailersHover p {
  margin-top: 30px;
  color: #00a343;
  font-size: 20px;
  font-weight: 900;
}

@media(max-width:992px) {
  .trailers {
    margin-bottom: 30px;
  }
}

.info0 {
  margin-top: 50px;
}

.info0 p {
  font-size: 16px;
  line-height: 1.8;
  color: #fff;
}

@media(max-width:768px) {
  .info0 p {
    padding: 0 20px;
  }
}

.info1 {
  margin-top: 50px;
}

.info2 {
  margin-top: 50px;
}

.info2 hr {
  margin-top: 4px;
  border-top: 3px solid #f5f5f5;
}

.cast {
  text-align: center;
  height: 0px;
  padding-bottom: 250px;
  overflow: hidden;
}

@media(max-width:992px) {
  .cast {
    padding-bottom: 200px;
  }
}

@media(max-width:768px) {
  .cast {
    padding-bottom: 0px;
    overflow: none;
    height: auto;
    padding: 0px;
    margin-bottom: 30px;
  }
}

.castbox {
  text-align: center;
  position: relative;
  display: inline-block;
}

.castbox img {
  max-width: 100%;
  height: auto;
  margin: 0px;
}

@media(max-width:768px) {
  .castbox {
    width: 80%;
    padding: 0px;
  }
  .castbox img {
    width: 100%;
  }
}

.castHover {
  transition: 0.3s;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  opacity: 0;
}

.castHover:hover {
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
}

.castHover p {
  margin-top: 30px;
  color: #00a343;
  font-size: 20px;
  font-weight: 900;
}

.castHover span {
  font-size: 40px;
  color: #00a343;
  margin-top: 30px;
}

@media(max-width:768px) {
  .castHover p {
    margin-top: 100px;
    font-size: 40px;
  }
  .castHover span {
    font-size: 40px;
  }
}

.info3 {
  margin-top: 50px;
}

.info3 .myComments {
  border: 1px solid #999;
  padding: 10px;
  height: 200px;
  margin-bottom: 10px;
}

.info3 .myComments .media-left {
  text-align: center;
  padding: 10px;
}

.info3 .myComments .media-left img {
  margin: 0px auto;
}

.info3 h4 {
  font-size: 20px;
  color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.info3 p {
  font-size: 14px;
  color: #fff;
  padding-right: 1em;
}

@media(max-width:992px) {
  .info3 .myComments {
    height: auto;
  }
}










/* CSS loading */

.cssload-container {
  width: 100%;
  height: 69px;
  text-align: center;
  margin-top: 100px;
}

.cssload-container p {
  color: #333;
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
  box-shadow: 4px 4px 1px rgb(77, 235, 68);
  animation: cssload-spin 690ms infinite linear;
  -o-animation: cssload-spin 690ms infinite linear;
  -ms-animation: cssload-spin 690ms infinite linear;
  -webkit-animation: cssload-spin 690ms infinite linear;
  -moz-animation: cssload-spin 690ms infinite linear;
}



@keyframes cssload-spin {
  100% {
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-o-keyframes cssload-spin {
  100% {
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-ms-keyframes cssload-spin {
  100% {
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes cssload-spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-moz-keyframes cssload-spin {
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
