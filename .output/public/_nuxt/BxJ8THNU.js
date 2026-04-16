import{d as C,w as D,a as z,c as i,b as s,e as a,u as o,g as N,f as R,o as d,t as v,F as j,r as B,i as g,j as U}from"./gIWzVkIC.js";import{_ as V}from"./BQSqHJp4.js";import{_ as F}from"./CvYxQL7E.js";import{_ as Q}from"./hJ5ypnLf.js";import{D as S}from"./CHdgPAF2.js";import{u as A}from"./B2a-SPwR.js";const E={class:"space-y-8 max-w-7xl mx-auto rtl font-vazir"},G={class:"flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative"},H={class:"flex gap-3 relative z-10"},I={class:"p-6 bg-white border-b border-gray-100 flex justify-between items-center"},L={class:"flex items-center gap-6"},P={class:"text-right"},T={class:"text-xl font-black text-[#2c6767]"},W={class:"text-right"},q={class:"text-xl font-black text-gray-800"},J={key:0,class:"p-6 space-y-4"},K={key:1,class:"ag-theme-alpine w-full h-[600px]"},se=C({__name:"index",async setup(M){let n,h;const{data:c,pending:m,refresh:_}=([n,h]=D(()=>A("/api/therapists","$Qhu3QcBCHo")),n=await n,h(),n),b=g([{field:"name",headerName:"درمانگر",flex:2,minWidth:220,cellRenderer:e=>`
        <div class="flex items-center gap-4 py-3">
          <img src="https://picsum.photos/seed/${e.data.id}/100/100" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
          <div class="leading-tight">
            <div class="font-bold text-gray-800">${e.value}</div>
            <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">${e.data.specialty}</div>
          </div>
        </div>
      `},{field:"id",headerName:"شماره نظام",width:130,cellClass:"font-mono"},{field:"days",headerName:"روزهای حضور",flex:1,cellRenderer:e=>e.value?`
        <div class="flex gap-1">
          ${e.value.map(t=>`
            <span class="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${t==="چ"?"bg-[#2c6767] text-white":"bg-gray-100 text-gray-400"}">
              ${t}
            </span>
          `).join("")}
        </div>
      `:"-"},{field:"status",headerName:"وضعیت فعالیت",width:150,cellRenderer:e=>{const t={فعال:"bg-green-500","در مرخصی":"bg-orange-500"},r={فعال:"text-green-600","در مرخصی":"text-orange-600"},x=t[e.value]||"bg-gray-400",f=r[e.value]||"text-gray-400";return`
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full ${x}"></div>
          <span class="text-xs font-bold ${f}">${e.value}</span>
        </div>
      `}},{headerName:"مدیریت",width:100,pinned:"left",cellRenderer:e=>`
        <div class="flex items-center gap-2">
          <button onclick="window.location.href='/therapists/${e.data.id}'" class="p-2 hover:bg-teal-50 rounded-xl text-gray-400 hover:text-[#2c6767] transition-all">
            <i class="fas fa-id-badge text-sm"></i>
          </button>
        </div>
      `}]),w={sortable:!0,filter:!0,resizable:!0},u=g(""),p=g(null),y=e=>{p.value=e.api};z(u,e=>{p.value&&p.value.setQuickFilter(e)});const k=async()=>{await _(),U().add({title:"بروزرسانی کادر درمانی",description:"لیست درمانگران با آخرین تغییرات سینک شد",color:"teal"})};return(e,t)=>{const r=R,x=V,f=F,$=Q;return d(),i("div",E,[s("header",G,[t[1]||(t[1]=s("div",{class:"absolute left-0 bottom-0 w-48 h-48 bg-teal-50 rounded-full -ml-24 -mb-24 opacity-60"},null,-1)),t[2]||(t[2]=s("div",{class:"relative z-10"},[s("h1",{class:"text-3xl font-black text-gray-900 tracking-tight"},"کادر درمان و متخصصین"),s("p",{class:"text-gray-500 font-medium mt-1"},"مدیریت تیم حرفه‌ای و بررسی وضعیت حضور درمانگران کلینیک")],-1)),s("div",H,[a(r,{icon:"i-heroicons-arrow-path",color:"gray",variant:"soft",class:"rounded-xl p-3",loading:o(m),onClick:k},null,8,["loading"]),a(r,{icon:"i-heroicons-user-plus",label:"درمانگر جدید",size:"xl",class:"rounded-2xl px-10 bg-gray-900 hover:bg-black text-white font-black shadow-xl transition-all"})])]),a($,{ui:{body:{padding:"p-0"},rounded:"rounded-[2.5rem]",overflow:"overflow-hidden"},class:"border-0 shadow-2xl shadow-gray-100"},{default:N(()=>[s("div",I,[a(x,{modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=l=>u.value=l),icon:"i-heroicons-magnifying-glass",placeholder:"جستجو در نام درمانگر، تخصص یا کد نظام...",class:"w-96",size:"lg",ui:{rounded:"rounded-2xl"}},null,8,["modelValue"]),s("div",L,[s("div",P,[t[3]||(t[3]=s("div",{class:"text-[10px] font-black text-gray-400 uppercase tracking-widest"},"متخصصین فعال",-1)),s("div",T,v(o(c)?.filter(l=>l.status==="فعال").length||0)+" نفر",1)]),t[5]||(t[5]=s("div",{class:"w-1px h-10 bg-gray-100"},null,-1)),s("div",W,[t[4]||(t[4]=s("div",{class:"text-[10px] font-black text-gray-400 uppercase tracking-widest"},"ظرفیت کل تیم",-1)),s("div",q,v(o(c)?.length||0)+" نفر",1)])])]),o(m)?(d(),i("div",J,[(d(),i(j,null,B(6,l=>a(f,{key:l,class:"h-16 w-full rounded-2xl"})),64))])):(d(),i("div",K,[a(o(S),{style:{width:"100%",height:"100%"},columnDefs:b.value,rowData:o(c),defaultColDef:w,enableRtl:!0,pagination:!0,paginationPageSize:12,onGridReady:y},null,8,["columnDefs","rowData"])]))]),_:1})])}}});export{se as default};
