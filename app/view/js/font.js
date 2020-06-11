Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var nowTime = new Date().Format("yyyy-MM-dd");
var oldDay=parseInt(nowTime.substr(8,2))-3;
if(oldDay<10){
    temp = oldDay.toString();
    oldDay = '0'+temp;
}
var oldTime = nowTime.substr(0,7)+'-'+oldDay.toString();
$('#dayTo').attr('value',nowTime);
$('#dayFrom').attr('value',oldTime);



$('#btn1').click(function(){
    var stationId = $('#select1').val();
    var dayFrom = $('#dayFrom').val();
    var dayTo = $('#dayTo').val();

    var brg = {
        "stationId":stationId,
        "nowTime":dayTo,
        "oldTime":dayFrom
    };
    $.post("http://127.0.0.1:8080/getdata",brg,function(data){
        $("#con").empty();
        for(i=0;i<=data.length;i++){
            var str = '<tr><th scope="row">'+ i +'</th><td>'+ data[i].stationID +
                    '</td><td>'+data[i].dataTime+
                    '</td><td>'+data[i].stationName+
                    '</td><td>'+data[i].precipitation+
                    '</td></tr>';
            $("#con").append(str);
        }
      },"json");
})


