$(document).ready(function() {
    $("#game1Div").click(function(){
        if($("#game1Baoming").val()=='stop'){
            $("#addpersonalgamejoinButton").hide();
        }
        loadAllPersonalJoinOfGameByClubId($("#game1Type").val(),$("#game1Id").val(),"p");
        loadLeaderOfPersonal("pl");
    })
})
function loadLeaderOfPersonal(type){
    $("#leadertype").val(type);
    $.get("gamejoin/getLeaderOfGameJoin",{"clubid":$("#clubid").val(),"gameid":$("#game1Id").val(),"type":type},function(data){
        if(!data){
            $("#leaderinfo").html("没有设置领队信息");
        }else{
            $("#leaderinfo").html(data.baomingshijian+"<br>"+data.nianlingduan+"<br>"+data.jianzhong);
        }
    })
}
$(document).ready(function() {
    $("#personalgamejoinSearchbutton").click(function(){
        var sex=$("[name='PJsex']:checked").val();
        var jiaofei=$("[name='PJjiaofei']:checked").val();
        var jianzhong=$("[name='PJjianzhong']:checked").val();
        var zubie;
        if($("#game1Type").val()=='锦标赛'){
            zubie=$("[name='PJgroup1']:checked").val();
        }else{
            zubie=$("[name='PJgroup']:checked").val();
        }
        $("#personjoinTables tr:gt(0)").each(function() {
            $(this).show();
            if (sex != '全部') {
                if ($(this).children("td:eq(2)").text() != sex) {
                    $(this).hide();
                }
            }
            if (jiaofei != '全部') {
                if ($(this).children("td:eq(8)").text() != jiaofei) {
                    $(this).hide();
                }
            }
            if (jianzhong != '全部') {
                if ($(this).children("td:eq(4)").text() != jianzhong) {
                    $(this).hide();
                }
            }
            if (zubie != '全部') {
                if ($(this).children("td:eq(5)").text().indexOf(zubie)==-1) {
                    $(this).hide();
                }
            }
        });

    })

})
$(document).ready(function() {
    $("[name='PJsex']").click(function() {
        $("[name='PJsex']").each(function() {
            if ($(this).prop("checked")) {
                var s = $(this).val();
                if ($(this).val() == '全部') {
                    $("#personjoinTables tr").show();
                } else {
                    $("#personjoinTables tr").show();
                    $("#personjoinTables tr:gt(0)").each(function() {
                        if ($(this).children("td:eq(2)").html()!= s) {
                            $(this).hide();
                        }
                    })
                }
            }
        })
    });
})
$(document).ready(function() {
    $("[name='PJjiaofei']").click(function() {
        $("[name='PJjiaofei']").each(function() {
            if ($(this).prop("checked")) {
                var s = $(this).val();
                if ($(this).val() == '全部') {
                    $("#personjoinTables tr").show();
                } else {
                    $("#personjoinTables tr").show();
                    $("#personjoinTables tr:gt(0)").each(function() {
                        if ($(this).children("td:eq(8)").text().indexOf(s)==-1) {
                            $(this).hide();
                        }
                    })
                }
            }
        })
    });
})

$(document).ready(function() {
    $("[name='PJgroup1']").click(function() {
        $("[name='PJgroup1']").each(function() {
            if ($(this).prop("checked")) {
                var s = $(this).val();
                if ($(this).val() == '全部') {
                    $("#personjoinTables tr").show();
                } else {
                    $("#personjoinTables tr").show();
                    $("#personjoinTables tr:gt(0)").each(function() {
                        if ($(this).children("td:eq(5)").html().indexOf(s)==-1) {
                            $(this).hide();
                        }
                    })
                }
            }
        })
    });

    $("[name='PJgroup']").click(function() {
        $("[name='PJgroup']").each(function() {
            if ($(this).prop("checked")) {
                var s = $(this).val();
                if ($(this).val() == '全部') {
                    $("#personjoinTables tr").show();
                } else {
                    $("#personjoinTables tr").show();
                    $("#personjoinTables tr:gt(0)").each(function() {
                        if ($(this).children("td:eq(5)").html().indexOf(s)==-1) {
                            $(this).hide();
                        }
                    })
                }
            }
        })
    });
})
$(document).ready(function() {
    $("[name='PJjianzhong']").click(function() {
        $("[name='PJjianzhong']").each(function() {
            if ($(this).prop("checked")) {
                var s = $(this).val();
                if ($(this).val() == '全部') {
                    $("#personjoinTables tr:gt(0)").show();
                } else {
                    $("#personjoinTables tr").show();
                    $("#personjoinTables tr:gt(0)").each(function() {
                        if ($(this).children("td:eq(4)").html() != s) {
                            $(this).hide();
                        }
                    })
                }
            }
        })
    });
})

$(document).ready(function() {
    $("#exportpersonalgameJoin").click(function(){
        window.open("gamejoin/exportExcel?gameid="+$("#game1Id").val()+"&clubid="+$("#clubid").val()+"&type=p");
    })

})

$(document).ready(function() {
    $("#selectAllAthlete").click(function(){
        $("[name='personalgamejoinathid']").prop("checked",$(this).prop("checked"));
    })
})

$(document).ready(function() {
//点击添加个人报名的按钮时执行的功能
    $("#addpersonalgamejoinButton").click(function(){
        $("#personalgameType option:gt(0)").remove();
        $("#matchAthletes tr:gt(0)").remove();
        //弹开添加个人报名的窗口前，先准备好一些数据初始化工作。根据
        var xingbie=["男","女"];
        var jianzhong=["花剑","重剑","佩剑"];
        var nianlingduan;
        if($("#game1Type").val()=='锦标赛'){
            nianlingduan=["甲","乙","丙","丁"];
        }else{
            nianlingduan=["幼儿组","U8","U10","U12","U14","U16"];
        }
        //先从数据库查出来当前俱乐部下的所有运动员数据，然后动态初始化小项下拉列表，显示各个小项目能匹配到的运动员数量
        $.post("athlete/listAllAthletes","clubId="+$("#clubid").val(),function(data){
            //初始化个人报名小项下拉列表的值
            for(var n in nianlingduan){
                for(var s in xingbie){
                    for(var j in jianzhong){
                        var count=0;
                        for(var  x in data){
                            if(xingbie[s]==data[x].sex&&jianzhong[j]==data[x].jianzhong){
                                count++;
                            }
                        }
                        $("#personalgameType").append("<option value='"+nianlingduan[n]+"-"+xingbie[s]+"~"+jianzhong[j]+"'>"+nianlingduan[n]+xingbie[s]+"子"+jianzhong[j]+"个人("+count+"人)</option>");
                    }
                }
            }
        });


        $("#addpersonalgamejoinModal").modal("show");
    });
//切换添加个人报名窗口上的小项下拉列表时，动态查询数据库对应的运动员信息
    $("#personalgameType").change(function(){
        var sex=$(this).val().substring($(this).val().indexOf("-")+1,$(this).val().indexOf("~"));
        var jianzhong=$(this).val().substring($(this).val().indexOf("~")+1,$(this).val().length);
        $("#matchAthletes tr:gt(0)").empty();
        $.post("athlete/listAllAthletes","clubId="+$("#clubid").val(),function(data){
//		$("#matchAthletes").append("<tr bgcolor='#337bb7' style='color:white'><th align='center' valign='middle' width='10%'>照片</th><th align='center' valign='middle' width='10%'>姓名</th><th align='center' valign='middle' width='10%'>性别</th><th align='center' valign='middle' width='10%'>出生年月</th><th align='center' valign='middle' width='10%'>剑种</th><th align='center' valign='middle' width='10%'>操作&nbsp;&nbsp;<input type='checkbox'  id='selectAllAthlete'/></th></tr>");
            for(var n in data){
                if(sex==data[n].sex&&jianzhong==data[n].jianzhong)
                {
                    $("#matchAthletes").append("<tr><td ><img src='"+data[n].image+"' style='width:40px;height:60px;border:1px solid black;cursor:pointer' /></td><td>"
                        + data[n].athletename
                        + "</td><td>"
                        + data[n].sex
                        + "</td><td>"
                        + data[n].chushengnianyue
                        + "</td><td>"
                        + data[n].jianzhong
                        + "</td><td><input type='checkbox' name='personalgamejoinathid' value='"+data[n].athleteid+"'/></td></tr>");
                }
            }
        })
    })
})

//加载指定赛事的所有个人报名的方法
function loadAllPersonalJoinOfGameByClubId(gametype,gameid,type){
    if(gametype=='锦标赛'){
        $("#PJjinbiaosai,#GJjinbiaosai").show();
        $("#PJguanjunsai,#GJguanjunsai").hide();
    }else{
        $("#PJjinbiaosai,#GJjinbiaosai").hide();
        $("#PJguanjunsai,#GJguanjunsai").show();
    }
    $.post("gamejoin/listGameJoinForAjax",{
            "clubid":$("#clubid").val(),
            "gameid":gameid,
            "type":type
        },
        function(data) {
            $("#personjoinTables").empty("");
            $("#personjoinTables").append("<tr bgcolor='#eeeeff'><th>照片</th><th>姓名</th><th>性别</th><th>出生年月</th><th>剑种</th><th>已报项目</th><th>联系电话</th><th>缴费金额</th><th>缴费状态</th><th>其他操作</th><th><input type='checkbox' onclick='selectAllPersonalGameJoin(this.checked)' />&nbsp;&nbsp;&nbsp;<button class='btn btn-info btn-sm' onclick='payForSomePersonalGameJoin()'>批量缴费</button></th></tr>");
            for ( var n in data) {
                //判断如果报名已截止，不限时后面的删除报名信息按钮，如果未截止，添加后面的删除按钮
                var newTr="<tr><td ><img src='"+data[n].athlete.image+"' style='width:40px;height:60px;border:1px solid black;' /></td><td>"
                    + data[n].athlete.athletename
                    + "</td><td>"
                    + data[n].athlete.sex
                    + "</td><td>"
                    + data[n].athlete.chushengnianyue
                    + "</td><td>"
                    + data[n].jianzhong
                    + "</td><td>"
                    +data[n].nianlingduan+","+ data[n].xingbie+"子,"+ data[n].jianzhong+"个人"
                    + "</td><td>"
                    + data[n].lianxidianhua
                    + "</td><td>"
                    + $("#game1Baomingfei").val()
                    + "</td><td>";
                if(!data[n].payid){
                    newTr+="<span class='label label-sm label-danger'>未缴费</span>";
                }else{
                    newTr+="<span class='label label-sm label-success'>已缴费</span>";
                }
                if($("#game1Baoming").val()=='已截止'){
                    newTr+="</td><td></td></tr>";
                }else{
                    newTr+="</td><td><a href='javascript:void()' onclick='deleteGameJoinPersonal("+data[n].joinid+")'>删除</a>";
                    if(!data[n].payid){
                        newTr+="&nbsp;&nbsp;&nbsp;<a href='javascript:void()'  onclick=confirmPayInfo('pay/game?WIDtotal_amount="+$("#game1Baomingfei").val()+"&orderdesc="+$("#game1Name").val()+"-"+data[n].athlete.athletename+"-个人报名费用&ordername="+data[n].athlete.athletename+"&joinid="+data[n].joinid+"') >缴费</a></td><td>"+(!data[n].payid?"<input type='checkbox' name='personalgamejoin' athName='"+data[n].athlete.athletename+"' value='"+data[n].joinid+"' />":"")+"</td></tr>";
                    }else{
                        newTr+="</td><td></td></tr>";
                    }
                }
                $("#personjoinTables").append(newTr);

            }
            changeStyle("personjoinTables");
            $("#personjoinCount").html(data.length);

            // 鼠标移入到运动员列表到表格的列上变色
            $("#personjoinTables tr:gt(0)").mouseover(function() {
                $(this).css("background","#D9EDF7");
                $(this).css("font-weight","bold");
                $(this).css("text-shadow","0px 0px 1px red");
            });
            $("#personjoinTables tr:gt(0)").mouseout(function() {
                $(this).css("background","");
                $(this).css("font-weight","normal");
                $(this).css("text-shadow","");
                changeStyle("personjoinTables");
            });
        });
}

//改变运动员表格的行的颜色风格为隔行变色
function  changeStyle(id){
    $("#"+id+" tr").css(
        "background", "white");
    $("#"+id+" tr:even").css(
        "background", "#F9F9F9");
    $("#"+id+" tr:first").css({
        "background":"#337BB7","color":"white"});
}

//删除个人报名的函数
function deleteGameJoinPersonal(id) {
    if (window.confirm("确认要删除这条个人报名信息吗？")) {
        $.get("gamejoin/deleteGameJoinForAjax?joinid=" + id, function(data) {
            if (data == 'success') {
                loadAllPersonalJoinOfGameByClubId($("#game1Type").val(),$("#game1Id").val(),"p");
                alert('删除成功!');
            } else {
                alert('删除失败!');
            }
        })
    }
}

//点击编辑领队信息的按钮时弹出编辑窗口
$(document).ready(function(){
    $("#editleaderbutton").click(function(){
        if($("#leadertype").val()=='pl'){
            $("#updategamejoinLeader").modal("show");
            $.get("gamejoin/getLeaderOfGameJoin",{"clubid":$("#clubid").val(),"gameid":$("#game1Id").val(),"type":$("#leadertype").val()},function(data){
                if(!data){
                    $("#leadername").val("");
                    $("#leadertel").val("");
                    $("#leaderjob").val("");
                    $("#leaderjoinId").val("");
                }else{
                    $("#leadername").val(data.baomingshijian);
                    $("#leadertel").val(data.nianlingduan);
                    $("#leaderjob").val(data.jianzhong);
                    $("#leaderjoinId").val(data.joinid);
                }

            });
        }else{
            $("#updategamejoinLeader1").modal("show");
            $.get("gamejoin/getLeaderOfGameJoin",{"clubid":$("#clubid").val(),"gameid":$("#game1Id").val(),"type":$("#leadertype").val()},function(data){
                if(!data){
                    $("#leadername1").val("");
                    $("#leadertel1").val("");
                    $("#leaderjob1").val("");
                    $("#leaderjoinId1").val("");
                }else{
                    $("#leadername1").val(data.baomingshijian);
                    $("#leadertel1").val(data.nianlingduan);
                    $("#leaderjob1").val(data.jianzhong);
                    $("#leaderjoinId1").val(data.joinid);
                }
            });
        }

    })
})
//全选/全部选所有运动员的函数
function selectAllPersonalGameJoin(s){
    $("[name='personalgamejoin']").prop("checked",s);
}
//批量缴费的函数
function payForSomePersonalGameJoin(){
    if($("[name='personalgamejoin']:checked").length==0){
        alert('没有选择个人报名信息，无法缴费！');
    }else{
        var money=0;
        var athNames="";
        var ids="";
        $("[name='personalgamejoin']:checked").each(function(){
            ids+=$(this).val()+",";
            athNames+=$(this).attr("athName")+",";

        })
        money=parseFloat($("#game1Baomingfei").val())*$("[name='personalgamejoin']:checked").length;
        athNames=athNames.substring(0,athNames.length-1);
        ids=ids.substring(0,ids.length-1);
        window.open('pay/somepersonaljoin?WIDtotal_amount='+money+'&orderdesc='+$("#game1Name").val()+'-('+athNames+')-的个人报名费用&ordername=('+$("#game1Name").val()+')多名参赛运动员&joinid='+ids,Math.random())
    }
}

//支付完成后，弹出窗口提示关闭网页
function confirmPayInfo(url){
    var payWindow=window.open(url,Math.random());
    var timer=setInterval(function(){
        if(payWindow.closed){
            if(window.confirm("支付完成后，请点击确定刷新网页！")){
                loadAllPersonalJoinOfGameByClubId($("#game1Type").val(),$("#game1Id").val(),"p");
                clearInterval(timer);
            }
        }
    },500);
}

//支付完成后，弹出窗口提示关闭网页
function confirmPayInfoForClub(url){
    var payWindow=window.open(url,Math.random());
    var timer=setInterval(function(){
        if(payWindow.closed){
            if(window.confirm("支付完成后，请点击确定刷新网页！")){
                location.reload();
                clearInterval(timer);
            }
        }
    },500);
}

//点击编辑领队窗口上的确认提交按钮
$(document).ready(function(){
    $("#commitgamejoinleaderbutton").click(function(){
        $.get("gamejoin/updategamejoinleaderinfo",{
            "joinid":!$("#leaderjoinId").val()?-1:$("#leaderjoinId").val(),
            "clubid":$("#clubid").val(),
            "gameid":$("#game1Id").val(),
            "type":"pl",
            "leadername":$("#leadername").val(),
            "leadertel":$("#leadertel").val(),
            "leaderjob":$("#leaderjob").val()
        },function(data){
            $("#updategamejoinLeader").modal("hide");
            if(data=='success'){
                loadLeaderOfPersonal($("#leadertype").val());
                alert('领队信息更新成功!');
            }else{
                alert('领队信息更新失败!');
            }
        })

    });
    $("#commitgamejoinleaderbutton1").click(function(){
        $.get("gamejoin/updategamejoinleaderinfo",{
            "joinid":!$("#leaderjoinId1").val()?-1:$("#leaderjoinId1").val(),
            "clubid":$("#clubid").val(),
            "gameid":$("#game1Id").val(),
            "type":"gl",
            "leadername":$("#leadername1").val(),
            "leadertel":$("#leadertel1").val(),
            "leaderjob":$("#leaderjob1").val()
        },function(data){
            $("#updategamejoinLeader1").modal("hide");
            if(data=='success'){
                loadLeaderOfPersonal($("#leadertype").val());
                alert('领队信息更新成功!');
            }else{
                alert('领队信息更新失败!');
            }
        })

    });
})