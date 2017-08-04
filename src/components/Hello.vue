<template>
  <div>
    <header class="jumbotron">
      <div class="container">
        <h1>哈囉電影網
          <br>您的電影好夥伴</h1>
      </div>
    </header>
    <section id="sectionAsk">
      <div class="container">
        <div class="row">
          <div class="col-sm-5 img"></div>
          <div class="col-sm-7">
            <h2>想找電影資訊與觀眾評論嗎?</h2>
          </div>
        </div>
      </div>
    </section>
    <section id="sectionAbout">
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
    <section id="sectionHow">
      <div class="container">
        <div class="row">
          <div class="col-sm-5 img"></div>
          <div class="col-sm-7">
            <h2>哈囉電影網的的特色是?</h2>
          </div>
        </div>
      </div>
    </section>
    <section id="sectionThree">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="col-sm-12">
              <h2>三大優勢</h2>
              <hr>
            </div>
            <div class="col-sm-12 features">
              <div class="col-sm-4">
                <span class="glyphicon glyphicon-eye-open myicon" aria-hidden="true"></span>
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
   /* border: 1px solid #999  */
}

header.jumbotron {
  /* text-align: center; */
  background-image: url(http://i.imgur.com/9tMnrdr.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-repeat:no-repeat;
  margin-bottom: 0px;
}

header.jumbotron .container {
  color: #fff;
  padding: 200px 0px;
  text-shadow: 0px 0px 10px #000;
}
section{
  color: #333;
}
section#sectionAsk {
  background-color: #d28f1b;
  color: #fff;
}

section#sectionAsk .col-sm-5.img {
  background-image: url(http://img3.doubanio.com/view/photo/photo/public/p2209079394.jpg);
  background-position: top center;
  height: 350px;
  /* mix-blend-mode: multiply; */
  background-size: cover;
}

section#sectionAsk h2 {
  margin-top: 130px;
  padding: 0px 20px;
}
@media (max-width: 768px){
  section#sectionAsk h2 {
    margin: 80px 0px;
  }
}
section#sectionAbout {
  padding: 40px 0px;
}
section#sectionAbout img {
  width: 100%;
}
section#sectionAbout p{
  font-size: 16px;
}
section#sectionAbout .img_wrap {
  height: 200px;
  overflow: hidden;
}
@media (max-width: 767px){
  section#sectionAbout .img_wrap {
    height: 250px;
  }
}
@media (max-width: 668px){
  section#sectionAbout .img_wrap {
    height: 300px;
  }
}
@media (max-width: 413px){
  section#sectionAbout .img_wrap {
    height: 220px;
  }
}
section#sectionHow {
  background-color: #dd6216;
  color: #fff;
}

section#sectionHow .col-sm-5.img {
  background-image: url(http://img3.doubanio.com/view/photo/photo/public/p938463241.jpg);
  background-position: top center;
  height: 350px;
  /* mix-blend-mode: multiply; */
  background-size: cover;
}

section#sectionHow h2 {
  margin-top: 130px;
  padding: 0px 20px;
}
@media (max-width: 768px){
  section#sectionHow h2 {
    margin: 80px 0px;
  }
}
section#sectionThree {
  text-align: center;
  padding: 40px 0px;
}
section#sectionThree h2 {
  text-align: left;
}

section#sectionThree p{
  font-size: 16px;
}

section#sectionThree .features span{
  font-size: 40px;
  margin: 30px 0px;
}
section#sectionThree .features h4 {
  margin-bottom: 30px;
}

</style>
