(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{586:function(t,e,r){var content=r(632);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("398ca214",content,!0,{sourceMap:!1})},631:function(t,e,r){"use strict";var n=r(586);r.n(n).a},632:function(t,e,r){(e=r(14)(!1)).push([t.i,".users[data-v-47cd9e86]{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,200px));justify-content:center;grid-gap:15px;gap:15px}@media only screen and (min-width:768px){.users[data-v-47cd9e86]{justify-content:flex-start}}.users .user[data-v-47cd9e86]{background-color:#fff;border-radius:12px;width:200px;height:180px;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:box-shadow .2s ease-out}.users .user[data-v-47cd9e86]:hover{box-shadow:0 4px 7px rgba(0,0,0,.2)}.users .user-avatar[data-v-47cd9e86]{border:4px solid #1976d2}.users .user-link[data-v-47cd9e86]{text-decoration:none;font-size:.92rem}",""]),t.exports=e},692:function(t,e,r){"use strict";r.r(e);r(12),r(10),r(7),r(3),r(9),r(126);var n=r(23),o=(r(38),r(1)),c=r(25);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={layout:"drive",components:{Loader:r(40).a},data:function(){return{user:"",sharers:"",isLoading:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["isLoggedIn","getUser"]),{getUserInitials:function(){var t=this.user.full_name;if(t){var e=t.split(" ").reduce((function(t,e){return"".concat(t).concat(e[0])}),"");return e.length>2?"".concat(e[0]).concat(e[1]):e}return null}}),mounted:function(){var t=this.isLoggedIn(this),e=this.getUser(this);this.user=e,this.$axios.defaults.headers.common.Authorization="Bearer ".concat(t),this.fetchSharedUsers()},methods:{fetchSharedUsers:function(){var t=this;this.isLoading=!0,this.$axios.post("users/sharers",{user_id:this.user.id}).then((function(e){var data=e.data,r=[].concat(Object(n.a)(t.handleObjData(data.file_sharers)),Object(n.a)(t.handleObjData(data.directory_sharers)));t.sharers=r.filter((function(t,e,r){return e===r.findIndex((function(e){return e.id===t.id}))})),t.isLoading=!1})).catch((function(t){throw Error(t)}))},handleObjData:function(data){var t=Object.keys(data),e=[];return t.length>0&&t.forEach((function(r){var n={id:r,full_name:data[t].full_name,picture:data[t].profile_pic};e.push(n)})),e}}},f=(r(631),r(20)),h=r(22),v=r.n(h),m=r(186),x=r(417),y=r(160),O=r(419),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{"grid-list-md":""}},[t.isLoading?r("Loader"):t._e(),t._v(" "),r("p",{staticClass:"font-weight-medium body-2"},[t._v("\n    Users that have shared files/folders with you\n  ")]),t._v(" "),r("div",{staticClass:"users"},t._l(t.sharers,(function(e){return r("v-layout",{key:e.id,staticClass:"user",attrs:{column:"","justify-center":"","align-center":""}},[e.picture?r("v-avatar",{staticClass:"mx-2 user-avatar",attrs:{size:"70px",item:""}},[r("v-img",{attrs:{src:e.picture,alt:"User Image"}})],1):r("v-avatar",{staticClass:"mx-2 user-avatar",attrs:{size:"70px",color:"primary",item:""}},[r("span",{staticClass:"white--text font-weight-medium"},[t._v("\n          "+t._s(t.getUserInitials)+"\n        ")])]),t._v(" "),r("p",{staticClass:"subtitle-2 font-weight-black my-3"},[t._v(t._s(e.full_name))]),t._v(" "),r("nuxt-link",{staticClass:"user-link",attrs:{to:"shared/"+e.id}},[t._v("\n        View File\n      ")])],1)})),1)],1)}),[],!1,null,"47cd9e86",null);e.default=component.exports;v()(component,{VAvatar:m.a,VContainer:x.a,VImg:y.a,VLayout:O.a})}}]);