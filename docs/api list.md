# API List Demo



返回数据统一使用如下格式

~~~json
{
	status: "success" // "error"
	data:{
		//真正有用的数据，如下所写	
	}
}
~~~

#### 修改部分如下（累计更新中）：

- 4.13获取通知详细信息字段不再包含ddl_id等ddl信息，单独将其放到4.14获取用户对某通知是否设置ddl内，优化查询效率
- 4.15 增加获取未读通知数目接口

- 4.16 获取前十热点通知（纯缓存，非单独或分页获取，固定10条）



## 目录模块导航：

### 1 <a href="#user">user模块</a>

#### 1.1 获取用户信息 /api/user/info    需要登录

#### 1.2 修改用户信息 /api/user/modify/info   需要登陆

#### 1.3 上传头像 /api/user/modify/avatar   需要登陆



### 2 <a href="#token">token模块</a>

#### 2.1 用户登录 /api/token/login  无需登录

#### 2.2用户登出 /api/token/logout 需要登陆

#### 2.3 验证token合法性  /api/token/verify  无需登录

#### 2.4 刷新token /api/token/refresh 无需登录



### 3 <a href="#order">order订阅模块</a>

#### 3.0 获取所有可以选择的订阅 /api/order/list  无需登录

#### 3.1获取用户订阅网站 url : /api/order/listmy  需要登陆

#### 3.2 增加订阅 /api/order/add 需要登陆

#### 3.3 删除订阅 /api/order/delete 需要登陆

#### 3.4 置换订阅  /api/order/new 需要登陆



## 4  <a href="#notify">通知模块</a>

#### 4.1获取全部非置顶通知 /api/notify/list/personnottop

#### 4.2获取个人置顶的通知 /api/notify/list/personsettop

#### 4.3获取个人收藏的通知  /api/notify/list/personcollect

#### 4.4搜索通知 /api/notify/search

#### 4.5 设置置顶 /api/notify/settop

#### 4.6 取消置顶 /api/notify/setnotop

#### 4.7 设置已读 /api/notify/setread

#### 4.8 取消已读  /api/notify/setnoread

#### 4.9 添加收藏 /api/notify/setcollect

#### 4.10 取消收藏 /api/notify/setnoread

#### 4.11 删除通知  /api/notify/delete

#### 4.12 添加通知 /api/notify/add (需要管理员权限)

#### 4.13 获取通知详细信息 /api/notify/detail

#### 4.14.查询用户某通知是否设置了ddl  /api/notify/searchddl

#### 4.15 获取用户未读通知数目 /api/notify/noreadnum

#### 4.16 获取前十热点 /api/notify/focuson

## 5   <a href="#ddl">ddl模块</a>

#### 5.1 获取所有已经设置ddl  /api/ddl/list/all

#### 5.2 查询某日设置的ddl /api/ddl/list/day

#### 5.3 添加一个ddl /api/ddl/add

#### 5.4 修改一个ddl的时间信息 /api/ddl/modify

#### 5.5 删除一个ddl  /api/ddl/delete 

#### 5.6 获取用户默认的ddl前提醒时间   /api/ddl/remind/detail

#### 5.7 设置ddl前提醒时间 /api/ddl/remind/modify

#### 5.8 获取消息推送时段 /api/ddl/pushtime/list

#### 5.9 增加一个消息推送时段  /api/ddl/pushtime/add



## <a id="user">User模块</a>

### 1 . 获取用户信息

- url : /api/user/info

- method: get

- description: 获取用户的登录信息

- request parameter

  ~~~
  无
  ~~~

- response result:

  ~~~json
  {
  	user_id: 123123 ,  //number 用户唯一标识符 string也可
  	user_name:"cxz", //string
  	user_stuid:"319010xxx", //string or number
  	user_type: 0 // 0 is normal user, 1 is admin
      user_avatar: "https://xxx.yyy.zzz" //用户头像url
      user_phone: "1444444444" //用户手机号，目前可能不需要
      
  }
  ~~~





### 2 . 修改用户信息

- url : /api/user/modify/info

- method: post

- description: 获取用户的登录信息

- request parameter

  ~~~json
  {
  	"modify_field":"name,stuid,type,phone", //必填项  name和stuid可能不能改动 先写上
  	//如下根据需要修改的部分进行修改
  	user_name:"cxz777",
  	user_stuid:"319xxxxxxx",
  	user_type:1,
  	user_phone:"1444444444" 
  	
  }
  ~~~

- response result:

  ~~~json
  {
   description:"success" //或者错误详细信息   方便调试
  }
  ~~~



### 3.上传头像  （优先级不高

- /api/user/modify/avatar

- method: post

- description: 修改用户的默认头像

- request parameter

  

  使用   "Content-Type": "multipart/form-data"   来进行默认的上传，固定表单中key name为**avatar**

  ~~~json
  {
  	无	
  }
  ~~~

- response result:

  ~~~json
  {
  	user_avatar:"https://xxx.yyy.zzz"  //修改成功后用户的新头像 ，修改失败则返回原来的头像url
  }
  ~~~







## <a id="token">token 模块</a>

使用jwt token, 之后所有接口都需要带上token进行访问，

token默认放在header的NOTIFY_AUTH_BEARER字段内,格式为"Bearer token"

前端无法使用cookie保存登陆状态，使用文件读写token模拟cookie进行保存登陆状态

token过期时间可以在讨论

### 1.用户登录

- /api/token/login

- method: post

- description: 用于默认的小程序微信登录

- request parameter

  ~~~json
  {
  	type:100,   //默认100为小程序登录
     	account:"319xxxxxxx",
      secret:"ccccccccc"
  }
  ~~~

- response result:

  ~~~json
  {
      errType:0,  //10000 代表无错误 10001代表账号不存在 10002代表密码错误 10003代表登录错误过多被ban了 10004代表服务器内部错误
  	token:"123123123.123123123.123123123" //jwt格式存储
  }
  ~~~



### 2.用户登出

- /api/token/logout

- method: post

- description: 用户登出方法

- request parameter

  ~~~json
  {
  	无
  }
  ~~~

- response result:

  ~~~json
  {
     description:"success" //或者错误详细信息   方便调试
  }
  ~~~



### 3.验证token合法性 （无需登录）

- /api/token/verify

- method: post

- description: 正常情况下，请求 API 接口时会自动判断 Token 令牌是否合法，如果前端开发人员需要手动校验某个 Token 令牌是否合法，可以调用此接口，此接口会返回该 Token 是否合法

  **注意status的设置 令牌合法是true，令牌违法则status为false**

- request parameter

  ~~~json
  {
  	token:  //传入的token令牌
  }
  ~~~

- response result:

  ~~~json
  {
    user_type：0 //0 代表普通用户 1代表admin
  }
  ~~~



### 4.刷新token

- /api/token/refresh

- method: post

- description: 颁发新的token

  request parameter

  ~~~json
  {
  	无  //因为本身header里有token
  }
  ~~~

- response result:

  ~~~json
  {
    new_token:"121xccvsdfsdfsdxcv324.sdvxcv.sdfds",
    user_type：0 //0 代表普通用户 1代表admin
  }
  ~~~





## <a id="order">订阅模块</a>

### 0.获取所有可以选择的订阅

可能用的**非常多**，请务必优化 or 缓存

- url : /api/order/list

- method: get

- description: 获取所有的订阅信息

- request parameter

  ~~~
  {
  	offset: 0 //偏移 默认为0
  	count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1
  }
  ~~~

  

- response result: 

  ~~~json
  {
  	all_count: 10, //总的数量
  	return_count:10, //返回的数量
  	data:[
          {
  		id: 123,
          url:"https:xx.yyy.zz",
          classify:"B",  //字母 全部大写
          name: "本科生院”
  		},
          {
  		id: 456,
          url:"https:xx.yyy.zz",
          classify:"J",  //字母 全部大写
          name: "计算机科学与技术”
  		},
      ]
  }
  ~~~
  
  

### 1.获取用户订阅网站

可能用的**非常多**，请务必优化 or 缓存

- url : /api/order/listmy

- method: get

- description: 获取用户的订阅信息

- request parameter

  ~~~
  {
  	offset: 0 //偏移 默认为0
  	count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1
  }
  ~~~

  

- response result: 
  
  ~~~json
  {
  	all_count: 10, //总的数量
  	return_count:10, //返回的数量
  	data:[
          {
  		id: 123,
          url:"https:xx.yyy.zz",
          name: "本科生院”
  		},
          {
  		id: 456,
          url:"https:xx.yyy.zz",
          name: "计算机科学与技术”
  		},
      ]
  }
  ~~~
  
  

### 2.增加订阅

如果增加的订阅中包括用户已经订阅的，不用管它就行，注意该操作为原子操作，不应该存在部分id增加 部分还没有增加的情况

  - url : /api/order/add
  
  - method: post
  
  - description:  增加用户的订阅
  
  - request parameter
  
    ~~~json
    {
    	add_order_list：[1,2,3,4] //list内为order的key
    }
    ~~~
    
    
    
  - response result: 
  
    ~~~json
    {
    	 description:"success" //或者错误详细信息   方便调试
    }
    ~~~



### 3.删除订阅

如果删除的订阅包括用户没有的，不管他即可，同理该操作应该为原子操作，全部删除 or 全部不删除

  - url : /api/order/delete

  - method: post

  - description:  删除用户的订阅

  - request parameter

    ~~~json
    {
    	delete_order_list：[1,2,3,4] //list内为order的key
    }
    ~~~

    

  - response result: 

    ~~~json
    {
    	 description:"success" //或者错误详细信息   方便调试
    }
    ~~~



### 4.置换订阅

将用户的订阅完全置换为传入的数据列表id

  - url : /api/order/new

  - method: post

  - description:  完全替换用户的订阅

  - request parameter

    ~~~json
    {
    	new_order_list：[1,2,3,4] //list内为order的key
    }
    ~~~

    

  - response result: 

    ~~~json
    {
    	 description:"success" //或者错误详细信息   方便调试
    }
    ~~~







## <a id="notify">通知模块</a>

思路主要如下

- 通知的收藏功能不会提高通知展示的优先级，只会在个人中心页面展示

- 当某个消息被打开时，自动设置为已读，已读或未读也不会提高通知的展示优先级
- 删除通知会让用户永远也接收不到这条通知，除非使用搜索功能
- 置顶功能前端会有一段保留区域，可以收起或拉下，大致为保留最前两个置顶的notify，排序为按加入的时间倒叙排列，**该功能在四种分类中均有效**

**实际上前端并不关心后端的排序顺序，前端只接收数据并且顺序展示**，所以返回的数据内并没有加上created_time等用来排序的字段。。。。。。





### 1.获取全部非置顶通知

**对于所有类来说，获取的都是未置顶得通知**

  - url : /api/notify/list/personnottop

  - method: get

  - description: 获取全部通知

  - request parameter

    ~~~json
    {
    	type:0 //0 全部 1 未读 2含附件 3收藏
        offset: 0 //偏移 默认为0
    	count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1
    }
    ~~~

    

  - response result: 

    ~~~json
    {
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:[
        {
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
    	},
        {
    		notify_id:124,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件    
    	},
        ]
    }
    ~~~



### 2.获取个人置顶的通知

  - url : /api/notify/list/personsettop

  - method: get

  - description: 获取个人的置顶通知

  - request parameter

    ~~~json
    {
    	type:0 //0 全部 1 未读 2含附件 3收藏
        offset: 0 //偏移 默认为0
    	count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1
    }
    ~~~

    

  - response result: 

    ~~~json
    {
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:[
        {
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
           
    	},
        {
    		notify_id:124,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件    
        },
        ]
    }
    ~~~



### 3.获取个人收藏的通知

  - url : /api/notify/list/personcollect

  - method: get

  - description: 获取个人的收藏通知

  - request parameter

    ~~~json
    {
        offset: 0 //偏移 默认为0
    	count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1
    }
    ~~~

    

  - response result: 

    ~~~json
    {
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:[
        {
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
    	},
        {
    		notify_id:124,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件    
    	},
        ]
    }
    ~~~



### 4.搜索通知

  - url : /api/notify/search

  - method: get

  - description:搜索相关的通知

  - request parameter

    ~~~json
    {
        search_type:0, //默认0 为全字匹配  1为优先匹配院系 2为优先匹配title
        search_word: "cxz666" //搜索关键词
        offset: 0 //偏移 默认为0    
        order_id: -1//院系id， <=0为全部
        plate_id:0 //0-8合法 ，0为不管， 1-8为评奖评优--其他
    	count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1
    }
    ~~~

    

  - response result: 

    ~~~json
    {
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:[
        {
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
    
    	},
        {
    		notify_id:124,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件    
    	},
        ]
    }
    ~~~



​	

### 5.设置置顶

  - url : /api/notify/settop

  - method: post

  - description: 设置具体的通知置顶

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果已经是置顶了，不用管，直接返回status:success即可

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 6.取消置顶

  - url : /api/notify/setnotop

  - method: post

  - description: 取消一个已经置顶的通知

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果已经是非置顶了，不用管，直接返回status:success即可

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 7.设置已读

  - url : /api/notify/setread

  - method: post

  - description: 设置一个通知为已读

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果已经是已读了，不用管，直接返回status:success即可

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 8.取消已读

  - url : /api/notify/setnoread

  - method: post

  - description: 设置一个通知为未读

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果本来就是未读了，不用管，直接返回status:success即可

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 9.添加收藏

  - url : /api/notify/setcollect

  - method: post

  - description: 将一个用户的notify加到收藏内

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果已经是收藏的，不用管，直接返回status:success即可

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 10.取消收藏

  - url : /api/notify/setnoread

  - method: post

  - description: 设置取消某个通知的收藏

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果本来就没有收藏，不用管，直接返回status:success即可

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~





### 11.删除通知

  - url : /api/notify/delete

  - method: post

  - description: 将某个通知永久从用户推送列表中删除，用户无法自己加回来

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果用户推送列表中没有这个通知，请返回status:fali同时description写上相应的信息

  - response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 12.添加通知(需要管理员权限)

  - url : /api/notify/add

  - method: post

  - description: 将某个通知添加到用户的推送列表中，并按合适的位置排序（前端并不关心后端怎么排得）

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果用户推送列表中有这个通知了，不用管，直接返回status:success即可

    response result: 

    ~~~json
    {
       description:"success" //或者错误详细信息   方便调试	
    }
    ~~~



### 13.获取通知详细信息

可全部缓存，因为基本不需要更改

  - url : /api/notify/detail

  - method: get

  - description:查询一个通知的详细信息

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~

    如果没有id对应的通知，请返回status:fail

  - response result: 

    ~~~json
    {
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:  {
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_time:"2020-03-17"，//通知下发时间
            notify_visit_number:6666,//访问次数
            notify_detail:"<html><body></body></html>"//详细信息
            
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
            notify_enclosure_list:[
            {
            	name:"浙大14号外语类课程修读办法",
            	url:"https://xxx.yyy.zzz",
            	enclosure_id:123
        	},
            {
            	name:"浙大15号外语类课程修读办法",
            	url:"https://xxx.yyy.zzz",
            	enclosure_id:124
        	}
            ],
    		notify_origin:"https://xxx.yyy.zzz"//信息来源
    	}
    }
    ~~~





### 14.查询用户某通知是否设置了ddl

  - url : /api/notify/searchddl

  - method: get

  - description:查询该用户是否针对通知设置了ddl

  - request parameter

    ~~~json
    {
      notify_id:123
    }
    ~~~


注意，无论他是否设置了ddl，status都应该返回true()

- response result: 

      {
      	notify_set_ddl:false, //是否对该通知设置了ddl
          notify_ddl_id:null or 123//该通知设置的ddl 的id 没有则为null，
       	ddl_date:"2020-01-02",//设置ddl的时间
          ddl_time:"09:00" //xx:xx的格式
      }



### 15.获取用户未读的通知数目

- url: /api/notify/noreadnum

- method: get

  - description:查询用户未读的通知数目

  - request parameter

    ~~~json
    {
     无
    }
    ~~~


注意，未登录是status:false,其余都是true

- response result: 

  ```json
  {
  	notify_num: 10 //未读的数目
  }
  ```



### 16.获取前十热点通知

- url:  /api/notify/focuson

- method: get

  - description:查询用户未读的通知数目

  - request parameter

    ~~~json
    {
     无
    }
    ~~~


注意，如果没有10个，返回了几个写到return_count内

- response result: 

  ```json
  {
  	return_count:10 //要10个就10个
      data:["计算机","转专业","生医工"...]
  }
  ```



## <a id="ddl">DDL模块</a>



ddl可以认为是一个notify id+设置提醒的日期+设置提醒的时间

### 1.获取所有已经设置ddl

  - url : /api/ddl/list/all

  - method: get

  - description: 获取用户添加的所有已经设置的ddl

  - request parameter

    ~~~json
    {
     start_date:"2020-01-03", //开始时间  缺省为负无穷  闭区间
     end_date:"2020-03-04" //结束时间  缺省为正无穷   闭区间
     offset: 0 //偏移 默认为0
     count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1 
    }
    ~~~

    response result: 

    ~~~json
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:[
        {
            ddl_id:123123,
            ddl_date:"2020-01-02",//设置ddl的时间
            ddl_time:"09:00" //xx:xx的格式
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
          	//这里不需要额外的ddl id了
    	},
        {
    		notify_id:124,
            ddl_date:"2020-01-02",//设置ddl的时间
            ddl_time:"09:00" //xx:xx的格式
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件    
           //和上方的有些许出入
    	},
        ]
    ~~~





### 2.查询某日设置的ddl

  - url : /api/ddl/list/day

  - method: get

  - description: 获取用户添加的所有已经设置的ddl

  - request parameter

    ~~~json
    {
     date:"2020-03-04" //就一天
     offset: 0 //偏移 默认为0
     count: // -1时候代表全部   >=0时候返回数据库中前count条，默认为-1 
    }
    ~~~

    response result: 

    ~~~json
    	all_count: 10, //总的数量
    	return_count:10, //返回的数量
    	data:[
        {
            ddl_id:123123,
            ddl_date:"2020-03-04",//设置ddl的时间
            ddl_time:"09:00" //xx:xx的格式
    		notify_id:123,
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件
          	//这里不需要额外的ddl id了
    	},
        {
    		notify_id:124,
            ddl_date:"2020-03-04",//设置ddl的时间
            ddl_time:"09:00" //xx:xx的格式
            notify_title:"2020-2021学年纯下学期xxxx通知",
            notify_type:"重要通知" //
            notify_from:"计算机科学与技术学院",
            notify_read:true,
            notify_set_top:false, //是否置顶
            notify_collect:true, //是否收藏
            notify_enclosure:true, //是否含有附件    
           //和上方的有些许出入
    	},
        ]
    ~~~





### 3.添加一个ddl

  - url : /api/ddl/add

  - method: post

  - description: 用户增加一个ddl

  - request parameter

    ~~~json
    {
    	ddl_date:"2020-01-02",//设置ddl的时间
        ddl_time:"09:00" //xx:xx的格式，
        notify_id:123, //设置本通知的id
    }
    ~~~

    添加失败（比如已经有一个对应通知的ddl了 或者其他原因，ddl_id为null，status为fail

    response result: 
    
    ~~~json
    {
    	ddl_id:123
    }
    ~~~
    
    

### 4.修改一个ddl的时间信息

  - url : /api/ddl/modify

  - method: post

  - description: 用户修改某个ddl的信息

  - request parameter

    ~~~json
    {
    	ddl_date:"2020-01-02",//设置ddl的时间
        ddl_time:"09:00" //xx:xx的格式，
        ddl_id:1212312
    }
    ~~~

    **如果该ddl_id不属于本同学，直接返回status:false,**

    **如果ddl_id不存在，也请直接返回status:false**

    response result: 

    ~~~json
    {
    	ddl_date:"2020-01-02",//新的ddl的数据
        ddl_time:"09:00" //xx:xx 新的设置的
        ddl_id:1212312
    }
    ~~~

    

### 5.删除一个ddl

  - url : /api/ddl/delete

  - method: post

  - description: 用户删除某个ddl

  - request parameter

    ~~~json
    {
        ddl_id:1212312
    }
    ~~~

    **如果该ddl_id不属于本同学，直接返回status:false,**

    **如果ddl_id不存在，也请直接返回status:false**

    response result: 

    ~~~json
    {
    	description:"success" //或者其他错误信息用于调试
    }
    ~~~



### 6.获取用户默认的ddl前提醒时间

  - url : /api/ddl/remind/detail

  - method: get

  - description: 用户刚注册是默认ddl提醒时间为两天之前上午九点，之后在小程序进入时候直接获取设置并全局存储。

  - request parameter

    ~~~json
    {
       无
    }
    ~~~

    如果该用户没有设置过，则ddl提醒时间为默认的两天之前上午九点，==振动==关，==每次都使用设定==关

    response result: 

    ~~~json
    {
    	ddl_day:1 //提前的天数， int
        ddl_time:"09:00" //xx:xx的形式字符串
        ddl_always:false //是否每次都是用
        ddl_shock：false, //是否震动  
    }
    ~~~

    

### 7.设置ddl前提醒时间

  - url : /api/ddl/remind/modify

  - method: post

  - description: 用户自定义ddl提前梯形时间

  - request parameter

    ~~~json
    {
      	ddl_day:1 //提前的天数， int
        ddl_time:"09:00" //xx:xx的形式字符串
        ddl_always:false //是否每次都是用
        ddl_shock：false, //是否震动  
    }
    ~~~

    如果传的参数不合法，直接返回status:false即可

    response result: 

    ~~~json
    {
    	description:"success" //或者其他错误信息用于调试
    }
    ~~~

    

### 8.获取消息推送时段

好像没有删除和修改功能

  - url : /api/ddl/pushtime/list

  - method: get

  - description: 获取用户设置的消息推送时段

  - request parameter

    ~~~json
    {
    	无
    }
    ~~~

    这个就不搞分页了，直接全传回来算了

    response result: 

    ~~~json
    {
     all_count: 10,
     data:[
         {
             time_id:123,
             time_from:"xx:xx",
             time_to:"xx:xx",
             time_open:false //是否启用
         },
         {
             time_id:123,
             time_from:"xx:xx",
             time_to:"xx:xx"
         }
     ]
    }
    ~~~

    

### 9.增加一个消息推送时段

  - url : /api/ddl/pushtime/add

  - method: post

  - description: 获取用户设置的消息推送时段

  - request parameter

    ~~~json
    {
         time_from:"xx:xx",
         time_to:"xx:xx",	
    }
    ~~~

    **新建的时候默认time_open为true**

    response result: 

    ~~~json
    {
     description:"success" //或者错误的详细信息方便调试
    }
    ~~~

    

