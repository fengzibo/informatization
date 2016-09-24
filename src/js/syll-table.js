/**
 * Created by wulinbo on 16/9/24.
 */
// 显示已选单元格编号
function ShowSelected()
{
    var result = $("#select-result").empty();
    var isEmpty = true;
    var tds = $("th,td", $("#syll-table"));
    tds.filter(".ui-selected").each(function(){
        result.append("#" + (tds.index(this) + 1) + " ");
        isEmpty = false;
    });
    if (isEmpty) result.append("无");
}
// 合并单元格按钮
function MergeCells(){
    var $t = $("#syll-table");

    if ($("table", $t).length > 0) {
        alert("不支持嵌套表格！");
        return;
    }

    var sigDel = "sign4delete";  // 删除标记，用作类名
    var sigSel = "ui-selected";  // 选中标记，用作类名

    // 补充单元格以便后继正确计算坐标
    $("th,td", $t).each(function(){
        // 坐标要实时计算，因会实时补充
        var ridx = $("tr", $t).index($(this).parent("tr"));
        var cidx = $(this).parent().children("th,td").index(this);
        var rowspan = Number($(this).attr("rowspan")) || 1;
        var colspan = Number($(this).attr("colspan")) || 1;
        var isSel = $(this).hasClass(sigSel);
        // 非选单元格拆出的单元格要加删除标记

        if (rowspan <= 1 && colspan <= 1)
            return;
        // 跨格开插
        $("tr", $t).each(function(){
            var idx = $("tr", $t).index(this);
            var arr, $td = $("<td>").addClass(isSel ? sigSel : sigDel);

            if (idx == ridx) {
                // 本行在 [cidx] 后插入 colspan-1 个

                arr = $();  // 准备待插单元格
                for (var i=0; i < colspan-1; i++)
                    arr = arr.add($td.clone());
                // 插入
                $("th,td", this).eq(cidx).after(arr);

            } else if (ridx < idx && idx < ridx + rowspan) {
                // 以下行在 [cidx] 前插入 colspan 个

                arr = $();  // 准备待插单元格
                for (var i=0; i < colspan; i++)
                    arr = arr.add($td.clone());
                // 插入
                if (cidx > 0 && $("th,td", this).eq(cidx - 1).length > 0)
                    $("th,td", this).eq(cidx - 1).after(arr);
                else if ($("th,td", this).eq(cidx).length > 0)
                    $("th,td", this).eq(cidx).before(arr);
                else
                    $(this).prepend(arr);
            }
        });
    });

    var rmin = 10000, cmin = 10000;
    var rmax = 0    , cmax = 0    ;
    var rnum        , cnum        ;
    // 计算起始和跨距
    $("th,td", $t).filter("." + sigSel).each(function(){
        var ridx = $("tr", $t).index($(this).parent("tr"));
        rmin = ridx < rmin ? ridx : rmin;
        rmax = ridx > rmax ? ridx : rmax;
        var cidx = $(this).parent().children("th,td").index(this);
        cmin = cidx < cmin ? cidx : cmin;
        cmax = cidx > cmax ? cidx : cmax;
    });
    rnum = rmax - rmin + 1;
    cnum = cmax - cmin + 1;

    // 合并单元格
    $("th,td", $t).each(function(){
        var ridx = $("tr", $t).index($(this).parent("tr"));
        var cidx = $(this).parent().children("th,td").index(this);
        // 标记单元格待删
        if (rmin <= ridx && ridx <= rmax
            && cmin <= cidx && cidx <= cmax)
            $(this).addClass(sigDel);
        // 处理被选左上角单元格
        if (ridx == rmin && cidx == cmin)
            $(this).removeClass(sigDel).attr({rowspan: rnum, colspan: cnum});
        // 清理残余
        if ($(this).attr("rowspan") == 1) $(this).removeAttr("rowspan");
        if ($(this).attr("colspan") == 1) $(this).removeAttr("colspan");
    }).remove("." + sigDel);
    // 移除标记单元格

    ShowSelected();  // 更新选择结果文字
}
// 拆分单元格按钮
function SplitCells(){
    var $t = $("#syll-table");

    if ($("table", $t).length > 0) {
        alert("不支持嵌套表格！");
        return;
    }

    var sigDel = "sign4delete";  // 删除标记，类名，自定义
    var sigSel = "ui-selected";  // 选中标记，类名，jQuery UI 定义

    // 补充单元格以便后继正确计算坐标
    $("th,td", $t).each(function(){
        // 坐标要实时计算，因会实时补充
        var ridx = $("tr", $t).index($(this).parent("tr"));
        var cidx = $(this).parent().children("th,td").index(this);
        var rowspan = Number($(this).attr("rowspan")) || 1;
        var colspan = Number($(this).attr("colspan")) || 1;
        var isSel = $(this).hasClass(sigSel);
        // 非选单元格拆出的单元格要加删除标记

        if (rowspan <= 1 && colspan <= 1)
            return;

        if (isSel)
            $(this).removeAttr("colspan").removeAttr("rowspan");

        // 跨格开插
        $("tr", $t).each(function(){
            var idx = $("tr", $t).index(this);
            var arr, $td = $("<td>");

            if (!isSel)
                $td.addClass(sigDel);

            if (idx == ridx) {
                // 本行在 [cidx] 后插入 colspan-1 个

                arr = $();  // 准备待插单元格
                for (var i=0; i < colspan-1; i++)
                    arr = arr.add($td.clone());

                $("th,td", this).eq(cidx).after(arr);

            } else if (ridx < idx && idx < ridx + rowspan) {
                // 以下行在 [cidx] 前插入 colspan 个

                arr = $();  // 准备待插单元格
                for (var i=0; i < colspan; i++)
                    arr = arr.add($td.clone());

                if (cidx > 0 && $("th,td", this).eq(cidx - 1).length > 0)
                    $("th,td", this).eq(cidx - 1).after(arr);
                else if ($("th,td", this).eq(cidx).length > 0)
                    $("th,td", this).eq(cidx).before(arr);
                else
                    $(this).prepend(arr);
            }
        });
    });

    // 重新获取以取到删者并删之
    $("th,td", $t).remove("." + sigDel);

    ShowSelected();  // 更新选择结果文字
}