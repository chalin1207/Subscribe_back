
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/RegistrPersonalUser',routes.registrPersonalUser);//注册个人用户
app.post('/RegistrCompanyUser',routes.registrCompanyUser);  //注册企业用户
app.post('/LoginCompanyUser',routes.loginCompanyUser);      //企业用户登录
app.post('/LoginPersonalUser',routes.loginPersonalUser);    //个人用户登录
app.post('/CompanyCustomization',routes.companyCustomization);//企业业务定制
app.post('/CustomCompanyUser',routes.customCompanyUser);      //企业人员定制
app.post('/GetCompanyMessList',routes.GetCompanyMessList);    //返回当前可预约企业的列表
app.post('/GetCompanyName',routes.GetCompanyName);            //获得企业名称
app.post('/GetPersonalName',routes.GetPersonalName);          //获得个人身份名称
app.post('/GetCompanyCountNum',routes.GetCompanyCountNum);    //获得该企业特定地方的预约数（特定地方指：大厅，房间）
app.post('/PersonalSubscribe',routes.Subscribe);               //个人用户预约
app.post('/GetCompanyFromOrderList',routes.GetCompanyFromOrderList);   //通过企业名获得该企业的订单列表
app.post('/DeletePersonalOrder',routes.DeletePersonalOrder);     //企业管理员删除订单，里面要判断权限
app.post('/GetOrderIdList',routes.GetOrderIdList);              //获得该企业的所有预约号列表
app.post('/GetOrderCheckList',routes.GetOrderCheckList);        //获得用户已预约的企业列表
app.post('/SaveCallnumberMess',routes.SaveCallnumberMess);       //保存叫号信息
app.post('/GetCallNum',routes.GetCallNum);                       //通过公司名称，预约地方来获取当前个数
app.post('/GetCallNumber',routes.GetCallNumber);                //通过公司名称，预约地方来获取当前号数
app.post('/test',routes.RR);                                   //测试借口（不用理）




var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io=require('socket.io').listen(server);

var MySocketManager=require("./routes/MySocketManager");
var SocketManager=new MySocketManager(io);
	
app.post('/testBroadcast', SocketManager.boradcast);