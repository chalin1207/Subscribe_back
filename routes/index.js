
/*
 * GET home page.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',//�����mysql������--->password: 'root'
    database:'subscribe',
    port: 3306
});

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//ע������û�
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
	    console.log("��ѯ���------->"+rows[0]);
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

//ע����ҵ�û�
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
	    console.log("��ѯ���------->"+rows[0]);
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

//��ҵ�û���¼
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

//�����û���¼
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

//��ҵ�û���ҵ���ƣ���ҵ���Ʊ��������Ӧ����
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

//��ҵ��Ա���ƣ���ע�����ҵ�û��ſ�����Ա���ƣ���Ҫ�ж���ҵ�û��Ƿ�ע���ˣ�û�еĻ�����������Ա����
exports.customCompanyUser = function(req,res){
	var companyname = req.body.companyname;
	var username = req.body.username;
	var password = req.body.password;
	var root = req.body.root;
	
	console.log("CompanyName:"+companyname+"   CompanyUsername:"+username+"    CompanyPassword:"+password+"   root:"+root);
	
	conn=mysql.createConnection(conn.config);  
    conn.connect();
	
	 conn.query("SELECT * from companyuser where Username='"+username+"'and CompanyName = '"+companyname+"'", function(err, rows, fields) {
		 if(rows[0] == undefined){     //�û������ڣ����ܽ�����Ա����
			console.log("NOExiste");
			console.log("Message : This User no existe");
	        res.write("NOExiste");
	        res.end(); 
		 }else{                         //�ж������Ƿ���û���ƥ��
			 conn.query("SELECT Password from companyuser where Username='"+username+"'", function(err, rows, fields) {
				 var pass = rows[0].Password;
	             console.log(pass);
				 if(pass == password){   //���������û���ƥ���ˣ��Ϳ��Խ�����ҵ��Ա������
				      console.log("the pass same Password");
				     conn.query("update companyuser set root ='"+root+"'where Username='"+username+"'", function(err, rows, fields) {
						 if(err){        //�����Ա�����г��ִ��󣬾��������
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

//���Ǹ�С����
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

//�õ���ҵ�б�ͨ��ʱ���жϣ�������ǰ����ԤԼ����ҵ�б�
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

//�õ���ҵ������
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

//�õ��û�����
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

//��ѯĳ����˾���������ݿ�����  (Ҫϸ��~�Ǵ���ԤԼ�����Ƿ���ԤԼ)
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



//�����û�����ԤԼ~ԤԼ����count+1
exports.Subscribe = function(req,res){
	var personalname = req.body.personalname;
	var personalusername = req.body.personalusername;
	var companyname = req.body.companyname;
	var ordertime = req.body.ordertime;
	var orderid = req.body.orderid;
	var orderwhere = req.body.orderwhere;
	
	console.log("personalname:"+personalname+"  personalusername:"+personalusername+"  companyname:"+companyname+"  ordertime:"+ordertime+"  ordertime:"+ordertime+"  orderwhere:"+orderwhere);
	
	conn.query("SELECT * FROM `order` WHERE personalUsername ='"+personalusername+"'AND CompanyName = '"+companyname+"' AND orderWhere ='"+orderwhere+"'", function(err, rows, fields) {      //һ���˶�һ�����ֻ��ԤԼһ��
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

//������ҵ��ԤԼ���ж���
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

//��ҵ���ݸ����û�������ҵ���ƣ�ԤԼ������ɾ����ǰ�Ķ���
exports.DeletePersonalOrder = function(req,res){
	var companyname = req.body.companyname;
	var personalusername = req.body.personalusername;
	var orderwhere = req.body.orderwhere;
	var companyusername = req.body.companyusername;
	
	console.log("CompanyUsername"+companyusername+"   CompanyName:"+companyname+"   PersonalUsername:"+personalusername+"    OrderWhere��"+orderwhere);
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

//ͨ����˾���ƣ�ԤԼ���������ԤԼ������
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

//ͨ���û����������ԤԼ���б�
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

//�ѽк���Ϣ��¼����
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

//��ȡ��ǰ�кŸ���
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



//��ȡ��ǰ�ĺ���
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