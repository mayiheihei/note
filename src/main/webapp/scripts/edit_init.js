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
    /*注意这里能不能把li放前面，视频中，老师刚开始全放前面的，后来放后面。能不能把li放前面？
        答：不能放前面，可以把ul放前面，因为li是动态生成的，而pc_part_2 和ul都是固定的，jquery的选择器只能选到固定的，再由on的第二参
        数选到动态生成的元素上。*/
    $('#pc_part_2').on('click', 'li .btn_slide_down', showNoteSubMenu);

    //绑定删除笔记按钮事件
    $('#pc_part_2 ul').on('click', 'li .btn_delete', deleteNoteAction);

    //关闭子菜单
    /*注释1号：为什么点击下拉不出那三个按钮狂，
     因为点击弹出时候，click事件传播到此方法，又会关闭，所以需要false*/
    $('body').click(hideNoteSubMenu);
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
    // console.log(this);
    btn.parent().next().toggle(200);//.show();
    return false;//阻断冒泡传播，阻止click事件传播，防止触发关闭下拉方法：注释1号关联
}

function hideNoteSubMenu() {
    $('#pc_part_2 .note_menu').hide(200);
}