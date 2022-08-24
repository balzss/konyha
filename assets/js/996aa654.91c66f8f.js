"use strict";(self.webpackChunkhomepage=self.webpackChunkhomepage||[]).push([[7983],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>u});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),d=p(r),u=a,h=d["".concat(s,".").concat(u)]||d[u]||l[u]||o;return r?n.createElement(h,i(i({ref:t},m),{},{components:r})):n.createElement(h,i({ref:t},m))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8340:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:4},i="DB Schema",c={unversionedId:"development/manager/db-schema",id:"development/manager/db-schema",title:"DB Schema",description:"Modifying the database schema",source:"@site/docs/development/manager/db-schema.md",sourceDirName:"development/manager",slug:"/development/manager/db-schema",permalink:"/docs/development/manager/db-schema",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Data hooks",permalink:"/docs/development/manager/data-hooks"},next:{title:"Modifying themes",permalink:"/docs/development/manager/theming"}},s={},p=[{value:"Modifying the database schema",id:"modifying-the-database-schema",level:2}],m={toc:p};function l(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"db-schema"},"DB Schema"),(0,a.kt)("h2",{id:"modifying-the-database-schema"},"Modifying the database schema"),(0,a.kt)("p",null,"The database schema is located at ",(0,a.kt)("inlineCode",{parentName:"p"},"prisma/schema.prisma"),". You can read about how it works\nand how to configure it ",(0,a.kt)("a",{parentName:"p",href:"https://www.prisma.io/docs/concepts/components/prisma-schema"},"here"),"."),(0,a.kt)("p",null,"After updating the schema you have to run ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn prisma:push")," to push your changes to the running db and generating the\nprisma client. More about it ",(0,a.kt)("a",{parentName:"p",href:"https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push"},"here"),"."))}l.isMDXComponent=!0}}]);