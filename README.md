# byefn  

### 技术

	|-- git版本管理
	|-- pm2 是一个带有负载均衡功能的Node应用的进程管理器
	|	 	npm install -g pm2
	
	

### git管理

> git pull 更新代码
>
> git add .
> 
> git status
> 
> git commit -m 'add somting'
> 
> git push origin master

	初始化 本地仓库 git init 
	
	查看修改文件 git status
	查看修改内容 git diff readme.txt
	
	添加 git add .
	提交 git commit -m 'add somting'
	
	touch .gitignore
	// 创建过滤文件
	
	
 	远程仓库 //备注: byefn:远程仓库名字;
	git remote add byefn(name) git@github.com:bluenesscrab/byefn.git
	
	git remote add origin git@github.com:bluenesscrab/byefn.git
	
	git push -u origin master
	// 第一次提交需要加上 -u 以后就不用
	git push origin master
	
	
## webpack + express
	
	npm init
	npm install express --save
	npm install
	
package.json
	
	{
	  "name": "site-pc",
	  "version": "1.0.0",
	  "description": "",
	  "main": "server.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "start": "node server.js"
	  },
	  "author": "",
	  "license": "ISC",
	  "devDependencies": {
	    "babel-core": "^6.25.0",
	    "babel-loader": "^7.0.0",
	    "babel-preset-react": "^6.24.1",
	    "css-loader": "^0.28.4",
	    "style-loader": "^0.18.2",
	    "webpack": "^2.6.1"
	  },
	  "dependencies": {
	    "express": "^4.15.3",
	    "react": "^15.5.4",
	    "react-dom": "^15.5.4"
	  }
	}
	
server.js

	const express = require('express');
	const fs = require('fs');
	const path = require('path');
	const app = express(); 
	
	app.use(express.static(path.join(__dirname, 'www'), {index: false}));
	app.get('*', function(req, res){ 
	  function readFileCallBack(err, data) { 
	    if (err) {
	      console.error(err); 
	    } else {
	      res.send(data);
	    }
	  }
	  fs.readFile('www/index.html', 'utf-8', readFileCallBack);
	}); 
	app.listen('1818');
	console.log('listen localhost:1818');
	
webpack.config.js

	var webpack = require('webpack');
	module.exports = {
	  //entry:  __dirname + "/app/main.js",
	  //已多次提及的唯一入口文件
	  entry: {
	    index:  __dirname + "/www/src/index.js"
	  },
	  // plugins:  [
	  //   new webpack.optimize.CommonsChunkPlugin('common.js'),
	  //   new ExtractTextPlugin("styles.css")  
	  // ],
	  output: {
	    path: __dirname + "/www/build",
	    //打包后的文件存放的地方
	    filename: "[name].js"//打包后输出文件的文件名
	  },
	  module: {
	    loaders:[
	      { 
	        test: /\.css$/,
	        exclude: /node_modules/,
	        loader: "style-loader!css-loader"
	      },
	      { 
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: "babel-loader",
	        query: {presets: ['react']}
	      }
	    ]
	  }
	}
	
## hexo
	
	sudo npm install -g hexo
	hexo init
	
	生成静态页面 hexo generate（hexo g也可以） 
	
	启动本地服务 hexo server（hexo s也可以）

更换主题：	
	
	下载一个主题安装到 /themes/ 下
	
	修改hexo根目录下 _config.yml
	
	在运行过程中无法使用该主题时，报了cannot find module 'hexo-util' 之类的错，请进入该主题目录，安装依赖：
		$ npm install  
		$ bower install  
			sudo 命令后或者当前用户为 root:
			bower install --allow-root
		
	不过这样还无法运行，需要在对主题进行build
	npm install -g grunt-cli  
	grunt build  
	
	回到根目录
	hexo g
	hexo s
	
	hexo server -p 5000 更换端口

Linux下gulp报错Error：watch ENOSPC如何解决	

	Error: watch /root/byefn/develop/site-pc/www/blog/themes/tranquilpeak/node_modules/es5-ext/string/from-code-point/implement.js ENOSPC
    at exports._errnoException (util.js:1050:11)
    at FSWatcher.start (fs.js:1398:19)
    at Object.fs.watch (fs.js:1424:11)

解决方案:

	当前问题主要是因为gulp的watch需要监听很多文件的改动，但是fedora、ubuntu系统的文件句柄其实是有限制的，因此可以使用以下命令：
	echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p





