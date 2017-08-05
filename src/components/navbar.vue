<template lang="pug">
	nav.navbar.navbar-default.navbar-fixed-top.mynav.navbar-top(role="navigation")
		.container
			.navbar-header
				button.navbar-toggle(type="button", data-toggle="collapse", data-target=".navbar-ex1-collapse")
					span.sr-only
					span.icon-bar
					span.icon-bar
					span.icon-bar
				a.navbar-brand(href="index.html") 哈囉電影網
			// 手機隱藏選單區
			.collapse.navbar-collapse.navbar-ex1-collapse
				// 右
				ul.nav.navbar-nav.navbar-right
					li
						router-link(:to="{ path: '/nowplaying' }") 正在熱映
					li
						router-link(:to="{ path: '/usamovie' }") 北美排行
					li
						router-link(:to="{ path: '/cnmovie' }") 中國排行
					li
						router-link(:to="{ path: '/coming' }") 即將上映
					li
						router-link(:to="{ path: '/about' }") 關於我們
			// 手機隱藏選單區結束
</template>

<style scoped lang="sass">
.navbar.navbar-default.navbar-fixed-top.mynav
  font-size: 18px
  transition: 0.5s
  font-weight: 900
  background-color: #000
  border: none

.navbar-default .navbar-nav > li > a, nav.navbar-default .navbar-brand
  color: #fff
  text-shadow: 0px 0px 2px #333

.navbar.navbar-default.navbar-fixed-top
  a:hover
    color: red
  &.navbar-top
    /* background-image: linear-gradient( 135deg, #e5d55e 0%, #f24d02 100%);
    /* border-bottom: 1px solid #fff;
    background-color: #d64502
    margin-bottom: 0px
    a
      color: #fff
      font-size: 18px
      transition: 0.5s
      &:hover
        color: #014ea0

.navbar-default .navbar-toggle
  border-color: #fff
  .icon-bar, &:focus, &:hover
    background-color: #fff
  &:focus .icon-bar, &:hover .icon-bar
    background-color: green
</style>


