!function(a){"use strict";function b(a,b){var c,d,e,f=[];if(!this||"function"!=typeof a||a instanceof RegExp)throw new TypeError;for(e=this.length,c=0;e>c;c++)if(this.hasOwnProperty(c)&&(d=this[c],a.call(b,d,c,this))){f.push(d);break}return f}a.assocArraySize=function(a){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c},a.jgrid.extend({pivotSetup:function(c,d){var e=[],f=[],g=[],h=[],i={grouping:!0,groupingView:{groupField:[],groupSummary:[],groupSummaryPos:[]}},j=[],k=a.extend({rowTotals:!1,rowTotalsText:"Total",colTotals:!1,groupSummary:!0,groupSummaryPos:"header",frozenStaticCols:!1},d||{});return this.each(function(){function d(a,c,d){var e;return e=b.call(a,c,d),e.length>0?e[0]:null}function l(a,b){var c,d=0,e=!0;for(c in a){if(a[c]!=this[d]){e=!1;break}if(d++,d>=this.length)break}return e&&(q=b),e}function m(a,b,c,d){var e;switch(a){case"sum":e=parseFloat(b||0)+parseFloat(d[c]||0);break;case"count":(""===b||null==b)&&(b=0),e=d.hasOwnProperty(c)?b+1:0;break;case"min":e=""===b||null==b?parseFloat(d[c]||0):Math.min(parseFloat(b),parseFloat(d[c]||0));break;case"max":e=""===b||null==b?parseFloat(d[c]||0):Math.max(parseFloat(b),parseFloat(d[c]||0))}return e}function n(b,c,d,e){var f,g,i,j,k=c.length;for(j=a.isArray(d)?d.length:1,h=[],h.root=0,i=0;j>i;i++){var l,n=[];for(f=0;k>f;f++){if(null==d)g=a.trim(c[f].member)+"_"+c[f].aggregator,l=g;else{l=d[i].replace(/\s+/g,"");try{g=1===k?l:l+"_"+c[f].aggregator+"_"+f}catch(o){}}e[g]=n[g]=m(c[f].aggregator,e[g],c[f].member,b)}h[l]=n}return e}function o(a){var b,c,d,f,g;for(d in a)if(a.hasOwnProperty(d)){if("object"!=typeof a[d]){if("level"===d){if(void 0===K[a.level]&&(K[a.level]="",a.level>0&&"_r_Totals"!==a.text&&(j[a.level-1]={useColSpanStyle:!1,groupHeaders:[]})),K[a.level]!==a.text&&a.children.length&&"_r_Totals"!==a.text&&a.level>0){j[a.level-1].groupHeaders.push({titleText:a.text});var h=j[a.level-1].groupHeaders.length,i=1===h?M:L+(h-1)*u;j[a.level-1].groupHeaders[h-1].startColumnName=e[i].name,j[a.level-1].groupHeaders[h-1].numberOfColumns=e.length-i,L=e.length}K[a.level]=a.text}if(a.level===t&&"level"===d&&t>0)if(u>1){var l=1;for(b in a.fields)1===l&&j[t-1].groupHeaders.push({startColumnName:b,numberOfColumns:1,titleText:a.text}),l++;j[t-1].groupHeaders[j[t-1].groupHeaders.length-1].numberOfColumns=l-1}else j.splice(t-1,1)}if(null!=a[d]&&"object"==typeof a[d]&&o(a[d]),"level"===d&&a.level>0){c=0;for(b in a.fields){g={};for(f in k.aggregates[c])if(k.aggregates[c].hasOwnProperty(f))switch(f){case"member":case"label":case"aggregator":break;default:g[f]=k.aggregates[c][f]}u>1?(g.name=b,g.label=k.aggregates[c].label||b):(g.name=a.text,g.label="_r_Totals"===a.text?k.rowTotalsText:a.text),e.push(g),c++}}}}var p,q,r,s,t,u,v,w,x=c.length,y=0;if(k.rowTotals&&k.yDimension.length>0){var z=k.yDimension[0].dataName;k.yDimension.splice(0,0,{dataName:z}),k.yDimension[0].converter=function(){return"_r_Totals"}}if(s=a.isArray(k.xDimension)?k.xDimension.length:0,t=k.yDimension.length,u=a.isArray(k.aggregates)?k.aggregates.length:0,0===s||0===u)throw"xDimension or aggregates optiona are not set!";var A;for(r=0;s>r;r++)A={name:k.xDimension[r].dataName,frozen:k.frozenStaticCols},A=a.extend(!0,A,k.xDimension[r]),e.push(A);for(var B=s-1,C={};x>y;){p=c[y];var D=[],E=[];v={},r=0;do D[r]=a.trim(p[k.xDimension[r].dataName]),v[k.xDimension[r].dataName]=D[r],r++;while(s>r);var F=0;if(q=-1,w=d(f,l,D)){if(q>=0){if(F=0,t>=1){for(F=0;t>F;F++)E[F]=a.trim(p[k.yDimension[F].dataName]),k.yDimension[F].converter&&a.isFunction(k.yDimension[F].converter)&&(E[F]=k.yDimension[F].converter.call(this,E[F],D,E));w=n(p,k.aggregates,E,w)}else 0===t&&(w=n(p,k.aggregates,null,w));f[q]=w}}else{if(F=0,t>=1){for(F=0;t>F;F++)E[F]=a.trim(p[k.yDimension[F].dataName]),k.yDimension[F].converter&&a.isFunction(k.yDimension[F].converter)&&(E[F]=k.yDimension[F].converter.call(this,E[F],D,E));v=n(p,k.aggregates,E,v)}else 0===t&&(v=n(p,k.aggregates,null,v));f.push(v)}var G,H=0,I=null,J=null;for(G in h){if(0===H)C.children&&void 0!==C.children||(C={text:G,level:0,children:[]}),I=C.children;else{for(J=null,r=0;r<I.length;r++)if(I[r].text===G){J=I[r];break}J?I=J.children:(I.push({children:[],text:G,level:H,fields:h[G]}),I=I[I.length-1].children)}H++}y++}var K=[],L=e.length,M=L;t>0&&(j[t-1]={useColSpanStyle:!1,groupHeaders:[]}),o(C,0);var N;if(k.colTotals)for(var O=f.length;O--;)for(r=s;r<e.length;r++)N=e[r].name,g[N]?g[N]+=parseFloat(f[O][N]||0):g[N]=parseFloat(f[O][N]||0);if(B>0)for(r=0;B>r;r++)i.groupingView.groupField[r]=e[r].name,i.groupingView.groupSummary[r]=k.groupSummary,i.groupingView.groupSummaryPos[r]=k.groupSummaryPos;else i.grouping=!1;i.sortname=e[B].name,i.groupingView.hideFirstGroupCol=!0}),{colModel:e,rows:f,groupOptions:i,groupHeaders:j,summary:g}},jqPivot:function(b,c,d,e){return this.each(function(){function f(b){var e,f=jQuery(g).jqGrid("pivotSetup",b,c),h=a.assocArraySize(f.summary)>0?!0:!1,i=a.jgrid.from(f.rows);for(e=0;e<f.groupOptions.groupingView.groupField.length;e++)i.orderBy(f.groupOptions.groupingView.groupField[e],"a","text","");jQuery(g).jqGrid(a.extend({datastr:a.extend(i.select(),h?{userdata:f.summary}:{}),datatype:"jsonstring",footerrow:h,userDataOnFooter:h,colModel:f.colModel,viewrecords:!0,sortname:c.xDimension[0].dataName},d||{},f.groupOptions));var j=f.groupHeaders;if(j.length)for(e=0;e<j.length;e++)j[e]&&j[e].groupHeaders.length&&jQuery(g).jqGrid("setGroupHeaders",j[e]);c.frozenStaticCols&&jQuery(g).jqGrid("setFrozenColumns")}var g=this;"string"==typeof b?a.ajax(a.extend({url:b,dataType:"json",success:function(b){f(a.jgrid.getAccessor(b,e&&e.reader?e.reader:"rows"))}},e||{})):f(b)})}})}(jQuery);