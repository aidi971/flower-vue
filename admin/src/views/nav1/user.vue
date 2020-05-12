<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;width: 100%;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="queryKeyCode" placeholder="用户名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="btnKeyCode = queryKeyCode">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="handleAdd">新增用户</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<!-- <el-table-column fixed type="index" width="100">
			</el-table-column> -->
			<el-table-column prop="id" label="用户ID" sortable>
			</el-table-column>
			<el-table-column prop="username" label="姓名">
			</el-table-column>
			<el-table-column prop="birthday" label="生日">
			</el-table-column>
			<el-table-column prop="phone" label="手机">
			</el-table-column>
			<el-table-column prop="password" label="密码" width="150">
			</el-table-column>
			<!-- <el-table-column prop="role_id" label="用户权限">
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
				<el-form-item label="姓名" prop="username">
					<el-input v-model="editForm.username" auto-complete="off"></el-input>
				</el-form-item>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="editForm.password"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
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
				<el-form-item label="姓名" prop="username">
					<el-input v-model="addForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="用户权限" prop="permissions">
					<el-radio-group v-model="addForm.permissions">
						<el-radio class="radio" :label="1">管理员</el-radio>
						<el-radio class="radio" :label="0">普通用户</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="addForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
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
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
				usersList: [],
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入正确手机号码',
						trigger: 'blur',
						// type: 'number'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					permissions: [{
						required: true,
						message: '请选择权限',
						// trigger: 'change'
					}]
				},
				//编辑界面数据
				editForm: {
					id:'',
					username: '',
					phone: '',
					birthday: '',
					password: '',
					permissions: -1
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入正确手机号码',
						trigger: 'blur',
						// type: 'number'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					permissions: [{
						required: true,
						message: '请选择权限',
						// trigger: 'change'
					}]
				},
				//新增界面数据
				addForm: {
					username: '',
					permissions: '普通用户',
					birthday: '',
					phone: '',
					password: ''
				}

			}
		},
		methods: {
			//用户权限转换
			formatpermissions: function(row, column) {
				// return row.permissions == 0 ? permissions {'普通用户'} ? {'管理员'};
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				this.listLoading = true;
				this.axios.get("/user").then(response => {
					this.listLoading = false;
					console.log(response.data)
					const _data = response.data;
					this.usersList = _data;
					// console.log(this.articleList)
				}).catch(err => {
					console.log(err)
				});
			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除用户吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					// console.log(row.id)
					const userId = row.id
					this.axios.get("/delete/" + userId.toString()).then(response => {
						this.listLoading = false;
						console.log("删除")
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					}).catch(err => {
						console.log(err)
					});
				})
			},
			//显示编辑界面
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					username: '',
					permissions: -1,
					birthday: '',
					phone: '',
					password: ''
				};
			},
			//编辑
			editSubmit: function() {
						this.$confirm('确认修改信息吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							// console.log(this.editForm)
							const userId = this.editForm.id
							const url ='/user/update/'+userId.toString()
							this.axios.post(url,this.editForm).then(response => {
								// console.log(response)
								// console.log(this.editForm.username)
								this.$message({
									type: 'success',
									message: '修改成功!'
								});
								this.getUsers();
								this.editFormVisible = false;
							}).catch(err => {
								console.log(err)
							});
						
						});
			},
			//新增
			addSubmit: function() {
				this.$confirm('确认创建用户吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(this.addForm.username)
					this.axios.post("/user/add", {
						username: this.addForm.username,
						password: this.addForm.password,
						phone: this.addForm.phone,
						birthday: this.addForm.birthday,
						role_id: this.addForm.permissions
					}).then(response => {
						if (response.data.status == 200) {
							
							this.$message({
								type: 'success',
								message: '创建成功!'
							});
							
							this.addFormVisible = false;
							this.getUsers();
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
			selsChange: function(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function() {
				var ids = this.sels.map(item => item.id).toString();
				console.log(ids)
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
			}
		},
		mounted() {
			this.getUsers();
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
					return this.usersList.filter(data => {
						return data.username.indexOf(search) > -1
					})
				}
				return this.usersList // usersList 就是之前el-table 的 data数据
			}
		},
	}
</script>

<style scoped>

</style>
