<template>
	<div>
		<el-row style="margin-top: 30px;">
			<el-col :span="24">
				<el-form ref="form" label-width="80px" :model="form">
					<el-form-item label="文章名称">
						<el-input type="text" maxlength="15" show-word-limit v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="文章简介">
						<el-input :rows="2" resize="none" type="textarea" maxlength="35" show-word-limit v-model="form.abs"></el-input>
					</el-form-item>
					<el-main>
						<mavon-editor  v-model="form.contentMd" ref="md" @save="saveArticle" @imgAdd="imgAdd"></mavon-editor>
					</el-main>
					<!-- <el-form-item label="详细步骤">
						<div class="step_container">
							<template v-for="(stepNum, index) in stepNums">
								<div class="step_row_data" :key="index">
									<div class="step_column_data">
									</div>
									<div class="step_column_data">
										<div class="step_num">
											{{stepNum.step_num}}
										</div>
										<div style="margin-bottom: 20px;">
											<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
											 :on-remove="handleRemove" list-type="picture" multiple :limit="1" :file-list="fileList" :beforeUpload="beforeAvatarUpload">
												<el-button size="mini" type="primary">上传图片</el-button>
											</el-upload>
										</div>
										<div class="step_time">
											<el-input placeholder="请输入步骤内容" :rows="4" resize="none" type="textarea" maxlength="120" show-word-limit
											 v-model="stepNum.step_time"></el-input>
										</div>
									</div>
								</div>
							</template>
							<div class="addStep">
								<i @click="addStep" class="el-icon-plus"></i>
							</div>
							<div class="decreaseStep">
								<i @click="decreaseStep" class="el-icon-minus"></i>
							</div>
						</div>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="onSubmit('form')">修改</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		toolbars: {
		        bold: false, // 粗体
		        italic: false, // 斜体
		        header: false, // 标题
		        underline: false, // 下划线
		        strikethrough: false, // 中划线
		        mark: false, // 标记
		        superscript: false, // 上角标
		        subscript: false, // 下角标
		        quote: false, // 引用
		        ol: true, // 有序列表
		        ul: false, // 无序列表
		        link: false, // 链接
		        imagelink: true, // 图片链接
		        code: false, // code
		        table: false, // 表格
		        fullscreen: true, // 全屏编辑
		        readmodel: false, // 沉浸式阅读
		        htmlcode: false, // 展示html源码
		        help: false, // 帮助
		        /* 1.3.5 */
		        undo: false, // 上一步
		        redo: false, // 下一步
		        trash: true, // 清空
		        save: true, // 保存（触发events中的save事件）
		        /* 1.4.2 */
		        navigation: false, // 导航目录
		        /* 2.1.8 */
		        alignleft: true, // 左对齐
		        aligncenter: true, // 居中
		        alignright: true, // 右对齐
		        /* 2.2.1 */
		        subfield: true, // 单双栏模式
		        preview: true, // 预览
		      },
		data() {
			return {
				fileList: [],
				form: {
					id: '',
					name: '',
					abs: '',
					contentMd: '',
					editorHtml:''
				},
				imgUrl:'',
				stepNums: [{
					step_title: '报名',
					step_num: 1,
					inputVisible: false,
					timeInputVisible: false,
					step_explain: false,
					step_time: '',
					inputValue: '',
					tags: []
				}, ]
			}
		},
		methods: {
			imgAdd(pos, file) {
				var formData = new FormData();
				var _this = this
				formData.append('image', file);
				this.axios({
					url: '/pic',
					method: 'post',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
				}).then(response => {
					if (response.data.status === 200) {
						let url = response.data.object
						console.log(response.data.object)
						_this.$refs.md.$img2Url(pos, url);
						this.imgUrl = url;
					}

				}).catch(err => {
					console.log(err)
				});
			},
			saveArticle(value, render) {
				console.log(this.imgUrl)
				var url = 'article/add'
				var _this = this
				this.form.contentMd = value
				this.form.editorHtml = render
				this.axios.post(url, this.form).then(response => {
					// console.log(response.config.data.editorContent)
					// content_md:this.article.editorContent;
					console.log(this.form)
					content_md: this.form.contentMd
				}).catch(err => {
					console.log(err)
				});
			},
			addStep() {
				const stepNum = this.stepNums.length + 1
				this.stepNums.push({
					step_num: stepNum,
					step_title: '添加标题',
					inputVisible: false,
					timeInputVisible: false,
					step_explain: false,
					step_time: '',
					inputValue: '',
					tags: []
				})
			},
			explainEnter(keyCode, index) {
				if (keyCode === 13) {
					this.stepNums[index].step_explain = false
				}
			},
			timeEnter(keyCode, index) {
				if (keyCode === 13) {
					this.stepNums[index].timeInputVisible = false
				}
			},
			contextMenu() {
				console.log(111)
			},
			decreaseStep() {
				this.stepNums.splice(this.stepNums.length - 1, 1)
			},
			handleClose(tag, index, index1) {
				this.stepNums[index].tags.splice(index1, 1)
			},
			showTimeInput(index) {
				this.stepNums[index].timeInputVisible = true
				this.$nextTick(_ => {
					this.$refs['time_input'][0].focus()
				})
			},
			titleInputShow(index) {
				this.stepNums[index].step_explain = true
				this.$nextTick(_ => {
					this.$refs['step_explain'][0].focus()
				})
			},
			showInput(index) {
				this.stepNums[index].inputVisible = true
				this.$nextTick(_ => {
					this.$refs.saveTagInput[0].$refs.input.focus()
				})
			},
			handleInputConfirm(index) {
				let inputValue = this.stepNums[index].inputValue
				if (inputValue) {
					this.stepNums[index].tags.push({
						tagName: inputValue,
						url: ''
					})
				}
				this.stepNums[index].inputVisible = false
				this.stepNums[index].inputValue = ''
			},
			onSubmit() {
				this.$confirm('确认修改该文章吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(this.form.id)
					// const articleId = this.form.id
					const url = '/article/update/' + this.form.id.toString()
					this.axios.post(url, this.form).then(response => {
						console.log("修改")
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						this.getData();
						this.$router.push('/table');
					}).catch(err => {
						console.log(err)
					});
				});
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
			},
			getData() {
				this.row = this.$route.query.row; //接收参数
				const _data = this.row
				console.log(_data)
				this.form.name = _data.name
				this.form.abs = _data.abs
				this.form.id = _data.id
				this.form.contentMd = _data.contentMd
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.el-input,
	.el-textarea {
		width: 70%;
	}

	.step {
		margin: 20px;
		height: 200px;
	}

	.step_container {
		width: 100%;
		margin: 10% auto;

		.step_row_data {
			min-height: 150px;
			width: 100%;
			overflow: hidden;

			.step_column_data {
				float: left;
			}

			.step_column_data:nth-child(1) {
				margin-right: 20px;
				padding-top: 18px;
				width: 150px;
				text-align: right;

				span:hover {
					cursor: pointer;
					color: cornflowerblue;
				}

				.step_explain {
					width: 150px;
					outline: none;
					border: none;
					border-bottom: 1px solid cornflowerblue;
				}
			}

			.step_column_data:nth-child(2) {
				margin-left: 10px;
				padding-left: 20px;
				padding-top: 15px;
				width: 500px;
				padding-bottom: 30px;
				position: relative;
				min-height: 150px;
				border-left: 2px solid #409EFF;

				.step_num {
					width: 20px;
					height: 20px;
					box-sizing: border-box;
					border-radius: 10px;
					text-align: center;
					line-height: 20px;
					background: #FFFFFF;
					border: 1px solid lightgray;
					position: absolute;
					top: 20px;
					left: -11px;
				}

				.step_time {
					// position: absolute;
					// bottom: 50%;
					color: lightgrey;
					// background-color: #13CE66;
					width: 80%;

					span {
						margin-bottom: 0px;
					}

					span:hover {
						cursor: pointer;
						color: cornflowerblue;
					}

					.time_input {
						outline: none;
						border: none;
						border-bottom: 1px solid cornflowerblue;
					}
				}

				/*.step_time:hover{*/
				/*cursor: pointer;*/
				/*color: cornflowerblue;*/
				/*}*/
				span {
					float: left;
					margin-right: 20px;
					margin-bottom: 15px;
				}

				button {
					float: left;
					margin-bottom: 15px;
				}

				.input-new-tag {
					float: left;
					margin-bottom: 15px;
				}
			}
		}

		.input-new-tag {
			max-width: 150px;
		}

		.addStep,
		.decreaseStep {
			width: 196px;
			text-align: right;
			margin-top: 10px;

			i {
				font-size: 30px;
				color: #409EFF;
				cursor: pointer;
			}
		}

	}
</style>
