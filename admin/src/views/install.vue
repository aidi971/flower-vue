<template>
	<el-row style="margin-top: 5%;">
		<el-col :span="12">
			<el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="ruleForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="修改生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="修改密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>
<script>
	import Vue from 'vue';
	import axios from "axios";
	import {
	  mapMutations,mapState
	} from 'vuex';
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('年龄不能为空'));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if (value < 18) {
							callback(new Error('必须年满18岁'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name: '',
					pass: '',
					checkPass: '',
					phone: '',
					birth: '',
					photo: '',
					age: ''
				},
				fileList: [],
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					age: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			...mapMutations(['logout']),
			submitForm(ruleForm) {
				if(ruleForm.username==''){
				  alert('用户名不能为空');
				}
				else if(ruleForm.birthday == ''){
				  alert('生日不能为空');
				}else{
				  console.log(ruleForm);
				  const uid = this.userInfo.id
				  this.axios.post('/user/update/'+uid.toString(),ruleForm,{
				    username:this.userInfo.username,
				    password:this.userInfo.password,
				    birthday:this.userInfo.birthday,
				    phone:this.userInfo.phone,
					role_id:this.ruleForm.role_id
				  }).then(res => {
				    console.log(res.data)
				  }).catch(err => {
				    console.log(err)
				  })
				}
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		},
		created() {
		  // 课程信息
		  // this.lessonList = this.$route.query.lesson
		  console.log(this.userInfo)
		  this.ruleForm.name = this.userInfo.username;
		  // this.form.password = this.userInfo.password;
		  this.ruleForm.phone = this.userInfo.phone;
		  this.ruleForm.birth = this.userInfo.birthday;
		},
		computed:
		  mapState({
		    userInfo:state=>state.user,
		  }),
	}
</script>
