<template>
  <div>
    <header class="jumbotron">
      <div class="container">
        <h1>哈囉電影網
          <br>您的電影好夥伴</h1>
      </div>
    </header>
    <section id="section_ask">
      <div class="container">
        <div class="row">
          <div class="col-sm-5 img"></div>
          <div class="col-sm-7">
            <h2>想找電影資訊與觀眾評論嗎?</h2>
          </div>
        </div>
      </div>
    </section>
    <section id="section_about">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h2>揚起電影網站的新旗幟</h2>
            <hr/>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="img_wrap">
              <img src="http://www.fullyu.com/ueditor/php/upload/image/20170320/1489978123866966.jpg" alt="" />
            </div>
            <h3>背景</h3>
            <p>現今電影網站多受到片商與影城業者把持，我們希望能開啟一個電影的新氣象，為這領域注入新的活水與競爭。</p>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="img_wrap">
              <img src="https://image.pbs.org/poster_images/assets/zybuwcw4sr2wuluxk4tr.png.resize.710x399.png" alt="" />
            </div>
            <h3>怎麼做?</h3>
            <p>透過串接第三方電影資訊API，我們打造了一個簡易的電影網站，讓熱愛觀影的你能有更多的選擇，想找電影資訊或看別人的評論嗎?來這就對了。
            </p>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="img_wrap">
              <img src="https://cdn-images-1.medium.com/max/570/1*9P1fiY1DjqsfwuHT8v4gKQ.jpeg" alt="" />
            </div>
            <h3>四種資訊</h3>
            <p>資訊貴精不貴多，我們替您準備了四種選項「正在熱映」、「北美排行」、「中國排行」與「即將上映」，希望能幫助你找到想要的資訊。
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="section_europe">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="col-sm-12">
              <h2>三大優勢</h2>
              <hr>
            </div>
            <div class="col-sm-12 features">
              <div class="col-sm-4">
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                <h4>第三方電影網站</h4>
              </div>
              <div class="col-sm-4">
                <span class="glyphicon glyphicon-sunglasses" aria-hidden="true"></span>
                <h4>公開的資料來源</h4>
              </div>
              <div class="col-sm-4">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <h4>無工讀生帶風向</h4>
              </div>
            </div>
            <div class="col-sm-12">
              <p>第三方電影網站雖無片商的支持與援助。但我們的優勢有三：
                <br>1.保證與片商、電影院無關，不會圖利特定電影。
                <br>2.串接豆瓣API，遵守使用規範，資訊來源絕對合法。
                <br>3.保證自由客觀的影評討論。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  border: 1px solid #999
}

header.jumbotron {
  text-align: center;
  background-image: url(http://tw.blog.voicetube.com/wp-content/uploads/2014/11/watch-movie.jpg);
  background-size: cover;
  background-attachment: fixed;
  margin-bottom: 0px;
}

header.jumbotron .container {
  color: #fff;
  padding: 200px 0px;
}

section#section_ask {
  background-color: #d28f1b;
}

section#section_ask .col-sm-5.img {
  background-image: url(http://4.bp.blogspot.com/-v1NUJt0dWuc/VPC5VE4xTkI/AAAAAAAAApk/bAvA6r4KftQ/s1600/Chamka%2BNweyakani%2BCinema%2B6.jpg);
  background-position: top center;
  height: 350px;
  mix-blend-mode: multiply;
}

section#section_ask h2 {
  margin-top: 130px;
  padding: 0px 20px;
}

section#section_about img {
  width: 100%;
}

section#section_about .img_wrap {
  height: 200px;
  overflow: hidden;
}
</style>
