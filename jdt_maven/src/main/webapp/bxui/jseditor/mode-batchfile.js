ace.define("ace/mode/batchfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"keyword.command.dosbatch",regex:"\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b",caseInsensitive:!0},{token:"keyword.control.statement.dosbatch",regex:"\\b(?:goto|call|exit)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.if.dosbatch",regex:"\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.dosbatch",regex:"\\b(?:if|else)\\b",caseInsensitive:!0},{token:"keyword.control.repeat.dosbatch",regex:"\\bfor\\b",caseInsensitive:!0},{token:"keyword.operator.dosbatch",regex:"\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b"},{token:["doc.comment","comment"],regex:"(?:^|\\b)(rem)($|\\s.*$)",caseInsensitive:!0},{token:"comment.line.colons.dosbatch",regex:"::.*$"},{include:"variable"},{token:"punctuation.definition.string.begin.shell",regex:'"',push:[{token:"punctuation.definition.string.end.shell",regex:'"',next:"pop"},{include:"variable"},{defaultToken:"string.quoted.double.dosbatch"}]},{token:"keyword.operator.pipe.dosbatch",regex:"[|]"},{token:"keyword.operator.redirect.shell",regex:"&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>"}],variable:[{token:"constant.numeric",regex:"%%\\w+|%[*\\d]|%\\w+%"},{token:"constant.numeric",regex:"%~\\d+"},{token:["markup.list","constant.other","markup.list"],regex:"(%)(\\w+)(%?)"}]},this.normalizeRules()};f.metaData={name:"Batch File",scopeName:"source.dosbatch",fileTypes:["bat"]},d.inherits(f,e),b.BatchFileHighlightRules=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(a){a&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+a.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+a.end)))};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c,d){var e=a.getLine(c),f=e.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length,1);return h&&!h.isMultiLine()&&(d?h=this.getSectionRange(a,c):"all"!=b&&(h=null)),h}if("markbegin"!==b){var f=e.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;return f[1]?this.closingBracketBlock(a,f[1],c,g):a.getCommentFoldRange(c,g,-1)}}},this.getSectionRange=function(a,b){var c=a.getLine(b),d=c.search(/\S/),f=b,g=c.length;b+=1;for(var h=b,i=a.getLength();++b<i;){c=a.getLine(b);var j=c.search(/\S/);if(-1!==j){if(d>j)break;var k=this.getFoldWidgetRange(a,"all",b);if(k){if(k.start.row<=f)break;if(k.isMultiLine())b=k.end.row;else if(d==j)break}h=b}}return new e(f,g,h,a.getLine(h).length)}}.call(g.prototype)}),ace.define("ace/mode/batchfile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/batchfile_highlight_rules","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("./batchfile_highlight_rules").BatchFileHighlightRules,g=a("./folding/cstyle").FoldMode,h=function(){this.HighlightRules=f,this.foldingRules=new g};d.inherits(h,e),function(){this.lineCommentStart="::",this.blockComment="",this.$id="ace/mode/batchfile"}.call(h.prototype),b.Mode=h});