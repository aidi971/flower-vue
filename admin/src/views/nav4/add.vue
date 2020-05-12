<template>
	<el-row style="margin-top: 5%;">
		<el-col :span="12">
			<el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="课程名称" prop="title">
					<el-input v-model="ruleForm.title"></el-input>
				</el-form-item>
				<el-form-item label="教师名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="教师手机" prop="phone">
					<el-input type="phone" v-model="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="活动地址" prop="address">
					<el-input v-model="ruleForm.address"></el-input>
				</el-form-item>
				<!-- <el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="修改头像" prop="photo">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
					 :on-remove="handleRemove" 　　　list-type="picture" multiple :limit="1" :file-list="fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="mini" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2M</div>
					</el-upload>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					phone:'',
					title:'',
					address:'',
				},
				fileList: [],
				rules: {
					name: [{
						required: true,
						message: '请输入教师名称',
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: '请输入课程名称',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入正确手机号码',
						trigger: 'blur',
						// type: 'number'
					}],
				}
			};
		},
		methods: {
			submitForm(valid) {
					if (valid) {
						this.$confirm('确认提交吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '课程添加成功!'
							});
							
						});
					} else {
						console.log('error submit!!');
						return false;
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
		}
	}
</script>
