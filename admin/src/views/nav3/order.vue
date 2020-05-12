<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;width: 100%;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.id" placeholder="用户id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers()">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<!-- <el-table-column fixed type="index" width="100">
			</el-table-column> -->
			<el-table-column prop="id" label="用户ID" sortable>
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="phone" label="手机">
			</el-table-column>
			<el-table-column prop="order" label="订单状态">
			</el-table-column>
			<el-table-column prop="refund" label="退款">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="退款状态" prop="refund">
					<el-radio-group v-model="editForm.permissions">
						<el-radio class="radio" :label="1">退款完成</el-radio>
						<el-radio class="radio" :label="0">申请退款</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import {
		getUserListPage,
		removeUser,
		batchRemoveUser,
		editUser,
		addUser
	} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: '',
					id: '',
					phone:'',
					refund: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					refund: [{
						required: true,
						message: '请选择权限',
						// trigger: 'change'
					}]
				},
				//编辑界面数据
				editForm: {
					permissions: -1
				}
			}
		},
		methods: {
			//用户权限转换
			// formatpermissions: function(row, column) {
			// 	return row.permissions == 0 ? '申请退款' : '退款完成';
			// },
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					id: this.filters.id,
					name: this.filters.name,
					refund: this.filters.refund,
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					console.log(res.data)
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
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
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.refund = (!para.refund || para.refund == 0) ? 0 : 1;
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style scoped>

</style>
