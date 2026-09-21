module.exports=[48498,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(46271),e=a.i(9640),f=a.i(67793),g=a.i(69648),h=a.i(74215),i=a.i(64831);let j={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};j.node;let k=(0,i.default)(j),l={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};l.node;let m=(0,i.default)(l);var n=a.i(18783),o=a.i(48193),p=a.i(46838);let q=()=>{let[a,i]=(0,c.useState)(!1),[j,l]=(0,c.useState)(!1),[q,r]=(0,c.useState)(!1),[s,t]=(0,c.useState)("#home"),[u,v]=(0,c.useState)("#home"),[w,x]=(0,c.useState)(null),y=(0,c.useRef)(!1),z=(0,c.useRef)(null),A=a=>{t(b=>(b!==a&&v(b),a))};(0,c.useEffect)(()=>{if(r((0,o.isSoundEnabled)()),window.location.hash){let a=window.location.hash;f.NAV_ITEMS.some(b=>b.href===a)&&A(a),history.replaceState(null,"",window.location.pathname+window.location.search)}let a=!1,b=!1,c="#home",d=()=>{let a=window.scrollY,d=a>25;if(d!==b&&(b=d,i(d)),y.current||window.innerWidth<768)return;let e=window.innerHeight,g=document.documentElement.scrollHeight;if(a<120){"#home"!==c&&(c="#home",A("#home"));return}let h=f.NAV_ITEMS[f.NAV_ITEMS.length-1]?.href||"#faq";if(a+e>=g-80){c!==h&&(c=h,A(h));return}let j=a+180,k="#home";for(let a=f.NAV_ITEMS.length-1;a>=0;a--){let b=f.NAV_ITEMS[a].href.replace("#",""),c=document.getElementById(b);if(c&&j>=c.offsetTop){k=f.NAV_ITEMS[a].href;break}}k!==c&&(c=k,A(k))},e=()=>{a||(window.requestAnimationFrame(()=>{d(),a=!1}),a=!0)};return window.addEventListener("scroll",e,{passive:!0}),d(),()=>{window.removeEventListener("scroll",e),z.current&&clearTimeout(z.current)}},[]);let B=(a,b)=>{if(a.preventDefault(),(0,o.playMicroClick)(),A(b),y.current=!0,z.current&&clearTimeout(z.current),z.current=setTimeout(()=>{y.current=!1},850),"#home"===b||"/"===b){window.scrollTo({top:0,behavior:"smooth"}),window.location.hash&&history.replaceState(null,"",window.location.pathname+window.location.search);return}let c=b.replace("#",""),d=document.getElementById(c);if(d){let a=window.innerWidth<=768?36:24,b=d.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:Math.max(0,b-a),behavior:"smooth"}),window.location.hash&&history.replaceState(null,"",window.location.pathname+window.location.search)}},C=Math.max(0,f.NAV_ITEMS.findIndex(a=>a.href===u)),D=Math.max(0,f.NAV_ITEMS.findIndex(a=>a.href===s)),E=Math.abs(D-C),F=D>=C?1:-1,G=0===E?1:1.15+Math.min(.08*E,.35),H=0===E?1:Math.max(.74,1-Math.min(.06*E,.26));return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("header",{className:"app-header",style:{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",padding:a?"12px 0":"20px 0"},children:(0,b.jsx)("div",{className:"container",children:(0,b.jsxs)("nav",{className:"main-navbar-nav",style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"56px",padding:"0 16px 0 20px",borderRadius:a?"9999px":"16px",background:a?"rgba(8, 11, 21, 0.84)":"rgba(8, 11, 21, 0.4)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:a?"1px solid rgba(255, 255, 255, 0.09)":"1px solid rgba(255, 255, 255, 0.05)",boxShadow:a?"0 12px 36px -10px rgba(0, 0, 0, 0.6), 0 0 24px rgba(109, 61, 245, 0.12)":"0 4px 20px rgba(0, 0, 0, 0.2)",transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"},children:[(0,b.jsx)("a",{href:"/",onClick:a=>B(a,"/"),style:{display:"flex",alignItems:"center",cursor:"pointer"},children:(0,b.jsx)(e.Logo,{size:"md"})}),(0,b.jsx)("div",{className:"desktop-nav-links",onMouseLeave:()=>x(null),style:{display:"flex",alignItems:"center",gap:"2px",padding:"4px 6px",borderRadius:"9999px",background:"rgba(255, 255, 255, 0.025)",border:"1px solid rgba(255, 255, 255, 0.06)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",position:"relative"},children:f.NAV_ITEMS.map(a=>{let c=s===a.href,e=w===a.href;return(0,b.jsxs)(d.motion.a,{href:a.href,onClick:b=>B(b,a.href),onMouseEnter:()=>x(a.href),whileTap:{scale:.93},style:{position:"relative",fontSize:"13.5px",fontWeight:c?600:500,color:c?"#FFFFFF":e?"rgba(255, 255, 255, 0.95)":"rgba(255, 255, 255, 0.62)",padding:"7px 15px",borderRadius:"9999px",textDecoration:"none",transition:"color 0.2s ease",display:"inline-flex",alignItems:"center",justifyContent:"center",whiteSpace:"nowrap",zIndex:1,cursor:"pointer",outline:"none"},children:[(0,b.jsx)("span",{style:{position:"relative",zIndex:3,letterSpacing:"-0.01em",transition:"transform 0.2s ease"},children:a.label}),c&&(0,b.jsxs)(d.motion.div,{layoutId:"activeNavPill",initial:!1,animate:{scaleX:[1,G,.92,1.05,.99,1],scaleY:[1,H,1.09,.96,1.01,1]},transition:{layout:{type:"spring",stiffness:330,damping:17,mass:.72},scaleX:{duration:.52,ease:[.34,1.56,.64,1]},scaleY:{duration:.52,ease:[.34,1.56,.64,1]}},style:{position:"absolute",inset:0,borderRadius:"9999px",transformOrigin:F>0?"left center":"right center",background:"linear-gradient(135deg, rgba(124, 58, 237, 0.38) 0%, rgba(109, 61, 245, 0.22) 100%)",border:"1px solid rgba(167, 139, 250, 0.55)",boxShadow:"0 0 24px rgba(124, 58, 237, 0.48), inset 0 1px 1px rgba(255, 255, 255, 0.28)",zIndex:2},children:[(0,b.jsx)("div",{style:{position:"absolute",top:0,left:"18%",right:"18%",height:"1px",background:"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent)"}}),(0,b.jsx)(d.motion.div,{animate:{width:["16px",`${22+6*E}px`,"13px","21px","18px"]},transition:{duration:.52,ease:[.34,1.56,.64,1]},style:{position:"absolute",bottom:"-1px",left:"50%",transform:"translateX(-50%)",height:"2px",borderRadius:"9999px",background:"linear-gradient(90deg, #A78BFA, #FF7A59)",boxShadow:"0 0 10px rgba(167, 139, 250, 0.95), 0 0 4px #FF7A59"}})]}),!c&&e&&(0,b.jsx)(d.motion.div,{layoutId:"hoverNavPill",transition:{type:"spring",stiffness:460,damping:34},style:{position:"absolute",inset:0,borderRadius:"9999px",background:"rgba(255, 255, 255, 0.055)",border:"1px solid rgba(255, 255, 255, 0.08)",zIndex:1}})]},a.label)})}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,b.jsxs)("button",{onClick:()=>{let a=!q;r(a),(0,o.setSoundMuted)(!a),a&&setTimeout(()=>(0,o.playMicroClick)(),50)},title:q?"Sound Effects Enabled":"Enable Tactile Sound FX","aria-label":"Toggle sound effects",style:{display:"flex",alignItems:"center",gap:"6px",padding:"7px 12px",borderRadius:"9999px",background:q?"rgba(109, 61, 245, 0.22)":"rgba(255, 255, 255, 0.05)",border:q?"1px solid #8B5CF6":"1px solid rgba(255, 255, 255, 0.1)",color:q?"#FFFFFF":"var(--text-muted)",fontSize:"11px",fontWeight:600,cursor:"pointer",transition:"all 0.2s ease"},children:[q?(0,b.jsx)(k,{size:14,color:"#A78BFA"}):(0,b.jsx)(m,{size:14}),(0,b.jsx)("span",{className:"sound-toggle-label",style:{fontSize:"11px"},children:q?"FX ON":"FX OFF"})]}),(0,b.jsx)("button",{type:"button",onClick:()=>{(0,o.playMicroClick)(),(0,p.openEarlyAccessModal)("both")},className:"btn-primary desktop-cta",style:{padding:"9px 18px",fontSize:"13px",borderRadius:"9999px",border:"none",cursor:"pointer"},children:(0,b.jsx)("span",{children:"Get Started"})}),(0,b.jsx)("button",{className:"mobile-hamburger",onClick:()=>l(!j),"aria-label":"Toggle navigation menu",style:{display:"none",color:"#FFFFFF",padding:"8px",borderRadius:"8px",background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.1)"},children:j?(0,b.jsx)(h.X,{size:22}):(0,b.jsx)(g.Menu,{size:22})})]})]})})}),j&&(0,b.jsx)("div",{onClick:()=>l(!1),style:{position:"fixed",inset:0,background:"rgba(0, 0, 0, 0.6)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",zIndex:98}}),j&&(0,b.jsxs)("div",{style:{position:"fixed",top:"76px",left:"16px",right:"16px",maxHeight:"calc(100vh - 100px)",overflowY:"auto",background:"rgba(8, 11, 21, 0.96)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"20px",padding:"20px",zIndex:99,display:"flex",flexDirection:"column",gap:"10px",boxShadow:"0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(109, 61, 245, 0.2)"},children:[f.NAV_ITEMS.map(a=>{let c=s===a.href;return(0,b.jsxs)("a",{href:a.href,onClick:b=>{B(b,a.href),l(!1)},style:{fontSize:"15px",fontWeight:c?700:500,color:c?"#FFFFFF":"var(--text-secondary)",padding:"10px 16px",borderRadius:"12px",background:c?"linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(109, 61, 245, 0.12))":"transparent",border:c?"1px solid rgba(167, 139, 250, 0.35)":"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.2s ease"},children:[(0,b.jsx)("span",{children:a.label}),(0,b.jsx)(n.ArrowRight,{size:16,color:c?"#A78BFA":"rgba(255, 255, 255, 0.3)"})]},a.label)}),(0,b.jsx)("button",{type:"button",className:"btn-primary",onClick:()=>{(0,o.playMicroClick)(),l(!1),(0,p.openEarlyAccessModal)("both")},style:{width:"100%",marginTop:"6px",border:"none",cursor:"pointer"},children:(0,b.jsx)("span",{children:"Get Started"})})]}),(0,b.jsx)("style",{children:`
        @media (max-width: 900px) {
          .desktop-nav-links, .desktop-cta {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .app-header {
            padding: 10px 0 !important;
          }
        }
        @media (max-width: 480px) {
          .sound-toggle-label {
            display: none !important;
          }
        }
      `})]})};var r=a.i(62591),s=a.i(44597),t=a.i(54098),u=a.i(41146);let v=()=>{let a=(a,b)=>{if(b.startsWith("#")||"/"===b){if(a.preventDefault(),(0,o.playMicroClick)(),"#home"===b||"/"===b){window.scrollTo({top:0,behavior:"smooth"}),window.location.hash&&window.history.replaceState(null,"",window.location.pathname+window.location.search);return}let c=b.replace("#",""),d=document.getElementById(c);if(d){let a=window.innerWidth<=768?36:24,b=d.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:Math.max(0,b-a),behavior:"smooth"}),window.location.hash&&window.history.replaceState(null,"",window.location.pathname+window.location.search)}}};return(0,b.jsxs)("footer",{className:"expensex-footer",children:[(0,b.jsxs)("div",{className:"container",children:[(0,b.jsxs)("div",{className:"footer-desktop-grid",children:[(0,b.jsxs)("div",{className:"footer-col-brand",children:[(0,b.jsx)(e.Logo,{size:"md"}),(0,b.jsxs)("p",{className:"footer-brand-desc",children:["Track less. ",(0,b.jsx)("span",{className:"text-gradient-purple",children:"Know more."})]}),(0,b.jsxs)("div",{className:"footer-social-row",children:[(0,b.jsx)("a",{href:"https://facebook.com",target:"_blank",rel:"noopener noreferrer",className:"footer-circle-social",title:"Facebook","aria-label":"Facebook",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}),(0,b.jsx)("a",{href:"https://instagram.com",target:"_blank",rel:"noopener noreferrer",className:"footer-circle-social",title:"Instagram","aria-label":"Instagram",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})})}),(0,b.jsx)("a",{href:"https://youtube.com",target:"_blank",rel:"noopener noreferrer",className:"footer-circle-social",title:"YouTube","aria-label":"YouTube",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})})}),(0,b.jsx)("a",{href:"https://x.com",target:"_blank",rel:"noopener noreferrer",className:"footer-circle-social",title:"X (Twitter)","aria-label":"X",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})})]})]}),(0,b.jsxs)("div",{className:"footer-col footer-col-links",children:[(0,b.jsx)("h4",{className:"footer-heading",children:"QUICK LINKS"}),(0,b.jsx)("ul",{className:"footer-clean-links",children:[{label:"Home",href:"#home"},{label:"Features",href:"#features"},{label:"How It Works",href:"#tour"},{label:"AI Engine",href:"#ai-engine"},{label:"Safe to Spend",href:"#safe-to-spend"},{label:"Roadmap",href:"#roadmap"},{label:"FAQ",href:"#faq"}].map(c=>(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:c.href,className:"footer-link-item",onClick:b=>a(b,c.href),children:c.label})},c.label))})]}),(0,b.jsxs)("div",{className:"footer-col footer-col-contact",children:[(0,b.jsx)("h4",{className:"footer-heading",children:"SUPPORT & CONTACT"}),(0,b.jsxs)("div",{className:"footer-contact-list",children:[(0,b.jsxs)("div",{className:"footer-contact-row",children:[(0,b.jsx)("div",{className:"footer-icon-badge",style:{background:"rgba(255, 90, 54, 0.15)",color:"#FF5A36",border:"1px solid rgba(255, 90, 54, 0.3)"},children:(0,b.jsx)(r.Mail,{size:15})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"footer-contact-label",children:"SUPPORT EMAIL"}),(0,b.jsx)("a",{href:"mailto:support@expensexai.com",className:"footer-contact-value",onClick:o.playMicroClick,children:"support@expensexai.com"})]})]}),(0,b.jsxs)("div",{className:"footer-contact-row",children:[(0,b.jsx)("div",{className:"footer-icon-badge",style:{background:"rgba(37, 211, 102, 0.15)",color:"#25D366",border:"1px solid rgba(37, 211, 102, 0.3)"},children:(0,b.jsx)(s.MessageCircle,{size:15})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"footer-contact-label",children:"WHATSAPP CHAT"}),(0,b.jsx)("a",{href:"https://wa.me/8801404049797",target:"_blank",rel:"noopener noreferrer",className:"footer-contact-value",onClick:o.playMicroClick,children:"+880 1404-049797"})]})]}),(0,b.jsxs)("div",{className:"footer-contact-row",children:[(0,b.jsx)("div",{className:"footer-icon-badge",style:{background:"rgba(109, 61, 245, 0.15)",color:"#A78BFA",border:"1px solid rgba(139, 92, 246, 0.3)"},children:(0,b.jsx)(t.MapPin,{size:15})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"footer-contact-label",children:"OFFICE ADDRESS"}),(0,b.jsx)("div",{className:"footer-contact-value address-text",children:"50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh"})]})]})]})]})]}),(0,b.jsxs)("div",{className:"footer-mobile-view",children:[(0,b.jsxs)("div",{className:"footer-m-card footer-m-brand-card",children:[(0,b.jsx)(e.Logo,{size:"md"}),(0,b.jsxs)("div",{className:"footer-m-tagline",children:["Track less. ",(0,b.jsx)("span",{className:"text-gradient-purple",children:"Know more."})]}),(0,b.jsxs)("div",{className:"footer-m-socials",children:[(0,b.jsx)("a",{href:"https://facebook.com",target:"_blank",rel:"noopener noreferrer",className:"footer-m-social-btn",title:"Facebook",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}),(0,b.jsx)("a",{href:"https://instagram.com",target:"_blank",rel:"noopener noreferrer",className:"footer-m-social-btn",title:"Instagram",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})})}),(0,b.jsx)("a",{href:"https://youtube.com",target:"_blank",rel:"noopener noreferrer",className:"footer-m-social-btn",title:"YouTube",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})})}),(0,b.jsx)("a",{href:"https://x.com",target:"_blank",rel:"noopener noreferrer",className:"footer-m-social-btn",title:"X (Twitter)",onClick:o.playMicroClick,children:(0,b.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:(0,b.jsx)("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})})]})]}),(0,b.jsxs)("div",{className:"footer-m-card",children:[(0,b.jsx)("div",{className:"footer-m-card-title",children:"EXPLORE PAGES"}),(0,b.jsx)("div",{className:"footer-m-grid-nav",children:[{label:"Home",href:"#home"},{label:"Features",href:"#features"},{label:"How It Works",href:"#tour"},{label:"AI Engine",href:"#ai-engine"},{label:"Safe to Spend",href:"#safe-to-spend"},{label:"Roadmap",href:"#roadmap"},{label:"FAQ",href:"#faq"},{label:"Early Access",href:"#",isVip:!0}].map(c=>(0,b.jsxs)("a",{href:c.href,className:`footer-m-nav-item ${c.isVip?"footer-m-nav-vip":""}`,onClick:b=>{c.isVip?(b.preventDefault(),(0,o.playMicroClick)(),(0,p.openEarlyAccessModal)()):a(b,c.href)},children:[(0,b.jsx)("span",{className:"footer-m-nav-text",children:c.label}),c.isVip?(0,b.jsx)("span",{className:"footer-m-vip-badge",children:"VIP"}):(0,b.jsx)(u.ChevronRight,{size:13,className:"footer-m-nav-arrow"})]},c.label))})]}),(0,b.jsxs)("div",{className:"footer-m-card",children:[(0,b.jsx)("div",{className:"footer-m-card-title",children:"DIRECT SUPPORT"}),(0,b.jsxs)("div",{className:"footer-m-action-list",children:[(0,b.jsxs)("a",{href:"https://wa.me/8801404049797",target:"_blank",rel:"noopener noreferrer",className:"footer-m-action-item",onClick:o.playMicroClick,children:[(0,b.jsx)("div",{className:"footer-m-icon-wrap",style:{background:"rgba(37, 211, 102, 0.15)",color:"#25D366"},children:(0,b.jsx)(s.MessageCircle,{size:16})}),(0,b.jsxs)("div",{className:"footer-m-item-text",children:[(0,b.jsx)("div",{className:"footer-m-sub",children:"WHATSAPP CHAT"}),(0,b.jsx)("div",{className:"footer-m-main",children:"+880 1404-049797"})]}),(0,b.jsx)(u.ChevronRight,{size:16,className:"footer-m-chevron"})]}),(0,b.jsxs)("a",{href:"mailto:support@expensexai.com",className:"footer-m-action-item",onClick:o.playMicroClick,children:[(0,b.jsx)("div",{className:"footer-m-icon-wrap",style:{background:"rgba(255, 90, 54, 0.15)",color:"#FF5A36"},children:(0,b.jsx)(r.Mail,{size:16})}),(0,b.jsxs)("div",{className:"footer-m-item-text",children:[(0,b.jsx)("div",{className:"footer-m-sub",children:"SUPPORT EMAIL"}),(0,b.jsx)("div",{className:"footer-m-main",children:"support@expensexai.com"})]}),(0,b.jsx)(u.ChevronRight,{size:16,className:"footer-m-chevron"})]}),(0,b.jsxs)("div",{className:"footer-m-action-item",style:{cursor:"default"},children:[(0,b.jsx)("div",{className:"footer-m-icon-wrap",style:{background:"rgba(109, 61, 245, 0.15)",color:"#A78BFA"},children:(0,b.jsx)(t.MapPin,{size:16})}),(0,b.jsxs)("div",{className:"footer-m-item-text",children:[(0,b.jsx)("div",{className:"footer-m-sub",children:"OFFICE HEADQUARTERS"}),(0,b.jsx)("div",{className:"footer-m-main address-wrap",children:"50, KDA Outer Bypass Rd, Khulna 9100, BD"})]})]})]})]})]}),(0,b.jsxs)("div",{className:"footer-bottom-row",children:[(0,b.jsx)("div",{className:"footer-copyright",children:"© 2026 ExpenseX AI. All rights reserved."}),(0,b.jsxs)("div",{className:"footer-bottom-legal",children:[(0,b.jsx)("a",{href:"#privacy",className:"footer-legal-link",onClick:b=>a(b,"#privacy"),children:"Privacy Policy"}),(0,b.jsx)("span",{className:"footer-legal-dot",children:"•"}),(0,b.jsx)("a",{href:"#privacy",className:"footer-legal-link",onClick:b=>a(b,"#privacy"),children:"Terms of Service"})]}),(0,b.jsxs)("div",{className:"footer-powered-by",children:["Powered by ",(0,b.jsx)("strong",{style:{color:"#FFFFFF",fontWeight:600},children:"Appstick Ltd"})]})]})]}),(0,b.jsx)("style",{children:`
        .expensex-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background-color: #070913;
          padding: 65px 0 40px 0;
          color: #94A3B8;
          position: relative;
        }

        /* Desktop Layout */
        .footer-desktop-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.3fr;
          gap: 60px;
          margin-bottom: 48px;
        }

        .footer-mobile-view {
          display: none;
        }

        .footer-brand-desc {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
          color: #CBD5E1;
          margin-top: 14px;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-heading {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          margin: 0 0 18px 0;
          text-transform: uppercase;
        }

        .footer-clean-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .footer-link-item {
          font-size: 13.5px;
          color: #94A3B8;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .footer-link-item:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }

        .footer-circle-social {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #CBD5E1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-circle-social:hover {
          background: rgba(109, 61, 245, 0.25);
          border-color: rgba(139, 92, 246, 0.5);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-contact-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.07em;
          margin-bottom: 2px;
        }

        .footer-contact-value {
          font-size: 13.5px;
          color: #CBD5E1;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }

        .footer-contact-value:hover {
          color: #FFFFFF;
        }

        .address-text {
          line-height: 1.45;
          font-size: 13px;
          max-width: 240px;
        }

        .footer-bottom-row {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #64748B;
          gap: 16px;
        }

        .footer-legal-link {
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-legal-link:hover {
          color: #94A3B8;
        }

        .footer-legal-dot {
          color: #334155;
        }

        /* Tablet Layout */
        @media (max-width: 992px) {
          .footer-desktop-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-col-brand {
            grid-column: span 2;
          }
        }

        /* ================= MOBILE NATIVE UI ================= */
        @media (max-width: 640px) {
          .expensex-footer {
            padding: 32px 0 130px 0 !important; /* Clears floating dock */
          }

          .footer-desktop-grid {
            display: none !important;
          }

          .footer-mobile-view {
            display: flex !important;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 28px;
          }

          /* Glassmorphic Mobile Card Frame */
          .footer-m-card {
            background: rgba(18, 22, 42, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            padding: 20px 18px;
          }

          .footer-m-brand-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 24px 20px;
            background: linear-gradient(180deg, rgba(23, 28, 56, 0.7) 0%, rgba(13, 16, 36, 0.8) 100%);
            border-color: rgba(139, 92, 246, 0.2);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          }

          .footer-m-tagline {
            font-size: 15px;
            font-weight: 500;
            color: #CBD5E1;
            margin-top: 10px;
            margin-bottom: 18px;
          }

          .footer-m-socials {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .footer-m-social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #CBD5E1;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .footer-m-social-btn:active {
            background: rgba(109, 61, 245, 0.3);
            border-color: rgba(139, 92, 246, 0.5);
            color: #FFFFFF;
            transform: scale(0.94);
          }

          .footer-m-card-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.09em;
            color: #A78BFA;
            margin-bottom: 14px;
            text-transform: uppercase;
          }

          /* 2-Column Balanced Grid Nav */
          .footer-m-grid-nav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .footer-m-nav-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 11px 12px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: #CBD5E1;
            font-size: 13px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .footer-m-nav-item:active {
            background: rgba(109, 61, 245, 0.2);
            border-color: rgba(139, 92, 246, 0.4);
            color: #FFFFFF;
            transform: scale(0.98);
          }

          .footer-m-nav-text {
            font-size: 12.5px;
          }

          .footer-m-nav-arrow {
            color: #475569;
            flex-shrink: 0;
          }

          .footer-m-nav-vip {
            background: rgba(109, 61, 245, 0.12);
            border-color: rgba(139, 92, 246, 0.35);
            color: #E9D5FF;
          }

          .footer-m-vip-badge {
            font-size: 9.5px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 6px;
            background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 100%);
            color: #FFFFFF;
            letter-spacing: 0.04em;
          }

          /* Action Rows */
          .footer-m-action-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .footer-m-action-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 12px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.05);
            text-decoration: none;
            color: inherit;
            transition: all 0.2s ease;
          }

          .footer-m-action-item:active {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.12);
            transform: scale(0.98);
          }

          .footer-m-icon-wrap {
            width: 34px;
            height: 34px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-right: 12px;
          }

          .footer-m-item-text {
            flex: 1;
            text-align: left;
          }

          .footer-m-sub {
            font-size: 9.5px;
            font-weight: 700;
            letter-spacing: 0.06em;
            color: #64748B;
            margin-bottom: 2px;
          }

          .footer-m-main {
            font-size: 13.5px;
            font-weight: 600;
            color: #F1F5F9;
          }

          .address-wrap {
            font-size: 12.5px;
            font-weight: 400;
            color: #CBD5E1;
            line-height: 1.35;
          }

          .footer-m-chevron {
            color: #475569;
            flex-shrink: 0;
          }

          /* Bottom Row */
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 10px !important;
            padding-top: 20px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
          }

          .footer-copyright {
            font-size: 12px;
            color: #64748B;
          }

          .footer-bottom-legal {
            font-size: 12.5px;
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .footer-legal-link {
            color: #94A3B8;
          }

          .footer-powered-by {
            font-size: 12px;
            color: #64748B;
            margin-top: 2px;
          }
        }
      `})]})},w=()=>{let a=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let b=!1,c=()=>{let c=document.documentElement.scrollHeight-window.innerHeight;if(c>0&&a.current){let b=Math.min(1,Math.max(0,window.scrollY/c));a.current.style.transform=`scaleX(${b})`}b=!1},d=()=>{b||(window.requestAnimationFrame(c),b=!0)};return window.addEventListener("scroll",d,{passive:!0}),c(),()=>window.removeEventListener("scroll",d)},[]),(0,b.jsx)("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"2.5px",zIndex:9999,pointerEvents:"none"},children:(0,b.jsx)("div",{ref:a,style:{width:"100%",height:"100%",transformOrigin:"left center",transform:"scaleX(0)",background:"linear-gradient(90deg, #6D3DF5 0%, #A78BFA 60%, #FF5A36 100%)",boxShadow:"0 0 12px rgba(167, 139, 250, 0.8), 0 0 4px #FF5A36",willChange:"transform"}})})},x=()=>{let[a,d]=(0,c.useState)({x:-100,y:-100}),[e,f]=(0,c.useState)(!1);return((0,c.useEffect)(()=>{if(window.matchMedia&&(window.matchMedia("(pointer: coarse)").matches||window.matchMedia("(hover: none)").matches))return;let a=!1,b=b=>{a||(window.requestAnimationFrame(()=>{d({x:b.clientX,y:b.clientY}),e||f(!0),a=!1}),a=!0)},c=()=>{f(!1)};return window.addEventListener("mousemove",b,{passive:!0}),document.addEventListener("mouseleave",c),()=>{window.removeEventListener("mousemove",b),document.removeEventListener("mouseleave",c)}},[e]),e)?(0,b.jsx)("div",{style:{position:"fixed",left:0,top:0,transform:`translate(${a.x-250}px, ${a.y-250}px)`,width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle, rgba(109, 61, 245, 0.12) 0%, rgba(255, 90, 54, 0.04) 45%, transparent 70%)",pointerEvents:"none",zIndex:9999,transition:"transform 0.08s ease-out",mixBlendMode:"screen"}}):null};var y=a.i(72405),z=a.i(86708);let A={name:"arrow-up",size:24,node:[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]};A.node;let B=(0,i.default)(A);var C=a.i(92378),D=a.i(8072);let E=()=>{let[a,d]=(0,c.useState)(!1);(0,c.useEffect)(()=>{let a=!1,b=!1,c=()=>{let c=window.scrollY>320;c!==b&&(b=c,d(c)),a=!1},e=()=>{a||(window.requestAnimationFrame(c),a=!0)};return window.addEventListener("scroll",e,{passive:!0}),c(),()=>window.removeEventListener("scroll",e)},[]);let e=(a,b)=>{a.preventDefault(),(0,o.playMicroClick)(),(0,D.triggerHaptic)("selection");let c=b.replace("#",""),d=document.getElementById(c);if(d){let a=d.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:Math.max(0,a-32),behavior:"smooth"})}window.location.hash&&history.replaceState(null,"",window.location.pathname+window.location.search)};return a?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"mobile-quick-dock",children:(0,b.jsxs)("div",{className:"dock-container",children:[(0,b.jsxs)("a",{href:"#tour",onClick:a=>e(a,"#tour"),className:"dock-item",title:"Quick Tour",children:[(0,b.jsx)(y.Compass,{size:17}),(0,b.jsx)("span",{children:"Tour"})]}),(0,b.jsxs)("a",{href:"#features",onClick:a=>e(a,"#features"),className:"dock-item",title:"AI Features",children:[(0,b.jsx)(z.Sparkles,{size:17}),(0,b.jsx)("span",{children:"AI Core"})]}),(0,b.jsxs)("button",{type:"button",onClick:()=>{(0,o.playMicroClick)(),(0,D.triggerHaptic)("medium"),(0,p.openEarlyAccessModal)("both")},className:"dock-cta-btn",style:{border:"none",cursor:"pointer"},children:[(0,b.jsx)(C.Zap,{size:15,fill:"#FFFFFF"}),(0,b.jsx)("span",{children:"Get App"})]}),(0,b.jsx)("button",{onClick:()=>{(0,o.playMicroClick)(),(0,D.triggerHaptic)("medium"),window.scrollTo({top:0,behavior:"smooth"}),window.location.hash&&history.replaceState(null,"",window.location.pathname+window.location.search)},className:"dock-top-btn",title:"Back to Top","aria-label":"Scroll to top",children:(0,b.jsx)(B,{size:17})})]})}),(0,b.jsx)("style",{children:`
        .mobile-quick-dock {
          position: fixed;
          bottom: 20px;
          left: 0;
          right: 0;
          z-index: 998;
          display: flex;
          justify-content: center;
          padding: 0 14px;
          pointer-events: none;
          animation: dockSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dockSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dock-container {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px 6px 12px;
          border-radius: 9999px;
          background: rgba(14, 18, 38, 0.96);
          border: 1px solid rgba(139, 92, 246, 0.45);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.85), 0 0 28px rgba(109, 61, 245, 0.3);
          white-space: nowrap !important;
          flex-shrink: 0;
          max-width: fit-content;
          margin: 0 auto;
        }

        .dock-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap !important;
          flex-shrink: 0;
          line-height: 1;
        }

        .dock-item svg,
        .dock-cta-btn svg,
        .dock-top-btn svg {
          flex-shrink: 0;
        }

        .dock-item span {
          white-space: nowrap !important;
        }

        .dock-item:active {
          transform: scale(0.94);
          background: rgba(109, 61, 245, 0.2);
          color: #FFFFFF;
        }

        .dock-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
          text-decoration: none;
          background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 50%, #FF5A36 100%);
          box-shadow: 0 4px 16px rgba(109, 61, 245, 0.55);
          transition: transform 0.2s ease;
          white-space: nowrap !important;
          flex-shrink: 0;
          line-height: 1;
        }

        .dock-cta-btn span {
          white-space: nowrap !important;
        }

        .dock-cta-btn:active {
          transform: scale(0.94);
          filter: brightness(1.15);
        }

        .dock-top-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .dock-top-btn:active {
          transform: scale(0.92);
          background: rgba(139, 92, 246, 0.3);
          color: #FFFFFF;
        }

        /* Ultra-compact screens like 320px - 340px */
        @media (max-width: 345px) {
          .mobile-quick-dock {
            padding: 0 6px;
            bottom: 14px;
          }
          .dock-container {
            padding: 5px 6px 5px 8px;
            gap: 4px;
          }
          .dock-item {
            padding: 6px 8px;
            font-size: 11.5px;
            gap: 4px;
          }
          .dock-cta-btn {
            padding: 6px 12px;
            font-size: 12px;
            gap: 4px;
          }
          .dock-top-btn {
            width: 32px;
            height: 32px;
          }
        }

        /* Hide on desktop/large screens so it is an exclusive mobile/tablet experience */
        @media (min-width: 769px) {
          .mobile-quick-dock {
            display: none !important;
          }
        }
      `})]}):null};var F=a.i(52562),G=a.i(13412),H=a.i(44451),I=a.i(80447),J=a.i(97546),K=a.i(75160);let L={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};L.node;let M=(0,i.default)(L);var N=a.i(71985);let O={name:"check-check",size:24,node:[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]};O.node;let P=(0,i.default)(O);var Q=a.i(34655),R=a.i(61629);let S=[{id:"receipt",label:"Receipt OCR Scan",icon:"🧾"},{id:"sms",label:"Bank SMS Detection",icon:"💬"},{id:"voice",label:"Hands-Free Voice AI",icon:"🎙️"},{id:"whatsapp",label:"WhatsApp AI Bot",icon:"🤖"},{id:"safe_spend",label:"Safe-to-Spend Limit",icon:"🛡️"},{id:"budgets",label:"Smart Budget Envelopes",icon:"🎯"}],T=()=>{let[d,e]=(0,c.useState)(!1),[f,g]=(0,c.useState)("ios"),[i,j]=(0,c.useState)(""),[k,l]=(0,c.useState)(""),[m,n]=(0,c.useState)(""),[q,s]=(0,c.useState)(""),[u,v]=(0,c.useState)(["receipt","sms","safe_spend"]),[w,x]=(0,c.useState)(!1),[y,A]=(0,c.useState)(null),[B,C]=(0,c.useState)(!1),[E,L]=(0,c.useState)(null),[O,T]=(0,c.useState)(""),[U,V]=(0,c.useState)(!1),[W,X]=(0,c.useState)({}),Y=(0,c.useRef)(()=>{}),Z=()=>{j(""),l(""),n(""),v(["receipt","sms","safe_spend"]),X({}),A(null)},$=()=>{(0,o.playMicroClick)(),e(!1),A(null),document.body.style.overflow="",B&&setTimeout(()=>{C(!1),L(null),V(!1),T(""),Z()},250)};Y.current=$,(0,c.useEffect)(()=>{let a=(0,R.getStoredReferralCode)();a&&s(a);let b=(0,p.subscribeToEarlyAccessModal)(a=>{"ios"===a.platform?g("ios"):"android"===a.platform?g("android"):g("both"),C(a=>(a&&(Z(),L(null),T(""),V(!1)),!1)),A(null);let b=(0,R.getStoredReferralCode)();b&&s(b),e(!0),document.body.style.overflow="hidden"}),c=a=>{"Escape"===a.key&&Y.current()};return window.addEventListener("keydown",c),()=>{b(),window.removeEventListener("keydown",c)}},[]);let _=async b=>{b.preventDefault(),A(null);let c={};if(i.trim()?i.trim().length<2&&(c.name="Name must be at least 2 characters"):c.name="Please enter your full name",k.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k.trim())||(c.email="Please enter a valid email address (e.g. name@domain.com)"):c.email="Please enter your email address",Object.keys(c).length>0){X(c),(0,D.triggerHaptic)("medium");return}X({}),x(!0);let d=u.map(a=>{let b=S.find(b=>b.id===a);return b?b.label:a});try{let b=(0,R.getStoredReferralCode)()||void 0,c=await (0,Q.submitBetaUser)({name:i.trim(),email:k.trim(),referral_code:b,target_platform:f,address:m.trim()||void 0,like_features:d.length>0?d:["Expense tracking","Budgeting"]});(0,o.playSuccessChime)(),(0,D.triggerHaptic)("heavy");let e=c?.data?.link||c?.link||"";e&&T(e);try{let a={name:i.trim(),email:k.trim(),address:m.trim(),referral_code:b||"",platform:f,features:d,submittedAt:new Date().toISOString()},c=JSON.parse(localStorage.getItem("expensex_early_bird_users")||"[]");c.push(a),localStorage.setItem("expensex_early_bird_users",JSON.stringify(c))}catch{}try{(0,(await a.A(48743)).default)({particleCount:110,spread:70,origin:{y:.6},colors:["#6D3DF5","#8B5CF6","#34D399","#FFAA33","#FFFFFF"]})}catch{}L({name:i.trim(),email:k.trim(),platform:f,featureCount:d.length}),Z(),C(!0)}catch(b){(0,D.triggerHaptic)("heavy");let a=b?.message||"";if(a.toLowerCase().includes("unable to reach")||a.toLowerCase().includes("connection refused")||a.toLowerCase().includes("failed to fetch")||a.toLowerCase().includes("network"))A("Unable to reach server. Please check your internet connection and try again.");else{let a=k.trim();A(a?`Each email address can only be used once. If you have already registered with (${a}), your early access spot is already secured!`:"Each email address can only be used once for registration. If you already signed up, your spot is confirmed.")}}finally{x(!1)}};return d?(0,b.jsxs)("div",{className:"early-access-overlay",onClick:$,children:[(0,b.jsxs)("div",{className:"early-access-modal",onClick:a=>a.stopPropagation(),role:"dialog","aria-modal":"true",children:[(0,b.jsx)("button",{className:"modal-close-btn",onClick:$,"aria-label":"Close dialog",children:(0,b.jsx)(h.X,{size:18})}),B?(0,b.jsxs)("div",{className:"success-state",children:[(0,b.jsx)("div",{className:"success-icon-wrapper",children:(0,b.jsx)(G.CheckCircle2,{size:42,className:"success-check-icon"})}),(0,b.jsx)("div",{className:"vip-ticket-badge",children:(0,b.jsx)("span",{children:"VIP PASS ISSUED"})}),(0,b.jsx)("h3",{className:"success-title",children:"You're on the Priority List!"}),(0,b.jsxs)("p",{className:"success-subtitle",children:["Welcome aboard, ",(0,b.jsx)("strong",{children:E?.name||i}),"! Your spot is confirmed."]}),(0,b.jsxs)("p",{className:"success-message",children:["🎉 When early builds drop, you'll get an invite at ",(0,b.jsx)("strong",{children:E?.email||k})," — covering your ",E?.featureCount??u.length," selected features on ",(0,b.jsx)("strong",{children:"both"===(E?.platform||f)?"iOS & Android":"ios"===(E?.platform||f)?"Apple iOS":"Android"}),"."]}),O&&(0,b.jsxs)("div",{className:"referral-share-section",children:[(0,b.jsx)("p",{className:"referral-share-label",children:"🎁 Share your invite link & earn rewards"}),(0,b.jsxs)("div",{className:"referral-link-row",children:[(0,b.jsx)("div",{className:"referral-link-display",children:(0,b.jsx)("span",{className:"referral-link-text",children:O})}),(0,b.jsxs)("button",{className:`referral-copy-btn ${U?"copied":""}`,onClick:async()=>{try{await navigator.clipboard.writeText(O),V(!0),setTimeout(()=>V(!1),2500)}catch{let a=document.createElement("textarea");a.value=O,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),V(!0),setTimeout(()=>V(!1),2500)}},title:"Copy link",children:[U?(0,b.jsx)(P,{size:16}):(0,b.jsx)(M,{size:16}),(0,b.jsx)("span",{children:U?"Copied!":"Copy"})]})]}),(0,b.jsxs)("button",{className:"referral-share-btn",onClick:async()=>{let a={title:"Join me on ExpenseX AI!",text:`I just got VIP early access to ExpenseX AI — the AI-powered expense tracker. Join me before launch! 🚀`,url:O};if(navigator.share&&navigator.canShare?.(a))try{await navigator.share(a)}catch{}else{let a=document.getElementById("expensex-share-menu");a&&(a.style.display="flex"===a.style.display?"none":"flex")}},children:[(0,b.jsx)(N.Share2,{size:16}),(0,b.jsx)("span",{children:"Share Invite Link"})]}),(0,b.jsx)("div",{id:"expensex-share-menu",className:"share-menu-dropdown",style:{display:"none"},children:[{label:"💬 WhatsApp",url:`https://wa.me/?text=${encodeURIComponent("I just got VIP early access to ExpenseX AI 🚀 Join me before launch!")}%20${encodeURIComponent(O)}`},{label:"✈️ Telegram",url:`https://t.me/share/url?url=${encodeURIComponent(O)}&text=${encodeURIComponent("I just got VIP early access to ExpenseX AI 🚀")}`},{label:"🐦 Twitter / X",url:`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just got VIP early access to ExpenseX AI 🚀")}&url=${encodeURIComponent(O)}`},{label:"📘 Facebook",url:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(O)}`},{label:"📧 Email",url:`mailto:?subject=${encodeURIComponent("Join ExpenseX AI Early Access!")}&body=${encodeURIComponent("I just got VIP early access to ExpenseX AI 🚀 Join me before launch! "+O)}`}].map(a=>(0,b.jsx)("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",className:"share-menu-item",onClick:()=>{let a=document.getElementById("expensex-share-menu");a&&(a.style.display="none")},children:a.label},a.label))})]}),(0,b.jsx)("button",{onClick:$,className:"modal-submit-btn success-btn",children:(0,b.jsx)("span",{children:"Back to ExpenseX AI"})})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:"modal-header",children:[(0,b.jsxs)("div",{className:"modal-eyebrow",children:[(0,b.jsx)(z.Sparkles,{size:13}),(0,b.jsx)("span",{children:"EARLY BIRD VIP ACCESS"})]}),(0,b.jsxs)("h2",{className:"modal-title",children:["Experience ExpenseX AI ",(0,b.jsx)("span",{className:"text-gradient-purple",children:"First."})]}),(0,b.jsx)("p",{className:"modal-description",children:"Join our exclusive priority waitlist to get early beta builds on the Apple App Store & Google Play Store before official launch."}),q&&(0,b.jsxs)("div",{className:"vip-invite-banner",children:[(0,b.jsxs)("div",{className:"vip-invite-left",children:[(0,b.jsx)("span",{className:"vip-invite-pulse"}),(0,b.jsxs)("span",{className:"vip-invite-text",children:["VIP Invite Code: ",(0,b.jsx)("strong",{children:q})]})]}),(0,b.jsx)("span",{className:"vip-invite-tag",children:"✓ Priority Access"})]})]}),(0,b.jsxs)("form",{onSubmit:_,className:"modal-form",children:[(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsxs)("label",{className:"form-label",children:[(0,b.jsx)(I.Smartphone,{size:14}),(0,b.jsx)("span",{children:"Choose Your Target Platform"})]}),(0,b.jsxs)("div",{className:"platform-cards-grid",children:[(0,b.jsxs)("button",{type:"button",className:`platform-select-card ${"ios"===f?"active":""}`,onClick:()=>{(0,o.playMicroClick)(),(0,D.triggerHaptic)("light"),g("ios")},children:[(0,b.jsx)("div",{className:"platform-card-icon-wrap apple",children:(0,b.jsx)("img",{src:"/apple-logo.png",alt:"Apple iOS",className:"platform-card-logo"})}),(0,b.jsx)("span",{className:"platform-name",children:"Apple iOS"}),"ios"===f&&(0,b.jsx)(F.Check,{size:13,className:"platform-check-icon"})]}),(0,b.jsxs)("button",{type:"button",className:`platform-select-card ${"android"===f?"active":""}`,onClick:()=>{(0,o.playMicroClick)(),(0,D.triggerHaptic)("light"),g("android")},children:[(0,b.jsx)("div",{className:"platform-card-icon-wrap play",children:(0,b.jsx)("img",{src:"/Google_Play_2022_icon.svg",alt:"Google Play",className:"platform-card-logo"})}),(0,b.jsx)("span",{className:"platform-name",children:"Android"}),"android"===f&&(0,b.jsx)(F.Check,{size:13,className:"platform-check-icon"})]}),(0,b.jsxs)("button",{type:"button",className:`platform-select-card ${"both"===f?"active":""}`,onClick:()=>{(0,o.playMicroClick)(),(0,D.triggerHaptic)("light"),g("both")},children:[(0,b.jsx)("div",{className:"platform-card-icon-wrap both",children:(0,b.jsx)(z.Sparkles,{size:15})}),(0,b.jsx)("span",{className:"platform-name",children:"Both"}),"both"===f&&(0,b.jsx)(F.Check,{size:13,className:"platform-check-icon"})]})]})]}),(0,b.jsxs)("div",{className:"form-row",children:[(0,b.jsxs)("div",{className:"form-group flex-1",children:[(0,b.jsxs)("label",{className:"form-label",children:[(0,b.jsx)(H.User,{size:14}),(0,b.jsx)("span",{children:"Full Name *"})]}),(0,b.jsx)("input",{type:"text",value:i,onChange:a=>{j(a.target.value),W.name&&X(a=>({...a,name:void 0}))},placeholder:"e.g. Alex Morgan",className:`form-input ${W.name?"error":""}`}),W.name&&(0,b.jsx)("span",{className:"input-error",children:W.name})]}),(0,b.jsxs)("div",{className:"form-group flex-1",children:[(0,b.jsxs)("label",{className:"form-label",children:[(0,b.jsx)(r.Mail,{size:14}),(0,b.jsx)("span",{children:"Email Address *"})]}),(0,b.jsx)("input",{type:"email",value:k,onChange:a=>{l(a.target.value),W.email&&X(a=>({...a,email:void 0})),y&&A(null)},placeholder:"alex@example.com",className:`form-input ${W.email?"error":""}`}),W.email&&(0,b.jsx)("span",{className:"input-error",children:W.email})]})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsxs)("label",{className:"form-label",children:[(0,b.jsx)(t.MapPin,{size:14}),(0,b.jsx)("span",{children:"Address / Location (Optional)"})]}),(0,b.jsx)("input",{type:"text",value:m,onChange:a=>n(a.target.value),placeholder:"e.g. 123 Main St, New York, USA",className:"form-input",disabled:w})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsxs)("label",{className:"form-label",children:[(0,b.jsx)(z.Sparkles,{size:14}),(0,b.jsx)("span",{children:"Which Features Excite You Most?"})]}),(0,b.jsx)("div",{className:"features-chip-grid",children:S.map(a=>{let c=u.includes(a.id);return(0,b.jsxs)("button",{type:"button",onClick:()=>{var b;return b=a.id,void((0,o.playMicroClick)(),(0,D.triggerHaptic)("light"),v(a=>a.includes(b)?a.filter(a=>a!==b):[...a,b]))},className:`feature-chip ${c?"selected":""}`,disabled:w,children:[(0,b.jsx)("span",{className:"feature-icon",children:a.icon}),(0,b.jsx)("span",{className:"feature-label",children:a.label}),c&&(0,b.jsx)(F.Check,{size:12,className:"check-icon"})]},a.id)})})]}),y&&(0,b.jsxs)("div",{className:"modal-api-error",role:"alert",children:[(0,b.jsx)(J.AlertCircle,{size:18,className:"error-icon"}),(0,b.jsxs)("div",{className:"error-text-content",children:[(0,b.jsx)("span",{className:"error-title",children:"Notice: 1 Registration Per Email"}),(0,b.jsx)("span",{className:"error-desc",children:y})]})]}),(0,b.jsx)("button",{type:"submit",className:`modal-submit-btn ${w?"submitting":""}`,disabled:w,children:w?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(K.Loader2,{size:18,className:"spin-loader"}),(0,b.jsx)("span",{children:"Reserving VIP Spot..."})]}):(0,b.jsx)("span",{children:"⚡ Reserve My Early Bird Spot"})}),(0,b.jsx)("p",{className:"privacy-note",children:"🔒 We respect your privacy. No spam, ever. Unsubscribe with 1 click."})]})]})]}),(0,b.jsx)("style",{children:`
        .early-access-overlay {
          position: fixed;
          inset: 0;
          z-index: 1050;
          background: rgba(3, 6, 15, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: overlayFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .early-access-modal {
          position: relative;
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
          background: linear-gradient(180deg, rgba(17, 21, 44, 0.98) 0%, rgba(8, 10, 24, 0.98) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.85), 0 0 45px rgba(109, 61, 245, 0.35);
          border-radius: 28px;
          padding: 36px 32px;
          color: #FFFFFF;
          animation: modalFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
          will-change: opacity, transform;
          transform: translateZ(0);
        }

        @keyframes modalFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .modal-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(109, 61, 245, 0.14);
          border: 1px solid rgba(139, 92, 246, 0.35);
          color: #C084FC;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .modal-title {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }

        .modal-description {
          font-size: 13.5px;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
        }

        /* VIP Referral Invite Badge */
        .vip-invite-banner {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 14px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(109, 61, 245, 0.16) 100%);
          border: 1px solid rgba(52, 211, 153, 0.4);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.12), 0 0 25px rgba(109, 61, 245, 0.15);
          width: 100%;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }

        .vip-invite-left {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }

        .vip-invite-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 10px #34D399, 0 0 18px rgba(52, 211, 153, 0.6);
          flex-shrink: 0;
          animation: pulseDot 1.8s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 0.6;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.18);
          }
        }

        .vip-invite-text {
          font-size: 12.5px;
          color: #E2E8F0;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vip-invite-text strong {
          color: #FFFFFF;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
          background: rgba(109, 61, 245, 0.4);
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(167, 139, 250, 0.35);
          margin-left: 4px;
        }

        .vip-invite-tag {
          font-size: 11px;
          font-weight: 700;
          color: #34D399;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
          background: rgba(52, 211, 153, 0.12);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(52, 211, 153, 0.25);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: flex;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .flex-1 {
          flex: 1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #E2E8F0;
        }

        .form-input {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #8B5CF6;
          background: rgba(109, 61, 245, 0.08);
          box-shadow: 0 0 16px rgba(109, 61, 245, 0.35);
        }

        .form-input.error {
          border-color: #EF4444;
          background: rgba(239, 68, 68, 0.08);
        }

        .input-error {
          font-size: 11px;
          color: #F87171;
          margin-top: 2px;
        }

        .platform-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .platform-select-card {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          padding: 0 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap !important;
          position: relative;
        }

        .platform-select-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(139, 92, 246, 0.35);
          transform: translateY(-1px);
        }

        .platform-select-card:active {
          transform: scale(0.97);
        }

        .platform-select-card.active {
          background: rgba(109, 61, 245, 0.18);
          border: 1.5px solid #8B5CF6;
          box-shadow: 0 4px 20px rgba(109, 61, 245, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        .platform-card-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .platform-card-logo {
          width: 18px;
          height: 18px;
          object-fit: contain;
          display: block;
        }

        .platform-card-icon-wrap.apple .platform-card-logo {
          filter: brightness(0) invert(1);
        }

        .platform-card-icon-wrap.both {
          color: #C084FC;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .platform-name {
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.01em;
          white-space: nowrap !important;
        }

        .platform-check-icon {
          color: #34D399;
          margin-left: 2px;
          flex-shrink: 0;
        }

        .features-chip-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .feature-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .feature-chip.selected {
          background: rgba(52, 211, 153, 0.12);
          border-color: rgba(52, 211, 153, 0.45);
          color: #FFFFFF;
        }

        .feature-chip .check-icon {
          color: #34D399;
          margin-left: auto;
        }

        .modal-api-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #FECACA;
          font-size: 13px;
          line-height: 1.4;
          animation: shakeIn 0.3s ease-in-out forwards;
        }

        @keyframes shakeIn {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        .modal-api-error .error-icon {
          color: #EF4444;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .modal-api-error .error-text-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .modal-api-error .error-title {
          font-size: 12px;
          font-weight: 700;
          color: #F87171;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .modal-api-error .error-desc {
          font-size: 12.5px;
          color: #FCA5A5;
        }

        .spin-loader {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .modal-submit-btn {
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 50%, #FF5A36 100%);
          border: none;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(109, 61, 245, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          margin-top: 6px;
        }

        .modal-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.1);
          box-shadow: 0 12px 30px rgba(109, 61, 245, 0.65);
        }

        .modal-submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .modal-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          filter: grayscale(0.2);
        }

        .privacy-note {
          font-size: 11px;
          color: #64748B;
          text-align: center;
          margin: 0;
        }

        /* Success State */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 8px;
        }

        .success-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.15);
          border: 1px solid rgba(52, 211, 153, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34D399;
          box-shadow: 0 0 30px rgba(52, 211, 153, 0.4);
          margin-bottom: 16px;
        }

        .vip-ticket-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(109, 61, 245, 0.25);
          border: 1px solid #8B5CF6;
          color: #E2E8F0;
          margin-bottom: 12px;
        }

        .success-title {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 8px 0;
        }

        .success-subtitle {
          font-size: 14px;
          color: #94A3B8;
          margin: 0 0 18px 0;
        }

        .ticket-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 18px 36px;
          border-radius: 16px;
          background: rgba(109, 61, 245, 0.12);
          border: 1px dashed rgba(167, 139, 250, 0.5);
          margin-bottom: 20px;
        }

        .ticket-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #A78BFA;
        }

        .ticket-code {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          text-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
          margin: 4px 0;
        }

        .ticket-sub {
          font-size: 11px;
          color: #34D399;
          font-weight: 600;
        }

        .success-message {
          font-size: 13.5px;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0 0 24px 0;
          max-width: 440px;
        }

        .success-btn {
          width: 100%;
          max-width: 280px;
        }

        /* === Referral Share Section === */
        .referral-share-section {
          width: 100%;
          max-width: 480px;
          margin: 0 auto 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .referral-share-label {
          font-size: 13px;
          font-weight: 600;
          color: #C084FC;
          margin: 0;
          text-align: center;
          letter-spacing: 0.01em;
        }

        .referral-link-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          padding: 6px 6px 6px 14px;
          overflow: hidden;
        }

        .referral-link-display {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }

        .referral-link-text {
          font-size: 12.5px;
          color: #A5B4FC;
          font-family: var(--font-mono, monospace);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        .referral-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border-radius: 8px;
          background: rgba(109, 61, 245, 0.25);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: #C4B5FD;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .referral-copy-btn:hover {
          background: rgba(109, 61, 245, 0.45);
          color: #FFFFFF;
          transform: scale(1.03);
        }

        .referral-copy-btn.copied {
          background: rgba(52, 211, 153, 0.2);
          border-color: rgba(52, 211, 153, 0.5);
          color: #34D399;
        }

        .referral-share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 46px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(109, 61, 245, 0.3) 0%, rgba(52, 211, 153, 0.18) 100%);
          border: 1px solid rgba(139, 92, 246, 0.5);
          color: #E2E8F0;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .referral-share-btn:hover {
          background: linear-gradient(135deg, rgba(109, 61, 245, 0.5) 0%, rgba(52, 211, 153, 0.28) 100%);
          border-color: rgba(167, 139, 250, 0.7);
          color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(109, 61, 245, 0.4);
        }

        .referral-share-btn:active {
          transform: scale(0.97);
        }

        /* Share Dropdown (fallback for non-mobile) */
        .share-menu-dropdown {
          flex-direction: column;
          gap: 6px;
          background: rgba(17, 21, 44, 0.98);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(109, 61, 245, 0.25);
          animation: fadeInUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .share-menu-item {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid transparent;
          color: #E2E8F0;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .share-menu-item:hover {
          background: rgba(109, 61, 245, 0.2);
          border-color: rgba(139, 92, 246, 0.35);
          color: #FFFFFF;
          transform: translateX(3px);
        }

        @media (max-width: 640px) {
          .early-access-overlay {
            padding: 16px !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(3, 6, 15, 0.88) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            animation: overlayFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
          }

          .early-access-modal {
            max-width: 440px !important;
            width: 100% !important;
            max-height: 90vh !important;
            border-radius: 24px !important;
            border: 1px solid rgba(139, 92, 246, 0.45) !important;
            padding: 26px 18px 24px 18px !important;
            animation: modalFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(109, 61, 245, 0.3) !important;
            will-change: opacity, transform;
            transform: translateZ(0);
          }

          .modal-close-btn {
            top: 14px;
            right: 14px;
            width: 32px;
            height: 32px;
          }

          .modal-header {
            margin-bottom: 18px;
          }

          .vip-invite-banner {
            padding: 6px 12px;
            gap: 8px;
            margin-top: 10px;
          }

          .vip-invite-text {
            font-size: 11.5px;
          }

          .vip-invite-tag {
            font-size: 10px;
            padding: 2px 6px;
          }

          .form-row {
            flex-direction: column;
            gap: 14px;
          }

          .features-chip-grid {
            grid-template-columns: 1fr;
          }

          .platform-cards-grid {
            gap: 6px;
          }

          .platform-select-card {
            height: 46px;
            padding: 0 8px;
            gap: 6px;
          }

          .platform-card-logo {
            width: 16px;
            height: 16px;
          }

          .platform-name {
            font-size: 12px;
          }

          .platform-check-icon {
            display: none;
          }
        }
      `})]}):null};a.s(["default",0,function({children:a}){return(0,b.jsxs)("div",{className:"app-root",style:{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative"},children:[(0,b.jsx)(w,{}),(0,b.jsx)(x,{}),(0,b.jsx)(q,{}),(0,b.jsx)(E,{}),(0,b.jsx)(T,{}),(0,b.jsx)("main",{style:{flex:1},children:a}),(0,b.jsx)(v,{})]})}],48498)}];

//# sourceMappingURL=app_%28site%29_layout_tsx_0vgnhx-._.js.map