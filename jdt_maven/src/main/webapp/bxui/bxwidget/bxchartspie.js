!function(a){"function"==typeof define&&define.amd?define("bxchartspie",["bxcharts"],function(){a(window.jQuery)}):a(window.jQuery)}(function(a){a.widget("baosight.bxchartspie",a.baosight.bxcharts,{_create:function(){this._super(),console.log("bxchartspie widget create")},_init:function(){return this._super(),console.log("bxchartspie widget init"),this.combinateOption(),"local"==this.options.dataPattern?void this.queryFromLocal("pie"):void this._query("pie")},destroy:function(){console.log("bxchartspie widget destroy"),this._superApply(arguments)},options:{option:{tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},toolbox:{show:!1},calculable:!0,legend:{data:[]},series:[]},seriesObj:{type:"pie"},chartRelate:{}},_setOption:function(a,b){console.log("_setOption: key=%s  value=%s",a,b),this._superApply(arguments)},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_query:function(b){var c=this;c.options.chartType=b;var d={};for(key in c.options)d[key]=c.options[key];a.ajax({url:c.options.ajaxUrl,method:"POST",crossDomain:!0,async:c.options.async,data:{ajaxParam:JSON.stringify(d)},processData:!0,dataType:"json",success:function(a,b,d){if(-1==a.status)return c.options.option.series=[{}],c.options.chartType="pie",void c.showChart();if(console.log("chartAjaxData: ",a),"timeline"==c.options.showPattern){var e=deepCopy(c.options.option.timeline);e.data=a[c.options.chartRelate.xdataItem];var f=deepCopy(c.options.option.options);(null==f[0].legend||void 0==f[0].legend)&&(f[0].legend={}),f[0].legend.data=a[c.options.chartRelate.legendItem],f[0].series=[];var g=a[c.options.chartRelate.ydataItem],h=deepCopy(c.options.seriesObj);h.type="pie",h.data=[],c._queryDataByTimeLine(h,g,0),f[0].series.push(h);for(var i=1;i<e.data.length;i++){var j={};j.series=[];var k=deepCopy(c.options.seriesObj);k.type="pie",k.data=[],c._queryDataByTimeLine(k,g,i),j.series.push(k),f.push(j)}c.options.option.timeline=e,c.options.option.options=f}else{var l=[],m=deepCopy(c.options.seriesObj);m.type="pie";for(var n=[],g=a[c.options.chartRelate.dataItem],i=0;i<g.length;i++){var o={},p=g[i];o.value=p.data[0],o.name=p.series.name,n.push(o)}m.data=n,l.push(m),c.options.option.legend.data=a[c.options.chartRelate.legendItem],c.options.option.series=l}void 0!=c.options.preHandlerFunct&&null!=c.options.preHandlerFunct&&c.options.preHandlerFunct(c.options.option,a),c.showChart()}})},query:function(){return"local"==this.options.dataPattern?void this.queryFromLocal("pie"):void this._query("pie")},_queryDataByTimeLine:function(a,b,c){a.data=[];for(var d=0;d<b.length;d++){var e={},f=b[d],g=f.data,h=f.series;e.name=h.name,e.value=g[c],a.data.push(e)}}})});