<template>
	<div>
		<el-form :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
			<h3 class="title">系统登录</h3>
			<el-form-item prop="username">
				<el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
			</el-form-item>
			<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;" @click="onSubmit">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import Vue from 'vue';
	export default {
		name: "Login",
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				rules2: {
					username: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						//{ validator: validaePass }
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						//{ validator: validaePass2 }
					]
				},
				checked: true
			}
		},
		methods: {
			...mapMutations(['login', 'getUser']),
			onSubmit() {
				var _this = this;
				// console.log(this.form)
				this.axios.post("/admin/login", {
					username: this.form.username,
					password: this.form.password,
				}).then(respnose => {
					console.log(respnose.data.status)
					if (respnose.data.status === 200) {
						console.log(respnose.data)
						_this.$store.commit('login', respnose.data.object)
						_this.$store.commit('getUser', respnose.data.object)
						this.$router.push('/user')
					} else {
						alert("账号或密码错误")
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;

		.title {
			margin: 0px auto 40px auto;
			text-align: center;
			color: #505458;
		}

		.remember {
			margin: 0px 0px 35px 0px;
		}
	}
</style>
