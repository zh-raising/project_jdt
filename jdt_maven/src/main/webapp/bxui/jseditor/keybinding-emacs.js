ace.define("ace/occur",["require","exports","module","ace/lib/oop","ace/range","ace/search","ace/edit_session","ace/search_highlight","ace/lib/dom"],function(a,b,c){"use strict";function d(){}var e=a("./lib/oop"),f=(a("./range").Range,a("./search").Search),g=a("./edit_session").EditSession,h=a("./search_highlight").SearchHighlight;e.inherits(d,f),function(){this.enter=function(a,b){if(!b.needle)return!1;var c=a.getCursorPosition();this.displayOccurContent(a,b);var d=this.originalToOccurPosition(a.session,c);return a.moveCursorToPosition(d),!0},this.exit=function(a,b){var c=b.translatePosition&&a.getCursorPosition(),d=c&&this.occurToOriginalPosition(a.session,c);return this.displayOriginalContent(a),d&&a.moveCursorToPosition(d),!0},this.highlight=function(a,b){var c=a.$occurHighlight=a.$occurHighlight||a.addDynamicMarker(new h(null,"ace_occur-highlight","text"));c.setRegexp(b),a._emit("changeBackMarker")},this.displayOccurContent=function(a,b){this.$originalSession=a.session;var c=this.matchingLines(a.session,b),d=c.map(function(a){return a.content}),e=new g(d.join("\n"));e.$occur=this,e.$occurMatchingLines=c,a.setSession(e),this.$useEmacsStyleLineStart=this.$originalSession.$useEmacsStyleLineStart,e.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart,this.highlight(e,b.re),e._emit("changeBackMarker")},this.displayOriginalContent=function(a){a.setSession(this.$originalSession),this.$originalSession.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart},this.originalToOccurPosition=function(a,b){var c=a.$occurMatchingLines,d={row:0,column:0};if(!c)return d;for(var e=0;e<c.length;e++)if(c[e].row===b.row)return{row:e,column:b.column};return d},this.occurToOriginalPosition=function(a,b){var c=a.$occurMatchingLines;return c&&c[b.row]?{row:c[b.row].row,column:b.column}:b},this.matchingLines=function(a,b){if(b=e.mixin({},b),!a||!b.needle)return[];var c=new f;return c.set(b),c.findAll(a).reduce(function(b,c){var d=c.start.row,e=b[b.length-1];return e&&e.row===d?b:b.concat({row:d,content:a.getLine(d)})},[])}}.call(d.prototype);var i=a("./lib/dom");i.importCssString(".ace_occur-highlight {\n    border-radius: 4px;\n    background-color: rgba(87, 255, 8, 0.25);\n    position: absolute;\n    z-index: 4;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    box-shadow: 0 0 4px rgb(91, 255, 50);\n}\n.ace_dark .ace_occur-highlight {\n    background-color: rgb(80, 140, 85);\n    box-shadow: 0 0 4px rgb(60, 120, 70);\n}\n","incremental-occur-highlighting"),b.Occur=d}),ace.define("ace/commands/occur_commands",["require","exports","module","ace/config","ace/occur","ace/keyboard/hash_handler","ace/lib/oop"],function(a,b,c){function d(){}var e=(a("../config"),a("../occur").Occur),f={name:"occur",exec:function(a,b){var c=!!a.session.$occur,f=(new e).enter(a,b);f&&!c&&d.installIn(a)},readOnly:!0},g=[{name:"occurexit",bindKey:"esc|Ctrl-G",exec:function(a){var b=a.session.$occur;b&&(b.exit(a,{}),a.session.$occur||d.uninstallFrom(a))},readOnly:!0},{name:"occuraccept",bindKey:"enter",exec:function(a){var b=a.session.$occur;b&&(b.exit(a,{translatePosition:!0}),a.session.$occur||d.uninstallFrom(a))},readOnly:!0}],h=a("../keyboard/hash_handler").HashHandler,i=a("../lib/oop");i.inherits(d,h),function(){this.isOccurHandler=!0,this.attach=function(a){h.call(this,g,a.commands.platform),this.$editor=a};var a=this.handleKeyboard;this.handleKeyboard=function(b,c,d,e){var f=a.call(this,b,c,d,e);return f&&f.command?f:void 0}}.call(d.prototype),d.installIn=function(a){var b=new this;a.keyBinding.addKeyboardHandler(b),a.commands.addCommands(g)},d.uninstallFrom=function(a){a.commands.removeCommands(g);var b=a.getKeyboardHandler();b.isOccurHandler&&a.keyBinding.removeKeyboardHandler(b)},b.occurStartCommand=f}),ace.define("ace/commands/incremental_search_commands",["require","exports","module","ace/config","ace/lib/oop","ace/keyboard/hash_handler","ace/commands/occur_commands"],function(a,b,c){function d(a){this.$iSearch=a}var e=a("../config"),f=a("../lib/oop"),g=a("../keyboard/hash_handler").HashHandler,h=a("./occur_commands").occurStartCommand;b.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(a,b){e.loadModule(["core","ace/incremental_search"],function(c){var d=c.iSearch=c.iSearch||new c.IncrementalSearch;d.activate(a,b.backwards),b.jumpToFirstMatch&&d.next(b)})},readOnly:!0},{name:"iSearchBackwards",exec:function(a,b){a.execCommand("iSearch",{backwards:!0})},readOnly:!0},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(a,b){a.execCommand("iSearch",{jumpToFirstMatch:!0,useCurrentOrPrevSearch:!0})},readOnly:!0},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(a){a.execCommand("iSearch",{jumpToFirstMatch:!0,backwards:!0,useCurrentOrPrevSearch:!0})},readOnly:!0}],b.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(a){a.cancelSearch(!0)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(a,b){b.useCurrentOrPrevSearch=!0,a.next(b)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(a,b){b.useCurrentOrPrevSearch=!0,b.backwards=!0,a.next(b)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"extendSearchTerm",exec:function(a,b){a.addString(b)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"extendSearchTermSpace",bindKey:"space",exec:function(a){a.addString(" ")},readOnly:!0,isIncrementalSearchCommand:!0},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(a){a.removeChar()},readOnly:!0,isIncrementalSearchCommand:!0},{name:"confirmSearch",bindKey:"return",exec:function(a){a.deactivate()},readOnly:!0,isIncrementalSearchCommand:!0},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(a){a.deactivate(!0)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(a){var b=f.mixin({},a.$options);a.deactivate(),h.exec(a.$editor,b)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"yankNextWord",bindKey:"Ctrl-w",exec:function(a){var b=a.$editor,c=b.selection.getRangeOfMovements(function(a){a.moveCursorWordRight()}),d=b.session.getTextRange(c);a.addString(d)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"yankNextChar",bindKey:"Ctrl-Alt-y",exec:function(a){var b=a.$editor,c=b.selection.getRangeOfMovements(function(a){a.moveCursorRight()}),d=b.session.getTextRange(c);a.addString(d)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"recenterTopBottom",bindKey:"Ctrl-l",exec:function(a){a.$editor.execCommand("recenterTopBottom")},readOnly:!0,isIncrementalSearchCommand:!0}],f.inherits(d,g),function(){this.attach=function(a){var c=this.$iSearch;g.call(this,b.iSearchCommands,a.commands.platform),this.$commandExecHandler=a.commands.addEventListener("exec",function(a){return a.command.isIncrementalSearchCommand?(a.stopPropagation(),a.preventDefault(),a.command.exec(c,a.args||{})):void 0})},this.detach=function(a){this.$commandExecHandler&&(a.commands.removeEventListener("exec",this.$commandExecHandler),delete this.$commandExecHandler)};var a=this.handleKeyboard;this.handleKeyboard=function(b,c,d,e){if((1===c||8===c)&&"v"===d||1===c&&"y"===d)return null;var f=a.call(this,b,c,d,e);if(f.command)return f;if(-1==c){var g=this.commands.extendSearchTerm;if(g)return{command:g,args:d}}return{command:"null",passEvent:0==c||4==c}}}.call(d.prototype),b.IncrementalSearchKeyboardHandler=d}),ace.define("ace/incremental_search",["require","exports","module","ace/lib/oop","ace/range","ace/search","ace/search_highlight","ace/commands/incremental_search_commands","ace/lib/dom","ace/commands/command_manager","ace/editor","ace/config"],function(a,b,c){"use strict";function d(){this.$options={wrap:!1,skipCurrent:!1},this.$keyboardHandler=new j(this)}var e=a("./lib/oop"),f=a("./range").Range,g=a("./search").Search,h=a("./search_highlight").SearchHighlight,i=a("./commands/incremental_search_commands"),j=i.IncrementalSearchKeyboardHandler;e.inherits(d,g),function(){this.activate=function(a,b){this.$editor=a,this.$startPos=this.$currentPos=a.getCursorPosition(),this.$options.needle="",this.$options.backwards=b,a.keyBinding.addKeyboardHandler(this.$keyboardHandler),this.$originalEditorOnPaste=a.onPaste,a.onPaste=this.onPaste.bind(this),this.$mousedownHandler=a.addEventListener("mousedown",this.onMouseDown.bind(this)),this.selectionFix(a),this.statusMessage(!0)},this.deactivate=function(a){this.cancelSearch(a);var b=this.$editor;b.keyBinding.removeKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler&&(b.removeEventListener("mousedown",this.$mousedownHandler),delete this.$mousedownHandler),b.onPaste=this.$originalEditorOnPaste,this.message("")},this.selectionFix=function(a){a.selection.isEmpty()&&!a.session.$emacsMark&&a.clearSelection()},this.highlight=function(a){var b=this.$editor.session,c=b.$isearchHighlight=b.$isearchHighlight||b.addDynamicMarker(new h(null,"ace_isearch-result","text"));c.setRegexp(a),b._emit("changeBackMarker")},this.cancelSearch=function(a){var b=this.$editor;return this.$prevNeedle=this.$options.needle,this.$options.needle="",a?(b.moveCursorToPosition(this.$startPos),this.$currentPos=this.$startPos):b.pushEmacsMark&&b.pushEmacsMark(this.$startPos,!1),this.highlight(null),f.fromPoints(this.$currentPos,this.$currentPos)},this.highlightAndFindWithNeedle=function(a,b){if(!this.$editor)return null;var c=this.$options;if(b&&(c.needle=b.call(this,c.needle||"")||""),0===c.needle.length)return this.statusMessage(!0),this.cancelSearch(!0);c.start=this.$currentPos;var d=this.$editor.session,e=this.find(d);return e&&(c.backwards&&(e=f.fromPoints(e.end,e.start)),this.$editor.moveCursorToPosition(e.end),a&&(this.$currentPos=e.end),this.highlight(c.re)),this.statusMessage(e),e},this.addString=function(a){return this.highlightAndFindWithNeedle(!1,function(b){return b+a})},this.removeChar=function(a){return this.highlightAndFindWithNeedle(!1,function(a){return a.length>0?a.substring(0,a.length-1):a})},this.next=function(a){return a=a||{},this.$options.backwards=!!a.backwards,this.$currentPos=this.$editor.getCursorPosition(),this.highlightAndFindWithNeedle(!0,function(b){return a.useCurrentOrPrevSearch&&0===b.length?this.$prevNeedle||"":b})},this.onMouseDown=function(a){return this.deactivate(),!0},this.onPaste=function(a){this.addString(a)},this.statusMessage=function(a){var b=this.$options,c="";c+=b.backwards?"reverse-":"",c+="isearch: "+b.needle,c+=a?"":" (not found)",this.message(c)},this.message=function(a){this.$editor.showCommandLine?(this.$editor.showCommandLine(a),this.$editor.focus()):console.log(a)}}.call(d.prototype),b.IncrementalSearch=d;var k=a("./lib/dom");k.importCssString&&k.importCssString(".ace_marker-layer .ace_isearch-result {  position: absolute;  z-index: 6;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;  box-sizing: border-box;}div.ace_isearch-result {  border-radius: 4px;  background-color: rgba(255, 200, 0, 0.5);  box-shadow: 0 0 4px rgb(255, 200, 0);}.ace_dark div.ace_isearch-result {  background-color: rgb(100, 110, 160);  box-shadow: 0 0 4px rgb(80, 90, 140);}","incremental-search-highlighting");var l=a("./commands/command_manager");(function(){this.setupIncrementalSearch=function(a,b){if(this.usesIncrementalSearch!=b){this.usesIncrementalSearch=b;var c=i.iSearchStartCommands,d=b?"addCommands":"removeCommands";this[d](c)}}}).call(l.CommandManager.prototype);var m=a("./editor").Editor;a("./config").defineOptions(m.prototype,"editor",{useIncrementalSearch:{set:function(a){this.keyBinding.$handlers.forEach(function(b){b.setupIncrementalSearch&&b.setupIncrementalSearch(this,a)}),this._emit("incrementalSearchSettingChanged",{isEnabled:a})}}})}),ace.define("ace/keyboard/emacs",["require","exports","module","ace/lib/dom","ace/incremental_search","ace/commands/incremental_search_commands","ace/keyboard/hash_handler","ace/lib/keys"],function(a,b,c){"use strict";var d=a("../lib/dom");a("../incremental_search");var e=a("../commands/incremental_search_commands"),f=function(a,b){var c=this.scroller.getBoundingClientRect(),d=Math.floor((a+this.scrollLeft-c.left-this.$padding)/this.characterWidth),e=Math.floor((b+this.scrollTop-c.top)/this.lineHeight);return this.session.screenToDocumentPosition(e,d)},g=a("./hash_handler").HashHandler;b.handler=new g,b.handler.isEmacs=!0,b.handler.$id="ace/keyboard/emacs";var h,i,j=!1;b.handler.attach=function(a){j||(j=!0,d.importCssString("            .emacs-mode .ace_cursor{                border: 2px rgba(50,250,50,0.8) solid!important;                -moz-box-sizing: border-box!important;                -webkit-box-sizing: border-box!important;                box-sizing: border-box!important;                background-color: rgba(0,250,0,0.9);                opacity: 0.5;            }            .emacs-mode .ace_hidden-cursors .ace_cursor{                opacity: 1;                background-color: transparent;            }            .emacs-mode .ace_overwrite-cursors .ace_cursor {                opacity: 1;                background-color: transparent;                border-width: 0 0 2px 2px !important;            }            .emacs-mode .ace_text-layer {                z-index: 4            }            .emacs-mode .ace_cursor-layer {                z-index: 2            }","emacsMode")),h=a.session.$selectLongWords,a.session.$selectLongWords=!0,i=a.session.$useEmacsStyleLineStart,a.session.$useEmacsStyleLineStart=!0,a.session.$emacsMark=null,a.session.$emacsMarkRing=a.session.$emacsMarkRing||[],a.emacsMark=function(){return this.session.$emacsMark},a.setEmacsMark=function(a){this.session.$emacsMark=a},a.pushEmacsMark=function(a,b){var c=this.session.$emacsMark;c&&this.session.$emacsMarkRing.push(c),!a||b?this.setEmacsMark(a):this.session.$emacsMarkRing.push(a)},a.popEmacsMark=function(){var a=this.emacsMark();return a?(this.setEmacsMark(null),a):this.session.$emacsMarkRing.pop()},a.getLastEmacsMark=function(a){return this.session.$emacsMark||this.session.$emacsMarkRing.slice(-1)[0]},a.on("click",l),a.on("changeSession",k),a.renderer.screenToTextCoordinates=f,a.setStyle("emacs-mode"),a.commands.addCommands(p),b.handler.platform=a.commands.platform,a.$emacsModeHandler=this,a.addEventListener("copy",this.onCopy),a.addEventListener("paste",this.onPaste)},b.handler.detach=function(a){delete a.renderer.screenToTextCoordinates,a.session.$selectLongWords=h,a.session.$useEmacsStyleLineStart=i,a.removeEventListener("click",l),a.removeEventListener("changeSession",k),a.unsetStyle("emacs-mode"),a.commands.removeCommands(p),a.removeEventListener("copy",this.onCopy),a.removeEventListener("paste",this.onPaste)};var k=function(a){a.oldSession&&(a.oldSession.$selectLongWords=h,a.oldSession.$useEmacsStyleLineStart=i),h=a.session.$selectLongWords,a.session.$selectLongWords=!0,i=a.session.$useEmacsStyleLineStart,a.session.$useEmacsStyleLineStart=!0,a.session.hasOwnProperty("$emacsMark")||(a.session.$emacsMark=null),a.session.hasOwnProperty("$emacsMarkRing")||(a.session.$emacsMarkRing=[])},l=function(a){a.editor.session.$emacsMark=null},m=a("../lib/keys").KEY_MODS,n={C:"ctrl",S:"shift",M:"alt",CMD:"command"},o=["C-S-M-CMD","S-M-CMD","C-M-CMD","C-S-CMD","C-S-M","M-CMD","S-CMD","S-M","C-CMD","C-M","C-S","CMD","M","S","C"];o.forEach(function(a){var b=0;a.split("-").forEach(function(a){b|=m[n[a]]}),n[b]=a.toLowerCase()+"-"}),b.handler.onCopy=function(a,c){c.$handlesEmacsOnCopy||(c.$handlesEmacsOnCopy=!0,b.handler.commands.killRingSave.exec(c),delete c.$handlesEmacsOnCopy)},b.handler.onPaste=function(a,b){b.pushEmacsMark(b.getCursorPosition())},b.handler.bindKey=function(a,b){if(a){var c=this.commandKeyBinding;a.split("|").forEach(function(a){a=a.toLowerCase(),c[a]=b;var d=a.split(" ").slice(0,-1);d.reduce(function(a,b,c){var d=a[c-1]?a[c-1]+" ":"";return a.concat([d+b])},[]).forEach(function(a){c[a]||(c[a]="null")})},this)}},b.handler.handleKeyboard=function(a,b,c,d){if(-1!==d){var e=a.editor;if(-1==b&&(e.pushEmacsMark(),a.count)){var f=new Array(a.count+1).join(c);return a.count=null,{command:"insertstring",args:f}}if("\x00"!=c){var g=n[b];if("c-"==g||a.universalArgument){var h=String(a.count||0),i=parseInt(c[c.length-1]);if("number"==typeof i&&!isNaN(i))return a.count=parseInt(h+i),{command:"null"};a.universalArgument&&(a.count=4)}a.universalArgument=!1,g&&(c=g+c),a.keyChain&&(c=a.keyChain+=" "+c);var j=this.commandKeyBinding[c];if(a.keyChain="null"==j?c:"",j){if("null"===j)return{command:"null"};if("universalArgument"===j)return a.universalArgument=!0,{command:"null"};var k;if("string"!=typeof j&&(k=j.args,j.command&&(j=j.command),"goorselect"===j&&(j=e.emacsMark()?k[1]:k[0],k=null)),"string"!=typeof j||(("insertstring"===j||"splitline"===j||"togglecomment"===j)&&e.pushEmacsMark(),j=this.commands[j]||e.commands.commands[j])){if(j.readonly||j.isYank||(a.lastCommand=null),a.count){var i=a.count;if(a.count=0,!j||!j.handlesCount)return{args:k,command:{exec:function(a,b){for(var c=0;i>c;c++)j.exec(a,b)}}};k||(k={}),"object"==typeof k&&(k.count=i)}return{command:j,args:k}}}}}},b.emacsKeys={"Up|C-p":{command:"goorselect",args:["golineup","selectup"]},"Down|C-n":{command:"goorselect",args:["golinedown","selectdown"]},"Left|C-b":{command:"goorselect",args:["gotoleft","selectleft"]},"Right|C-f":{command:"goorselect",args:["gotoright","selectright"]},"C-Left|M-b":{command:"goorselect",args:["gotowordleft","selectwordleft"]},"C-Right|M-f":{command:"goorselect",args:["gotowordright","selectwordright"]},"Home|C-a":{command:"goorselect",args:["gotolinestart","selecttolinestart"]},"End|C-e":{command:"goorselect",args:["gotolineend","selecttolineend"]},"C-Home|S-M-,":{command:"goorselect",args:["gotostart","selecttostart"]},"C-End|S-M-.":{command:"goorselect",args:["gotoend","selecttoend"]},"S-Up|S-C-p":"selectup","S-Down|S-C-n":"selectdown","S-Left|S-C-b":"selectleft","S-Right|S-C-f":"selectright","S-C-Left|S-M-b":"selectwordleft","S-C-Right|S-M-f":"selectwordright","S-Home|S-C-a":"selecttolinestart","S-End|S-C-e":"selecttolineend","S-C-Home":"selecttostart","S-C-End":"selecttoend","C-l":"recenterTopBottom","M-s":"centerselection","M-g":"gotoline","C-x C-p":"selectall","C-Down":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"C-Up":{command:"goorselect",args:["gotopageup","selectpageup"]},"PageDown|C-v":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"PageUp|M-v":{command:"goorselect",args:["gotopageup","selectpageup"]},"S-C-Down":"selectpagedown","S-C-Up":"selectpageup","C-s":"iSearch","C-r":"iSearchBackwards","M-C-s":"findnext","M-C-r":"findprevious","S-M-5":"replace",Backspace:"backspace","Delete|C-d":"del","Return|C-m":{command:"insertstring",args:"\n"},"C-o":"splitline","M-d|C-Delete":{command:"killWord",args:"right"},"C-Backspace|M-Backspace|M-Delete":{command:"killWord",args:"left"},"C-k":"killLine","C-y|S-Delete":"yank","M-y":"yankRotate","C-g":"keyboardQuit","C-w":"killRegion","M-w":"killRingSave","C-Space":"setMark","C-x C-x":"exchangePointAndMark","C-t":"transposeletters","M-u":"touppercase","M-l":"tolowercase","M-/":"autocomplete","C-u":"universalArgument","M-;":"togglecomment","C-/|C-x u|S-C--|C-z":"undo","S-C-/|S-C-x u|C--|S-C-z":"redo","C-x r":"selectRectangularRegion","M-x":{command:"focusCommandLine",args:"M-x "}},b.handler.bindKeys(b.emacsKeys),b.handler.addCommands({recenterTopBottom:function(a){var b=a.renderer,c=b.$cursorLayer.getPixelPosition(),d=b.$size.scrollerHeight-b.lineHeight,e=b.scrollTop;e=Math.abs(c.top-e)<2?c.top-d:Math.abs(c.top-e-.5*d)<2?c.top:c.top-.5*d,a.session.setScrollTop(e)},selectRectangularRegion:function(a){a.multiSelect.toggleBlockSelection()},setMark:{exec:function(a,b){if(b&&b.count){var c=a.popEmacsMark();return void(c&&a.selection.moveCursorToPosition(c))}var c=a.emacsMark(),d=!0;if(d&&(c||!a.selection.isEmpty()))return a.pushEmacsMark(),void a.clearSelection();if(c){var e=a.getCursorPosition();if(a.selection.isEmpty()&&c.row==e.row&&c.column==e.column)return void a.pushEmacsMark()}c=a.getCursorPosition(),a.setEmacsMark(c),a.selection.setSelectionAnchor(c.row,c.column)},readonly:!0,handlesCount:!0,multiSelectAction:"forEach"},exchangePointAndMark:{exec:function(a,b){var c=a.selection;if(b.count){var d=a.getCursorPosition();return c.clearSelection(),c.moveCursorToPosition(a.popEmacsMark()),void a.pushEmacsMark(d)}var e=a.getLastEmacsMark(),f=c.getRange();return f.isEmpty()?void c.selectToPosition(e):void c.setSelectionRange(f,!c.isBackwards())},readonly:!0,handlesCount:!0,multiSelectAction:"forEach"},killWord:{exec:function(a,c){a.clearSelection(),"left"==c?a.selection.selectWordLeft():a.selection.selectWordRight();var d=a.getSelectionRange(),e=a.session.getTextRange(d);b.killRing.add(e),a.session.remove(d),a.clearSelection()},multiSelectAction:"forEach"},killLine:function(a){a.pushEmacsMark(null);var c=a.getCursorPosition();0===c.column&&0===a.session.doc.getLine(c.row).length?a.selection.selectLine():(a.clearSelection(),a.selection.selectLineEnd());var d=a.getSelectionRange(),e=a.session.getTextRange(d);b.killRing.add(e),a.session.remove(d),a.clearSelection()},yank:function(a){a.onPaste(b.killRing.get()||""),a.keyBinding.$data.lastCommand="yank"},yankRotate:function(a){"yank"==a.keyBinding.$data.lastCommand&&(a.undo(),a.onPaste(b.killRing.rotate()),a.keyBinding.$data.lastCommand="yank")},killRegion:{exec:function(a){b.killRing.add(a.getCopyText()),a.commands.byName.cut.exec(a)},readonly:!0,multiSelectAction:"forEach"},killRingSave:{exec:function(a){b.killRing.add(a.getCopyText()),setTimeout(function(){var b=a.selection,c=b.getRange();a.pushEmacsMark(b.isBackwards()?c.end:c.start),b.clearSelection()},0)},readonly:!0},keyboardQuit:function(a){a.selection.clearSelection(),a.setEmacsMark(null)},focusCommandLine:function(a,b){a.showCommandLine&&a.showCommandLine(b)}}),b.handler.addCommands(e.iSearchStartCommands);var p=b.handler.commands;p.yank.isYank=!0,p.yankRotate.isYank=!0,b.killRing={$data:[],add:function(a){a&&this.$data.push(a),this.$data.length>30&&this.$data.shift()},get:function(a){return a=a||1,this.$data.slice(this.$data.length-a,this.$data.length).reverse().join("\n")},pop:function(){return this.$data.length>1&&this.$data.pop(),this.get()},rotate:function(){return this.$data.unshift(this.$data.pop()),this.get()}}});