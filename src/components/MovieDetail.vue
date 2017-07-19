<template>
	<div class="movieDetail">
		<div class="waiting" v-if="loading">
			loading
		</div>
		<div class="details" v-if="post">
			<header class="item_box">
	            <div class="item_img fl">
	              <img v-bind:src="post.images.large" v-bind:alt="post.title">
	            </div>
	            <div class="item_info fl">
	              <h4>{{post.title}}<i class="score_num">{{post.rating.average}}</i></h4>
	              <p><span>类型：</span><span v-for="genre in post.genres">{{genre}}、</span></p>
	              <p><span>{{post.year}}年上映</span></p>
	              <p><span>别名：</span><span v-for="name in post.aka">{{name}}、</span></p>
	            </div>
          	</header>
			<div class="item_detail">
				<div class="item_cast">
					<p>演职表</p>
					<div class="item_cast_box">
						<ul class="item_cast_ul">
							<li v-for="director in post.directors" class="fl">
								<router-link :to="`/celebrity/${director.id}`" class="item_box">
									<img v-bind:src="director.avatars.large" alt="director.name">
									<p>{{director.name}}</p>
									<p class="small_p">导演</p>
								</router-link>
							</li>
							<li v-for="cast in post.casts" :key="cast.id" class="fl">
								<router-link :to="`/celebrity/${cast.id}`" class="item_box">
									<img v-bind:src="cast.avatars.large" alt="cast.name">
									<p>{{cast.name}}</p>
									<p class="small_p">演员</p>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div >
			<footer>
				<p>电影详情</p>
				<div class="footer_detail">
					<p>{{post.summary}}</p>
				</div>
			</footer>
		</div>
		<div class="error" v-if="error">
			{{error.msg}}
		</div>		
	</div>
</template>

<script>
export default{
	name: 'MovieDetail',
	data (){
		return {
			post:null,
			error:null,
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
			this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+this.$route.params.id).then((response)=>{
				this.post = response.data;
				console.log(this.post);
			},(response)=>{
				this.error = {"msg":"h回调失败"}
			})
		}
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
  margin-top: 70px;
}
.container.mybox .row {
  text-align: center;
  padding: 0px;
}
.container.mybox .row h2 {
  color: #fff;
  font-weight: 900;
  margin-bottom: 30px;
}
.container.mybox .row .myMovieCard {
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 30px;
  color: #333;
  font-weight: 900;
  font-size: 16px;
  border-bottom: 5px solid #30a300;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.container.mybox .row .myMovieCard:hover img {
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
  transition: 0.3s;
}
.container.mybox .row .myMovieCard p {
  margin-bottom: 0;
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
}
</style>
