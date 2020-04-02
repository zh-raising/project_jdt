ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(e.prototype),b.MatchingBraceOutdent=e}),ace.define("ace/mode/livescript",["require","exports","module","ace/tokenizer","ace/mode/matching_brace_outdent","ace/range","ace/mode/text"],function(a,b,c){function d(a,b){function c(){}return c.prototype=(a.superclass=b).prototype,(a.prototype=new c).constructor=a,"function"==typeof b.extended&&b.extended(a),a}function e(a,b){var c={}.hasOwnProperty;for(var d in b)c.call(b,d)&&(a[d]=b[d]);return a}var f,g,h,i;f="(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*",b.Mode=g=function(b){function c(){var b;this.$tokenizer=new(a("../tokenizer").Tokenizer)(c.Rules),(b=a("../mode/matching_brace_outdent"))&&(this.$outdent=new b.MatchingBraceOutdent),this.$id="ace/mode/livescript"}var g,h=d((e(c,b).displayName="LiveScriptMode",c),b).prototype;return g=RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*"+f+")?))\\s*$"),h.getNextLineIndent=function(a,b,c){var d,e;return d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a).tokens,e.length&&"comment"===e[e.length-1].type||"start"===a&&g.test(b)&&(d+=c),d},h.toggleCommentLines=function(b,c,d,e){var f,g,h,i,j,k;for(f=/^(\s*)#/,g=new(a("../range").Range)(0,0,0,0),h=d;e>=h;++h)i=h,k=(j=f.test(k=c.getLine(i)))?k.replace(f,"$1"):k.replace(/^\s*/,"$&#"),g.end.row=g.start.row=i,g.end.column=k.length+1,c.replace(g,k);return 1-2*j},h.checkOutdent=function(a,b,c){var d;return null!=(d=this.$outdent)?d.checkOutdent(b,c):void 0},h.autoOutdent=function(a,b,c){var d;return null!=(d=this.$outdent)?d.autoOutdent(b,c):void 0},c}(a("../mode/text").Mode),h="(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))",i={token:"string",regex:".+"},g.Rules={start:[{token:"keyword",regex:"(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)"+h},{token:"constant.language",regex:"(?:true|false|yes|no|on|off|null|void|undefined)"+h},{token:"invalid.illegal",regex:"(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)"+h},{token:"language.support.class",regex:"(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)"+h},{token:"language.support.function",regex:"(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)"+h},{token:"variable.language",regex:"(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)"+h},{token:"identifier",regex:f+"\\s*:(?![:=])"},{token:"variable",regex:f},{token:"keyword.operator",regex:"(?:\\.{3}|\\s+\\?)"},{token:"keyword.variable",regex:"(?:@+|::|\\.\\.)",next:"key"},{token:"keyword.operator",regex:"\\.\\s*",next:"key"},{token:"string",regex:"\\\\\\S[^\\s,;)}\\]]*"},{token:"string.doc",regex:"'''",next:"qdoc"},{token:"string.doc",regex:'"""',next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',next:"qqstring"},{token:"string",regex:"`",next:"js"},{token:"string",regex:"<\\[",next:"words"},{token:"string.regex",regex:"//",next:"heregex"},{token:"comment.doc",regex:"/\\*",next:"comment"},{token:"comment",regex:"#.*"},{token:"string.regex",regex:"\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",next:"key"},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"},{token:"lparen",regex:"[({[]"},{token:"rparen",regex:"[)}\\]]",next:"key"},{token:"keyword.operator",regex:"\\S+"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:".*?//[gimy$?]{0,4}",next:"start"},{token:"string.regex",regex:"\\s*#{"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",regex:"\\S+"}],key:[{token:"keyword.operator",regex:"[.?@!]+"},{token:"identifier",regex:f,next:"start"},{token:"text",regex:".",next:"start"}],comment:[{token:"comment.doc",regex:".*?\\*/",next:"start"},{token:"comment.doc",regex:".+"}],qdoc:[{token:"string",regex:".*?'''",next:"key"},i],qqdoc:[{token:"string",regex:'.*?"""',next:"key"},i],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",next:"key"},i],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',next:"key"},i],js:[{token:"string",regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"key"},i],words:[{token:"string",regex:".*?\\]>",next:"key"},i]}});