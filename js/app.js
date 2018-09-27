(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el: '#app',
		data: {
			newText: '',
			editList: '',
			listStaus:'',
			list: [
				{text:'吃饭',status:true},
				{text:'睡觉',status:false},
				{text:'看剧',status:false}
			]
			
		},
		methods: {
			//添加
			addData() {
				if (this.newText.trim() == '') {
					console.log('不能为空')
					this.newText = ''
					return
				}
				this.list.push({text: this.newText,status:false})
				this.newText = ''
				console.log(this.list)
			},
			//删除
			delData(index) {
				this.list.splice(index,1)
			},
			//勾选状态
			isShow(valueStatus) {
				switch (this.listStaus) {
					case 'all':
						return true
						break;
					case 'active':
						return !valueStatus
						break;
					case 'completed':
						return valueStatus
					default:
						return true
						break;
				}
			}
		},
		computed: {
			checkAll:{
				set(newValue){
					// console.log(newValue)
					this.list.forEach(value => {
						value.status = newValue
					});
				},
				get(){   //全选 全选框亮
					var tempList=this.list.filter(value => {
						// return value.status==false
						return !value.status
					})
					// console.log(tempList.length)
					return !tempList.length
				}		
			}
		},
		//存数值
		updated () {
			localStorage.setItem('todoList',JSON.stringify(this.list))
		},
		//页面刷新 读数值
		mounted() {
			if (!localStorage.getItem('todoList')) {  //如果里面没数值 返回
				return
			}
			this.list = JSON.parse(localStorage.getItem('todoList'))
		}
	})
})(window);