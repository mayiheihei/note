/*scripts/notebook.js*/
var SUCCESS = 0;

var notebookTemplate = "<li class='online'> "
	+ "<a class=''> "
	+ "<i class='fa fa-book' title='online' rel='tooltip-bottom'></i> "
	+ "[name]" + "</a> " + "</li>";

/**
 * 用于加载笔记本列表信息 在页面加载以后立即执行
 * 
 * @returns
 */
function loadNotebooksAction() {
	console.log("loadNotebooksAction");
	var url = "notebook/list.do";
	var data = {
		userId : getCookie("userId")
	};
	console.log(data);
	$.getJSON(url, data, function(result) {
		console.log(result);
		if (result.state == SUCCESS) {
			var list = result.data;
			console.log(list);
			// 将笔记本列表显示到页面上
			showNotebooks(list);
		} else {
			var msg = result.message;
			alert(msg);
		}
	});
}

/* 笔记本 */



function showNotebooks(notebooks) {
	// 1、清空ul
	$("#notebooks").empty();
	// 2、遍历notebooks
	for (var i = 0; i < notebooks.length; i++) {
		var notebook = notebooks[i];
		// 3、为每个notebook创建一个li,将模版[name]替换为笔记本名即为li
		var li = notebookTemplate.replace("[name]", notebook.name);
		// console.log("第一个"+li);
		//绑定并进行对象转换，从dom对象转成了jquery对象。（有待确定）
		li = $(li).data("notebookId",notebook.id);
		// console.log("第二个"+li);
		// 4、将li添加到ul
		$("#notebooks").append(li);
	}

}

//TM自己添加
/*function addNotebook(){
	var url = "notebook/addNotebook.do";
	var userId = "39295a3d-cc9b-42b4-b206-a2e7fab7e77c";
	var name = "赵明SD";
	var data = {userId:userId,name:name};
	$.post(url,data,function(result){
		if (result.state == SUCCESS) {
			var list = result.data;
			console.log(list);
			showNotebooks(list);
		} else {
			var msg = result.message;
			alert(msg);
		}
	});
}*/

function openAddNotebookDialog() {
	var url = "alert/alert_notebook.html";
	$("#can").load(url);
	$(".opacity_bg").show();
}
/*
 * var url = "notebook/addNotebook.do"; var userId =
 * "39295a3d-cc9b-42b4-b206-a2e7fab7e77c"; var name = "赵明SD"; var data =
 * {userId:userId,name:name}; $.post(url,data,function(result){ if (result.state ==
 * SUCCESS) { var list = result.data; console.log(list); showNotebooks(list); }
 * else { var msg = result.message; alert(msg); } });
 */
function addNotebookAction() {
	var name = $("#input_notebook").val();
	// 判断name是否为空，并
	if (!name || name.replace(' ', '') == "") {
		return;
	}
	var url = "notebook/save.do";
	var data = {
		userId : getCookie("userId"),
		name : name
	};
	console.log(data);
	$.post(url, data, function(result) {
		console.log(result);
		// 将新的笔记本信息插入到笔记本
		//
		if (result.state == SUCCESS) {
			var notebook = result.data;
			console.log(notebook.name);
			var li = notebookTemplate.replace("[name]", name);
			$("#notebooks").prepend(li);
			// var list = result.data;
			// showNotebooks(list);// 刷新列表
			closeDialog();// 关闭添加框
		} else {
			alert(result.message );
		}
	});

}

