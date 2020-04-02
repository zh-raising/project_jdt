ace.define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=b.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set",g=b.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",h=function(){var a=this.createKeywordMapper({keyword:f,"support.function.builtin":g,"invalid.deprecated":"debugger"},"identifier"),b="(?:(?:[1-9]\\d*)|(?:0))",c="(?:\\.\\d+)",d="(?:\\d+)",e="(?:(?:"+d+"?"+c+")|(?:"+d+"\\.))",h="(?:(?:"+e+"|"+d+"))",i="(?:"+h+"|"+e+")",j="(?:&"+d+")",k="[a-zA-Z_][a-zA-Z0-9_]*",l="(?:(?:\\$"+k+")|(?:"+k+"=))",m="(?:\\$(?:SHLVL|\\$|\\!|\\?))",n="(?:"+k+"\\s*\\(\\))";this.$rules={start:[{token:"constant",regex:/\\./},{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"',push:[{token:"constant.language.escape",regex:/\\(?:[$abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/},{token:"constant",regex:/\$\w+/},{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"variable.language",regex:m},{token:"variable",regex:l},{token:"support.function",regex:n},{token:"support.function",regex:j},{token:"string",start:"'",end:"'"},{token:"constant.numeric",regex:i},{token:"constant.numeric",regex:b+"\\b"},{token:a,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"}]},this.normalizeRules()};d.inherits(h,e),b.ShHighlightRules=h}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(a){a&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+a.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+a.end)))};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c,d){var e=a.getLine(c),f=e.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length,1);return h&&!h.isMultiLine()&&(d?h=this.getSectionRange(a,c):"all"!=b&&(h=null)),h}if("markbegin"!==b){var f=e.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;return f[1]?this.closingBracketBlock(a,f[1],c,g):a.getCommentFoldRange(c,g,-1)}}},this.getSectionRange=function(a,b){var c=a.getLine(b),d=c.search(/\S/),f=b,g=c.length;b+=1;for(var h=b,i=a.getLength();++b<i;){c=a.getLine(b);var j=c.search(/\S/);if(-1!==j){if(d>j)break;var k=this.getFoldWidgetRange(a,"all",b);if(k){if(k.start.row<=f)break;if(k.isMultiLine())b=k.end.row;else if(d==j)break}h=b}}return new e(f,g,h,a.getLine(h).length)}}.call(g.prototype)}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(a,b,c){"use strict";var d,e=a("../../lib/oop"),f=a("../behaviour").Behaviour,g=a("../../token_iterator").TokenIterator,h=a("../../lib/lang"),i=["text","paren.rparen","punctuation.operator"],j=["text","paren.rparen","punctuation.operator","comment"],k={},l=function(a){var b=-1;return a.multiSelect&&(b=a.selection.id,k.rangeCount!=a.multiSelect.rangeCount&&(k={rangeCount:a.multiSelect.rangeCount})),k[b]?d=k[b]:void(d=k[b]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},m=function(){this.add("braces","insertion",function(a,b,c,e,f){var g=c.getCursorPosition(),i=e.doc.getLine(g.row);if("{"==f){l(c);var j=c.getSelectionRange(),k=e.doc.getTextRange(j);if(""!==k&&"{"!==k&&c.getWrapBehavioursEnabled())return{text:"{"+k+"}",selection:!1};if(m.isSaneInsertion(c,e))return/[\]\}\)]/.test(i[g.column])||c.inMultiSelectMode?(m.recordAutoInsert(c,e,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(c,e,"{"),{text:"{",selection:[1,1]})}else if("}"==f){l(c);var n=i.substring(g.column,g.column+1);if("}"==n){var o=e.$findOpeningBracket("}",{column:g.column+1,row:g.row});if(null!==o&&m.isAutoInsertedClosing(g,i,f))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==f||"\r\n"==f){l(c);var p="";m.isMaybeInsertedClosing(g,i)&&(p=h.stringRepeat("}",d.maybeInsertedBrackets),m.clearMaybeInsertedClosing());var n=i.substring(g.column,g.column+1);if("}"===n){var q=e.findMatchingBracket({row:g.row,column:g.column+1},"}");if(!q)return null;var r=this.$getIndent(e.getLine(q.row))}else{if(!p)return void m.clearMaybeInsertedClosing();var r=this.$getIndent(i)}var s=r+e.getTabString();return{text:"\n"+s+"\n"+r+p,selection:[1,s.length,1,s.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(a,b,c,e,f){var g=e.doc.getTextRange(f);if(!f.isMultiLine()&&"{"==g){l(c);var h=e.doc.getLine(f.start.row),i=h.substring(f.end.column,f.end.column+1);if("}"==i)return f.end.column++,f;d.maybeInsertedBrackets--}}),this.add("parens","insertion",function(a,b,c,d,e){if("("==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return{text:"("+g+")",selection:!1};if(m.isSaneInsertion(c,d))return m.recordAutoInsert(c,d,")"),{text:"()",selection:[1,1]}}else if(")"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(")"==j){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(null!==k&&m.isAutoInsertedClosing(h,i,e))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"("==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(")"==h)return e.end.column++,e}}),this.add("brackets","insertion",function(a,b,c,d,e){if("["==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return{text:"["+g+"]",selection:!1};if(m.isSaneInsertion(c,d))return m.recordAutoInsert(c,d,"]"),{text:"[]",selection:[1,1]}}else if("]"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if("]"==j){var k=d.$findOpeningBracket("]",{column:h.column+1,row:h.row});if(null!==k&&m.isAutoInsertedClosing(h,i,e))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"["==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if("]"==h)return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if('"'==e||"'"==e){l(c);var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(""!==h&&"'"!==h&&'"'!=h&&c.getWrapBehavioursEnabled())return{text:f+h+f,selection:!1};var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column);if("\\"==k)return null;for(var n,o=d.getTokens(g.start.row),p=0,q=-1,r=0;r<o.length&&(n=o[r],"string"==n.type?q=-1:0>q&&(q=n.value.indexOf(f)),!(n.value.length+p>g.start.column));r++)p+=o[r].value.length;if(!n||0>q&&"comment"!==n.type&&("string"!==n.type||g.start.column!==n.value.length+p-1&&n.value.lastIndexOf(f)===n.value.length-1)){if(!m.isSaneInsertion(c,d))return;return{text:f+f,selection:[1,1]}}if(n&&"string"===n.type){var s=j.substring(i.column,i.column+1);if(s==f)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&('"'==f||"'"==f)){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==f)return e.end.column++,e}})};m.isSaneInsertion=function(a,b){var c=a.getCursorPosition(),d=new g(b,c.row,c.column);if(!this.$matchTokenType(d.getCurrentToken()||"text",i)){var e=new g(b,c.row,c.column+1);if(!this.$matchTokenType(e.getCurrentToken()||"text",i))return!1}return d.stepForward(),d.getCurrentTokenRow()!==c.row||this.$matchTokenType(d.getCurrentToken()||"text",j)},m.$matchTokenType=function(a,b){return b.indexOf(a.type||a)>-1},m.recordAutoInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isAutoInsertedClosing(e,f,d.autoInsertedLineEnd[0])||(d.autoInsertedBrackets=0),d.autoInsertedRow=e.row,d.autoInsertedLineEnd=c+f.substr(e.column),d.autoInsertedBrackets++},m.recordMaybeInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isMaybeInsertedClosing(e,f)||(d.maybeInsertedBrackets=0),d.maybeInsertedRow=e.row,d.maybeInsertedLineStart=f.substr(0,e.column)+c,d.maybeInsertedLineEnd=f.substr(e.column),d.maybeInsertedBrackets++},m.isAutoInsertedClosing=function(a,b,c){return d.autoInsertedBrackets>0&&a.row===d.autoInsertedRow&&c===d.autoInsertedLineEnd[0]&&b.substr(a.column)===d.autoInsertedLineEnd},m.isMaybeInsertedClosing=function(a,b){return d.maybeInsertedBrackets>0&&a.row===d.maybeInsertedRow&&b.substr(a.column)===d.maybeInsertedLineEnd&&b.substr(0,a.column)==d.maybeInsertedLineStart},m.popAutoInsertedClosing=function(){d.autoInsertedLineEnd=d.autoInsertedLineEnd.substr(1),d.autoInsertedBrackets--},m.clearMaybeInsertedClosing=function(){d&&(d.maybeInsertedBrackets=0,d.maybeInsertedRow=-1)},e.inherits(m,f),b.CstyleBehaviour=m}),ace.define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sh_highlight_rules","ace/range","ace/mode/folding/cstyle","ace/mode/behaviour/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("./sh_highlight_rules").ShHighlightRules,g=a("../range").Range,h=a("./folding/cstyle").FoldMode,i=a("./behaviour/cstyle").CstyleBehaviour,j=function(){this.HighlightRules=f,this.foldingRules=new h,this.$behaviour=new i};d.inherits(j,e),function(){this.lineCommentStart="#",this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.getTokenizer().getLineTokens(b,a),f=e.tokens;if(f.length&&"comment"==f[f.length-1].type)return d;if("start"==a){var g=b.match(/^.*[\{\(\[\:]\s*$/);g&&(d+=c)}return d};var a={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(b,c,d){if("\r\n"!==d&&"\r"!==d&&"\n"!==d)return!1;var e=this.getTokenizer().getLineTokens(c.trim(),b).tokens;if(!e)return!1;do var f=e.pop();while(f&&("comment"==f.type||"text"==f.type&&f.value.match(/^\s+$/)));return f?"keyword"==f.type&&a[f.value]:!1},this.autoOutdent=function(a,b,c){c+=1;var d=this.$getIndent(b.getLine(c)),e=b.getTabString();d.slice(-e.length)==e&&b.remove(new g(c,d.length-e.length,c,d.length))},this.$id="ace/mode/sh"}.call(j.prototype),b.Mode=j}),ace.define("ace/mode/dockerfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/sh_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./sh_highlight_rules").ShHighlightRules,f=function(){e.call(this);for(var a=this.$rules.start,b=0;b<a.length;b++)if("variable.language"==a[b].token){a.splice(b,0,{token:"variable.language",regex:"(?:^(?:FROM|MAINTAINER|RUN|CMD|EXPOSE|ENV|ADD|ENTRYPOINT|VOLUME|USER|WORKDIR|ONBUILD)\\b)",caseInsensitive:!0});break}};d.inherits(f,e),b.DockerfileHighlightRules=f}),ace.define("ace/mode/dockerfile",["require","exports","module","ace/lib/oop","ace/mode/sh","ace/mode/dockerfile_highlight_rules","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./sh").Mode,f=a("./dockerfile_highlight_rules").DockerfileHighlightRules,g=a("./folding/cstyle").FoldMode,h=function(){e.call(this),this.HighlightRules=f,this.foldingRules=new g};d.inherits(h,e),function(){this.$id="ace/mode/dockerfile"}.call(h.prototype),b.Mode=h});