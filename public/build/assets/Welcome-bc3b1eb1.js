import{o as a,f as l,x as M,c as _,n as g,v as C,y as B,a as f,w as z,u,X as A,b as s,F as v,z as F,t as w,g as x,i as L,A as E,e as U,d as b,B as R,O as H}from"./app-aef8cdf5.js";import{_ as S}from"./_plugin-vue_export-helper-c27b6911.js";function T(n){return n?new Date(n*1e3).toISOString().substr(14,5):null}class V{constructor(t){this.bufferSize=t.bufferSize||4096,this.sampleRate=t.sampleRate,this.samples=t.samples}finish(){this._joinSamples();const t=new ArrayBuffer(44+this.samples.length*2),e=new DataView(t);this._writeString(e,0,"RIFF"),e.setUint32(4,36+this.samples.length*2,!0),this._writeString(e,8,"WAVE"),this._writeString(e,12,"fmt "),e.setUint32(16,16,!0),e.setUint16(20,1,!0),e.setUint16(22,1,!0),e.setUint32(24,this.sampleRate,!0),e.setUint32(28,this.sampleRate*4,!0),e.setUint16(32,4,!0),e.setUint16(34,16,!0),this._writeString(e,36,"data"),e.setUint32(40,this.samples.length*2,!0),this._floatTo16BitPCM(e,44,this.samples);const r=new Blob([e],{type:"audio/wav"});return{id:Date.now(),blob:r,url:URL.createObjectURL(r)}}_floatTo16BitPCM(t,e,r){for(let o=0;o<r.length;o++,e+=2){const i=Math.max(-1,Math.min(1,r[o]));t.setInt16(e,i<0?i*32768:i*32767,!0)}}_joinSamples(){const t=this.samples.length*this.bufferSize,e=new Float64Array(t);let r=0;for(let o=0;o<this.samples.length;o++){const i=this.samples[o];e.set(i,r),r+=i.length}this.samples=e}_writeString(t,e,r){for(let o=0;o<r.length;o++)t.setUint8(e+o,r.charCodeAt(o))}}class O{constructor(t={}){this.beforeRecording=t.beforeRecording,this.pauseRecording=t.pauseRecording,this.afterRecording=t.afterRecording,this.micFailed=t.micFailed,this.encoderOptions={bitRate:t.bitRate,sampleRate:t.sampleRate},this.bufferSize=4096,this.records=[],this.isPause=!1,this.isRecording=!1,this.duration=0,this.volume=0,this.wavSamples=[],this._duration=0}start(){const t={video:!1,audio:{channelCount:1,echoCancellation:!1}};this.beforeRecording&&this.beforeRecording("start recording"),navigator.mediaDevices.getUserMedia(t).then(this._micCaptured.bind(this)).catch(this._micError.bind(this)),this.isPause=!1,this.isRecording=!0}stop(){this.stream.getTracks().forEach(r=>r.stop()),this.input.disconnect(),this.processor.disconnect(),this.context.close();let t=null;t=new V({bufferSize:this.bufferSize,sampleRate:this.encoderOptions.sampleRate,samples:this.wavSamples}).finish(),this.wavSamples=[],t.duration=T(this.duration),this.records.push(t),this._duration=0,this.duration=0,this.isPause=!1,this.isRecording=!1,this.afterRecording&&this.afterRecording(t)}pause(){this.stream.getTracks().forEach(t=>t.stop()),this.input.disconnect(),this.processor.disconnect(),this._duration=this.duration,this.isPause=!0,this.pauseRecording&&this.pauseRecording("pause recording")}recordList(){return this.records}lastRecord(){return this.records.slice(-1).pop()}_micCaptured(t){this.context=new(window.AudioContext||window.webkitAudioContext),this.duration=this._duration,this.input=this.context.createMediaStreamSource(t),this.processor=this.context.createScriptProcessor(this.bufferSize,1,1),this.stream=t,this.processor.onaudioprocess=e=>{const r=e.inputBuffer.getChannelData(0);let o=0;this.wavSamples.push(new Float32Array(r));for(let i=0;i<r.length;++i)o+=r[i]*r[i];this.duration=parseFloat(this._duration)+parseFloat(this.context.currentTime.toFixed(2)),this.volume=Math.sqrt(o/r.length).toFixed(2)},this.input.connect(this.processor),this.processor.connect(this.context.destination)}_micError(t){this.micFailed&&this.micFailed(t)}}const j={props:{name:{type:String}},data(){return{icons:{download:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>',mic:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',save:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',stop:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="#none"/></svg>'}}}},G=["innerHTML"];function D(n,t,e,r,o,i){return a(),l("div",{innerHTML:o.icons[e.name]},null,8,G)}const P=S(j,[["render",D]]),$="无法使用麦克风，请确保具备硬件条件以及授权应用使用你的麦克风",N="体验版目前仅支持30秒以内语音, 请重试",I="录音数据为空, 点击小话筒->开始讲话->讲完点终止键，再来一次吧",W={name:"AudioWidget",props:{time:{type:Number,default:30},bitRate:{type:Number,default:128},sampleRate:{type:Number,default:44100}},components:{IconButton:P},data(){return{recording:!1,recordedAudio:null,recordedBlob:null,recorder:null,errorMessage:null}},computed:{buttonClass(){return"absolute right-0 top-0 h-full flex items-center justify-center mx-auto px-2 py-2 fill-current rounded-md text-sm cursor-pointer"}},beforeUnmount(){this.recording&&this.stopRecorder()},methods:{toggleRecording(){this.recording=!this.recording,this.recording?this.initRecorder():this.stopRecording()},initRecorder(){this.recorder=new O({micFailed:this.micFailed,bitRate:this.bitRate,sampleRate:this.sampleRate}),this.recorder.start(),this.errorMessage=null},stopRecording(){this.recorder.stop();const n=this.recorder.recordList();if(this.recordedAudio=n[0].url,this.recordedBlob=n[0].blob,this.recordedAudio&&this.recordedBlob){if(this.recorder.duration>this.time){this.errorMessage=N,this.$emit("audio-failed",this.errorMessage);return}if(!this.recordedBlob){this.errorMessage=I,this.$emit("audio-failed",this.errorMessage);return}this.$emit("audio-upload",this.recordedBlob)}},micFailed(){this.recording=!1,this.errorMessage=$,this.$emit("audio-failed",this.errorMessage)}}};function q(n,t,e,r,o,i){const m=M("icon-button");return a(),l("div",null,[o.recording?(a(),_(m,{key:0,class:g(i.buttonClass),name:"stop",onClick:i.toggleRecording},null,8,["class","onClick"])):(a(),_(m,{key:1,class:g(i.buttonClass),name:"mic",onClick:i.toggleRecording},null,8,["class","onClick"]))])}const X=S(W,[["render",q]]),J=s("link",{rel:"shortcut icon",type:"image/png",href:"https://image.gstatics.cn/icon/geekchat.png"},null,-1),K={class:"flex flex-col space-y-4 p-4"},Q={class:"ml-4"},Y={class:"text-lg"},Z={key:0,href:"#",class:"font-medium text-gray-900"},ee={key:1,href:"#",class:"font-medium text-gray-900"},te={class:"mt-1"},se={class:"text-gray-600"},re=s("div",{id:"msg-anchor"},null,-1),oe={key:0,class:"flex rounded-lg p-4 bg-green-200 flex-reverse'"},ie={class:"ml-4"},ne={class:"mt-1"},ae={class:"text-gray-500"},ce={key:1,class:"flex rounded-lg p-4 bg-red-400 flex-reverse'"},le={class:"ml-4"},de={class:"mt-1"},he={class:"text-gray-100"},ue=["onSubmit"],me={class:"relative w-full"},pe=["disabled"],ge=s("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"})],-1),fe=[ge],_e=s("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})],-1),ve=[_e],we=s("footer",{class:"text-center sm:text-left"},[s("div",{class:"p-4 text-center text-neutral-700"},[b(" GeekChat 是一个小而美的免费体验版 ChatGPT，由 "),s("a",{href:"https://geekr.dev",target:"_blank",class:"text-neutral-800 dark:text-neutral-400"},"极客书房"),b(" 开发，支持文字语音聊天咨询。 ")])],-1),Re={__name:"Welcome",props:{canLogin:Boolean,canRegister:Boolean,messages:Array},setup(n){const t=C({prompt:""}),e=B({error:"",toast:""}),r=()=>{t.post(route("chat"),{onStart:()=>{e.error="",t.reset(),e.toast="GeekChat正在思考如何回答您的问题，请稍候..."},onFinish:c=>{c.status>=400&&(c.status==429?e.error="请求过于频繁，请稍后再试":e.error="请求处理失败，请重试"),e.toast="",i()}})},o=()=>{R.get(route("reset")).then(c=>{H.reload()})},i=()=>{document.querySelector("#msg-anchor").scrollIntoView({behavior:"smooth"})},m=c=>{const d=new FormData;d.append("audio",c),e.error="",e.toast="GeekChat正在识别语音并思考如何回答您的问题，请稍候...",R.post(route("audio"),d).then(p=>{e.toast="",location.reload(),i()}).catch(p=>{e.toast="",p.includes("429")?e.error="请求过于频繁，请稍后再试":e.error="处理语音失败，可能没录音成功（按下话筒图标->开始讲话->讲完按下终止图标，操作不要太快），再来一次试试吧",i()})},y=c=>{e.error=c,e.toast=""};return(c,d)=>{const p=M("markdown");return a(),l(v,null,[f(u(A),{title:"GeekChat - ChatGPT免费体验版"},{default:z(()=>[J]),_:1}),s("div",K,[(a(!0),l(v,null,F(n.messages,(h,k)=>(a(),l("div",{key:k,class:g([h.role=="assistant"?"flex rounded-lg p-4 bg-green-200 flex-reverse":"flex rounded-lg p-4 bg-blue-200"])},[s("div",Q,[s("div",Y,[h.role=="assistant"?(a(),l("a",Z,"GeekChat")):(a(),l("a",ee,"你"))]),s("div",te,[s("p",se,[f(p,{source:h.content},null,8,["source"])])])])],2))),128)),re,e.toast?(a(),l("div",oe,[s("div",ie,[s("div",ne,[s("p",ae,w(e.toast),1)])])])):x("",!0),e.error?(a(),l("div",ce,[s("div",le,[s("div",de,[s("p",he,w(e.error),1)])])])):x("",!0)]),s("form",{class:"p-4 flex space-x-4 justify-center items-center",onSubmit:U(r,["prevent"])},[s("div",me,[L(s("input",{id:"message",placeholder:"输入你的问题...",type:"text",name:"prompt",autocomplete:"off","onUpdate:modelValue":d[0]||(d[0]=h=>u(t).prompt=h),class:"w-full first-letter:border rounded-md p-2 flex-1",required:""},null,512),[[E,u(t).prompt]]),f(X,{onAudioUpload:m,onAudioFailed:y})]),s("button",{class:g({"flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm md:text-base":!0,"opacity-25":u(t).processing}),disabled:u(t).processing,type:"submit"},fe,10,pe),s("button",{class:"flex items-center justify-center px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md text-sm md:text-base",onClick:o},ve)],40,ue),we],64)}}};export{Re as default};
