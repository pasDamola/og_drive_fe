(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{593:function(t,e,r){var content=r(649);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("23fb1ac0",content,!0,{sourceMap:!1})},648:function(t,e,r){"use strict";var o=r(593);r.n(o).a},649:function(t,e,r){(e=r(14)(!1)).push([t.i,".v-card--material__avatar{position:relative;top:-64px;margin-bottom:-32px}.v-card--material__heading{position:relative;top:-40px;transition:.3s ease;z-index:1}",""]),t.exports=e},687:function(t,e,r){"use strict";r.r(e);r(12),r(10),r(8),r(3),r(9);var o=r(1),n={props:{avatar:{type:String,default:""},color:{type:String,default:"success"},icon:{type:String,default:void 0},image:{type:Boolean,default:!1},text:{type:String,default:""},title:{type:String,default:""},value:{type:String,default:""}},computed:{classes:function(){return{"v-card--material--has-heading":this.hasHeading}},hasHeading:function(){return Boolean(this.$slots.heading||this.title||this.icon)},hasAltHeading:function(){return Boolean(this.$slots.heading||this.title&&this.icon)}}},l=(r(648),r(21)),c=r(23),d=r.n(c),h=r(186),v=r(193),f=r(11),m=r(187),_=r(154),x=r(160),y=r(71),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",t._b({staticClass:"v-card--material pa-3",class:t.classes},"v-card",t.$attrs,!1),[r("div",{staticClass:"d-flex grow flex-wrap"},[t.avatar?r("v-avatar",{staticClass:"mx-auto v-card--material__avatar elevation-6",attrs:{size:"128",color:"grey"}},[r("v-img",{attrs:{src:t.avatar}})],1):r("v-sheet",{staticClass:"text-start v-card--material__heading mb-n6",class:{"pa-7":!t.$slots.image},attrs:{color:t.color,"max-height":t.icon?90:void 0,width:t.icon?"auto":"100%",elevation:"6",dark:""}},[t.$slots.heading?t._t("heading"):t.$slots.image?t._t("image"):t.title&&!t.icon?r("div",{staticClass:"display-1 font-weight-light",domProps:{textContent:t._s(t.title)}}):t.icon?r("v-icon",{attrs:{size:"32"},domProps:{textContent:t._s(t.icon)}}):t._e(),t._v(" "),t.text?r("div",{staticClass:"headline font-weight-thin",domProps:{textContent:t._s(t.text)}}):t._e()],2),t._v(" "),t.$slots["after-heading"]?r("div",{staticClass:"ml-6"},[t._t("after-heading")],2):t.icon&&t.title?r("div",{staticClass:"ml-4"},[r("div",{staticClass:"card-title font-weight-light",domProps:{textContent:t._s(t.title)}})]):t._e()],1),t._v(" "),t._t("default"),t._v(" "),t.$slots.actions?[r("v-divider",{staticClass:"mt-2"}),t._v(" "),r("v-card-actions",{staticClass:"pb-0"},[t._t("actions")],2)]:t._e()],2)}),[],!1,null,null,null),C=component.exports;d()(component,{VAvatar:h.a,VCard:v.a,VCardActions:f.a,VDivider:m.a,VIcon:_.a,VImg:x.a,VSheet:y.a});var O=r(25);function w(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var j={components:{Card:C},layout:"admin",computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({allUsers:function(){return this.$store.state.allUsers},allFiles:function(){return this.$store.state.totalFiles},allDirectories:function(){return this.$store.state.totalDirectories}},Object(O.b)(["getUsers","getFiles","isLoggedIn","getFolders","getTotalFiles","getTotalDirectories"])),mounted:function(){var t=this.isLoggedIn(this);this.$axios.defaults.headers.common.Authorization="Bearer ".concat(t),this.fetchUsers(),this.fetchAllFiles(),this.fetchAllDirectories()},head:function(){return{title:"Admin"}}},$=r(416),P=r(417),D=r(420),V=Object(l.a)(j,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-container",[e("v-row",[e("v-col",{attrs:{cols:"12",sm:"6",lg:"3"}},[e("Card",{attrs:{color:"info",icon:"mdi-account",title:this.allUsers.totalUsers+" Users","sub-icon":"mdi-clock","sub-text":"Just Updated"}})],1),this._v(" "),e("v-col",{attrs:{cols:"12",sm:"6",lg:"3"}},[e("Card",{attrs:{color:"primary",icon:"mdi-folder",title:this.allDirectories.length+" Folders","sub-icon":"mdi-tag","sub-text":"Tracked from Google Analytics"}})],1),this._v(" "),e("v-col",{attrs:{cols:"12",sm:"6",lg:"3"}},[e("Card",{attrs:{color:"success",icon:"mdi-file",title:this.allFiles.length+" Files",value:"$ 34,245","sub-icon":"mdi-calendar","sub-text":"Last 24 Hours"}})],1)],1)],1)}),[],!1,null,null,null);e.default=V.exports;d()(V,{VCol:$.a,VContainer:P.a,VRow:D.a})}}]);