ace.define("ace/ext/chromevox",["require","exports","module","ace/editor","ace/config"],function(a,b,c){function d(){return"undefined"!=typeof cvox&&cvox&&cvox.Api}function e(a){if(d())ra(a);else{if(sa++,sa>=ta)return;window.setTimeout(e,500,a)}}var f={};f.SpeechProperty,f.Cursor,f.Token,f.Annotation;var g={rate:.8,pitch:.4,volume:.9},h={rate:1,pitch:.5,volume:.9},i={rate:.8,pitch:.8,volume:.9},j={rate:.8,pitch:.3,volume:.9},k={rate:.8,pitch:.7,volume:.9},l={rate:.8,pitch:.8,volume:.9},m={punctuationEcho:"none",relativePitch:-.6},n="ALERT_NONMODAL",o="ALERT_MODAL",p="INVALID_KEYPRESS",q="insertMode",r="start",s=[{substr:";",newSubstr:" semicolon "},{substr:":",newSubstr:" colon "}],t={SPEAK_ANNOT:"annots",SPEAK_ALL_ANNOTS:"all_annots",TOGGLE_LOCATION:"toggle_location",SPEAK_MODE:"mode",SPEAK_ROW_COL:"row_col",TOGGLE_DISPLACEMENT:"toggle_displacement",FOCUS_TEXT:"focus_text"},u="CONTROL + SHIFT ";f.editor=null;var v=null,w={},x=!1,y=!1,z=!1,A=null,B={},C={},D=function(a){return u+String.fromCharCode(a)},E=function(){var a=f.editor.keyBinding.getKeyboardHandler();return"ace/keyboard/vim"===a.$id},F=function(a){return f.editor.getSession().getTokenAt(a.row,a.column+1)},G=function(a){return f.editor.getSession().getLine(a.row)},H=function(a){w[a.row]&&cvox.Api.playEarcon(n),x?(cvox.Api.stop(),T(a),Q(F(a)),P(a.row,1)):P(a.row,0)},I=function(a){var b=G(a),c=b.substr(a.column-1);0===a.column&&(c=" "+b);var d=/^\W(\w+)/,e=d.exec(c);return null!==e},J={constant:{prop:g},entity:{prop:i},keyword:{prop:j},storage:{prop:k},variable:{prop:l},meta:{prop:h,replace:[{substr:"</",newSubstr:" closing tag "},{substr:"/>",newSubstr:" close tag "},{substr:"<",newSubstr:" tag start "},{substr:">",newSubstr:" tag end "}]}},K={prop:K},L=function(a,b){for(var c=a,d=0;d<b.length;d++){var e=b[d],f=new RegExp(e.substr,"g");c=c.replace(f,e.newSubstr)}return c},M=function(a,b,c){var d={};d.value="",d.type=a[b].type;for(var e=b;c>e;e++)d.value+=a[e].value;return d},N=function(a){if(a.length<=1)return a;for(var b=[],c=0,d=1;d<a.length;d++){var e=a[c],f=a[d];R(e)!==R(f)&&(b.push(M(a,c,d)),c=d)}return b.push(M(a,c,a.length)),b},O=function(a){var b=f.editor.getSession().getLine(a),c=/^\s*$/;return null!==c.exec(b)},P=function(a,b){var c=f.editor.getSession().getTokens(a);if(0===c.length||O(a))return void cvox.Api.playEarcon("EDITABLE_TEXT");c=N(c);var d=c[0];c=c.filter(function(a){return a!==d}),S(d,b),c.forEach(Q)},Q=function(a){S(a,1)},R=function(a){if(a&&a.type){var b=a.type.split(".");if(0!==b.length){var c=b[0],d=J[c];return d?d:K}}},S=function(a,b){var c=R(a),d=L(a.value,s);c.replace&&(d=L(d,c.replace)),cvox.Api.speak(d,b,c.prop)},T=function(a){var b=G(a);cvox.Api.speak(b[a.column],1)},U=function(a,b){var c=G(b),d=c.substring(a.column,b.column);d=d.replace(/ /g," space "),cvox.Api.speak(d)},V=function(a,b){if(1!==Math.abs(a.column-b.column)){var c=G(b).length;if(0===b.column||b.column===c)return void P(b.row,0);if(I(b))return cvox.Api.stop(),void Q(F(b))}T(b)},W=function(a,b){f.editor.selection.isEmpty()?y?U(a,b):V(a,b):(U(a,b),cvox.Api.speak("selected",1))},X=function(a){if(z)return void(z=!1);var b=f.editor.selection.getCursor();b.row!==v.row?H(b):W(v,b),v=b},Y=function(a){f.editor.selection.isEmpty()&&cvox.Api.speak("unselected")},Z=function(a){var b=a.data;switch(b.action){case"removeText":cvox.Api.speak(b.text,0,m),z=!0;break;case"insertText":cvox.Api.speak(b.text,0),z=!0}},$=function(a){var b=a.row,c=a.column;return!w[b]||!w[b][c]},_=function(a){w={};for(var b=0;b<a.length;b++){var c=a[b],d=c.row,e=c.column;w[d]||(w[d]={}),w[d][e]=c}},aa=function(a){var b=f.editor.getSession().getAnnotations(),c=b.filter($);c.length>0&&cvox.Api.playEarcon(n),_(b)},ba=function(a){var b=a.type+" "+a.text+" on "+da(a.row,a.column);b=b.replace(";","semicolon"),cvox.Api.speak(b,1)},ca=function(a){var b=w[a];for(var c in b)ba(b[c])},da=function(a,b){return"row "+(a+1)+" column "+(b+1)},ea=function(){cvox.Api.speak(da(v.row,v.column))},fa=function(){for(var a in w)ca(a)},ga=function(){if(E())switch(f.editor.keyBinding.$data.state){case q:cvox.Api.speak("Insert mode");break;case r:cvox.Api.speak("Command mode")}},ha=function(){x=!x,x?cvox.Api.speak("Speak location on row change enabled."):cvox.Api.speak("Speak location on row change disabled.")},ia=function(){y=!y,y?cvox.Api.speak("Speak displacement on column changes."):cvox.Api.speak("Speak current character or word on column changes.")},ja=function(a){if(a.ctrlKey&&a.shiftKey){var b=B[a.keyCode];b&&b.func()}},ka=function(a,b){if(E()){var c=b.keyBinding.$data.state;if(c!==A){switch(c){case q:cvox.Api.playEarcon(o),cvox.Api.setKeyEcho(!0);break;case r:cvox.Api.playEarcon(o),cvox.Api.setKeyEcho(!1)}A=c}}},la=function(a){var b=a.detail.customCommand,c=C[b];c&&(c.func(),f.editor.focus())},ma=function(){var a=pa.map(function(a){return{desc:a.desc+D(a.keyCode),cmd:a.cmd}}),b=document.querySelector("body");b.setAttribute("contextMenuActions",JSON.stringify(a)),b.addEventListener("ATCustomEvent",la,!0)},na=function(a){a.match?P(v.row,0):cvox.Api.playEarcon(p)},oa=function(){f.editor.focus()},pa=[{keyCode:49,func:function(){ca(v.row)},cmd:t.SPEAK_ANNOT,desc:"Speak annotations on line"},{keyCode:50,func:fa,cmd:t.SPEAK_ALL_ANNOTS,desc:"Speak all annotations"},{keyCode:51,func:ga,cmd:t.SPEAK_MODE,desc:"Speak Vim mode"},{keyCode:52,func:ha,cmd:t.TOGGLE_LOCATION,desc:"Toggle speak row location"},{keyCode:53,func:ea,cmd:t.SPEAK_ROW_COL,desc:"Speak row and column"},{keyCode:54,func:ia,cmd:t.TOGGLE_DISPLACEMENT,desc:"Toggle speak displacement"},{keyCode:55,func:oa,cmd:t.FOCUS_TEXT,desc:"Focus text"}],qa=function(){f.editor=editor,editor.getSession().selection.on("changeCursor",X),editor.getSession().selection.on("changeSelection",Y),editor.getSession().on("change",Z),editor.getSession().on("changeAnnotation",aa),editor.on("changeStatus",ka),editor.on("findSearchBox",na),editor.container.addEventListener("keydown",ja),v=editor.selection.getCursor()},ra=function(a){qa(),pa.forEach(function(a){B[a.keyCode]=a,C[a.cmd]=a}),a.on("focus",qa),E()&&cvox.Api.setKeyEcho(!1),ma()},sa=0,ta=15,ua=a("../editor").Editor;a("../config").defineOptions(ua.prototype,"editor",{enableChromevoxEnhancements:{set:function(a){a&&e(this)},value:!0}})}),function(){ace.require(["ace/ext/chromevox"],function(){})}();