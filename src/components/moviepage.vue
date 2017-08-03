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
      <!-- 網頁上方區塊 -->
      <section class="">
        <div class="boxTop">
          <div class="col-md-12 movieTopImg" v-if="traVdo" v-bind:style="{backgroundImage:'url('+thisIdMovie.trailers[0].medium+')'}"></div>
          <div class="col-md-12 movieTopImg" v-if="traVdoNo" v-bind:style="{backgroundImage:'url('+thisIdMovie.photos[0].image+')'}"></div>
        </div>
        <div class="container myMovieBox">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-4 thismimg">
              <img v-bind:src="thisIdMovie.images.large">
            </div>
            <div class="col-xs-12 col-sm-8 col-md-8 movieMsg">
              <div class="movieName">
                <h2>{{ thisIdMovie.title }}</h2>
                <h3 v-if="otherTitle">{{ thisIdMovie.original_title }}</h3>
  
                <h4 v-if="ratingYes">總評分：
                  <span>{{thisIdMovie.rating.average}}</span>/{{thisIdMovie.rating.max}}</h4>
                <h4 v-if="ratingNo">總評分：暫無評分</h4>
                <div class="star-rating">
                  <label class="star-rating__star" v-for="rating in ratings" :key="rating.id" :class="{ 'is-selected' : ((testStar >= rating) && testStar != null), 'is-disabled': disabled}">★</label>
                </div>
  
              </div>
              <ul>
                <li>
                  <span class="movieTag" v-for="tag in thisIdMovie.tags" :key="tag.id">{{tag}}</span>
                </li>
                <li>
                  <p>導　　演：&nbsp;&nbsp;
                    <span>{{thisIdMovie.directors[0].name}}</span>
                  </p>
                </li>
                <li>
                  <p>上映日期：&nbsp;&nbsp;
                    <span v-for="pubdate in thisIdMovie.pubdates" :key="pubdate.id">{{pubdate}}&nbsp;&nbsp;</span>
                  </p>
                </li>
                <li>
                  <p>片　　長：&nbsp;&nbsp;
                    <span>{{thisIdMovie.durations[0]}}</span>
                  </p>
                </li>
                <li>
                  <p>语　　言：&nbsp;&nbsp;
                    <span>{{thisIdMovie.languages[0]}}&nbsp;</span>
                  </p>
                </li>
                <li>
                  <p>官方連結：&nbsp;&nbsp;
                    <a v-bind:href="thisIdMovie.alt">點我去</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <!-- 劇情介紹區塊 -->
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
      <!-- 預告片區塊 -->
      <section class="">
        <div class="container">
          <div class="row info1">
            <div class="col-md-12">
              <h3>預告片：</h3>
              <hr>
            </div>
            <div class="col-md-12" v-if="traVdoNo">
            <h4 class="oops">Oops!目前暫無預告片資料</h4>

            </div>
            <div v-if="traVdo">
              <div class="col-sm-12 col-md-6" v-for="trailer in thisIdMovie.trailers" :key="trailer.id">
                <div class="trailers">
                  <a v-bind:href="trailer.alt">
                    <div class="trailersHover">
                      <p>{{trailer.title}}</p>
                      <span class="glyphicon glyphicon-play" aria-hidden="" true></span>
                    </div>
                  </a>
                  <img v-bind:src="trailer.medium">
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- 主要演員區塊 -->
      <section class="">
        <div class="container">
          <div class="row info2">
            <div class="col-md-12">
              <h3>主要演員：</h3>
              <hr>
            </div>

            <div v-if="castYes">
              <div class="col-xs-12 col-sm-3 col-md-3 cast" v-for="cast in thisIdMovie.casts" :key="cast.id">
                <div class="castbox">
                  <a v-bind:href="cast.alt">
                  <div class="castImg" v-bind:style="{backgroundImage:'url('+cast.avatars.large+')'}">
                  </div>
                  </a>
                  <h5>
                    <a v-bind:href="cast.alt">{{cast.name}}</br>
                    <span>{{cast.name_en}}</span></a>
                  </h5>
                </div>
              </div>
            </div>

            <div v-if="castNo">
            <h4 class="oops">Oops!目前暫無演員資料</h4>
            </div>

          </div>
        </div>
      </section>
      <!-- 心得評論區塊 -->
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
                  <div class="star-rating">
                    <label class="star-rating__star" v-for="rating in ratings" :key="rating.id" :class="{ 'is-selected' : ((reviews.rating.value >= rating) && reviews.rating.value != null), 'is-disabled': disabled}">★</label>
                  </div>
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
      <h2 class="errorAJAX">讀取失敗，請重新整理!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moviepage',
  props: {
    max: 5,
    disabled: ''
  },
  data() {
    return {
      myloading: true,//用來判定是否需要loading畫面
      successAJAX: null,//用來判定AJAX成功畫面
      errorAJAX: false,//用來判定AJAX失敗畫面
      otherTitle: false,//用來判定是否顯示中文以外的原始電影名稱
      thisIdMovie: {},
      testStar: null,//星星用
      ratingYes: true,//辦別星星或分數是否可以顯示
      ratingNo: false,//辦別星星或分數是否可以顯示
      castYes: true,//辦別演員是否有資料可以顯示演員區塊
      castNo: false,//辦別演員是否有資料可以顯示演員區塊
      traVdo: true, //預設有預告片區塊 是true
      traVdoNo: false
    }
  },
  created() {
    this.movieData()
  },
  //生命週期：mounted(已載入el，根據el內容選擇器成功綁到對應DOM元素身上)//
  mounted: function () {//因為SPA緣故 載入新vue時滾輪不會回到網頁最上面，所以讓他載入時自動回到頁面最上方
    $("html,body").animate({
      scrollTop: 0
    }, 0);
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
          if (data.code == 5000){
            self.myloading = false;
            self.errorAJAX = true;
            successAJAX = false;
          }
          //this.nowPlaying = data.entries;這樣寫不會報錯，因為這裡的"this"指的是AJAX自己
          //但是上方data(){return裡的內容就仍然沒東西，想要傳給上方data(){return的nowPlaying，就用到AJAX前宣告的變數self保存的this
          self.thisIdMovie = data;
          self.successAJAX = true;//顯示successAJAX區塊
          self.myloading = false;//不顯示loading動畫
          self.testStar = Math.round(self.thisIdMovie.rating.average / 2)//轉換成星星的分數給他四捨五入 因為滿分通常10分 星星只有5顆 所以除2
          
          if (data.title != data.original_title) {//如果電影名不等於原始電影名
            self.otherTitle = true;//顯示原始電影名(可能是英文或日文)
          }
          
          if (self.testStar == 0) {//如果這部電影分數等於0
            self.ratingNo = true;//顯示目前暫無評分
            self.ratingYes = false;//隱藏總評分字樣
          }
          
          if (self.thisIdMovie.trailers == "") {//如果沒有預告片
            self.traVdo = false;
            self.traVdoNo = true;
          }

          if (self.thisIdMovie.casts[0].avatars == null) {//如果沒有預告片
            self.castYes = false;
            self.castNo = true;
          }
          
        },
        error: function () {
          console.log("要求資料失敗");
          self.errorAJAX = true;
          self.myloading = false;
        }
      });

    }
  },
  computed: {
    ratings: function () {
      if (!this.max) { return [1, 2, 3, 4, 5]; }
      var numberArray = [];
      for (var i = 1; this.max >= i; i++) {
        numberArray.push(i);
      }
      return numberArray;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dspnone {
  display: none;
}

* {
  /* border: 1px solid #999;  */
}
.errorAJAX {
text-align: center;
margin-top: 100px;
}
a:hover {
  text-decoration: none;
}

.row h3 {
  font-size: 30px;
  font-weight: 900;
  color: #333;
  margin-bottom: 0px;
}

.row hr {
  margin-top: 4px;
  border-top: 3px solid #f5f5f5;
  color: orangered;
  background-color: orangered;
  border: 2px solid orangered;
}

.moviePage {
  width: 100%;
  height: auto;
  /* background-image: linear-gradient(135deg, #92FFC0 0%, #002661 100%); */
  background-color: #fff6ed;
  /* background-image: linear-gradient( 90deg, #ed5a00 10%, #e5a03d 100%); */
  /* background-color: #fff; */
}

.container.myMovieBox {
  /* color: red; */
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
  background-position: top center;
  background-attachment: fixed;
  transform: skewY(-2deg);
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  filter: blur(5px);
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
  box-shadow: 0px 0px 10px #000;
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
  border: 1px solid #333;
  border-radius: 8px;
}

.movieMsg a {
  color: #222;
}

.movieMsg .movieName {
  position: absolute;
  top: -200px;
}

.movieMsg .movieName h2 {
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 0px;
  color: #fff;
  text-shadow: 0px 0px 1px #000;
}

.movieMsg .movieName h3 {
  font-size: 20px;
  margin: 0px;
  color: #fff;
  text-shadow: 0px 0px 1px #000;
}

.movieMsg .movieName h4 {
  text-shadow: 0px 0px 1px #000;
  color: #fff;
}

.movieMsg .movieName label {
  text-shadow: 0px 0px 1px #000;
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
}

.info1 {
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
  margin-bottom: 20px
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
  color: #333;
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



.cast .castbox {
  max-width: 200px;
  height: 300px;
  margin: 0 auto;
  text-align: center;
}

.cast .castbox h5 {
  margin-top: 5px;
  margin-bottom: 0px;
  font-size: 18px;
  font-weight: 900;
}

.cast .castbox a {
  color: #333;
}

.cast .castbox a:visited {
  color: #333;
}

.cast .castImg {
  width: 100%;
  height: 240px;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
}

@media(max-width:992px) {
  .cast .castbox {
    height: 250px;
  }
  .cast .castImg {
    height: 200px;
  }
}

@media(max-width:767px) {
  .cast .castbox {
    max-width: 70%;
    height: 430px;
    margin-bottom: 20px;
  }
  .cast .castImg {
    height: 380px;
  }
}

@media(max-width:640px) {
  .cast .castbox {
    max-width: 70%;
    height: 330px;
    margin-bottom: 20px;
  }
  .cast .castImg {
    height: 290px;
  }
}

.info3 {
  margin-top: 50px;
}

.info3 .myComments {
  /* border: 1px solid #333; */
  background-color: #f7f7f7;
  padding: 10px;
  height: 200px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 8px #888;
}

.info3 .myComments .media-left {
  text-align: center;
  padding: 10px;
}

.info3 .myComments .media-left img {
  margin: 0px auto;
}

.info3 h4 {
  font-size: 18px;
  color: green;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.info3 p {
  font-size: 16px;
  color: #333;
  padding-right: 1em;
  margin-top: 20px;
}

.info3 a {

  color: orangered;
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


/* 星星CSS */

.star-rating .star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 1.1em;
  color: #f7f7f7;
  transition: color .2s ease-out;
}

.star-rating .star-rating__star.is-selected {
  color: #FFD700;
}
</style>
