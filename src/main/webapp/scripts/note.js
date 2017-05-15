/*note.js 用于存储于笔记操作有关的js脚本*/
var SUCCESS = 0;


var noteTemplate = "<li class='online'>"
    + "	<a class=''>"
    + "		<i class='fa fa-file-text-o' title='online' rel='tooltip-bottom'></i> [title]"
    + "		<button type='button' class='btn btn-default btn-xs btn_position btn_slide_down'>"
    + "			<i class='fa fa-chevron-down'></i>"
    + "		</button>"
    + "	</a>"
    + "	<div class='note_menu' tabindex='-1'>"
    + "		<dl>"
    + "			<dt>"
    + "				<button type='button' class='btn btn-default btn-xs btn_move' title='移动至...'>"
    + "					<i class='fa fa-random'></i>"
    + "				</button>"
    + "			</dt>"
    + "			<dt>"
    + "				<button type='button' class='btn btn-default btn-xs btn_share' title='分享'>"
    + "					<i class='fa fa-sitemap'></i>"
    + "				</button>"
    + "			</dt>"
    + "			<dt>"
    + "				<button type='button' class='btn btn-default btn-xs btn_delete' title='删除'>"
    + "					<i class='fa fa-times'></i>" + "				</button>" + "			</dt>"
    + "		</dl>" + "	</div>" + "</li>";

function showNotesAction() {

    var li = $(this);// 此句只是为了给初学者看的懂

    // 设置笔记本被选中样式
    li.parent().find("a").removeClass("checked");
    li.children("a").addClass("checked");
    var id = li.data("notebookId");

    //选定笔记本之后，在右边笔记列表的UL上绑定 notebookId
    var ul = $('#pc_part_2 ul');
    ul.data('notebookId', id);

    // console.log("notebookId:-----------------"+id);
    var url = "note/list.do";
    var data = {
        notebookId: id
    };
    $.getJSON(url, data, function (result) {
        console.log(result);
        if (result.state == SUCCESS) {
            var list = result.data;
            // 显示全部笔记
            showNotes(list);
        } else {
            alert(result.message);
        }

    });
}

//打开新增笔记对话框
function openAddNoteDialog() {
    //获取当前笔记本的ID, 如果没有, 则不能打开对话框
    var ul = $('#pc_part_2 ul');
    var id = ul.data('notebookId');
    // console.log("我是id-------"+id);
    //alert('我是id------'+id);
    if (!id) {
        alert("先选定笔记本!");
        return;
    }

    var url = "alert/alert_note.html";
    $("#can").load(url);
    $(".opacity_bg").show();
}

//新增笔记
function addNoteAction() {
    var title = $("#input_note").val();
    if (title == "" || title.replace(/\s/g, "") == "") {
        return;
    }
    var ul = $('#pc_part_2 ul');
    var id = ul.data('notebookId');
    if (!id) {
        return;
    }
    var url = "note/add.do";
    var data = {userId: getCookie("userId"), notebookId: id, title: title};
    $.post(url, data, function (result) {
        if (result.state == SUCCESS) {
            var note = result.data;

            //TODO 这块内容哪里用了？
            // $("#input_note_title").data('note',note);

            //添加成功后把标题赋值到标题输入框位置
            $("#input_note_title").val(note.title);

            //因为只有标题，这里类似清空笔记body内容。
            um.setContent(note.body);

            //更新笔记列表区域
            var ul = $('#pc_part_2 ul');
            li = noteTemplate.replace(
                '[title]', note.title);
            li = $(li);
            ul.prepend(li);
            //更新选定效果
            ul.find('a').removeClass('checked');
            li.find('a').addClass('checked');
            //关闭对话框
            closeDialog();
        } else {
            alert(result.message);
        }
    });
}

function showNotes(notes) {
    // 派生选择器找到ul
    var ul = $("#pc_part_2 ul");
    ul.empty();
    console.log(ul);
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        var li = noteTemplate.replace("[title]", note.title);
        /*li = "<li>我是测试</li>"  如果li中直接写html字符串,就等价于$(this)*/
        console.log(li);
        li = $(li).data("noteId", note.id);
        ul.append(li);
    }
}

function showNoteAction() {
    var li = $(this);
    var url = "note/load.do";
    var noteId = li.data("noteId");
//	console.log("noteId:::::"+noteId);
    data = {
        noteId: noteId
    };

    //设置选定笔记列表元素效果,先找到选中元素的父元素清空效果，在找到选中元素并添加选中效果
    li.parent().find('a').removeClass('checked');
    li.find('a').addClass('checked');

    //加载笔记信息.
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            /*console.log(result.data.title);
             console.log(result.data.body);*/

            $("#input_note_title").data("noteId", result.data.id);
            $("#input_note_title").data("title", result.data.title);
            $("#input_note_title").data("body", result.data.body);
            $("#input_note_title").val(result.data.title);
            um.setContent(result.data.body);
        } else {
            alert(result.message);
        }
    });
}

//note.js
function updateNoteAction() {
    //获取用户输入title
    //获取用户输入body
    var noteId = $('#input_note_title').data('noteId'); //获取noteId,修改前后noteId是不会变的
    var oldTitle = $('#input_note_title').data('title');//获取修改之前的noteTitle,标题会变。
    var oldBody = $('#input_note_title').data('body');//获取修改之前的body，内容会变
    console.log("noteId::::" + noteId);
    //提交到服务器
    var title = $('#input_note_title').val();//获取修改后的title标题
    var body = um.getContent();//获取修改后的body
    var url = 'note/update.do';
    var data = {};
    if (title != "" && title != oldTitle) {
        data.title = title;
    }
    if (body != oldBody) {
        data.body = body;
    }
    data.noteId = noteId;
    /*var data = {
     noteId: noteId,
     title: title,
     body: body
     };*/
    $.post(url, data, function (result) {
        if (result.state == SUCCESS) {
            console.log("Update Success!");
            //修改客户端保存的笔记信息属性
            /*note.title = title;
             note.body = body;*/
            //找到笔记本列表中的全部笔记信息,修改其title
            //list: 包含笔记标题的全部li元素
            var list = $('#pc_part_2 ul li');

            list.each(function () {
                //li 是 dom 对象, 是每个li元素
                var li = $(this);//这样就转换为jQuery元素了
                console.log(li);
                //取出li元素上绑定的 noteId
                var id = li.data('noteId');
                //如果当前的笔记ID与li上的笔记ID一致
                //找到当正在选定的 笔记
                if (id == noteId) {
                    //替换笔记的标题
                    var newLi = noteTemplate.replace('[title]', title);
                    newLi = $(newLi);
                    li.html(newLi.html());
                    //增加新选定效果
                    li.find('a').addClass('checked');
                }
                //关闭对话框 TODO 关闭对话框还没写。
                closeDialog();
            });
        } else {
            alert(result.message);
        }
    });
}

function test() {
    var a = 5;
    var b = 6;
    var c = a + b;
    console.log(c);
}