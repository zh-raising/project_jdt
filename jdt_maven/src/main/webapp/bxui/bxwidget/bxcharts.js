!function(a){"function"==typeof define&&define.amd?define("bxcharts",[],function(){a(window.jQuery)}):a(window.jQuery)}(function(a){var b="/charthandler.do?method=query";a.widget("baosight.bxcharts",{_create:function(){this._super(),console.log("bxcharts widget create")},_init:function(){this._super();var b=a(this.element);0===b.width()&&void 0==this.options.width?b.width(b.parent().width()+"px"):void 0!=this.options.width&&b.width(this.options.width),0===b.height()&&void 0==this.options.height?b.height("100%"):void 0!=this.options.height&&b.height(this.options.height),console.log("bxcharts widget init")},destroy:function(){console.log("bxcharts widget destroy"),this._superApply(arguments)},options:{chartType:"",dataPattern:"local",async:!0},_setOption:function(a,b){console.log("_setOption: key=%s  value=%s",a,b),this._superApply(arguments)},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},combinateOption:function(){var c=this;a.extend(c.options.option,c.options.chartOption),void 0==c.options.seriesObj&&(c.options.seriesObj={});var d=c.options.url;d=null==d||void 0==d?httpServerPath+b:httpServerPath+d,console.log("chartAjaxUrl: ",d),c.options.ajaxUrl=d},queryFromLocal:function(a){var b=this;b.options.chartType=a,b.showChart()},showChart:function(){var a=this,b=(new Date).getTime(),c=a.options.chartOption.theme;isAvailable(c)||(c="macarons");var d=echarts.init(a.element.get(0),c);d.setOption(a.options.option),window.onresize=d.resize,null!=a.options.callBackFunct&&void 0!=a.options.callBackFunct&&a.options.callBackFunct();var e=(new Date).getTime();console.log("图表渲染时间："+(e-b))},refreshChart:function(a){this.options.option=a,this.showChart()}})});