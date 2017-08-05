<template lang="pug">
	.mybox
		// 以下我的CSS loading
		.cssload-container(v-if="myloading")
			.cssload-zenith
			p 讀取中...
		// 以下AJAX成功顯示的畫面
		// v-if="successAJAX
		.moviePage(v-if="successAJAX")
			// 網頁上方區塊
			section
				.boxTop
					.col-md-12.movieTopImg(v-if="traVdo", v-bind:style="{backgroundImage:'url('+thisIdMovie.trailers[0].medium+')'}")
					.col-md-12.movieTopImg(v-if="traVdoNo", v-bind:style="{backgroundImage:'url('+thisIdMovie.photos[0].image+')'}")
				.container.myMovieBox
					.row
						.col-xs-12.col-sm-4.col-md-4.thismimg
							img(v-bind:src="thisIdMovie.images.large")
						.col-xs-12.col-sm-8.col-md-8.movieMsg
							.movieName
								h2 {{ thisIdMovie.title }}
								h3(v-if="otherTitle") {{ thisIdMovie.original_title }}
								h4(v-if="ratingYes")
									| 總評分：
									span {{thisIdMovie.rating.average}}
									| /{{thisIdMovie.rating.max}}
								h4(v-if="ratingNo") 總評分：暫無評分
								// 星星STAR
								.star-rating
									label.star-rating__star(v-for="rating in ratings", :key="rating.id", :class="{ 'is-selected' : ((testStar >= rating) && testStar != null), 'is-disabled': disabled}") ★
							ul
								li
									span.movieTag(v-for="tag in thisIdMovie.tags", :key="tag.id") {{tag}}
								li
									p
										| 導　　演：  
										span {{thisIdMovie.directors[0].name}}
								li
									p
										| 上映日期：  
										span(v-for="pubdate in thisIdMovie.pubdates", :key="pubdate.id") {{pubdate}}  
								li
									p
										| 片　　長：  
										span {{thisIdMovie.durations[0]}}
								li
									p
										| 语　　言：  
										span {{thisIdMovie.languages[0]}} 
								li
									p
										| 官方連結：  
										a(v-bind:href="thisIdMovie.alt") 點我去
			// 劇情介紹區塊
			section
				.container
					.row.info0
						.col-md-12
							h3 劇情介紹：
							hr
						.col-md-12
							p {{thisIdMovie.summary}}
			// 預告片區塊
			section
				.container
					.row.info1
						.col-md-12
							h3 預告片：
							hr
						.col-md-12(v-if="traVdoNo")
							h4.oops Oops!目前暫無預告片資料
						div(v-if="traVdo")
							.col-sm-12.col-md-6(v-for="trailer in thisIdMovie.trailers", :key="trailer.id")
								.trailers
									a(v-bind:href="trailer.alt")
										.trailersHover
											span.glyphicon.glyphicon-play(aria-hidden="", true="")
									img(v-bind:src="trailer.medium")
			// 主要演員區塊
			section
				.container
					.row.info2
						.col-md-12
							h3 主要演員：
							hr
						div(v-if="castYes")
							.col-xs-12.col-sm-3.col-md-3.cast(v-for="cast in thisIdMovie.casts", :key="cast.id")
								.castbox
									a(v-bind:href="cast.alt")
										.castImg(v-bind:style="{backgroundImage:'url('+cast.avatars.large+')'}")
									h5
										a(v-bind:href="cast.alt")
											| {{cast.name}}
											br
											span {{cast.name_en}}
						div(v-if="castNo")
							h4.oops Oops!目前暫無演員資料
			// 心得評論區塊
			section
				.container
					.row.info3
						.col-md-12
							h3 心得評論：
							hr
						.col-sm-12.col-md-6(v-for="reviews in thisIdMovie.popular_reviews", :key="reviews.id")
							.media.myComments
								.media-left
									a(v-bind:href="reviews.author.alt")
										img.media-object(v-bind:src="reviews.author.avatar")
								.media-body
									.star-rating
										label.star-rating__star(v-for="rating in ratings", :key="rating.id", :class="{ 'is-selected' : ((reviews.rating.value >= rating) && reviews.rating.value != null), 'is-disabled': disabled}") ★
									h4.media-heading {{reviews.title}}
									p
										| {{reviews.summary}}
										span
											a(v-bind:href="reviews.alt") 查看更多
		// 以下AJAX失敗顯示的畫面
		.row(v-if="errorAJAX")
			h2.errorAJAX 讀取失敗，請重新整理!
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
      ratingYes: true,//辦別分數是否可以顯示
      ratingNo: false,//辦別分數是否可以顯示
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

          if (self.thisIdMovie.casts == "" || self.thisIdMovie.casts[0].avatars == null) {//如果沒有演員
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
<style scoped lang="sass">
.dspnone
  display: none

*
  /* border: 1px solid #999;

.errorAJAX
  text-align: center
  margin-top: 100px

.mybox
  margin-top: 50px

a:hover
  text-decoration: none

.row
  h3
    font-size: 30px
    font-weight: 900
    color: #333
    margin-bottom: 0px
  hr
    margin-top: 4px
    border-top: 3px solid #f5f5f5
    color: orangered
    background-color: orangered
    border: 2px solid orangered

.moviePage
  width: 100%
  height: auto
  /* background-image: linear-gradient(135deg, #92FFC0 0%, #002661 100%);
  background-color: #fff6ed
  /* background-image: linear-gradient( 90deg, #ed5a00 10%, #e5a03d 100%);
  /* background-color: #fff;

.container.myMovieBox
  /* color: red;

.boxTop
  position: relative
  height: 350px
  overflow: hidden
  width: 100%

.movieTopImg
  height: 100%
  width: 100%
  position: absolute
  top: -30px
  left: 0px
  right: 0px
  background-size: cover
  background-repeat: no-repeat
  background-position: top center
  background-attachment: fixed
  transform: skewY(-2deg)
  -webkit-filter: blur(3px)
  -moz-filter: blur(3px)
  filter: blur(5px)

.thismimg
  margin: 20px 0px
  img
    max-width: 250px
    height: auto
    position: absolute
    left: 50px
    top: -200px
    box-shadow: 0px 0px 10px #000

.movieMsg
  padding: 10px
  font-size: 18px
  position: relative
  ul
    list-style-type: none
    padding: 0px
    span
      display: inline-block
  .movieTag
    margin-right: 10px
    padding-left: 10px
    padding-right: 10px
    margin-bottom: 10px
    border: 1px solid #333
    border-radius: 8px
  a
    color: #222
  .movieName
    position: absolute
    top: -200px
    h2
      font-weight: 900
      font-size: 40px
      margin-bottom: 0px
      color: #fff
      text-shadow: 0px 0px 1px #000
    h3
      font-size: 20px
      margin: 0px
      color: #fff
      text-shadow: 0px 0px 1px #000
    h4
      text-shadow: 0px 0px 1px #000
      color: #fff
    label
      text-shadow: 0px 0px 1px #000

@media (max-width: 992px)
  .thismimg
    margin: 0px 0px
    padding: 0px
    img
      max-width: 100%
      height: auto
      position: static
      padding-left: 30px
  .movieName
    text-align: center

@media (max-width: 767px)
  .boxTop
    display: none
  .thismimg
    text-align: center
  .movieMsg
    .movieName
      text-align: center
      position: static
      margin-bottom: 15px
    li
      text-align: center
  .thismimg img
    padding-left: 0px

.info1
  text-align: center
  h3
    text-align: left
  img
    max-width: 100%
    height: auto
  .trailers
    text-align: center
    position: relative
    margin-bottom: 20px
  .trailersHover
    transition: 0.3s
    position: absolute
    top: 0px
    bottom: 0px
    left: 0px
    right: 0px
    background-color: rgba(0, 0, 0, 0.6)
    span
      font-size: 70px
      color: #fff
      text-shadow: 0px 0px 15px #fff
      margin-top: 20%

@media (max-width: 992px)
  .trailers
    margin-bottom: 30px

.info0
  margin-top: 50px
  p
    font-size: 16px
    line-height: 1.8
    color: #333

@media (max-width: 768px)
  .info0 p
    padding: 0 20px

.info1, .info2
  margin-top: 50px

.cast
  .castbox
    max-width: 200px
    height: 300px
    margin: 0 auto
    text-align: center
    h5
      margin-top: 5px
      margin-bottom: 0px
      font-size: 18px
      font-weight: 900
    a
      color: #333
      &:visited
        color: #333
  .castImg
    width: 100%
    height: 240px
    background-repeat: no-repeat
    background-position: top center
    background-size: contain

@media (max-width: 992px)
  .cast
    .castbox
      height: 250px
    .castImg
      height: 200px

@media (max-width: 767px)
  .cast
    .castbox
      max-width: 70%
      height: 430px
      margin-bottom: 20px
    .castImg
      height: 380px

@media (max-width: 640px)
  .cast
    .castbox
      max-width: 70%
      height: 330px
      margin-bottom: 20px
    .castImg
      height: 290px

.info3
  margin-top: 50px
  .myComments
    /* border: 1px solid #333;
    background-color: #f7f7f7
    padding: 10px
    height: 200px
    margin-bottom: 20px
    box-shadow: 0px 0px 8px #888
    .media-left
      text-align: center
      padding: 10px
      img
        margin: 0px auto
  h4
    font-size: 18px
    color: green
    padding-bottom: 10px
    border-bottom: 1px solid #333
  p
    font-size: 16px
    color: #333
    padding-right: 1em
    margin-top: 20px
  a
    color: orangered

@media (max-width: 992px)
  .info3 .myComments
    height: auto

/* CSS loading

.cssload-container
  width: 100%
  height: 69px
  text-align: center
  margin-top: 150px
  margin-bottom: 400px
  p
    color: #333
    font-size: 30px
    margin-top: 20px

.cssload-zenith
  width: 69px
  height: 69px
  margin: 0 auto
  border-radius: 50%
  border-top-color: transparent
  border-left-color: transparent
  border-right-color: transparent
  box-shadow: 4px 4px 1px rgb(77, 235, 68)
  animation: cssload-spin 690ms infinite linear
  -o-animation: cssload-spin 690ms infinite linear
  -ms-animation: cssload-spin 690ms infinite linear
  -webkit-animation: cssload-spin 690ms infinite linear
  -moz-animation: cssload-spin 690ms infinite linear

@keyframes cssload-spin
  100%
    transform: rotate(360deg)
    transform: rotate(360deg)


@-o-keyframes cssload-spin
  100%
    -o-transform: rotate(360deg)
    transform: rotate(360deg)


@-ms-keyframes cssload-spin
  100%
    -ms-transform: rotate(360deg)
    transform: rotate(360deg)


@-webkit-keyframes cssload-spin
  100%
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)


@-moz-keyframes cssload-spin
  100%
    -moz-transform: rotate(360deg)
    transform: rotate(360deg)


/* 星星CSS

.star-rating .star-rating__star
  display: inline-block
  padding: 3px
  vertical-align: middle
  line-height: 1
  font-size: 1.1em
  color: #f7f7f7
  transition: color .2s ease-out
  &.is-selected
    color: #FFD700
</style>
