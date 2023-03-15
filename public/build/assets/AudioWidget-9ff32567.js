import{o as n,f as l,x as u,c,n as h}from"./app-ef8b40ee.js";import{_ as d}from"./_plugin-vue_export-helper-c27b6911.js";function p(o){return o?new Date(o*1e3).toISOString().substr(14,5):null}class m{constructor(e){this.bufferSize=e.bufferSize||4096,this.sampleRate=e.sampleRate,this.samples=e.samples}finish(){this._joinSamples();const e=new ArrayBuffer(44+this.samples.length*2),t=new DataView(e);this._writeString(t,0,"RIFF"),t.setUint32(4,36+this.samples.length*2,!0),this._writeString(t,8,"WAVE"),this._writeString(t,12,"fmt "),t.setUint32(16,16,!0),t.setUint16(20,1,!0),t.setUint16(22,1,!0),t.setUint32(24,this.sampleRate,!0),t.setUint32(28,this.sampleRate*4,!0),t.setUint16(32,4,!0),t.setUint16(34,16,!0),this._writeString(t,36,"data"),t.setUint32(40,this.samples.length*2,!0),this._floatTo16BitPCM(t,44,this.samples);const s=new Blob([t],{type:"audio/wav"});return{id:Date.now(),blob:s,url:URL.createObjectURL(s)}}_floatTo16BitPCM(e,t,s){for(let i=0;i<s.length;i++,t+=2){const r=Math.max(-1,Math.min(1,s[i]));e.setInt16(t,r<0?r*32768:r*32767,!0)}}_joinSamples(){const e=this.samples.length*this.bufferSize,t=new Float64Array(e);let s=0;for(let i=0;i<this.samples.length;i++){const r=this.samples[i];t.set(r,s),s+=r.length}this.samples=t}_writeString(e,t,s){for(let i=0;i<s.length;i++)e.setUint8(t+i,s.charCodeAt(i))}}class g{constructor(e={}){this.beforeRecording=e.beforeRecording,this.pauseRecording=e.pauseRecording,this.afterRecording=e.afterRecording,this.micFailed=e.micFailed,this.encoderOptions={bitRate:e.bitRate,sampleRate:e.sampleRate},this.bufferSize=4096,this.records=[],this.isPause=!1,this.isRecording=!1,this.duration=0,this.volume=0,this.wavSamples=[],this._duration=0}start(){const e={video:!1,audio:{channelCount:1,echoCancellation:!1}};this.beforeRecording&&this.beforeRecording("start recording"),navigator.mediaDevices.getUserMedia(e).then(this._micCaptured.bind(this)).catch(this._micError.bind(this)),this.isPause=!1,this.isRecording=!0}stop(){this.stream.getTracks().forEach(s=>s.stop()),this.input.disconnect(),this.processor.disconnect(),this.context.close();let e=null;e=new m({bufferSize:this.bufferSize,sampleRate:this.encoderOptions.sampleRate,samples:this.wavSamples}).finish(),this.wavSamples=[],e.duration=p(this.duration),this.records.push(e),this._duration=0,this.duration=0,this.isPause=!1,this.isRecording=!1,this.afterRecording&&this.afterRecording(e)}pause(){this.stream.getTracks().forEach(e=>e.stop()),this.input.disconnect(),this.processor.disconnect(),this._duration=this.duration,this.isPause=!0,this.pauseRecording&&this.pauseRecording("pause recording")}recordList(){return this.records}lastRecord(){return this.records.slice(-1).pop()}_micCaptured(e){this.context=new(window.AudioContext||window.webkitAudioContext),this.duration=this._duration,this.input=this.context.createMediaStreamSource(e),this.processor=this.context.createScriptProcessor(this.bufferSize,1,1),this.stream=e,this.processor.onaudioprocess=t=>{const s=t.inputBuffer.getChannelData(0);let i=0;this.wavSamples.push(new Float32Array(s));for(let r=0;r<s.length;++r)i+=s[r]*s[r];this.duration=parseFloat(this._duration)+parseFloat(this.context.currentTime.toFixed(2)),this.volume=Math.sqrt(i/s.length).toFixed(2)},this.input.connect(this.processor),this.processor.connect(this.context.destination)}_micError(e){this.micFailed&&this.micFailed(e)}}const f={props:{name:{type:String}},data(){return{icons:{download:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>',mic:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',save:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',stop:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="#none"/></svg>'}}}},v=["innerHTML"];function w(o,e,t,s,i,r){return n(),l("div",{innerHTML:i.icons[t.name]},null,8,v)}const R=d(f,[["render",w],["__file","/home/geekr/Development/github/freechat/resources/js/Components/IconButton.vue"]]),b="无法使用麦克风，请确保具备硬件条件以及授权应用使用你的麦克风",_="体验版目前仅支持30秒以内语音, 请重试",M="录音数据为空, 点击小话筒->开始讲话->讲完点终止键，再来一次吧",x={name:"AudioWidget",props:{time:{type:Number,default:30},bitRate:{type:Number,default:128},sampleRate:{type:Number,default:44100}},components:{IconButton:R},data(){return{recording:!1,recordedAudio:null,recordedBlob:null,recorder:null,errorMessage:null}},computed:{buttonClass(){return"flex items-center justify-center px-4 py-2 border border-green-600 hover:border-green-700 text-white rounded-md text-sm md:text-base cursor-pointer"}},beforeUnmount(){this.recording&&this.stopRecorder()},methods:{toggleRecording(){this.recording=!this.recording,this.recording?this.initRecorder():this.stopRecording()},initRecorder(){this.recorder=new g({micFailed:this.micFailed,bitRate:this.bitRate,sampleRate:this.sampleRate}),this.recorder.start(),this.errorMessage=null},stopRecording(){this.recorder.stop();const o=this.recorder.recordList();if(this.recordedAudio=o[0].url,this.recordedBlob=o[0].blob,this.recordedAudio&&this.recordedBlob){if(this.recorder.duration>this.time){this.errorMessage=_,this.$emit("audio-failed",this.errorMessage);return}if(!this.recordedBlob){this.errorMessage=M,this.$emit("audio-failed",this.errorMessage);return}this.$emit("audio-upload",this.recordedBlob)}},micFailed(){this.recording=!1,this.errorMessage=b,this.$emit("audio-failed",this.errorMessage)}}};function S(o,e,t,s,i,r){const a=u("icon-button");return n(),l("div",null,[i.recording?(n(),c(a,{key:0,class:h(r.buttonClass),name:"stop",onClick:r.toggleRecording,title:"结束&发送语音"},null,8,["class","onClick"])):(n(),c(a,{key:1,class:h(r.buttonClass),name:"mic",onClick:r.toggleRecording,title:"录制语音"},null,8,["class","onClick"]))])}const C=d(x,[["render",S],["__file","/home/geekr/Development/github/freechat/resources/js/Components/AudioWidget.vue"]]);export{C as A};