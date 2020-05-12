import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import install from './views/install.vue'
import user from './views/nav1/user.vue'
import modify from './views/nav2/modify.vue'
import table from './views/nav2/table.vue'
import article from './views/nav2/article.vue'
import type from './views/nav2/type.vue'
import order from './views/nav3/order.vue'
import lesson from './views/nav4/lesson.vue'
import add from './views/nav4/add.vue'
import modifyClass from './views/nav4/modify.vue'
import test from './views/test.vue'


const router = [{
		path: '/login',
		component: Login,
		name: '',
		hidden: true
	},
	{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	},
	{
		path: '/test',
		component: test,
		name: '',
		hidden: true,
		meta:{
		   requireLogin:true,
		 },
	},
	{
		path: '/',
		component: Home,
		name: '',
		iconCls: 'fa fa-user-circle-o',
		leaf: true, //只有一个节点
		 meta:{
		    requireLogin:true,
		  },
		children: [{
			path: '/user',
			component: user,
			name: '用户管理',
		}]
	},
	// {
	// 	path: '/',
	// 	component: Home,
	// 	name: '',
	// 	iconCls: 'fa fa-file-image-o',
	// 	leaf: true, //只有一个节点
	// 	children: [{
	// 		path: '/table',
	// 		component: table,
	// 		name: '文章管理',
	// 	}]
	// },
		{
		path: '/',
		component: Home,
		name: '植物文章',
		iconCls: 'fa fa-file-image-o',
		meta:{
		   requireLogin:true,
		 },
		// leaf: true,//只有一个节点
		children: [{
				path: '/table',
				component: table,
				name: '文章列表',
			},
			{
				path: '/article',
				component: article,
				name: '文章添加',
				hidden: true,
			},
			{
				path: '/modify',
				component: modify,
				name: '文章修改',
				hidden: true,
			},

		]
	},
	
	// {
	// 	path: '/',
	// 	component: Home,
	// 	name: '',
	// 	iconCls: 'fa fa-tasks',
	// 	leaf: true, //只有一个节点
	// 	children: [{
	// 		path: '/lesson',
	// 		component: lesson,
	// 		name: '课程管理',
	// 	}]
	// },
	{
		path: '/',
		component: Home,
		name: '课程管理',
		iconCls: 'fa fa-tasks',
		meta:{
		   requireLogin:true,
		 },
		// leaf: true,//只有一个节点
		children: [{
				path: '/lesson',
				component: lesson,
				name: '课程列表',
			},
			{
				path: '/add',
				component: add,
				name: '课程添加',
				hidden:true
			},
			{
				path: '/modifyClass',
				component: modifyClass,
				name: '课程修改',
				hidden: true,
			},

		]
	},
	{
		path: '/',
		component: Home,
		name: '',
		iconCls: 'fa fa-tag',
		meta:{
		   requireLogin:true,
		 },
		leaf: true, //只有一个节点
		children: [{
			path: '/type',
			component: type,
			name: '植物类型',
		}]
	},
	{
		path: '/',
		component: Home,
		name: '',
		iconCls: 'fa fa-user-circle-o',
		meta:{
		   requireLogin:true,
		 },
		leaf: true, //只有一个节点
		children: [{
			path: '/install',
			component: install,
			name: '设置',
		}, ]
	},
	{
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
]


export default router;
