(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7499:function(e,t,n){Promise.resolve().then(n.bind(n,2060))},2060:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return R}});var r=n(7437),a=n(2265),l=n(9931),u=n(7053),c=n(1794),s=n(4605),o=n(1971),i=n(6776),g=n(8709);let d={mapId:"7057886e21226ff7",center:{lat:43.64916,lng:-79.37789000000001},zoom:18,heading:40,tilt:65,disableDefaultUI:!0},f=[{lat:43.64916,lng:-79.37789000000001},{lat:43.647850000000005,lng:-79.37735},{lat:43.64705,lng:-79.37702},{lat:43.646930000000005,lng:-79.37698},{lat:43.646950000000004,lng:-79.37683000000001},{lat:43.64705,lng:-79.37661},{lat:43.64716000000001,lng:-79.3764},{lat:43.647470000000006,lng:-79.37576},{lat:43.64732,lng:-79.37570000000001},{lat:43.647090000000006,lng:-79.3756},{lat:43.646890000000006,lng:-79.3755},{lat:43.646980000000006,lng:-79.37530000000001},{lat:43.64715,lng:-79.37494000000001}],w=new u.Pa4(0,1,0);function p(){let[e,t]=(0,a.useState)(),n=a.useRef(null);return(0,a.useEffect)(()=>{n.current&&t(new window.google.maps.Map(n.current,d))},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{ref:n,id:"map"}),e&&(0,r.jsx)(h,{map:e})]})}function h(e){let{map:t}=e,n=(0,a.useRef)(),r=(0,a.useRef)(),l=(0,a.useRef)(),s=(0,a.useRef)(),p=(0,a.useRef)(),h=new u.Pa4;return(0,a.useEffect)(()=>{if(n.current)return;n.current=new c.Z(d.center),n.current.setMap(t);let e=n.current.scene,a=f.map(e=>n.current.latLngAltToVector3(e)),A=new u.YT8(a,!0,"catmullrom",.2);A.updateArcLengths(),p.current||(p.current=function(e){let t=10*e.points.length,n=e.getSpacedPoints(t),r=new Float32Array(3*t);for(let e=0;e<t;e++)n[e].toArray(r,3*e);let a=new o.w(new i.L,new g.Y({color:13408512,linewidth:8}));return a.geometry.setPositions(r),a}(A),e.add(p.current)),r.current||P().then(t=>{r.current=t,e.add(r.current),n.current.requestRedraw()}),l.current||m().then(t=>{l.current=t,e.add(l.current),n.current.requestRedraw()}),s.current||y().then(t=>{s.current=t,e.add(s.current),n.current.requestRedraw()}),n.current.update=()=>{var e;if(null==p||null===(e=p.current)||void 0===e||e.material.resolution.copy(n.current.getViewportSize()),r.current){let e=performance.now()%28e3/28e3;A.getPointAt(e,r.current.position),A.getTangentAt(e,h),r.current.quaternion.setFromUnitVectors(w,h),n.current.requestRedraw()}}},[]),null}async function m(){let e=(await new s.E().loadAsync("https://good-series.com/3D-City/tree.glb")).scene;return e&&(e.scale.setScalar(3),e.rotation.set(Math.PI/2,0,Math.PI,"ZXY"),e.position.setY(10)),e}async function y(){let e=(await new s.E().loadAsync("https://good-series.com/3D-City/boy.glb")).scene;return e&&(e.scale.setScalar(8),e.rotation.set(Math.PI/2,0,Math.PI,"ZXY"),e.position.setX(10)),e}async function P(){let e=(await new s.E().loadAsync("https://good-series.com/3D-City/taxi.gltf")).scene,t=e.getObjectByName("Car_Rig");return t&&(t.scale.setScalar(3),t.rotation.set(Math.PI/2,0,Math.PI,"ZXY")),e}var A=n(357);function R(){return(0,r.jsx)(l.Wrapper,{language:"en",region:"CA",apiKey:A.env.GOOGLEMAP_API_KEY||"",children:(0,r.jsx)(p,{})})}}},function(e){e.O(0,[689,492,971,23,744],function(){return e(e.s=7499)}),_N_E=e.O()}]);