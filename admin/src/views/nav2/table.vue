<template>
	<div>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;width: 100%;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="queryKeyCode" placeholder="文章标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="btnKeyCode = queryKeyCode">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="handleAdd">新建文章</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column>
			</el-table-column>
			<el-table-column fixed type="index">
			</el-table-column>
			<el-table-column prop="id" label="文章ID" sortable>
			</el-table-column>
			<el-table-column prop="name" label="文章标题">
			</el-table-column>
			<el-table-column prop="abs" label="文章简介">
			</el-table-column>
			<el-table-column pror="contentMd" label="文章内容">
			</el-table-column>
			<!-- <el-table-column pror="contenttime" label="创建时间">
			</el-table-column> -->
			<!-- <el-table-column label="创建人">
			</el-table-column> -->
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="goModify(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="文章标题" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="文章简介" prop="abs">
					<el-input v-model="addForm.abs"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryKeyCode: '',
				btnKeyCode: '',
				articleList: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
				//新增界面数据
				addForm: {
					id:'',
					name: '',
					abs: '',
					contentMd:''
				},
				addFormVisible: false, //新建界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
						required: true,
						message: '请输入文章标题',
						trigger: 'blur'
					}],
					abs: [{
						required: true,
						message: '请输入文章简介',
						trigger: 'blur',
						// type: 'number'
					}],
				},
				// //编辑界面数据
				// editForm: {
				// 	id: 0,
				// 	name: '',
				// 	birth: '',
				// 	password: '',
				// 	permissions: -1
				// },
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getArticle();
			},
			//获取文章列表
			getArticle() {
				this.listLoading = true;
				this.axios.get("/article").then(response => {
					this.listLoading = false;
					console.log(response.data)
					const _data = response.data;
					this.articleList = _data;
					// console.log(this.articleList)
				}).catch(err => {
					console.log(err)
				});

			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					// console.log(row.id)
					const articleId = row.id
					this.axios.get("/article/delete/"+articleId.toString()).then(response => {
						this.listLoading = false;
						console.log("删除")
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getArticle();
					}).catch(err => {
						console.log(err)
					});
			}
			)},
			goModify(index,row){
				// console.log(row)
				this.$router.push({path:'/modify',query:{row:row}});//传递参数
				// this.$router.push('/modify')
			},
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					id:'',
					name: '',
					abs: '',
				};
			},
			//显示编辑界面
			// handleEdit:function(index, row) {
			// 	this.editFormVisible = true;
			// 	this.editForm = Object.assign({}, row);
			// },
			addSubmit: function() {
				this.$confirm('确认创建文章吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// console.log(this.addForm.username)
					this.axios.post("/article/add", {
						name: this.addForm.name,
						abs: this.addForm.abs,
						contentMd:this.addForm.contentMd
					}).then(response => {
						if (response.data.status == 200) {
							this.$message({
								type: 'success',
								message: '创建成功!'
							});
							this.addFormVisible = false;
							this.getArticle();
						}
						else{
							this.$message({
								type: 'error',
								message: '用户名已存在!'
							});
						}
						
					}).catch(err => {
						console.log(err)
					});
			
				});
			
			},
			//编辑
			// editSubmit: function() {
			// 	this.$refs.editForm.validate((valid) => {
			// 		if (valid) {
			// 			this.$confirm('确认提交吗？', '提示', {}).then(() => {
			// 				this.editLoading = true;
			// 				//NProgress.start();
			// 				let para = Object.assign({}, this.editForm);
			// 				para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth),
			// 					'yyyy-MM-dd');
			// 				editUser(para).then((res) => {
			// 					this.editLoading = false;
			// 					//NProgress.done();
			// 					this.$message({
			// 						message: '提交成功',
			// 						type: 'success'
			// 					});
			// 					this.$refs['editForm'].resetFields();
			// 					this.editFormVisible = false;
			// 					this.getArticle();
			// 				});
			// 			});
			// 		}
			// 	});
			// },
			selsChange: function(sels) {
				this.sels = sels;
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
						this.getArticle();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getArticle();
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
					return this.articleList.filter(data => {
						return data.name.indexOf(search) > -1
					})
				}
				return this.articleList // articleList 就是之前el-table 的 data数据
			}
		},
	}
</script>

<style scoped>

</style>
