!function(a){"function"==typeof define&&define.amd?define("bxdiv",["bxcombobox"],function(){a(window.jQuery)}):a(window.jQuery)}(function(a){$.widget("baosight.bxdiv",{_create:function(){this._super(),console.log("bxdiv widget create")},_init:function(){this._super(),console.log("bxdiv widget init")},destroy:function(){console.log("bxdiv widget destroy"),this._superApply(arguments)},options:{},_setOption:function(a,b){console.log("_setOption: key=%s  value=%s",a,b),this._superApply(arguments)},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},fillPopDiv:function(a,b){var c=this,d=a[b];for(var e in d)c._setWidgetValue($("#"+b+"-"+e),d[e])},cleanPopDiv:function(){var a=this;$("#"+this.element.attr("id")+" .errordiv").each(function(){$(this).remove()}),$("#"+this.element.attr("id")+" .has-error").each(function(){$(this).removeClass("has-error")}),$(this.element).find("[data-bxwidget]").each(function(){a._setWidgetValue($(this),"")})},setInfoFromDiv:function(a,b){var c=this,d=a[b];isAvailable(d)||(d=new Object,a[b]=d);var e=new Object,f=new Array;f.push(e),$(this.element).find("[data-bxwidget]").each(function(){var a=this.id.split("-");2==a.length&&a[0]==b&&("number"==$(this).data("bxtype")?e[a[1]]=Number(c._getWidgetValue($(this))):"boolean"==$(this).data("bxtype")?e[a[1]]=c._getBoolean(c._getWidgetValue($(this))):e[a[1]]=String(c._getWidgetValue($(this))))}),d.resultRow=f},setQueryFromDiv:function(a,b){var c=this,d=a[b];isAvailable(d)||(d=new Object,a[b]=d),$(this.element).find("[data-bxwidget]").each(function(){var a=this.id.split("-");2==a.length&&a[0]==b&&("number"==$(this).data("bxtype")?d[a[1]]=Number(c._getWidgetValue($(this))):"boolean"==$(this).data("bxtype")?d[a[1]]=c._getBoolean(c._getWidgetValue($(this))):d[a[1]]=String(c._getWidgetValue($(this))))})},_getWidgetValue:function(a){return"bxcombobox"==a.data("bxwidget")?a.bxcombobox("selectObj").val():"bxtimepicker"==a.data("bxwidget")?a.bxtimepicker("rawObj").val():a.val()},_setWidgetValue:function(a,b){"bxcombobox"==a.data("bxwidget")?a.bxcombobox("selectObj").val(String(b)):"select"==a.data("bxwidget")?a.val(String(b)):"bxtimepicker"==a.data("bxwidget")?a.bxtimepicker("rawObj").val(String(b)):a.val(b)},_getBoolean:function(a){return"true"==a?!0:"false"==a?!1:Boolean(a)}})});