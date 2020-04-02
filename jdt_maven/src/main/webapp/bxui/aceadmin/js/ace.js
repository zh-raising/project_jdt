"ace"in window||(window.ace={}),"helper"in window.ace||(window.ace.helper={}),"vars"in window.ace||(window.ace.vars={icon:" ace-icon ",".icon":".ace-icon"}),ace.vars.touch="ontouchstart"in document.documentElement,jQuery(function(a){ace.click_event=ace.vars.touch&&a.fn.tap?"tap":"click";var b=navigator.userAgent;ace.vars.webkit=!!b.match(/AppleWebKit/i),ace.vars.safari=!!b.match(/Safari/i)&&!b.match(/Chrome/i),ace.vars.android=ace.vars.safari&&!!b.match(/Android/i),ace.vars.ios_safari=!!b.match(/OS ([4-8])(_\d)+ like Mac OS X/i)&&!b.match(/CriOS/i),ace.vars.non_auto_fixed=ace.vars.android||ace.vars.ios_safari,ace.vars.non_auto_fixed&&a("body").addClass("mob-safari"),ace.vars.transition="transition"in document.body.style||"WebkitTransition"in document.body.style||"MozTransition"in document.body.style||"OTransition"in document.body.style;var c={general_vars:null,handle_side_menu:null,add_touch_drag:null,sidebar_scrollable:[!0,!0,ace.vars.safari||ace.vars.ios_safari,200,!1],sidebar_hoverable:null,general_things:null,widget_boxes:null,widget_reload_handler:null,settings_box:null,settings_rtl:null,settings_skin:null,enable_searchbox_autocomplete:null,auto_hide_sidebar:null,auto_padding:null,auto_container:null};for(var d in c)if(d in ace){var e=c[d];e!==!1&&(null==e?e=[jQuery]:e instanceof String?e=[jQuery,e]:e instanceof Array&&e.unshift(jQuery),ace[d].apply(null,e))}}),ace.general_vars=function(a){var b="menu-min",c="responsive-min",d="h-sidebar",e=a("#sidebar").eq(0);ace.vars.mobile_style=1,e.hasClass("responsive")&&!a("#menu-toggler").hasClass("navbar-toggle")?ace.vars.mobile_style=2:e.hasClass(c)?ace.vars.mobile_style=3:e.hasClass("navbar-collapse")&&(ace.vars.mobile_style=4),a(window).on("resize.ace.vars",function(){ace.vars.window={width:parseInt(a(this).width()),height:parseInt(a(this).height())},ace.vars.mobile_view=ace.vars.mobile_style<4&&ace.helper.mobile_view(),ace.vars.collapsible=!ace.vars.mobile_view&&ace.helper.collapsible(),ace.vars.nav_collapse=(ace.vars.collapsible||ace.vars.mobile_view)&&a("#navbar").hasClass("navbar-collapse");var e=a(document.getElementById("sidebar"));ace.vars.minimized=!ace.vars.collapsible&&e.hasClass(b)||3==ace.vars.mobile_style&&ace.vars.mobile_view&&e.hasClass(c),ace.vars.horizontal=!(ace.vars.mobile_view||ace.vars.collapsible)&&e.hasClass(d)}).triggerHandler("resize.ace.vars")},ace.general_things=function(a){var b=!!a.fn.ace_scroll;b&&a(".dropdown-content").ace_scroll({reset:!1,mouseWheelLock:!0}),a(window).on("resize.reset_scroll",function(){b&&a(".ace-scroll").ace_scroll("reset")}),a(document).on("settings.ace.reset_scroll",function(c,d){"sidebar_collapsed"==d&&b&&a(".ace-scroll").ace_scroll("reset")}),a(document).on("click.dropdown.pos",'.dropdown-toggle[data-position="auto"]',function(){var b=a(this).offset(),c=a(this.parentNode);parseInt(b.top+a(this).height())+50>ace.helper.scrollTop()+ace.helper.winHeight()-c.find(".dropdown-menu").eq(0).height()?c.addClass("dropup"):c.removeClass("dropup")}),a(document).on("click",".dropdown-navbar .nav-tabs",function(b){b.stopPropagation();var c;b.target;(c=a(b.target).closest("[data-toggle=tab]"))&&c.length>0&&(c.tab("show"),b.preventDefault())}),a('.ace-nav [class*="icon-animated-"]').closest("a").one("click",function(){var b=a(this).find('[class*="icon-animated-"]').eq(0),c=b.attr("class").match(/icon\-animated\-([\d\w]+)/);b.removeClass(c[0])}),a(".sidebar .nav-list .badge[title],.sidebar .nav-list .badge[title]").each(function(){var b=a(this).attr("class").match(/tooltip\-(?:\w+)/);b=b?b[0]:"tooltip-error",a(this).tooltip({placement:function(b,c){var d=a(c).offset();return parseInt(d.left)<parseInt(document.body.scrollWidth/2)?"right":"left"},container:"body",template:'<div class="tooltip '+b+'"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'})});var c=a(".btn-scroll-up");if(c.length>0){var d=!1;a(window).on("scroll.scroll_btn",function(){ace.helper.scrollTop()>parseInt(ace.helper.winHeight()/4)?d||(c.addClass("display"),d=!0):d&&(c.removeClass("display"),d=!1)}).triggerHandler("scroll.scroll_btn"),c.on(ace.click_event,function(){var b=Math.min(500,Math.max(100,parseInt(ace.helper.scrollTop()/3)));return a("html,body").animate({scrollTop:0},b),!1})}if(ace.vars.webkit){var e=a(".ace-nav").get(0);e&&a(window).on("resize.webkit",function(){ace.helper.redraw(e)})}},ace.helper.collapsible=function(){var a;return null!=document.querySelector("#sidebar.navbar-collapse")&&null!=(a=document.querySelector('.navbar-toggle[data-target*=".sidebar"]'))&&a.scrollHeight>0},ace.helper.mobile_view=function(){var a;return null!=(a=document.getElementById("menu-toggler"))&&a.scrollHeight>0},ace.helper.redraw=function(a){var b=a.style.display;a.style.display="none",a.offsetHeight,a.style.display=b},ace.helper.scrollTop=function(){return document.scrollTop||document.documentElement.scrollTop||document.body.scrollTop},ace.helper.winHeight=function(){return window.innerHeight||document.documentElement.clientHeight},ace.helper.camelCase=function(a){return a.replace(/-([\da-z])/gi,function(a,b){return b?b.toUpperCase():""})},ace.helper.removeStyle="removeProperty"in document.body.style?function(a,b){a.style.removeProperty(b)}:function(a,b){a.style[ace.helper.camelCase(b)]=""},ace.helper.hasClass="classList"in document.documentElement?function(a,b){return a.classList.contains(b)}:function(a,b){return a.className.indexOf(b)>-1},ace.add_touch_drag=function(a){if(ace.vars.touch){var b="touchstart MSPointerDown pointerdown",c="touchend touchcancel MSPointerUp MSPointerCancel pointerup pointercancel",d="touchmove MSPointerMove MSPointerHover pointermove";a.event.special.ace_drag={setup:function(){var e=0,f=a(this);f.on(b,function(b){function g(a){if(j){var b=a.originalEvent.touches?a.originalEvent.touches[0]:a;if(h={coords:[b.pageX,b.pageY]},j&&h&&(l=0,m=0,k=Math.abs(m=j.coords[1]-h.coords[1])>e&&Math.abs(l=j.coords[0]-h.coords[0])<=Math.abs(m)?m>0?"up":"down":Math.abs(l=j.coords[0]-h.coords[0])>e&&Math.abs(m)<=Math.abs(l)?l>0?"left":"right":!1,k!==!1)){var c={};j.origin.trigger({type:"ace_drag",direction:k,dx:l,dy:m,retval:c}),a.preventDefault()}j.coords[0]=h.coords[0],j.coords[1]=h.coords[1]}}var h,i=b.originalEvent.touches?b.originalEvent.touches[0]:b,j={coords:[i.pageX,i.pageY],origin:a(b.target)};j.origin.trigger({type:"ace_dragStart",start:j||[-1,-1]});var k=!1,l=0,m=0;f.on(d,g).one(c,function(a){f.off(d,g),j.origin.trigger({type:"ace_dragEnd",stop:h||[-1,-1]}),j=h=void 0})})}}}},ace.handle_side_menu=function(a){var b=a(".sidebar").eq(0);a(document).on(ace.click_event+".ace.menu","#menu-toggler",function(){return b.toggleClass("display"),a(this).toggleClass("display"),a(this).hasClass("display")&&"sidebar_scroll"in ace.helper&&ace.helper.sidebar_scroll.reset(),!1}).on(ace.click_event+".ace.menu",".sidebar-collapse",function(){ace.vars.collapsible||ace.vars.horizontal||(ace.vars.minimized=!ace.vars.minimized,ace.settings.sidebar_collapsed.call(this,ace.vars.minimized))}).on(ace.click_event+".ace.menu",".sidebar-expand",function(){ace.vars.minimized&&ace.settings.sidebar_collapsed.call(this,!1,!1);var c=a(this).find(ace.vars[".icon"]),d=c.attr("data-icon1"),e=c.attr("data-icon2");b.hasClass("responsive-min")?(c.removeClass(d).addClass(e),b.removeClass("responsive-min"),b.addClass("display responsive-max"),ace.vars.minimized=!1):(c.removeClass(e).addClass(d),b.removeClass("display responsive-max"),b.addClass("responsive-min"),ace.vars.minimized=!0),a(document).triggerHandler("settings.ace",["sidebar_collapsed",ace.vars.minimized])});var c=ace.vars.ios_safari;a(document).on(ace.click_event+".ace.submenu",".sidebar .nav-list",function(b){var d=this,e=a(b.target).closest("a");if(e&&0!=e.length){var f=ace.vars.minimized&&!ace.vars.collapsible;if(e.hasClass("dropdown-toggle")){var g=e.siblings(".submenu").get(0);if(!g)return!1;var h=0,i=250,j=g.parentNode.parentNode;if(f&&j==d||a(g.parentNode).hasClass("hover")&&!ace.vars.collapsible)return b.preventDefault(),!1;0==g.scrollHeight&&a(j).find("> .open > .submenu").each(function(){this==g||a(this.parentNode).hasClass("active")||(h-=this.scrollHeight,ace.submenu.hide(this,i))});var k=0;return 1==(k=ace.submenu.toggle(g,i))?0!=h&&(h+=g.scrollHeight):-1==k&&(h-=g.scrollHeight),0!=h&&"sidebar_scroll"in ace.helper&&ace.helper.sidebar_scroll.prehide(h),b.preventDefault(),!1}if("tap"==ace.click_event&&f&&e.get(0).parentNode.parentNode==d){var l=e.find(".menu-text").get(0);if(b.target!=l&&!a.contains(l,b.target))return b.preventDefault(),!1}if(c&&"false"!==e.attr("data-link"))return document.location=e.attr("href"),b.preventDefault(),!1}})},ace.submenu={show:function(a,b){var c,d=$(a);if(d.trigger(c=$.Event("show.ace.submenu")),c.isDefaultPrevented())return!1;d.css({height:0,overflow:"hidden",display:"block"}).removeClass("nav-hide").addClass("nav-show").parent().addClass("open"),b>0&&d.css({height:a.scrollHeight,"transition-property":"height","transition-duration":b/1e3+"s"});var e=function(a){a&&a.stopPropagation(),d.css({"transition-property":"","transition-duration":"",overflow:"",height:""}),ace.vars.transition&&d.off(".trans"),d.trigger($.Event("shown.ace.submenu"))};return b>0&&ace.vars.transition?d.one("transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans",e):e(),ace.vars.android&&setTimeout(function(){d.css({overflow:"",height:""})},b+10),!0},hide:function(a,b){var c,d=$(a);if(d.trigger(c=$.Event("hide.ace.submenu")),c.isDefaultPrevented())return!1;d.css({height:a.scrollHeight,overflow:"hidden"}).parent().removeClass("open"),a.offsetHeight,b>0&&d.css({height:0,"transition-property":"height","transition-duration":b/1e3+"s"});var e=function(a){a&&a.stopPropagation(),d.css({display:"none",overflow:"",height:"","transition-property":"","transition-duration":""}).removeClass("nav-show").addClass("nav-hide"),ace.vars.transition&&d.off(".trans"),d.trigger($.Event("hidden.ace.submenu"))};return b>0&&ace.vars.transition?d.one("transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans",e):e(),ace.vars.android&&setTimeout(function(){d.css({display:"none",overflow:"",height:""})},b+10),!0},toggle:function(a,b){if(0==a.scrollHeight){if(ace.submenu.show(a,b))return 1}else if(ace.submenu.hide(a,b))return-1;return 0}},ace.sidebar_scrollable=function(a,b,c,d,e,f){if(a.fn.ace_scroll){var g=ace.vars.safari&&navigator.userAgent.match(/version\/[1-5]/i),h=a(".sidebar"),i=(a(".navbar"),h.find(".nav-list")),j=h.find(".sidebar-toggle"),k=h.find(".sidebar-shortcuts"),l=a(window),m=h.get(0),n=i.get(0);if(m&&n){var o,p,q=null,r=null,s=null,t=null,u=null,v=!1,w=!1,b=b||!1,c=c||!1,d=d||!1,x="getComputedStyle"in window?function(){return m.offsetHeight,"fixed"==window.getComputedStyle(m).position}:function(){return m.offsetHeight,"fixed"==h.css("position")},y=x(),z=h.hasClass("h-sidebar"),A=ace.helper.sidebar_scroll={available_height:function(){var a=i.parent().offset();return y&&(a.top-=ace.helper.scrollTop()),l.innerHeight()-a.top-(d?0:j.outerHeight())},content_height:function(){return n.scrollHeight},initiate:function(l){if(!w&&y){i.wrap('<div style="position: relative;" />'),i.after("<div><div></div></div>"),i.wrap('<div class="nav-wrap" />'),d||j.css({"z-index":1}),c||k.css({"z-index":99}),q=i.parent().next().ace_scroll({size:A.available_height(),reset:!0,mouseWheelLock:!0,hoverReset:!1,dragEvent:!0,touchDrag:!1}).closest(".ace-scroll").addClass("nav-scroll"),u=q.data("ace_scroll"),r=q.find(".scroll-content").eq(0),s=r.find(" > div").eq(0),t=q.find(".scroll-bar").eq(0),c&&(i.parent().prepend(k).wrapInner("<div />"),i=i.parent()),d&&(i.append(j),i.closest(".nav-wrap").addClass("nav-wrap-t")),i.css({position:"relative"}),f===!0&&q.addClass("scrollout"),n=i.get(0),n.style.top=0,r.on("scroll.nav",function(){n.style.top=-1*this.scrollTop+"px"}),i.on("mousewheel.ace_scroll DOMMouseScroll.ace_scroll",function(a){return q.trigger(a)});var m=r.get(0);if(i.on("ace_drag.nav",function(a){if(v&&("up"==a.direction||"down"==a.direction)){u.move_bar(!0),move_nav=!1;var b=a.dy;Math.abs(b)>20&&(b=2*b),0!=b&&(m.scrollTop=m.scrollTop+b,n.style.top=-1*m.scrollTop+"px")}}),e&&i.on("ace_dragStart.nav",function(a){a.stopPropagation(),i.css("transition-property","none"),t.css("transition-property","none")}).on("ace_dragEnd.nav",function(a){a.stopPropagation(),i.css("transition-property","top"),t.css("transition-property","top")}),g&&!d){var o=j.get(0);o&&r.on("scroll.safari",function(){ace.helper.redraw(o)})}if(w=!0,1==l){if(A.reset(),b&&u.is_active()){var p,x=h.find(".nav-list");ace.vars.minimized&&!ace.vars.collapsible?p=x.find("> .active"):(p=i.find("> .active.hover"),0==p.length&&(p=i.find(".active:not(.open)")));var z=p.outerHeight();x=x.get(0);for(var B=p.get(0);B!=x;)z+=B.offsetTop,B=B.parentNode;var C=z-q.height();C>0&&(n.style.top=-C+"px",r.scrollTop(C))}b=!1}if("number"==typeof e&&e>0&&(i.css({"transition-property":"top","transition-duration":(e/1e3).toFixed(2)+"s"}),t.css({"transition-property":"top","transition-duration":(e/1500).toFixed(2)+"s"}),q.on("drag.start",function(a){a.stopPropagation(),i.css("transition-property","none")}).on("drag.end",function(a){a.stopPropagation(),i.css("transition-property","top")})),ace.vars.android){var D=ace.helper.scrollTop();2>D&&(window.scrollTo(D,0),setTimeout(function(){A.reset()},20));var E,F=ace.helper.winHeight();a(window).on("scroll.ace_scroll",function(){v&&u.is_active()&&(E=ace.helper.winHeight(),E!=F&&(F=E,A.reset()))})}}},reset:function(){if(!y)return void A.disable();w||A.initiate();var a=!ace.vars.collapsible&&(!z||z&&ace.vars.mobile_view)&&(o=A.available_height())<(p=n.scrollHeight);v=!0,a&&(s.css({height:p,width:8}),q.prev().css({"max-height":o}),u.update({size:o}).enable().reset()),a&&u.is_active()?h.addClass("sidebar-scroll"):v&&A.disable()},disable:function(){v=!1,q&&(q.css({height:"","max-height":""}),s.css({height:"",width:""}),q.prev().css({"max-height":""}),u.disable()),parseInt(n.style.top)<0&&e&&ace.vars.transition?i.one("transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans",function(){h.removeClass("sidebar-scroll"),i.off(".trans")}):h.removeClass("sidebar-scroll"),n.style.top=0},prehide:function(a){if(v&&!ace.vars.minimized)if(A.content_height()+a<A.available_height())A.disable();else if(0>a){var b=r.scrollTop()+a;if(0>b)return;n.style.top=-1*b+"px"}}};A.initiate(!0),a(document).on("settings.ace.scroll",function(a,b,c){"sidebar_collapsed"==b&&y?A.reset():("sidebar_fixed"===b||"navbar_fixed"===b)&&(y=x(),y&&!v?A.reset():y||A.disable())}),l.on("resize.ace.scroll",function(){y=x(),A.reset()}),h.on("hidden.ace.submenu shown.ace.submenu",".submenu",function(a){a.stopPropagation(),ace.vars.minimized||(ace.vars.webkit?setTimeout(function(){A.reset()},0):A.reset())})}}},ace.sidebar_hoverable=function(a){function b(b){var c=a(b);b.style.removeProperty("top"),b.style.removeProperty("bottom");var d=null;ace.vars.minimized&&(d=b.parentNode.querySelector(".menu-text"))&&d.style.removeProperty("margin-top");var e=c.offset(),f=ace.helper.scrollTop(),h=!1,k=f;i&&(k+=g.clientHeight+1);var l=b.scrollHeight;d&&(l+=40,e.top-=40);var m,n=parseInt(e.top+l);if((m=n-(window.innerHeight+f-50))>0)if(j>l-m&&e.top-m>k)b.style.top="auto",b.style.bottom="-10px",d&&(d.style.marginTop=-(l-50)+"px",h=!0);else{e.top-m<k&&(m=e.top-k),n-m<e.top+j&&(m-=j);var o=d?40:20;m>o&&(b.style.top=-m+"px",d&&(d.style.marginTop=-m+"px",h=!0))}var p=this.className.lastIndexOf("pull_up");h?-1==p&&(this.className=this.className+" pull_up"):p>=0&&(this.className=this.className.replace(/(^|\s)pull_up($|\s)/,"")),ace.vars.safari&&ace.helper.redraw(b)}if("querySelector"in document&&"removeProperty"in document.body.style){ace.helper.sidebar_hover={reset:function(){d.find(".submenu").each(function(){var b=this,c=this.parentNode;if(b){b.style.removeProperty("top"),b.style.removeProperty("bottom");var d=c.querySelector(".menu-text");d&&d.style.removeProperty("margin-top")}c.className.lastIndexOf("_up")>=0&&a(c).removeClass("pull_up")})}};var c="getComputedStyle"in window?function(){return void 0==g?!0:(g.offsetHeight,"fixed"==window.getComputedStyle(g).position)}:function(){return void 0==g?!0:(g.offsetHeight,"fixed"==f.css("position"))};a(window).on("resize.ace_hover",function(){i=c(),ace.helper.sidebar_hover.reset()}),a(document).on("settings.ace.hover",function(a,b,c){"sidebar_collapsed"==b?ace.helper.sidebar_hover.reset():"navbar_fixed"==b&&(i=c)});var d=a(".sidebar").eq(0),e=(d.get(0),d.find(".nav-list").get(0)),f=a(".navbar").eq(0),g=f.get(0),h=d.hasClass("h-sidebar"),i="fixed"==f.css("position");d.find(".submenu").parent().addClass("hsub"),d.on("mouseenter.ace_hover",".nav-list li.hsub",function(a){if(!(ace.vars.collapsible||h&&!ace.vars.mobile_view)){var c=this.querySelector(".submenu");c&&(ace.helper.hasClass(this,"hover")?b.call(this,c):this.parentNode==e&&ace.vars.minimized&&b.call(this,c))}});var j=50}},ace.widget_boxes=function(a){a(document).on("hide.bs.collapse show.bs.collapse",function(b){var c=b.target.getAttribute("id");a('[href*="#'+c+'"]').find(ace.vars[".icon"]).each(function(){var c,d=a(this),e=null,f=null;return(e=d.attr("data-icon-show"))?f=d.attr("data-icon-hide"):(c=d.attr("class").match(/fa\-(.*)\-(up|down)/))&&(e="fa-"+c[1]+"-down",f="fa-"+c[1]+"-up"),e?("show"==b.type?d.removeClass(e).addClass(f):d.removeClass(f).addClass(e),!1):void 0})});var b=function(b,c){this.$box=a(b);this.reload=function(){var a=this.$box,b=!1;"static"==a.css("position")&&(b=!0,a.addClass("position-relative")),a.append('<div class="widget-box-overlay"><i class="'+ace.vars.icon+'loading-icon fa fa-spinner fa-spin fa-2x white"></i></div>'),a.one("reloaded.ace.widget",function(){a.find(".widget-box-overlay").remove(),b&&a.removeClass("position-relative")})},this.close=function(){var a=this.$box,b=300;a.fadeOut(b,function(){a.trigger("closed.ace.widget"),a.remove()})},this.toggle=function(a,b){var c=this.$box,d=c.find(".widget-body"),e=null,f="undefined"!=typeof a?a:c.hasClass("collapsed")?"show":"hide",g="show"==f?"shown":"hidden";if("undefined"==typeof b&&(b=c.find("> .widget-header a[data-action=collapse]").eq(0),0==b.length&&(b=null)),b){e=b.find(ace.vars[".icon"]).eq(0);var h,i=null,j=null;(i=e.attr("data-icon-show"))?j=e.attr("data-icon-hide"):(h=e.attr("class").match(/fa\-(.*)\-(up|down)/))&&(i="fa-"+h[1]+"-down",j="fa-"+h[1]+"-up")}var k=d.find(".widget-body-inner");d=0==k.length?d.wrapInner('<div class="widget-body-inner"></div>').find(":first-child").eq(0):k.eq(0);var l=300,m=200;"show"==f?(e&&e.removeClass(i).addClass(j),c.removeClass("collapsed"),d.slideUp(0,function(){d.slideDown(l,function(){c.trigger(g+".ace.widget")})})):(e&&e.removeClass(j).addClass(i),d.slideUp(m,function(){c.addClass("collapsed"),c.trigger(g+".ace.widget")}))},this.hide=function(){this.toggle("hide")},this.show=function(){this.toggle("show")},this.fullscreen=function(){var a=this.$box.find("> .widget-header a[data-action=fullscreen]").find(ace.vars[".icon"]).eq(0),b=null,c=null;(b=a.attr("data-icon1"))?c=a.attr("data-icon2"):(b="fa-expand",c="fa-compress"),this.$box.hasClass("fullscreen")?(a.addClass(b).removeClass(c),this.$box.removeClass("fullscreen")):(a.removeClass(b).addClass(c),this.$box.addClass("fullscreen")),this.$box.trigger("fullscreened.ace.widget")}};a.fn.widget_box=function(c,d){var e,f=this.each(function(){var f=a(this),g=f.data("widget_box"),h="object"==typeof c&&c;g||f.data("widget_box",g=new b(this,h)),"string"==typeof c&&(e=g[c](d))});return void 0===e?f:e},a(document).on("click.ace.widget",".widget-header a[data-action]",function(c){c.preventDefault();var d=a(this),e=d.closest(".widget-box");if(0!=e.length&&!e.hasClass("ui-sortable-helper")){var f=e.data("widget_box");f||e.data("widget_box",f=new b(e.get(0)));var g=d.data("action");if("collapse"==g){var h,i=e.hasClass("collapsed")?"show":"hide";if(e.trigger(h=a.Event(i+".ace.widget")),h.isDefaultPrevented())return;f.toggle(i,d)}else if("close"==g){var h;if(e.trigger(h=a.Event("close.ace.widget")),h.isDefaultPrevented())return;f.close()}else if("reload"==g){d.blur();var h;if(e.trigger(h=a.Event("reload.ace.widget")),h.isDefaultPrevented())return;f.reload()}else if("fullscreen"==g){var h;if(e.trigger(h=a.Event("fullscreen.ace.widget")),h.isDefaultPrevented())return;f.fullscreen()}else"settings"==g&&e.trigger("setting.ace.widget")}})},ace.settings_box=function(a){a("#ace-settings-btn").on(ace.click_event,function(b){b.preventDefault(),a(this).toggleClass("open"),a("#ace-settings-box").toggleClass("open")}),a("#ace-settings-navbar").on("click",function(){ace.settings.navbar_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("navbar","fixed")}),a("#ace-settings-sidebar").on("click",function(){ace.settings.sidebar_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("sidebar","fixed")}),a("#ace-settings-breadcrumbs").on("click",function(){ace.settings.breadcrumbs_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("breadcrumbs","fixed")}),a("#ace-settings-add-container").on("click",function(){ace.settings.main_container_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("main-container","fixed")}),a("#ace-settings-compact").removeAttr("checked").on("click",function(){if(this.checked){a("#sidebar").addClass("compact");var b=a("#ace-settings-hover");b.length>0&&!b.get(0).checked&&b.removeAttr("checked").trigger("click")}else a("#sidebar").removeClass("compact"),"sidebar_scroll"in ace.helper&&ace.helper.sidebar_scroll.reset()}),a("#ace-settings-highlight").removeAttr("checked").on("click",function(){this.checked?a("#sidebar .nav-list > li").addClass("highlight"):a("#sidebar .nav-list > li").removeClass("highlight")}),a("#ace-settings-hover").removeAttr("checked").on("click",function(){if(!a(".sidebar").hasClass("h-sidebar")){if(this.checked)ace.vars["no-scroll"]=!0,a("#sidebar li").addClass("hover").filter(".open").removeClass("open").find("> .submenu").css("display","none");else{ace.vars["no-scroll"]=!1,a("#sidebar li.hover").removeClass("hover");var b=a("#ace-settings-compact");b.length>0&&b.get(0).checked&&b.trigger("click"),"sidebar_hover"in ace.helper&&ace.helper.sidebar_hover.reset()}"sidebar_scroll"in ace.helper&&ace.helper.sidebar_scroll.reset()}})},ace.settings_rtl=function(a){a("#ace-settings-rtl").removeAttr("checked").on("click",function(){ace.switch_direction(jQuery)})},ace.switch_direction=function(a){function b(a,b){c.find("."+a).removeClass(a).addClass("tmp-rtl-"+a).end().find("."+b).removeClass(b).addClass(a).end().find(".tmp-rtl-"+a).removeClass("tmp-rtl-"+a).addClass(b)}var c=a(document.body);c.toggleClass("rtl").find(".dropdown-menu:not(.datepicker-dropdown,.colorpicker)").toggleClass("dropdown-menu-right").end().find(".pull-right:not(.dropdown-menu,blockquote,.profile-skills .pull-right)").removeClass("pull-right").addClass("tmp-rtl-pull-right").end().find(".pull-left:not(.dropdown-submenu,.profile-skills .pull-left)").removeClass("pull-left").addClass("pull-right").end().find(".tmp-rtl-pull-right").removeClass("tmp-rtl-pull-right").addClass("pull-left").end().find(".chosen-select").toggleClass("chosen-rtl").next().toggleClass("chosen-rtl"),b("align-left","align-right"),b("no-padding-left","no-padding-right"),b("arrowed","arrowed-right"),b("arrowed-in","arrowed-in-right"),b("tabs-left","tabs-right"),b("messagebar-item-left","messagebar-item-right"),a(".fa").each(function(){if(!(this.className.match(/ui-icon/)||a(this).closest(".fc-button").length>0))for(var b=this.attributes.length,c=0;b>c;c++){var d=this.attributes[c].value;d.match(/fa\-(?:[\w\-]+)\-left/)?this.attributes[c].value=d.replace(/fa\-([\w\-]+)\-(left)/i,"fa-$1-right"):d.match(/fa\-(?:[\w\-]+)\-right/)&&(this.attributes[c].value=d.replace(/fa\-([\w\-]+)\-(right)/i,"fa-$1-left"))}});var d=c.hasClass("rtl");d?a(".scroll-hz").addClass("make-ltr").find(".scroll-content").wrapInner('<div class="make-rtl" />'):a(".scroll-hz").removeClass("make-ltr").find(".make-rtl").children().unwrap(),a.fn.ace_scroll&&a(".scroll-hz").ace_scroll("reset");try{var e=a("#piechart-placeholder");if(e.length>0){var f=a(document.body).hasClass("rtl")?"nw":"ne";e.data("draw").call(e.get(0),e,e.data("chart"),f)}}catch(g){}},ace.settings_skin=function(a){try{a("#skin-colorpicker").ace_colorpicker()}catch(b){}a("#skin-colorpicker").on("change",function(){var b=a(this).find("option:selected").data("skin"),c=a(document.body);c.removeClass("no-skin skin-1 skin-2 skin-3"),c.addClass(b),ace.data.set("skin",b);var d=["red","blue","green",""];a(".ace-nav > li.grey").removeClass("dark"),a(".ace-nav > li").removeClass("no-border margin-1"),a(".ace-nav > li:not(:last-child)").removeClass("light-pink").find("> a > "+ace.vars[".icon"]).removeClass("pink").end().eq(0).find(".badge").removeClass("badge-warning"),a(".sidebar-shortcuts .btn").removeClass("btn-pink btn-white").find(ace.vars[".icon"]).removeClass("white"),a(".ace-nav > li.grey").removeClass("red").find(".badge").removeClass("badge-yellow"),a(".sidebar-shortcuts .btn").removeClass("btn-primary btn-white");var e=0;a(".sidebar-shortcuts .btn").each(function(){a(this).find(ace.vars[".icon"]).removeClass(d[e++])});var f=["btn-success","btn-info","btn-warning","btn-danger"];if("no-skin"==b){var e=0;a(".sidebar-shortcuts .btn").each(function(){a(this).attr("class","btn "+f[e++%4])})}else if("skin-1"==b){a(".ace-nav > li.grey").addClass("dark");var e=0;a(".sidebar-shortcuts").find(".btn").each(function(){a(this).attr("class","btn "+f[e++%4])})}else if("skin-2"==b)a(".ace-nav > li").addClass("no-border margin-1"),a(".ace-nav > li:not(:last-child)").addClass("light-pink").find("> a > "+ace.vars[".icon"]).addClass("pink").end().eq(0).find(".badge").addClass("badge-warning"),a(".sidebar-shortcuts .btn").attr("class","btn btn-white btn-pink").find(ace.vars[".icon"]).addClass("white");else if("skin-3"==b){c.addClass("no-skin"),a(".ace-nav > li.grey").addClass("red").find(".badge").addClass("badge-yellow");var e=0;a(".sidebar-shortcuts .btn").each(function(){a(this).attr("class","btn btn-primary btn-white"),a(this).find(ace.vars[".icon"]).addClass(d[e++])})}"sidebar_scroll"in ace.helper&&ace.helper.sidebar_scroll.reset()})},ace.widget_reload_handler=function(a){a(document).on("reload.ace.widget",".widget-box",function(b){var c=a(this);setTimeout(function(){c.trigger("reloaded.ace.widget")},parseInt(1e3*Math.random()+1e3))})},ace.enable_searchbox_autocomplete=function(a){ace.vars.US_STATES=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];try{a("#nav-search-input").typeahead({source:ace.vars.US_STATES,updater:function(b){return a("#nav-search-input").focus(),b}})}catch(b){}};