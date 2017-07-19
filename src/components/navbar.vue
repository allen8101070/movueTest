<template>
	<nav class="navbar navbar-default navbar-fixed-top mynav navbar-top" role="navigation">
		<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
				<span class="sr-only">選單切換</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.html">還沒想到LOGO</a>
		</div>
		<!-- 手機隱藏選單區 -->
		<div class="collapse navbar-collapse navbar-ex1-collapse">
			<!-- 右 -->
			<ul class="nav navbar-nav navbar-right">
                <li>
                    <router-link :to="{ path: '/nowplaying' }">正在熱映</router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/usamovie' }">北美排行</router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/coming' }">即將上映</router-link>
                </li>
			</ul>
		</div>
		<!-- 手機隱藏選單區結束 -->
		</div>
	</nav>
</template>

<style scoped>
nav.navbar.navbar-default.navbar-fixed-top.mynav{
  font-size: 18px;
  transition: 0.5s;
  font-weight: 900;
  background-color: #000;
  border:none;
}
nav.navbar-default .navbar-nav>li>a, nav.navbar-default .navbar-brand{
  color: #fff;
}
nav.navbar.navbar-default.navbar-fixed-top a:hover{
	color: red;
}
nav.navbar.navbar-default.navbar-fixed-top.navbar-top {
  background-color: transparent;
  border-bottom: 1px solid #fff;
}
nav.navbar.navbar-default.navbar-fixed-top.navbar-top a {
  color: #fff;
  font-size: 18px;
  transition: 0.5s;
}
nav.navbar.navbar-default.navbar-fixed-top.navbar-top a:hover {
  color: #014ea0;
}
</style>


