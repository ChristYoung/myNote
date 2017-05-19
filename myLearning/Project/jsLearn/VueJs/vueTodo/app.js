var list = [
	{
		title:"吃饭打豆豆",
		isChecked:false //状态为false，为不选中  任务未完成
	},
	{
		title:"妙味课堂",
		isChecked:true   //状态为true，为选中    任务完成
	}
];

new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edtorTodos:'',  //记录正在编辑的数据
		beforeTitle:'' //记录正在编辑的数据的title
	},
	computed:{
		noCheckeLength:function(){
			return this.list.filter(function(item){
                return !item.isChecked
            }).length
		}
	},
	methods:{
		addTodo(){  //添加任务
			if(this.todo == ''){
				alert('不能填写空的任务!');
			}else{
				this.list.push({//事件处理函数的this指向的是,当前这个根实例
					title:this.todo,
					isChecked:false
				});
				this.todo = '';
			}
		},
		deleteTodo(todo){ //删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		edtorTodo(todo){  //编辑任务
			console.log(todo);
			this.beforeTitle = todo.title; //编辑任务的时候，记录一下编辑这条任务的title，方便在取消编辑的时候重新给之前的title

			this.edtorTodos = todo;
		},
		edtorTodoed(todo){ //编辑任务成功
			this.edtorTodos = '';
		},
		cancelTodo(todo){  //取消编辑任务
			todo.title = this.beforeTitle;
			this.beforeTitle = '';
			this.edtorTodos = ''; //让div显示出来，input隐藏
		}
	},
	directives:{ //自定义指令
		"foucs":{
			update(el,binding){ //钩子函数:update 在被绑定元素所在的模板更新时调用,el:指令所绑定的元素,可以用来直接操作dom
				if(binding.value){ //value是表达式计算的结果
					el.focus();
				}
			}
		}
	}
});