var DateUtil={dynamicTime:function(a,b){for(var c=new Array,d=0;d<a.length;d++)if(0!=d){var e=a[d];c.push(e)}var f=a[a.length-1];return f+=b,c.push(f),c},getTimeLstByInterval:function(a,b,c){for(var d=[],e=a;b>=e;){var f=e;d.push(f),e+=c}return d},convertStrToDate:function(a){4==a.length?a+="-01-01 00:00:00 000":7==a.length?a+="-01 00:00:00 000":10==a.length?a+=" 00:00:00 000":13==a.length?a+=":00:00 000":16==a.length?a+=":00 000":19==a.length&&(a+=" 000");var b=a.split(" "),c=b[0].split("-"),d=b[1].split(":"),e=parseInt(c[1])-1;return new Date(c[0],e,c[2],d[0],d[1],d[2],b[2])},convertDateToStr:function(a,b){var c={"M+":b.getMonth()+1,"d+":b.getDate(),"h+":b.getHours()%12||12,"H+":b.getHours(),"m+":b.getMinutes(),"s+":b.getSeconds(),"q+":Math.floor((b.getMonth()+3)/3),S:b.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(b.getFullYear()+"").substr(4-RegExp.$1.length)));for(var d in c)new RegExp("("+d+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return a},getWholeMinute:function(a){var b=DateUtil.convertDateToStr("yyyy-MM-dd HH:mm:ss SSS",a);return b=b.substring(0,16)+":00 000",DateUtil.convertStrToDate(b)},getWholeHour:function(a){var b=DateUtil.convertDateToStr("yyyy-MM-dd HH:mm:ss SSS",a);return b=b.substring(0,13)+":00:00 000",DateUtil.convertStrToDate(b)},getWholeDay:function(a){var b=DateUtil.convertDateToStr("yyyy-MM-dd HH:mm:ss SSS",a);return b=b.substring(0,10)+" 00:00:00 000",DateUtil.convertStrToDate(b)},formatTo2bits:function(a){return a>=0&&9>=a?a="0"+a:a},formatTo3bits:function(a){return a>=0&&9>=a?a="00"+a:a>=10&&99>=a?a="0"+a:a}};