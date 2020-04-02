ace.define("ace/split",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/editor","ace/virtual_renderer","ace/edit_session"],function(a,b,c){"use strict";function d(a,b){this.$u=a,this.$doc=b}var e=a("./lib/oop"),f=a("./lib/lang"),g=a("./lib/event_emitter").EventEmitter,h=a("./editor").Editor,i=a("./virtual_renderer").VirtualRenderer,j=a("./edit_session").EditSession,k=function(a,b,c){this.BELOW=1,this.BESIDE=0,this.$container=a,this.$theme=b,this.$splits=0,this.$editorCSS="",this.$editors=[],this.$orientation=this.BESIDE,this.setSplits(c||1),this.$cEditor=this.$editors[0],this.on("focus",function(a){this.$cEditor=a}.bind(this))};(function(){e.implement(this,g),this.$createEditor=function(){var a=document.createElement("div");a.className=this.$editorCSS,a.style.cssText="position: absolute; top:0px; bottom:0px",this.$container.appendChild(a);var b=new h(new i(a,this.$theme));return b.on("focus",function(){this._emit("focus",b)}.bind(this)),this.$editors.push(b),b.setFontSize(this.$fontSize),b},this.setSplits=function(a){var b;if(1>a)throw"The number of splits have to be > 0!";if(a!=this.$splits){if(a>this.$splits){for(;this.$splits<this.$editors.length&&this.$splits<a;)b=this.$editors[this.$splits],this.$container.appendChild(b.container),b.setFontSize(this.$fontSize),this.$splits++;for(;this.$splits<a;)this.$createEditor(),this.$splits++}else for(;this.$splits>a;)b=this.$editors[this.$splits-1],this.$container.removeChild(b.container),this.$splits--;this.resize()}},this.getSplits=function(){return this.$splits},this.getEditor=function(a){return this.$editors[a]},this.getCurrentEditor=function(){return this.$cEditor},this.focus=function(){this.$cEditor.focus()},this.blur=function(){this.$cEditor.blur()},this.setTheme=function(a){this.$editors.forEach(function(b){b.setTheme(a)})},this.setKeyboardHandler=function(a){this.$editors.forEach(function(b){b.setKeyboardHandler(a)})},this.forEach=function(a,b){this.$editors.forEach(a,b)},this.$fontSize="",this.setFontSize=function(a){this.$fontSize=a,this.forEach(function(b){b.setFontSize(a)})},this.$cloneSession=function(a){var b=new j(a.getDocument(),a.getMode()),c=a.getUndoManager();if(c){var e=new d(c,b);b.setUndoManager(e)}return b.$informUndoManager=f.delayedCall(function(){b.$deltas=[]}),b.setTabSize(a.getTabSize()),b.setUseSoftTabs(a.getUseSoftTabs()),b.setOverwrite(a.getOverwrite()),b.setBreakpoints(a.getBreakpoints()),b.setUseWrapMode(a.getUseWrapMode()),b.setUseWorker(a.getUseWorker()),b.setWrapLimitRange(a.$wrapLimitRange.min,a.$wrapLimitRange.max),b.$foldData=a.$cloneFoldData(),b},this.setSession=function(a,b){var c;c=null==b?this.$cEditor:this.$editors[b];var d=this.$editors.some(function(b){return b.session===a});return d&&(a=this.$cloneSession(a)),c.setSession(a),a},this.getOrientation=function(){return this.$orientation},this.setOrientation=function(a){this.$orientation!=a&&(this.$orientation=a,this.resize())},this.resize=function(){var a,b=this.$container.clientWidth,c=this.$container.clientHeight;if(this.$orientation==this.BESIDE)for(var d=b/this.$splits,e=0;e<this.$splits;e++)a=this.$editors[e],a.container.style.width=d+"px",a.container.style.top="0px",a.container.style.left=e*d+"px",a.container.style.height=c+"px",a.resize();else for(var f=c/this.$splits,e=0;e<this.$splits;e++)a=this.$editors[e],a.container.style.width=b+"px",a.container.style.top=e*f+"px",a.container.style.left="0px",a.container.style.height=f+"px",a.resize()}}).call(k.prototype),function(){this.execute=function(a){this.$u.execute(a)},this.undo=function(){var a=this.$u.undo(!0);a&&this.$doc.selection.setSelectionRange(a)},this.redo=function(){var a=this.$u.redo(!0);a&&this.$doc.selection.setSelectionRange(a)},this.reset=function(){this.$u.reset()},this.hasUndo=function(){return this.$u.hasUndo()},this.hasRedo=function(){return this.$u.hasRedo()}}.call(d.prototype),b.Split=k}),ace.define("ace/ext/split",["require","exports","module","ace/split"],function(a,b,c){"use strict";c.exports=a("../split")}),function(){ace.require(["ace/ext/split"],function(){})}();