!function(a){"function"==typeof define&&define.amd?define("bxwizard",[],function(){a(window.jQuery)}):a(window.jQuery)}(function(a){a.widget("baosight.bxwizard",{_create:function(){this._superApply(arguments),console.log("bxwizard widget create")},_init:function(){this._superApply(arguments),console.log("bxwizard widget init"),this.wizard()},destroy:function(){console.log("bxwizard widget destroy"),this._superApply(arguments)},_setOption:function(a,b){console.log("_setOption: key=%s  value=%s",a,b),this._superApply(arguments)},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},options:{bind:{}},wizard:function(){var b=this,c=a(b.element).ace_wizard();for(var d in this.options.bind)c.on(d,this.options.bind[d])}})});