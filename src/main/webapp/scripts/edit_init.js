/*scripts/edit_init.js*/
var SUCCESS = 0;

$(function () {
    // 初始化edit.html 页面
    var userId = getCookie("userId");
    console.log(userId);
    // 网页加载以后立即加载笔记本列表信息
    loadNotebooksAction();
    //点击#add_notebook时候打开添加笔记本对话框---------开始------------
    $("#add_notebook").click(openAddNotebookDialog);
    // 绑定笔记本对话框中的添加笔记本按钮事件
    $("#can").on("click", ".add-notebook", addNotebookAction);
    // 利用事件冒泡，在can上绑定关闭按钮
    $("#can").on("click", ".close,.cancel", closeDialog);
    //点击#add_notebook时候打开添加笔记本对话框---------结束------------

    //点击#add_note时候，打开添加笔记对话框---------开始------------
    $("#add_note").click(openAddNoteDialog);
    //打开对话框后，绑定笔记对话框的创建笔记按钮事件
    $("#can").on("click",".add-note",addNoteAction);

    //点击#add_note时候，打开添加笔记对话框---------结束------------

    //绑定笔记本列表点击事件
    $("#notebooks").on("click", "li", showNotesAction);
    /*		function() {
     // $(this)就是当前的对象li
     console.log($(this));
     var id = $(this).data("notebookId");
     console.log($(id));
     });*/

    //绑定笔记列表点击事件
    $("#pc_part_2 ul").on("click", "li", showNoteAction);

    //绑定保存笔记事件
    $('#save_note').click(updateNoteAction);

    //显示回收站
    $("#rollback_button").click(switchRollback);

    //绑定显示笔记子菜单的弹出事件
    $('#pc_part_2').on('click', 'li .btn_slide_down', showNoteSubMenu);

    //关闭子菜单
    $('body').click(hideNoteSubMenu);
    /*注释1号：为什么点击下拉不出那三个按钮狂，
     因为点击弹出时候，冒泡事件传播到此方法，又会关闭，所以需要false*/

    //绑定删除笔记按钮事件
    $('pc_part_2 ul').on('click', 'li .btn_delete', deleteNoteAction);
});

function deleteNoteAction() {
    var btn = $(this);
    var id = btn.parents('li').first().data('noteId');
    //ajax
    console.log('删除' + id);
}

//通用关闭对话框
function closeDialog() {
    $("#can").empty();
    $(".opacity_bg").hide();
}

//回收站事件
function switchRollback() {
    //检查回收站是否打开，如果打开就关闭，并且开启笔记列表，如果是关闭状态就关闭其他列别
    //回收站

    // pa_part_8//参加活动笔记列表
    // pa_part_7//收藏笔记
    // pa_part_6//搜索笔记列表
    // pa_part_4//回收站
    // pa_part_2//笔记列表
    $("#pc_part_8").hide();
    $("#pc_part_7").hide();
    $("#pc_part_6").hide();
    if ($("#pc_part_4").css("display") == "block") {
        $("#pc_part_4").hide();
        $("#pc_part_2").show();
    } else {
        $("#pc_part_4").show();
        $("#pc_part_2").hide();
    }
}

//滑动下拉框
function showNoteSubMenu() {
    var btn = $(this);
    btn.parent().next().toggle(200)//.show();
    return false;//注释1号关联
}

function hideNoteSubMenu() {
    $('#pc_part_2 note_menu').hide(200);
}