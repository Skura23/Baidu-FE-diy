window.onload = function(){
var lefBar = document.querySelector('.lef-bar');
var midBar = document.querySelector('.mid-bar');
var rigBar = document.querySelector('.rig-bar');
var editPanel = document.querySelector('.cont-edit');
var disPanel = document.querySelector('.cont-dis');
var folderLists = lefBar.querySelector('.folder-list').getElementsByTagName('li');

var addFolderBtn = lefBar.querySelector('.bot-bar');
var addTaskBtn = midBar.querySelector('.bot-bar');
var confBtn = rigBar.querySelectorAll('button')[0];
var cancelBtn = rigBar.querySelectorAll('button')[1];

console.log(cancelBtn)
var data = [];


function addFolder(){
	var lightedFolder = lefBar.querySelector('.lighted');
	var folderName = prompt('请输入分类名称', '');
	//prompt内容空则返回
	if(!folderName){
		return;
	}
	var oUl = document.createElement('ul');
	var oLi = document.createElement('li');
	var oSpan = document.createElement('span');
	oSpan.textContent = folderName;
	oLi.appendChild(oSpan);
	oUl.appendChild(oLi);
	//判断添加位置
	if(lightedFolder){
		oSpan.className = 'file';
		//为新增分类添加数据data-path
		oSpan.dataset.path = lightedFolder.dataset.path + folderName + '/';
		oSpan.dataset.layer = 1;
		lightedFolder.parentNode.appendChild(oUl);
	}else {
		lefBar.querySelector('.folder-list').appendChild(oLi);
	}
	initialize()
}
addFolderBtn.onclick = addFolder;

function initialize(){
	var rootLists = lefBar.querySelector('.folder-list').children;
	for( var i = 0; i < rootLists.length; i++){
		rootLists[i].querySelector('span').dataset.path = rootLists[i].querySelector('span').textContent + '/';
		rootLists[i].querySelector('span').dataset.layer = 0;
	}
	//为每个li添加可高亮功能
	for( var i = 0; i < folderLists.length; i++){
		var folderTitle = folderLists[i].querySelector('span');

		folderTitle.onclick = function(){
			removeLight();
			this.classList.add('lighted');
			renderMid()
		}
	}
	console.log(folderLists)

}

initialize();
function removeLight(){
	for( var i = 0; i < folderLists.length; i++){
		var folderTitle = folderLists[i].querySelector('span');
		folderTitle.classList.remove('lighted')
	}
}

addTaskBtn.onclick = addTask;

function addTask(){
	var lightedFolder = lefBar.querySelector('.lighted');
	
	//可进入编辑面板及进入后的功能设置
	if(lightedFolder){
		editPanel.classList.remove('not-show');
		disPanel.classList.add('not-show');
		//确认按钮功能
		confBtn.onclick = function(){
			var obj = {};
			var lightedFolder = lefBar.querySelector('.lighted');
			var inps = rigBar.getElementsByTagName('input');
			var txt = rigBar.getElementsByTagName('textarea')[0];
			obj.path = lightedFolder.dataset.path  + inps[0].value + '/';
			obj.title = inps[0].value;
			obj.date = inps[1].value;
			obj.cont = txt.value;
			console.log(obj)
			
			//此语句一定要放在循环外面，不然会出错！！
			data.push(obj)
			console.log(data)
			renderMid();
			
		}
		//取消按钮功能
		cancelBtn.onclick = function(){
			editPanel.classList.add('not-show');
			disPanel.classList.remove('not-show');
		}

	}else{
		alert('请先选中分类')
	}
}

function renderMid(oTitle, editCmd, midSortType){
	var disData = [];
	var lightedFolder = lefBar.querySelector('.lighted');
	var centerBar = midBar.querySelector('.center-bar');
	//每次渲染先清空列表
	centerBar.innerHTML = '';
	for(var i = 0; i < data.length; i++){
		//将被点击分类的路径的所有任务放到disData里作为展示
		if(data[i].path.indexOf(lightedFolder.dataset.path) >= 0){
			disData.push(data[i])
		}
	}

	//根据筛选类型筛选disData
	if(midSortType == 'all'){

	}else if(midSortType == 'yes'){
		var yesData = [];
		for(var i = 0; i < disData.length; i++){
			if(disData[i].checked){
				yesData.push(disData[i])
			}
		}
		disData = yesData;
	}else if(midSortType == 'not'){
		var notData = [];
		for(var i = 0; i < disData.length; i++){
			if(!disData[i].checked){
				notData.push(disData[i])
			}
		}
		disData = notData;
	}
	
	//相同标题时的处理方案
	//点击编辑按钮时
	if(editCmd){
		for(var i = 0; i < data.length; i++){
			if(data[i].title == data[editCmd[0]].title && i != editCmd[0]){
				alert('标题重复');
				data[editCmd[0]].title = editCmd[1]
			}
		}
	}else{
		//点击添加按钮时
		//数据数组长度为1时无需检查
		if(disData.length > 1){
			var allOldTitles = [];
			for(var i = 0; i < disData.length - 1; i++){
				allOldTitles.push(disData[i].title)
			}
			if(allOldTitles.includes(disData[disData.length-1].title)){
				alert('标题重复');
				data.pop();
				renderMid();
				return
			}
		}
	}
	if(!disData){
		return;
	}
	var disDate = [];
	var disTitle = [];

	//获取查重后的日期
	for(var i = 0; i < disData.length; i++){
		if (!disDate.includes(disData[i].date)) {
			disDate.push(disData[i].date)
		}
	}
	function sortNum(a, b){
		return a - b;
	}
	disDate.sort(sortNum);
	for(var p = 0; p < disDate.length; p++){
		var temp = [];
		for(var i = 0; i < disData.length; i++){
			if(disData[i].date == disDate[p]){
				
				temp.push(disData[i].title);
			}
		}
		disTitle.push(temp)
	}
	console.log(disDate)
	console.log(disTitle)
	//渲染mid
	for(var i = 0; i < disDate.length; i++){
		var oP1 = document.createElement('p');
		oP1.className = 'dates';
		oP1.textContent = disDate[i];
		centerBar.appendChild(oP1);
		for(var t = 0; t < disTitle[i].length; t++){
			var oP2 = document.createElement('p');
			oP2.classList.add('titles');
			oP2.textContent = disTitle[i][t];
			//为mid的任务列表绑定数据
			oP2.dataset.title = disTitle[i][t];
			oP2.dataset.date = disDate[i];
			//通过title添加对应cont数据
			for(var p = 0; p < disData.length; p++){
				if(disData[p].title == disTitle[i][t]){
					oP2.dataset.cont = disData[p].cont
				} 
			}
			
			centerBar.appendChild(oP2);
			initMidClick();
			//触发新建节点的点击
			oP2.click();
		}
	}

	//将checked属性加入到最初数据
	var taskElems = document.getElementsByClassName('titles');
	for(var i = 0; i < disData.length; i++){
		if(disData[i].title == oTitle){
			disData[i].checked = true;
		}
	}
	//找到要添加checked的对应的elem
	for(var i = 0; i < disData.length; i++){
		if(disData[i].checked){
			for(var t = 0; t < taskElems.length; t++){
				if(taskElems[t].dataset.title == disData[i].title){
					taskElems[t].classList.add('checked')
				}
			}
		}
	}
	
}

//为任务列表绑定点击显示事件
function initMidClick(){
	var tasks = midBar.getElementsByClassName('center-bar')[0].getElementsByClassName('titles');
	for(var i = 0; i < tasks.length; i++){
		tasks[i].onclick = function(){
			for(var t = 0; t < tasks.length; t++){
				tasks[t].classList.remove('chosen');
			}
			this.classList.add('chosen');
			renderRig(this)
		}
	}
}

function renderRig(elem){
	disPanel.getElementsByTagName('h3')[0].innerHTML ='标题：'+ elem.dataset.title;
	disPanel.getElementsByTagName('p')[0].innerHTML = '日期：'+ elem.dataset.date;
	disPanel.getElementsByTagName('div')[0].innerHTML = elem.dataset.cont;
	editPanel.classList.add('not-show');
	disPanel.classList.remove('not-show');
}

//为右侧显示面板的右上角图标添加点击事件
function rigFunc(){
	var checkBtn = disPanel.getElementsByTagName('img')[0];
	var editBtn = disPanel.getElementsByTagName('img')[1];
	
	checkBtn.onclick = function(){
		var chosenTask = document.getElementsByClassName('chosen')[0];
		if(!chosenTask) return;
		chosenTask.classList.add('checked');
		var oTitle = chosenTask.dataset.title;
		console.log(oTitle)
		renderMid(oTitle);
	}
	editBtn.onclick = function(){
		var chosenTask = document.getElementsByClassName('chosen')[0];
		if(!chosenTask) return;
		editPanel.classList.remove('not-show');
		disPanel.classList.add('not-show');
		var inps = rigBar.getElementsByTagName('input');
		var txt = rigBar.getElementsByTagName('textarea')[0];
		inps[0].value = chosenTask.dataset.title;
		inps[1].value = chosenTask.dataset.date;
		txt.value = chosenTask.dataset.cont;
		//确认按钮功能
		confBtn.onclick = function(){
			var t = 0;
			for(var i = 0; i < data.length; i++){
				if(data[i].title == chosenTask.dataset.title){
					t = i;
				}
			}
			var editCmd = [t, chosenTask.dataset.title];
			var lightedFolder = lefBar.querySelector('.lighted');
			var inps = rigBar.getElementsByTagName('input');
			var txt = rigBar.getElementsByTagName('textarea')[0];
			data[t].path = lightedFolder.dataset.path + inps[0].value + '/';
			data[t].title = inps[0].value;
			data[t].date = inps[1].value;
			data[t].cont = txt.value;
			console.log(t)
			renderMid(null, editCmd);
		}
	}
}
rigFunc()

function midSort(){
	var btns = midBar.getElementsByTagName('span');
	var allBtn = midBar.getElementsByTagName('span')[0];
	var yesBtn = midBar.getElementsByTagName('span')[1];
	var notBtn = midBar.getElementsByTagName('span')[2];
	
	var midSortType = '';
	allBtn.onclick = function(){
		var lightedFolder = lefBar.getElementsByClassName('lighted')[0];
		initBtns(), this.classList.add('clicked');
		lightedFolder && ( midSortType = 'all', renderMid( null, null, midSortType));
	}
	yesBtn.onclick = function(){
		var lightedFolder = lefBar.getElementsByClassName('lighted')[0];
		initBtns(), this.classList.add('clicked');
		lightedFolder && ( midSortType = 'yes', renderMid( null, null,midSortType));
	}
	notBtn.onclick = function(){
		var lightedFolder = lefBar.getElementsByClassName('lighted')[0];
		initBtns(), this.classList.add('clicked');
		lightedFolder && ( midSortType = 'not', renderMid( null, null,midSortType));
	}
	function initBtns(){
		for(var i = 0; i < btns.length; i++){
			btns[i].classList.remove('clicked');
		}
	}
}
midSort()


}



/*常用方法：
通过属性值找对象
*/

