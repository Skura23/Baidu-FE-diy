window.onload = function(){
var lefBar = document.querySelector('.lef-bar');
var midBar = document.querySelector('.mid-bar');
var rigBar = document.querySelector('.rig-bar');
var folderLists = lefBar.querySelector('.folder-list').getElementsByTagName('li');

var addFolderBtn = lefBar.querySelector('.bot-bar');
var addTaskBtn = midBar.querySelector('.bot-bar');
console.log(folderLists)
var data = [];


function addFolder(){
	var lightedFolder = lefBar.querySelector('.lighted');
	var folderName = prompt('请输入分类名称', '');
	//prompt内容空则返回
	return !folderName;
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
		oSpan.dataset.path = lightedFolder.dataset.path + '/' + folderName;
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
		rootLists[i].querySelector('span').dataset.path = rootLists[i].querySelector('span').textContent;
		rootLists[i].querySelector('span').dataset.layer = 0;
	}
	//为每个li添加可高亮功能
	for( var i = 0; i < folderLists.length; i++){
		var folderTitle = folderLists[i].querySelector('span');

		folderTitle.onclick = function(){
			removeLight();
			this.classList.add('lighted')
		}
	}
	console.log(folderLists)
}
function addPath(list){

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
	if(lightedFolder){

	}else{
		alert('请先选中分类')
	}
}

}