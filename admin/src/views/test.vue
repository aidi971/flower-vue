<template>
	<div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-submenu index="2">
				<template slot="title">{{user}}</template>
				<el-menu-item index="2-1">设置</el-menu-item>
				<el-menu-item index="2-2">退出登录</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				user:'管理员A'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
