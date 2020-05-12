<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;width: 100%;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="queryKeyCode" placeholder="植物名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="btnKeyCode = queryKeyCode">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="handleAdd">新增植物</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<!-- <el-table-column fixed type="index" width="100">
			</el-table-column> -->
			<el-table-column prop="id" width="100" label="植物ID" sortable>
			</el-table-column>
			<el-table-column prop="name" label="植物名称">
			</el-table-column>
			<el-table-column prop="descpiprion" label="植物描述">
			</el-table-column>
			<!-- <el-table-column prop="typeFlo" label="植物类型">
			</el-table-column>
			<el-table-column prop="smell" label="气味">
			</el-table-column>
			<el-table-column prop="level" label="养护难度">
			</el-table-column>
			<el-table-column prop="humidity" label="湿度(%)">
			</el-table-column> -->
			
			
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :visible.sync="editFormVisible" title="编辑" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<!-- <el-form-item label="植物类型" prop="typeFlo">
					<el-select v-model="editForm.typeFlo" placeholder="请选择植物类型">
						<el-option label="奇花异草" value="1"></el-option>
						<el-option label="南非植物" value="2"></el-option>
						<el-option label="百合" value="3"></el-option>
						<el-option label="玫瑰" value="4"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="植物名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" maxlength="10" show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="植物介绍" prop="descpiprion">
					<el-input v-model="editForm.descpiprion" auto-complete="off" maxlength="35" show-word-limit></el-input>
				</el-form-item>
				<!-- <el-form-item label="气味" prop="smell">
					<el-select v-model="editForm.smell" placeholder="请选择气味">
						<el-option label="无味" value="1"></el-option>
						<el-option label="微醺" value="2"></el-option>
						<el-option label="淡香" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="养护难度" prop="level">
					<el-select v-model="editForm.level" placeholder="请选择养护难度">
						<el-option label="易" value="1"></el-option>
						<el-option label="适中" value="2"></el-option>
						<el-option label="难" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="湿度(%)" prop="humidity">
					<el-input v-model="editForm.humidity" auto-complete="off"></el-input>
				</el-form-item>-->
				<el-form-item label="图片" prop="photo">
					<!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
					 :on-remove="handleRemove" list-type="picture" multiple :limit="1" :file-list="fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="mini" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2M</div>
					</el-upload> -->
					<!-- <el-main> -->
						<mavon-editor v-model="editForm.contentMd" @save="saveArticle" @imgAdd="imgAdd" :toolbars="toolbars" ref="md" ></mavon-editor>
					<!-- </el-main> -->
				</el-form-item> 
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<!-- <el-form-item label="植物类型" prop="typeFlo">
					<el-select v-model="addForm.typeFlo" placeholder="请选择植物类型">
						<el-option label="奇花异草" value="1"></el-option>
						<el-option label="南非植物" value="2"></el-option>
						<el-option label="百合" value="3"></el-option>
						<el-option label="玫瑰" value="4"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="植物名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off" maxlength="10" show-word-limit></el-input>
				</el-form-item>
				<!-- <el-form-item label="气味" prop="smell">
					<el-select v-model="addForm.smell" placeholder="请选择气味">
						<el-option label="无味" value="1"></el-option>
						<el-option label="微醺" value="2"></el-option>
						<el-option label="淡香" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="养护难度" prop="level">
					<el-select v-model="addForm.level" placeholder="请选择养护难度">
						<el-option label="易" value="1"></el-option>
						<el-option label="适中" value="2"></el-option>
						<el-option label="难" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="湿度(%)" prop="humidity">
					<el-input v-model="addForm.humidity" auto-complete="off"></el-input>
				</el-form-item> -->
				<!-- <el-form-item label="图片" prop="photo">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
					 :on-remove="handleRemove" list-type="picture" multiple :limit="1" :file-list="fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="mini" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2M</div>
					</el-upload>
				</el-form-item> -->
				<el-form-item label="植物介绍" prop="descpiprion">
					<el-input v-model="addForm.descpiprion" auto-complete="off" maxlength="35" show-word-limit></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>

	export default {
		data() {
			return {
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
				        ol: false, // 有序列表
				        ul: false, // 无序列表
				        link: false, // 链接
				        imagelink: true, // 图片链接
				        code: false, // code
				        table: false, // 表格
				        fullscreen: false, // 全屏编辑
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
				        alignleft: false, // 左对齐
				        aligncenter: false, // 居中
				        alignright: false, // 右对齐
				        /* 2.2.1 */
				        subfield: true, // 单双栏模式
				        preview: false, // 预览
				      },
				test:'',
				queryKeyCode: '',
				btnKeyCode: '',
				fileList: [],
				plantList: [],
				trueimgList: [],
				total: 0,
				page: 1,
				imgList:[],
				photoList:[],
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					nameFlo: [{
						required: true,
						message: '请输入植物名称',
						trigger: 'blur'
					}],
					typeFlo: [{
						required: true,
						message: '请选择植物类型',
						trigger: 'change'
					}],
					smell: [{
						required: true,
						message: '请选择气味',
						trigger: 'change'
					}],
					level: [{
						required: true,
						message: '请选择养护难度',
						trigger: 'change'
					}],
					humidity: [{
						required: true,
						message: '请输入湿度（%）',
						trigger: 'blur'
					}],
					introduce: [{
						required: true,
						message: '请选择权限',
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				editForm: {
					id:'',
					descpiprion:'',
					name: '',
					contentMd:'',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
						required: true,
						message: '请输入植物名称',
						trigger: 'blur'
					}],
					// typeFlo: [{
					// 	required: true,
					// 	message: '请选择植物类型',
					// 	trigger: 'change'
					// }],
					// smell: [{
					// 	required: true,
					// 	message: '请选择气味',
					// 	trigger: 'change'
					// }],
					// level: [{
					// 	required: true,
					// 	message: '请选择养护难度',
					// 	trigger: 'change'
					// }],
					// humidity: [{
					// 	required: true,
					// 	message: '请输入湿度（%）',
					// 	trigger: 'blur'
					// }],
					descpiprion: [{
						required: true,
						message: '请输入植物介绍',
						trigger: 'blur'
					}]
				},
				//新增界面数据
				addForm: {
					id:'',
					descpiprion:'',
					name: '',
					contentMd:'',
					// typeFlo: '',
					// imgFlo: '',
					// smell: '',
					// level: '',
					// photo: '',
					// humidity: '',
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getPlant();
			},
			//获取用户列表
			getPlant() {
				this.listLoading = true;
				this.axios.get("/findall/plant/").then(response => {
					this.listLoading = false;
					// console.log(response.data)
					const _data = response.data;
					this.plantList = _data;
					// for(let i=0;i<this.plantList.length;i++){
					// 	// console.log(this.plantList[i].contentMd)
					// 	this.imgList = this.plantList[i].contentMd
					// 	// console.log(this.imgList)
					// 	const result = this.imgList.match(/\(([^)]*)\)/);
					// 	if (result) {
					// 		this.photoList = result[1]
					// 		console.log(this.photoList)
					// 	}
					// }
					
				}).catch(err => {
					console.log(err)
				});
			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除该用户吗?', '提示', {
						type: 'warning'
					}).then(() => {
						this.listLoading = true;
						console.log(row.id)
						const plantId = row.id
						this.axios.get("/delete/plant/"+plantId.toString()).then(response => {
							this.listLoading = false;
							console.log("删除")
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getPlant();
						}).catch(err => {
							console.log(err)
						});
				}
				)
			},
			//显示编辑界面
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//编辑
			editSubmit: function() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认修改植物信息吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							// console.log(this.editForm)
							const plantId = this.editForm.id
							const url ='/update/plant/'+plantId.toString()
							this.axios.post(url,this.editForm).then(response => {
								console.log(response)
								// console.log(this.editForm.username)
								
								this.$message({
									type: 'success',
									message: '修改成功!'
								});
								this.getPlant();
								this.editFormVisible = false;
							}).catch(err => {
								console.log(err)
							});
						
						});
					}
				});
			},
			imgAdd(pos, file) {
				var formData = new FormData();
				var _this = this
				formData.append('image', file);
				this.axios({
					url: '/pic',
					method: 'post',
					data: formData,
					// headers: {
					// 	'Content-Type': 'multipart/form-data'
					// },
				}).then(response => {
					if (response.data.status === 200) {
						let url = response.data.object
						_this.$refs.md.$img2Url(pos, url);
						this.imgUrl = url;
						console.log(response.data)
					}
			
				}).catch(err => {
					console.log(err)
				});
			},
			saveArticle(value, render) {
				// console.log("ok")
				var url = '/add/plant/'
				var _this = this
				this.plantList.contentMd = value
				this.plantList.editorHtml = render
				// console.log(this.plantList)
				this.axios.post(url, this.plantList).then(response => {
					// console.log(response.config.data.editorContent)
					// content_md:this.article.editorContent;
					console.log(this.plantList)
					content_md: this.plantList.contentMd
				}).catch(err => {
					console.log(err)
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
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					id:'',
					descpiprion:'',
					name: '',
					contentMd:'',
				};
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			addSubmit: function() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认创建植物吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							console.log(this.addForm.name)
							this.axios.post("/add/plant/", {
								name: this.addForm.name,
								descpiprion: this.addForm.descpiprion,
								contentMd: this.addForm.contentMd,
							}).then(response => {
								if (response.data.status == 200) {
									this.$message({
										type: 'success',
										message: '创建成功!'
									});
									this.addFormVisible = false;
									this.getPlant();
								}
								else{
									this.$message({
										type: 'error',
										message: '植物已存在!'
									});
								}
							}).catch(err => {
								console.log(err)
							});
						});
					}
				});
			},
			//批量删除
			batchRemove: function() {
				var ids = this.sels.map(item => item.id).toString();
				// console.log(ids)
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: ids
					};
					// console.log(para)
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
		},
		mounted() {
			this.getPlant();
		},
		watch: {
			queryKeyCode(val) {
				this.queryKeyCode = val
			}
		},
		computed: {
			// 模糊搜索右侧子表名称筛选
			table() {
				const search = this.btnKeyCode.trim()
				if (search) {
					return this.plantList.filter(data => {
						return data.name.indexOf(search) > -1
					})
				}
				return this.plantList // plantList 就是之前el-table 的 data数据
			}
		},
	}
</script>

<style scoped>

</style>
