
/*
 * GET home page.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',//宿舍的mysql的密码--->password: 'root'
    database:'subscribe',
    port: 3306
});

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//注册个人用户
exports.registrPersonalUser = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var personalname = req.body.personalname;
	console.log("Username:"+username+"      Password:"+password+"      PersonalName:"+personalname);
	
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	 conn.query("SELECT * from personaluser where Username='"+username+"'", function(err, rows, fields) {
        if (err) throw err;
        //console.log('The solution is: ', rows[0].solution);
	    console.log("查询结果------->"+rows[0]);
		if(rows[0] == undefined){
			  conn.query("insert into personaluser (Username,Password,personalname) value ('"+username+"','"+password+"','"+personalname+"')", function(err, rows, fields) {
              if (err) {
				  
	             //res.writeHead(200, {'Content-Type': 'text/plain'}); 
				 console.log(err);
	             res.write(JSON.stringify(err));
	              res.end();
			  }else{
				  console.log("sucess");
	             //res.writeHead(200, {'Content-Type': 'text/plain'}); 
	             //res.write(JSON.stringify("Sucess"));
				 res.write("Sucess");
	              res.end();
			  }
              //console.log('The solution is: ', rows[0].solution);
	           
   });
		}else{
			//res.writeHead(200, {'Content-Type': 'text/plain'}); 
			 console.log("Message : This User is existe");
	         res.write("Repeat");
	         res.end();
		}
	   // res.writeHead(200, {'Content-Type': 'text/plain'}); 
	   // res.write(JSON.stringify(rows));
	    //res.end();
   });
	
};

//注册企业用户
exports.registrCompanyUser = function(req, res){
	var companyname = req.body.companyname;
	var username = req.body.username;
	var password = req.body.password;
	console.log("Username:"+username+"      Password:"+password+"      Companyname:"+companyname);
	
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	 conn.query("SELECT * from companyuser where Username='"+username+"'", function(err, rows, fields) {
        if (err) throw err;
        //console.log('The solution is: ', rows[0].solution);
	    console.log("查询结果------->"+rows[0]);
		if(rows[0] == undefined){
			  conn.query("insert into companyuser (Username,Password,CompanyName) value ('"+username+"','"+password+"','"+companyname+"')", function(err, rows, fields) {
              if (err) {
				  
	             //res.writeHead(200, {'Content-Type': 'text/plain'}); 
				 console.log(err);
	             res.write(JSON.stringify(err));
	              res.end();
			  }else{
				  console.log("Sucess");
	             //res.writeHead(200, {'Content-Type': 'text/plain'}); 
	             res.write("Sucess");
	              res.end();
			  }
              //console.log('The solution is: ', rows[0].solution);
	           
   });
		}else{
			//res.writeHead(200, {'Content-Type': 'text/plain'});
			  console.log("Repeat");
			 console.log("Message : This User is existe");
	         res.write("Repeat");
	         res.end();
		}
	   // res.writeHead(200, {'Content-Type': 'text/plain'}); 
	   // res.write(JSON.stringify(rows));
	    //res.end();
   });
	
};

//企业用户登录
exports.loginCompanyUser = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log("LoginUsername:"+username+"      LoginPassword:"+password);
	
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT Password from companyuser where Username='"+username+"'", function(err, rows, fields) {
	    console.log("Company Login");
	    console.log(rows[0]);
		if(rows[0] == undefined){
			console.log("NOExiste");
			console.log("Message : This User is existe");
	        res.write("NOExiste");
	        res.end();
		}else{
	        var pass = rows[0].Password;
	        console.log(pass);
	        if(pass == password){
		        console.log("OK");
		        res.write("OK");
	            res.end();
	        }else{
		        console.log("PassErr");
		        res.write("PassErr");
	            res.end();
	        }
	    }
	});
};

//个人用户登录
exports.loginPersonalUser = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log("LoginUsername:"+username+"      LoginPassword:"+password);
	
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT Password from personaluser where Username='"+username+"'", function(err, rows, fields) {
	    console.log("Personal Login");
	    console.log(rows[0]);
		if(rows[0] == undefined){
			console.log("NOExiste");
			console.log("Message : This User is existe");
	        res.write("NOExiste");
	        res.end();
		}else{
	        var pass = rows[0].Password;
	        console.log(pass);
	        if(pass == password){
		        console.log("OK");
		        res.write("OK");
	            res.end();
	        }else{
		        console.log("PassErr");
		        res.write("PassErr");
	            res.end();
	        }
	    }
	});
		
	
};

//企业用户的业务定制：在业务定制表里添加相应数据
exports.companyCustomization = function(req,res){
	var companyname = req.body.companyname;
	var hallnum = req.body.hallnum;
	var roomnum = req.body.roomnum;
	var starttime = req.body.starttime;
	var endtime = req.body.endtime;
	console.log("CompanyName:"+companyname+"    HallNum:"+hallnum+"    RoomNum:"+roomnum+"   StartTime:"+starttime+"    EndTime:"+endtime);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT * from customization where Companyusername='"+companyname+"'", function(err, rows, fields) {
		if(rows[0] == undefined){
			conn.query("insert into customization (Companyusername,HullNum,RoomNum,StartTime,EndTime) value ('"+companyname+"','"+hallnum+"','"+roomnum+"','"+starttime+"','"+endtime+"')", function(err, rows, fields) {
			    if(err){
				    console.log(err);
	                res.write(JSON.stringify(err));
	                res.end();
				}else{
					console.log("Sucess");
	                res.write("Sucess");
	                res.end();
				}
			});
		}else{
			 console.log("Repeat");
	         res.write("Repeat");
	         res.end();
		}
	});
}; 

//企业人员定制：已注册的企业用户才可以人员定制，先要判断企业用户是否注册了，没有的话，将不能人员定制
exports.customCompanyUser = function(req,res){
	var companyname = req.body.companyname;
	var username = req.body.username;
	var password = req.body.password;
	var root = req.body.root;
	
	console.log("CompanyName:"+companyname+"   CompanyUsername:"+username+"    CompanyPassword:"+password+"   root:"+root);
	
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	 conn.query("SELECT * from companyuser where Username='"+username+"'and CompanyName = '"+companyname+"'", function(err, rows, fields) {
		 if(rows[0] == undefined){     //用户不存在，不能进行人员定制
			console.log("NOExiste");
			console.log("Message : This User no existe");
	        res.write("NOExiste");
	        res.end(); 
		 }else{                         //判断密码是否跟用户名匹配
			 conn.query("SELECT Password from companyuser where Username='"+username+"'", function(err, rows, fields) {
				 var pass = rows[0].Password;
	             console.log(pass);
				 if(pass == password){   //如果密码跟用户名匹配了，就可以进行企业人员定制了
				      console.log("the pass same Password");
				     conn.query("update companyuser set root ='"+root+"'where Username='"+username+"'", function(err, rows, fields) {
						 if(err){        //如果人员定制中出现错误，就输入错误
							 console.log(err);
	                         res.write(err);
	                         res.end();
						 }else{
							 console.log("Sucess");
	                         res.write("Sucess");
	                         res.end();
						 }
					  });
					 
				 }else{
					 console.log("PassErr");
		             res.write("PassErr");
	                 res.end();
				 }
			 });
		 }
	 });
};

//这是个小测试
exports.RR = function(req,res){
	var companyname = req.body.companyname;
	conn.query("SELECT * from companyuser where CompanyName = '"+companyname+"'", function(err, rows, fields) {
		if(err){
		   console.log(err);
		   res.write(err);
           res.end();
		}else{
		   console.log(rows);
		   res.write(JSON.stringify(rows));
           res.end(); 
		}
	});
}; 

//得到企业列表：通过时间判断，给出当前可以预约的企业列表
exports.GetCompanyMessList = function(req,res){
	var time = req.body.time;
	console.log("Time:"+time)
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT a.CompanyName,b.Companyusername,b.HullNum,b.RoomNum,b.StartTime,b.EndTime from customization AS b,companyuser AS a where a.Username = b.companyusername AND time('"+time+"') between StartTime and EndTime", function(err, rows, fields) {
		if(err){
		   console.log(err);
		   res.write(JSON.stringify(err));
           res.end();
		}else{
		   res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		   console.log(rows);
		   res.write(JSON.stringify(rows));
           res.end(); 
		}
	});
	
};

//得到企业的名称
exports.GetCompanyName = function(req,res){
	var username = req.body.username;
	console.log("CompanyUsername:"+username);
	conn.query("SELECT CompanyName from companyuser where Username = '"+username+"'", function(err, rows, fields) {
		if(err){
		   console.log(err);
		   res.write(JSON.stringify(err));
           res.end();
		}else{
		   console.log(rows[0]);
		  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		  res.write(rows[0].CompanyName);
           res.end(); 	
		}
	});
};

//得到用户姓名
exports.GetPersonalName = function(req,res){
	var username = req.body.username;
	console.log("PersonalUsername:"+username);
	conn.query("SELECT Personalname from personaluser where Username = '"+username+"'", function(err, rows, fields) {
		if(err){
		   console.log(err);
		   res.write(JSON.stringify(err));
           res.end();
		}else{
		   console.log(rows[0]);
		   res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		  res.write(rows[0].Personalname);
           res.end(); 	
		}
	});
};

//查询某个公司大厅的数据库总数  (要细分~是大厅预约，还是房间预约)
exports.GetCompanyCountNum = function(req,res){
	var companyname = req.body.companyuser;
	var orderwhere = req.body.orderwhere;
	console.log("companyname:"+companyname);
	conn.query("SELECT count(*) from `order` WHERE companyName = '"+companyname+"' AND orderWhere ='"+orderwhere+"'", function(err, rows, fields) {
		 console.log(rows[0]);
		 res.write(JSON.stringify(rows[0]));
         res.end(); 
	});
};



//个人用户进行预约~预约号是count+1
exports.Subscribe = function(req,res){
	var personalname = req.body.personalname;
	var personalusername = req.body.personalusername;
	var companyname = req.body.companyname;
	var ordertime = req.body.ordertime;
	var orderid = req.body.orderid;
	var orderwhere = req.body.orderwhere;
	
	console.log("personalname:"+personalname+"  personalusername:"+personalusername+"  companyname:"+companyname+"  ordertime:"+ordertime+"  ordertime:"+ordertime+"  orderwhere:"+orderwhere);
	
	conn.query("SELECT * FROM `order` WHERE personalUsername ='"+personalusername+"'AND CompanyName = '"+companyname+"' AND orderWhere ='"+orderwhere+"'", function(err, rows, fields) {      //一个人对一间餐厅只能预约一次
		 console.log(rows[0]);
	     if(err){
			 console.log(err);
		     res.write(err);
             res.end();
		  }else if(rows[0] == undefined){
			  conn.query("insert into `order` (personalName,personalUsername,companyName,orderTime,orderId,orderWhere) value ('"+personalname+"','"+personalusername+"','"+companyname+"','"+ordertime+"','"+orderid+"','"+orderwhere+"')", function(err, rows, fields) {
				     if(err){
						 console.log(err);
		                 res.write(JSON.stringify(err));
                         res.end();
					 }else{
						 console.log("Sucess");
		                 res.write("Sucess");
                         res.end();
					 }																																												              });
		  }else{
			  console.log("Existe");
			  res.write("Existe");
              res.end(); 
		  }
	});
};

//返回企业的预约所有订单
exports.GetCompanyFromOrderList = function(req,res){
	var companyname = req.body.companyname;
	console.log("companyname:"+companyname);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT * FROM `order` WHERE companyName = '"+companyname+"'",function(err, rows, fields) {
	    if(err){
			console.log(err);
		    res.write(JSON.stringify(err));
            res.end();
		}else{
			console.log(rows);
			res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		    res.write(JSON.stringify(rows));
            res.end();
		}
	});
	
};

//企业根据个人用户名，企业名称，预约类型来删除当前的订单
exports.DeletePersonalOrder = function(req,res){
	var companyname = req.body.companyname;
	var personalusername = req.body.personalusername;
	var orderwhere = req.body.orderwhere;
	var companyusername = req.body.companyusername;
	
	console.log("CompanyUsername"+companyusername+"   CompanyName:"+companyname+"   PersonalUsername:"+personalusername+"    OrderWhere："+orderwhere);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	conn.query("SELECT Root FROM `companyuser` WHERE Username = '"+companyusername+"' AND CompanyName = '"+companyname+"'",function(err, rows, fields){
	     if(err){
			console.log(err);
		    res.write(JSON.stringify(err));
            res.end();
		 }else if(rows[0].Root == "ROOT"){
			 conn.query("DELETE FROM `order` WHERE personalUsername ='"+personalusername+"'AND CompanyName = '"+companyname+"' AND orderWhere ='"+orderwhere+"'",function(err, rows, fields){
	     if(err){
			console.log(err);
		    res.write(JSON.stringify(err));
            res.end();
		 }else{
			console.log(rows[0]);
			res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		    res.write("Sucess");
            res.end(); 
		 }																																							    });
		 }else{
			res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		    res.write("NoROOT");
            res.end(); 
		 }
	});
	
};

//通过公司名称，预约类型来获得预约号数组
exports.GetOrderIdList = function(req,res){
	var Companyname = req.body.companyname;
	var orderwhere = req.body.orderwhere;
	
	console.log("CompanyName:"+Companyname+"       OrderWhere:"+orderwhere);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT orderId FROM `order` WHERE companyName = '"+Companyname+"' AND orderWhere = '"+orderwhere+"'",function(err, rows, fields){
		  if(err){
			  console.log(err);
		      res.write(JSON.stringify(err));
              res.end();
		  }else{
			  console.log(rows);
			  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		      res.write(JSON.stringify(rows));
              res.end(); 
		  }
	});
	
}

//通过用户名来获得已预约的列表
exports.GetOrderCheckList = function(req,res){
	var personaluser = req.body.personaluser;
	
	console.log("personaluser:"+personaluser);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT * FROM `order` WHERE personalUsername = '"+personaluser+"'",function(err, rows, fields){
		if(err){
			  console.log(err);
		      res.write(JSON.stringify(err));
              res.end();
		  }else{
			  console.log(rows);
			  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		      res.write(JSON.stringify(rows));
              res.end(); 
		  }
	});
}

//把叫号信息记录起来
exports.SaveCallnumberMess = function(req,res){
	var nownumber = req.body.nownumber;
	var companyname = req.body.companyname;
	var orderwhere = req.body.orderwhere;
	var nownum = req.body.nownum;
	
	console.log("nownumber:"+nownumber+"  companyname:"+companyname+"  orderwhere:"+orderwhere+"  nownum:"+nownum);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT * FROM `callnumber` WHERE CompanyName = '"+companyname+"' AND OrderWhere ='"+orderwhere+"'",function(err, rows, fields){
		if(err){
			  console.log(err);
		      res.write(JSON.stringify(err));
              res.end();
		  }else if(rows[0]==undefined){
			 conn.query("insert into `callnumber` (CompanyName,NowNumber,OrderWhere,Nownum) value ('"+companyname+"','"+nownumber+"','"+orderwhere+"','"+nownum+"')",function(err, rows, fields){
					if(err){
					   console.log(err);
		               res.write(JSON.stringify(err));
                       res.end(); 	
					}else{
						console.log("SaveSucess");
		                res.write("Sucess");
                        res.end(); 	
					}																							 
			});
		  }else{
			  conn.query("update callnumber set NowNumber ='"+nownumber+"',Nownum = '"+nownum+"' WHERE CompanyName = '"+companyname+"' AND OrderWhere ='"+orderwhere+"'", function(err, rows, fields) {
			        if(err){
						console.log(err);
		                res.write(JSON.stringify(err));
                        res.end();
					}else{
						console.log("updateSucess");
		                res.write("Sucess");
                        res.end(); 
					}
			  });
		  }
	});
};

//获取当前叫号个数
exports.GetCallNum = function(req,res){
	var companyname = req.body.companyname;
	var orderwhere = req.body.orderwhere;
	console.log("companyname:"+companyname+"   orderwhere:"+orderwhere);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT Nownum FROM `callnumber` WHERE CompanyName = '"+companyname+"' AND OrderWhere ='"+orderwhere+"'",function(err, rows, fields){
	     if(err){
			 console.log(err);
		     res.write(JSON.stringify(err));
             res.end();
    	 }else if(rows[0] == undefined){
			 console.log("NoStart");
			 res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		     res.write("NoStart");
             res.end();
		 }else{
			 console.log(rows[0].Nownum);
			 res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		     res.write(rows[0].Nownum);
             res.end();
		 }
	});
	
}



//获取当前的号数
exports.GetCallNumber = function(req,res){
	var companyname = req.body.companyname;
	var orderwhere = req.body.orderwhere;
	console.log("companyname:"+companyname+"   orderwhere:"+orderwhere);
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	conn.query("SELECT NowNumber FROM `callnumber` WHERE CompanyName = '"+companyname+"' AND OrderWhere ='"+orderwhere+"'",function(err, rows, fields){
	     if(err){
			 console.log(err);
		     res.write(JSON.stringify(err));
             res.end();
    	 }else if(rows[0] == undefined){
			 console.log("NoStart");
			 res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		     res.write("NoStart");
             res.end();
		 }else{
			 console.log(rows[0].NowNumber);
			 res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'}); 
		     res.write(rows[0].NowNumber);
             res.end();
		 }
	});
	
}