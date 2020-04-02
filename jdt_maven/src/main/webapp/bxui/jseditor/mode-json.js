ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"variable",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},{token:"string",regex:'"',next:"string"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"invalid.illegal",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"invalid.illegal",regex:"\\/\\/.*$"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],string:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:'"',next:"start"},{token:"string",regex:"",next:"start"}]}};d.inherits(f,e),b.JsonHighlightRules=f}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(e.prototype),b.MatchingBraceOutdent=e}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(a,b,c){"use strict";var d,e=a("../../lib/oop"),f=a("../behaviour").Behaviour,g=a("../../token_iterator").TokenIterator,h=a("../../lib/lang"),i=["text","paren.rparen","punctuation.operator"],j=["text","paren.rparen","punctuation.operator","comment"],k={},l=function(a){var b=-1;return a.multiSelect&&(b=a.selection.id,k.rangeCount!=a.multiSelect.rangeCount&&(k={rangeCount:a.multiSelect.rangeCount})),k[b]?d=k[b]:void(d=k[b]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},m=function(){this.add("braces","insertion",function(a,b,c,e,f){var g=c.getCursorPosition(),i=e.doc.getLine(g.row);if("{"==f){l(c);var j=c.getSelectionRange(),k=e.doc.getTextRange(j);if(""!==k&&"{"!==k&&c.getWrapBehavioursEnabled())return{text:"{"+k+"}",selection:!1};if(m.isSaneInsertion(c,e))return/[\]\}\)]/.test(i[g.column])||c.inMultiSelectMode?(m.recordAutoInsert(c,e,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(c,e,"{"),{text:"{",selection:[1,1]})}else if("}"==f){l(c);var n=i.substring(g.column,g.column+1);if("}"==n){var o=e.$findOpeningBracket("}",{column:g.column+1,row:g.row});if(null!==o&&m.isAutoInsertedClosing(g,i,f))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==f||"\r\n"==f){l(c);var p="";m.isMaybeInsertedClosing(g,i)&&(p=h.stringRepeat("}",d.maybeInsertedBrackets),m.clearMaybeInsertedClosing());var n=i.substring(g.column,g.column+1);if("}"===n){var q=e.findMatchingBracket({row:g.row,column:g.column+1},"}");if(!q)return null;var r=this.$getIndent(e.getLine(q.row))}else{if(!p)return void m.clearMaybeInsertedClosing();var r=this.$getIndent(i)}var s=r+e.getTabString();return{text:"\n"+s+"\n"+r+p,selection:[1,s.length,1,s.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(a,b,c,e,f){var g=e.doc.getTextRange(f);if(!f.isMultiLine()&&"{"==g){l(c);var h=e.doc.getLine(f.start.row),i=h.substring(f.end.column,f.end.column+1);if("}"==i)return f.end.column++,f;d.maybeInsertedBrackets--}}),this.add("parens","insertion",function(a,b,c,d,e){if("("==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return{text:"("+g+")",selection:!1};if(m.isSaneInsertion(c,d))return m.recordAutoInsert(c,d,")"),{text:"()",selection:[1,1]}}else if(")"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(")"==j){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(null!==k&&m.isAutoInsertedClosing(h,i,e))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"("==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(")"==h)return e.end.column++,e}}),this.add("brackets","insertion",function(a,b,c,d,e){if("["==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return{text:"["+g+"]",selection:!1};if(m.isSaneInsertion(c,d))return m.recordAutoInsert(c,d,"]"),{text:"[]",selection:[1,1]}}else if("]"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if("]"==j){var k=d.$findOpeningBracket("]",{column:h.column+1,row:h.row});if(null!==k&&m.isAutoInsertedClosing(h,i,e))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"["==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if("]"==h)return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if('"'==e||"'"==e){l(c);var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(""!==h&&"'"!==h&&'"'!=h&&c.getWrapBehavioursEnabled())return{text:f+h+f,selection:!1};var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column);if("\\"==k)return null;for(var n,o=d.getTokens(g.start.row),p=0,q=-1,r=0;r<o.length&&(n=o[r],"string"==n.type?q=-1:0>q&&(q=n.value.indexOf(f)),!(n.value.length+p>g.start.column));r++)p+=o[r].value.length;if(!n||0>q&&"comment"!==n.type&&("string"!==n.type||g.start.column!==n.value.length+p-1&&n.value.lastIndexOf(f)===n.value.length-1)){if(!m.isSaneInsertion(c,d))return;return{text:f+f,selection:[1,1]}}if(n&&"string"===n.type){var s=j.substring(i.column,i.column+1);if(s==f)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&('"'==f||"'"==f)){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==f)return e.end.column++,e}})};m.isSaneInsertion=function(a,b){var c=a.getCursorPosition(),d=new g(b,c.row,c.column);if(!this.$matchTokenType(d.getCurrentToken()||"text",i)){var e=new g(b,c.row,c.column+1);if(!this.$matchTokenType(e.getCurrentToken()||"text",i))return!1}return d.stepForward(),d.getCurrentTokenRow()!==c.row||this.$matchTokenType(d.getCurrentToken()||"text",j)},m.$matchTokenType=function(a,b){return b.indexOf(a.type||a)>-1},m.recordAutoInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isAutoInsertedClosing(e,f,d.autoInsertedLineEnd[0])||(d.autoInsertedBrackets=0),d.autoInsertedRow=e.row,d.autoInsertedLineEnd=c+f.substr(e.column),d.autoInsertedBrackets++},m.recordMaybeInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isMaybeInsertedClosing(e,f)||(d.maybeInsertedBrackets=0),d.maybeInsertedRow=e.row,d.maybeInsertedLineStart=f.substr(0,e.column)+c,d.maybeInsertedLineEnd=f.substr(e.column),d.maybeInsertedBrackets++},m.isAutoInsertedClosing=function(a,b,c){return d.autoInsertedBrackets>0&&a.row===d.autoInsertedRow&&c===d.autoInsertedLineEnd[0]&&b.substr(a.column)===d.autoInsertedLineEnd},m.isMaybeInsertedClosing=function(a,b){return d.maybeInsertedBrackets>0&&a.row===d.maybeInsertedRow&&b.substr(a.column)===d.maybeInsertedLineEnd&&b.substr(0,a.column)==d.maybeInsertedLineStart},m.popAutoInsertedClosing=function(){d.autoInsertedLineEnd=d.autoInsertedLineEnd.substr(1),d.autoInsertedBrackets--},m.clearMaybeInsertedClosing=function(){d&&(d.maybeInsertedBrackets=0,d.maybeInsertedRow=-1)},e.inherits(m,f),b.CstyleBehaviour=m}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(a){a&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+a.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+a.end)))};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c,d){var e=a.getLine(c),f=e.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length,1);return h&&!h.isMultiLine()&&(d?h=this.getSectionRange(a,c):"all"!=b&&(h=null)),h}if("markbegin"!==b){var f=e.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;return f[1]?this.closingBracketBlock(a,f[1],c,g):a.getCommentFoldRange(c,g,-1)}}},this.getSectionRange=function(a,b){var c=a.getLine(b),d=c.search(/\S/),f=b,g=c.length;b+=1;for(var h=b,i=a.getLength();++b<i;){c=a.getLine(b);var j=c.search(/\S/);if(-1!==j){if(d>j)break;var k=this.getFoldWidgetRange(a,"all",b);if(k){if(k.start.row<=f)break;if(k.isMultiLine())b=k.end.row;else if(d==j)break}h=b}}return new e(f,g,h,a.getLine(h).length)}}.call(g.prototype)}),ace.define("ace/mode/json",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/json_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/worker/worker_client"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("./json_highlight_rules").JsonHighlightRules,g=a("./matching_brace_outdent").MatchingBraceOutdent,h=a("./behaviour/cstyle").CstyleBehaviour,i=a("./folding/cstyle").FoldMode,j=a("../worker/worker_client").WorkerClient,k=function(){this.HighlightRules=f,this.$outdent=new g,this.$behaviour=new h,this.foldingRules=new i};d.inherits(k,e),function(){this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b);if("start"==a){var e=b.match(/^.*[\{\(\[]\s*$/);e&&(d+=c)}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new j(["ace"],"ace/mode/json_worker","JsonWorker");return b.attachToDocument(a.getDocument()),b.on("error",function(b){a.setAnnotations([b.data])}),b.on("ok",function(){a.clearAnnotations()}),b},this.$id="ace/mode/json"}.call(k.prototype),b.Mode=k});