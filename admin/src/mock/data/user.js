import Mock from 'mockjs';
const Random = require('mockjs').Random;
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    name: 'admin'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    // id: Mock.Random.id(),
	'id|1-100': 100,
	'number|1-30':30,
    name: Mock.Random.cname(),
	phone: /^1[385][1-9]\d{8}/,
	password: /[a-z]{2}[A-Z]{2}[0-9]/,
	'permissions|1': ['管理员', '普通用户'],
	birth: Mock.Random.date(),
	'order|1':['已完成','已付款'],
	'refund|1':['退款完成','申请退款','无'],
	title:Mock.mock('@ctitle(3, 15)'),
	imgFlo:Random.image('100x100','#FF6600'),
	introduce:Mock.mock('@cparagraph(10, 120)'),
	'typeFlo|1':['奇花异草','南非植物','百合','玫瑰'],
	nameFlo : Mock.mock('@cword(3, 7)'),
	'smell|1':['无味','微醺','淡香'],
	'level|1':['易','适中','难'],
	'humidity|10-60' : 60,
	introduce:Mock.mock('@cparagraph(1, 2)'),
	address:Mock.mock('@county(true)'),
    // addr: Mock.mock('@county(true)'),
    // 'age|18-60': 1,
    // sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
