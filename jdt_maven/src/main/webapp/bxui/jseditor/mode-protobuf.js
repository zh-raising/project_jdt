ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};d.inherits(f,e),f.getStartRule=function(a){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:a}},f.getEndRule=function(a){return{token:"comment.doc",regex:"\\*\\/",next:a}},b.DocCommentHighlightRules=f}),ace.define("ace/mode/c_cpp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./doc_comment_highlight_rules").DocCommentHighlightRules,f=a("./text_highlight_rules").TextHighlightRules,g=b.cFunctions="\\b(?:hypot(?:f|l)?|s(?:scanf|ystem|nprintf|ca(?:nf|lb(?:n(?:f|l)?|ln(?:f|l)?))|i(?:n(?:h(?:f|l)?|f|l)?|gn(?:al|bit))|tr(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?)|error|pbrk|ftime|len|rchr|xfrm)|printf|et(?:jmp|vbuf|locale|buf)|qrt(?:f|l)?|w(?:scanf|printf)|rand)|n(?:e(?:arbyint(?:f|l)?|xt(?:toward(?:f|l)?|after(?:f|l)?))|an(?:f|l)?)|c(?:s(?:in(?:h(?:f|l)?|f|l)?|qrt(?:f|l)?)|cos(?:h(?:f)?|f|l)?|imag(?:f|l)?|t(?:ime|an(?:h(?:f|l)?|f|l)?)|o(?:s(?:h(?:f|l)?|f|l)?|nj(?:f|l)?|pysign(?:f|l)?)|p(?:ow(?:f|l)?|roj(?:f|l)?)|e(?:il(?:f|l)?|xp(?:f|l)?)|l(?:o(?:ck|g(?:f|l)?)|earerr)|a(?:sin(?:h(?:f|l)?|f|l)?|cos(?:h(?:f|l)?|f|l)?|tan(?:h(?:f|l)?|f|l)?|lloc|rg(?:f|l)?|bs(?:f|l)?)|real(?:f|l)?|brt(?:f|l)?)|t(?:ime|o(?:upper|lower)|an(?:h(?:f|l)?|f|l)?|runc(?:f|l)?|gamma(?:f|l)?|mp(?:nam|file))|i(?:s(?:space|n(?:ormal|an)|cntrl|inf|digit|u(?:nordered|pper)|p(?:unct|rint)|finite|w(?:space|c(?:ntrl|type)|digit|upper|p(?:unct|rint)|lower|al(?:num|pha)|graph|xdigit|blank)|l(?:ower|ess(?:equal|greater)?)|al(?:num|pha)|gr(?:eater(?:equal)?|aph)|xdigit|blank)|logb(?:f|l)?|max(?:div|abs))|di(?:v|fftime)|_Exit|unget(?:c|wc)|p(?:ow(?:f|l)?|ut(?:s|c(?:har)?|wc(?:har)?)|error|rintf)|e(?:rf(?:c(?:f|l)?|f|l)?|x(?:it|p(?:2(?:f|l)?|f|l|m1(?:f|l)?)?))|v(?:s(?:scanf|nprintf|canf|printf|w(?:scanf|printf))|printf|f(?:scanf|printf|w(?:scanf|printf))|w(?:scanf|printf)|a_(?:start|copy|end|arg))|qsort|f(?:s(?:canf|e(?:tpos|ek))|close|tell|open|dim(?:f|l)?|p(?:classify|ut(?:s|c|w(?:s|c))|rintf)|e(?:holdexcept|set(?:e(?:nv|xceptflag)|round)|clearexcept|testexcept|of|updateenv|r(?:aiseexcept|ror)|get(?:e(?:nv|xceptflag)|round))|flush|w(?:scanf|ide|printf|rite)|loor(?:f|l)?|abs(?:f|l)?|get(?:s|c|pos|w(?:s|c))|re(?:open|e|ad|xp(?:f|l)?)|m(?:in(?:f|l)?|od(?:f|l)?|a(?:f|l|x(?:f|l)?)?))|l(?:d(?:iv|exp(?:f|l)?)|o(?:ngjmp|cal(?:time|econv)|g(?:1(?:p(?:f|l)?|0(?:f|l)?)|2(?:f|l)?|f|l|b(?:f|l)?)?)|abs|l(?:div|abs|r(?:int(?:f|l)?|ound(?:f|l)?))|r(?:int(?:f|l)?|ound(?:f|l)?)|gamma(?:f|l)?)|w(?:scanf|c(?:s(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?|mbs)|pbrk|ftime|len|r(?:chr|tombs)|xfrm)|to(?:b|mb)|rtomb)|printf|mem(?:set|c(?:hr|py|mp)|move))|a(?:s(?:sert|ctime|in(?:h(?:f|l)?|f|l)?)|cos(?:h(?:f|l)?|f|l)?|t(?:o(?:i|f|l(?:l)?)|exit|an(?:h(?:f|l)?|2(?:f|l)?|f|l)?)|b(?:s|ort))|g(?:et(?:s|c(?:har)?|env|wc(?:har)?)|mtime)|r(?:int(?:f|l)?|ound(?:f|l)?|e(?:name|alloc|wind|m(?:ove|quo(?:f|l)?|ainder(?:f|l)?))|a(?:nd|ise))|b(?:search|towc)|m(?:odf(?:f|l)?|em(?:set|c(?:hr|py|mp)|move)|ktime|alloc|b(?:s(?:init|towcs|rtowcs)|towc|len|r(?:towc|len))))\\b",h=function(){var a="break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using",b="asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void|class|wchar_t|template",c="const|extern|register|restrict|static|volatile|inline|private:|protected:|public:|friend|explicit|virtual|export|mutable|typename",d="and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eqconst_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",f="NULL|true|false|TRUE|FALSE",h=this.$keywords=this.createKeywordMapper({"keyword.control":a,"storage.type":b,"storage.modifier":c,"keyword.operator":d,"variable.language":"this","constant.language":f},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},e.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"keyword",regex:"#\\s*(?:include|import|pragma|line|define|undef|if|ifdef|else|elif|ifndef)\\b",next:"directive"},{token:"keyword",regex:"(?:#\\s*endif)\\b"},{token:"support.function.C99.c",regex:g},{token:h,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(e,"doc-",[e.getEndRule("start")])};d.inherits(h,f),b.c_cppHighlightRules=h}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(e.prototype),b.MatchingBraceOutdent=e}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(a,b,c){"use strict";var d,e=a("../../lib/oop"),f=a("../behaviour").Behaviour,g=a("../../token_iterator").TokenIterator,h=a("../../lib/lang"),i=["text","paren.rparen","punctuation.operator"],j=["text","paren.rparen","punctuation.operator","comment"],k={},l=function(a){var b=-1;return a.multiSelect&&(b=a.selection.id,k.rangeCount!=a.multiSelect.rangeCount&&(k={rangeCount:a.multiSelect.rangeCount})),k[b]?d=k[b]:void(d=k[b]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},m=function(){this.add("braces","insertion",function(a,b,c,e,f){var g=c.getCursorPosition(),i=e.doc.getLine(g.row);if("{"==f){l(c);var j=c.getSelectionRange(),k=e.doc.getTextRange(j);if(""!==k&&"{"!==k&&c.getWrapBehavioursEnabled())return{text:"{"+k+"}",selection:!1};if(m.isSaneInsertion(c,e))return/[\]\}\)]/.test(i[g.column])||c.inMultiSelectMode?(m.recordAutoInsert(c,e,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(c,e,"{"),{text:"{",selection:[1,1]})}else if("}"==f){l(c);var n=i.substring(g.column,g.column+1);if("}"==n){var o=e.$findOpeningBracket("}",{column:g.column+1,row:g.row});if(null!==o&&m.isAutoInsertedClosing(g,i,f))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==f||"\r\n"==f){l(c);var p="";m.isMaybeInsertedClosing(g,i)&&(p=h.stringRepeat("}",d.maybeInsertedBrackets),m.clearMaybeInsertedClosing());var n=i.substring(g.column,g.column+1);if("}"===n){var q=e.findMatchingBracket({row:g.row,column:g.column+1},"}");if(!q)return null;var r=this.$getIndent(e.getLine(q.row))}else{if(!p)return void m.clearMaybeInsertedClosing();var r=this.$getIndent(i)}var s=r+e.getTabString();return{text:"\n"+s+"\n"+r+p,selection:[1,s.length,1,s.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(a,b,c,e,f){var g=e.doc.getTextRange(f);if(!f.isMultiLine()&&"{"==g){l(c);var h=e.doc.getLine(f.start.row),i=h.substring(f.end.column,f.end.column+1);if("}"==i)return f.end.column++,f;d.maybeInsertedBrackets--}}),this.add("parens","insertion",function(a,b,c,d,e){if("("==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return{text:"("+g+")",selection:!1};if(m.isSaneInsertion(c,d))return m.recordAutoInsert(c,d,")"),{text:"()",selection:[1,1]}}else if(")"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(")"==j){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(null!==k&&m.isAutoInsertedClosing(h,i,e))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"("==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(")"==h)return e.end.column++,e}}),this.add("brackets","insertion",function(a,b,c,d,e){if("["==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return{text:"["+g+"]",selection:!1};if(m.isSaneInsertion(c,d))return m.recordAutoInsert(c,d,"]"),{text:"[]",selection:[1,1]}}else if("]"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if("]"==j){var k=d.$findOpeningBracket("]",{column:h.column+1,row:h.row});if(null!==k&&m.isAutoInsertedClosing(h,i,e))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"["==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if("]"==h)return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if('"'==e||"'"==e){l(c);var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(""!==h&&"'"!==h&&'"'!=h&&c.getWrapBehavioursEnabled())return{text:f+h+f,selection:!1};var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column);if("\\"==k)return null;for(var n,o=d.getTokens(g.start.row),p=0,q=-1,r=0;r<o.length&&(n=o[r],"string"==n.type?q=-1:0>q&&(q=n.value.indexOf(f)),!(n.value.length+p>g.start.column));r++)p+=o[r].value.length;if(!n||0>q&&"comment"!==n.type&&("string"!==n.type||g.start.column!==n.value.length+p-1&&n.value.lastIndexOf(f)===n.value.length-1)){if(!m.isSaneInsertion(c,d))return;return{text:f+f,selection:[1,1]}}if(n&&"string"===n.type){var s=j.substring(i.column,i.column+1);if(s==f)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&('"'==f||"'"==f)){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==f)return e.end.column++,e}})};m.isSaneInsertion=function(a,b){var c=a.getCursorPosition(),d=new g(b,c.row,c.column);if(!this.$matchTokenType(d.getCurrentToken()||"text",i)){var e=new g(b,c.row,c.column+1);if(!this.$matchTokenType(e.getCurrentToken()||"text",i))return!1}return d.stepForward(),d.getCurrentTokenRow()!==c.row||this.$matchTokenType(d.getCurrentToken()||"text",j)},m.$matchTokenType=function(a,b){return b.indexOf(a.type||a)>-1},m.recordAutoInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isAutoInsertedClosing(e,f,d.autoInsertedLineEnd[0])||(d.autoInsertedBrackets=0),d.autoInsertedRow=e.row,d.autoInsertedLineEnd=c+f.substr(e.column),d.autoInsertedBrackets++},m.recordMaybeInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isMaybeInsertedClosing(e,f)||(d.maybeInsertedBrackets=0),d.maybeInsertedRow=e.row,d.maybeInsertedLineStart=f.substr(0,e.column)+c,d.maybeInsertedLineEnd=f.substr(e.column),d.maybeInsertedBrackets++},m.isAutoInsertedClosing=function(a,b,c){return d.autoInsertedBrackets>0&&a.row===d.autoInsertedRow&&c===d.autoInsertedLineEnd[0]&&b.substr(a.column)===d.autoInsertedLineEnd},m.isMaybeInsertedClosing=function(a,b){return d.maybeInsertedBrackets>0&&a.row===d.maybeInsertedRow&&b.substr(a.column)===d.maybeInsertedLineEnd&&b.substr(0,a.column)==d.maybeInsertedLineStart},m.popAutoInsertedClosing=function(){d.autoInsertedLineEnd=d.autoInsertedLineEnd.substr(1),d.autoInsertedBrackets--},m.clearMaybeInsertedClosing=function(){d&&(d.maybeInsertedBrackets=0,d.maybeInsertedRow=-1)},e.inherits(m,f),b.CstyleBehaviour=m}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(a){a&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+a.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+a.end)))};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c,d){var e=a.getLine(c),f=e.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length,1);return h&&!h.isMultiLine()&&(d?h=this.getSectionRange(a,c):"all"!=b&&(h=null)),h}if("markbegin"!==b){var f=e.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;return f[1]?this.closingBracketBlock(a,f[1],c,g):a.getCommentFoldRange(c,g,-1)}}},this.getSectionRange=function(a,b){var c=a.getLine(b),d=c.search(/\S/),f=b,g=c.length;b+=1;for(var h=b,i=a.getLength();++b<i;){c=a.getLine(b);var j=c.search(/\S/);if(-1!==j){if(d>j)break;var k=this.getFoldWidgetRange(a,"all",b);if(k){if(k.start.row<=f)break;if(k.isMultiLine())b=k.end.row;else if(d==j)break}h=b}}return new e(f,g,h,a.getLine(h).length)}}.call(g.prototype)}),ace.define("ace/mode/c_cpp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c_cpp_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("./c_cpp_highlight_rules").c_cppHighlightRules,g=a("./matching_brace_outdent").MatchingBraceOutdent,h=(a("../range").Range,a("./behaviour/cstyle").CstyleBehaviour),i=a("./folding/cstyle").FoldMode,j=function(){this.HighlightRules=f,this.$outdent=new g,this.$behaviour=new h,this.foldingRules=new i};d.inherits(j,e),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.getTokenizer().getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&"comment"==f[f.length-1].type)return d;if("start"==a){var h=b.match(/^.*[\{\(\[]\s*$/);h&&(d+=c)}else if("doc-start"==a){if("start"==g)return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.$id="ace/mode/c_cpp"}.call(j.prototype),b.Mode=j}),ace.define("ace/mode/protobuf_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){var a="double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes",b="message|required|optional|repeated|package|import|option|enum",c=this.createKeywordMapper({"keyword.declaration.protobuf":b,"support.type":a},"identifier");this.$rules={start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"constant",regex:"<[^>]+>"},{regex:"=",token:"keyword.operator.assignment.protobuf"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:c,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}]},this.normalizeRules()};d.inherits(f,e),b.ProtobufHighlightRules=f}),ace.define("ace/mode/protobuf",["require","exports","module","ace/lib/oop","ace/mode/c_cpp","ace/mode/protobuf_highlight_rules","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./c_cpp").Mode,f=a("./protobuf_highlight_rules").ProtobufHighlightRules,g=a("./folding/cstyle").FoldMode,h=function(){e.call(this),this.foldingRules=new g,this.HighlightRules=f};d.inherits(h,e),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/protobuf"}.call(h.prototype),b.Mode=h});