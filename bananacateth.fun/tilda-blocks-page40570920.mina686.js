window.isMobile=!1;if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){window.isMobile=!0}
function t_throttle(fn,threshhold,scope){var last;var deferTimer;threshhold||(threshhold=250);return function(){var context=scope||this;var now=+new Date();var args=arguments;if(last&&now<last+threshhold){clearTimeout(deferTimer);deferTimer=setTimeout(function(){last=now;fn.apply(context,args)},threshhold)}else{last=now;fn.apply(context,args)}}}
function t826_init(recid){var rec=document.querySelector('#rec'+recid);if(!rec)return;var wrapper=rec.querySelector('.t826');t826_startAnimation(recid);if(!window.isMobile){window.addEventListener('resize',t_throttle(function(){t826_prepareAnimation(recid)}))}
if(window.isMobile){window.addEventListener('orientationchange',function(){t826_prepareAnimation(recid)})}
wrapper.addEventListener('displayChanged',function(){t826_prepareAnimation(recid)})}
function t826_prepareAnimation(recid){var galaxyList=document.querySelectorAll('div:not(.t826__animation) > div[data-galaxy-id="'+recid+'"]');Array.prototype.forEach.call(galaxyList,function(galaxy){if(galaxy&&galaxy.parentNode!==null){galaxy.parentNode.removeChild(galaxy)}});t826_startAnimation(recid)}
function t826_startAnimation(recid){var rec=document.querySelector('#rec'+recid);if(!rec)return;var wrapper=rec.querySelector('.t826');if(!wrapper)return;var galaxy=rec.querySelector('.t826__galaxy');if(!galaxy)return;var allRecords=document.querySelector('#allrecords');var recIds=wrapper.getAttribute('data-galaxy-rec-ids');var wholePage=wrapper.getAttribute('data-galaxy-whole-page');var verticalFlip=wrapper.getAttribute('data-galaxy-vflip');var color=wrapper.getAttribute('data-element-color');var opacity=wrapper.getAttribute('data-element-opacity');var options={'color':(!color?'#fff':color),'opacity':(!opacity?1:opacity.replace(/^0?.([0-9])0?$/g,'.$1'))};if(options.color.indexOf('#')!==-1){var color=options.color;if(color[1]===color[2]&&color[3]===color[4]&&color[5]===color[6]){options.color='#'+color[1]+color[3]+color[5]}}
if(verticalFlip==='yes'){galaxy.classList.add('t826__galaxy_flip')}
if(allRecords.getAttribute('data-tilda-mode')==='edit'){var wrapper=rec.querySelector('.t826__demo');wrapper.insertAdjacentElement('beforeend',galaxy);wrapper.style.position='relative';t826_runningAnimation(wrapper,options);return}
if(recIds){recIds=recIds.split(',');recIds.forEach(function(rec){var currentRec=document.querySelector('#rec'+rec);var currentGalaxy=galaxy.cloneNode(!0);currentGalaxy.style.position='absolute';t826_addAnimation(currentRec,currentGalaxy,options)})}else{var nextBlock;if(rec.nextElementSibling&&rec.nextElementSibling.querySelector('.t-cover')){nextBlock=rec.nextElementSibling}
var prevBlock;if(rec.previousElementSibling&&rec.previousElementSibling.querySelector('.t-cover')){prevBlock=rec.previousElementSibling}
var currentGalaxy=galaxy.cloneNode(!0);if(currentGalaxy)currentGalaxy.style.position='absolute';if(nextBlock){t826_addAnimation(nextBlock,currentGalaxy,options)}else if(prevBlock){t826_addAnimation(prevBlock,currentGalaxy,options)}}
if(wholePage==='yes'){var animationWrapper=rec.querySelector('.t826__animation');animationWrapper.style.display='block';galaxy.style.position='fixed';t826_addAnimation(allRecords,galaxy,options)}}
function t826_addAnimation(currentRec,galaxy,options){if(!currentRec)return;currentRec.setAttribute('data-animationappear','off');currentRec.classList.remove('r_hidden');var currentRecType=currentRec.getAttribute('data-record-type');var currentRecId=currentRec.getAttribute('id');if(currentRecType==='396'){var filter=currentRec.querySelector('.t396__filter');filter.insertAdjacentElement('afterend',galaxy);galaxy.style.zIndex='0'}else if(currentRecId==='allrecords'){galaxy.style.zIndex='-1'}else{var coverWrapper=currentRec.querySelector('.t-cover');if(coverWrapper){var filter=coverWrapper.querySelector('.t-cover__filter');filter.insertAdjacentElement('afterend',galaxy);galaxy.style.zIndex='0'}else{var wrapper=currentRec;if(wrapper.length===0){return!0}
wrapper.appendChild(galaxy);wrapper.style.position='relative';var excludesAboutBlocks=[480,478,477];var recordType=wrapper.getAttribute('data-record-type');var isBlockExclude=excludesAboutBlocks.some(function(block){return Number(recordType)===block});var firstChildDiv;if(isBlockExclude){firstChildDiv=wrapper.querySelector('.t'+recordType)}else{firstChildDiv=wrapper.querySelector('div')}
firstChildDiv.style.position='relative';firstChildDiv.style.zIndex='1';if(currentRecType=='734'||currentRecType=='675'||currentRecType=='215'){return}
var excludesBlocks=[754,776,778,786,770];if(excludesBlocks.indexOf(parseInt(currentRecType,10))!==-1){var firstChildDiv=wrapper.querySelector('div');firstChildDiv.style.zIndex='';galaxy.style.zIndex='-1'}else{galaxy.style.zIndex='0'}}}
t826_runningAnimation(currentRec,options)}
function t826_runningAnimation(currentRec,options){var starsSetting;if(window.isMobile){starsSetting=[{name:'near',count:25,speed:50},{name:'mid',count:50,speed:100},{name:'far',count:175,speed:150}]}else{starsSetting=[{name:'near',count:100,speed:50},{name:'mid',count:200,speed:100},{name:'far',count:700,speed:150}]}
var currentRecId=currentRec.getAttribute('id');var maxHeight=currentRec.offsetHeight;var maxWidth=currentRec.offsetWidth;if(typeof currentRecId==='undefined'){currentRecId='demo'}else if(currentRecId==='allrecords'){maxHeight=window.innerHeight;maxWidth=window.innerWidth}
var animationName='t826__galaxy-'+currentRecId;var animation=currentRec.querySelector('#'+animationName);if(animation&&animation.parentNode!==null){animation.parentNode.removeChild(animation)}
var newStyle=document.createElement('style');newStyle.id=animationName;newStyle.innerHTML='@keyframes '+animationName+'{'+'to{'+'transform:translateY('+(-maxHeight)+'px)'+'}'+'}';starsSetting.forEach(function(value,index,array){var x=Math.round(Math.random()*maxHeight);var y=Math.round(Math.random()*maxWidth);var dot='';if(options.color.indexOf('#')!==-1){dot=x+'px '+y+'px'}else if(options.opacity<1){dot=x+'px '+y+'px rgba('+options.color+','+options.opacity+')'}else{dot=x+'px '+y+'px rgb('+options.color+')'}
var countDots=Math.round(array[index].count*maxHeight/2000);for(var i=0;i<countDots;i++){var x=Math.round(Math.random()*maxWidth);var y=Math.round(Math.random()*maxHeight);if(options.color.indexOf('#')!==-1){dot+=', '+x+'px '+y+'px';dot+=', '+x+'px '+(y+maxHeight)+'px'}else if(options.opacity<1){dot+=', '+x+'px '+y+'px rgba('+options.color+','+options.opacity+')';dot+=', '+x+'px '+(y+maxHeight)+'px rgba('+options.color+','+options.opacity+')'}else{dot+=', '+x+'px '+y+'px rgb('+options.color+')';dot+=', '+x+'px '+(y+maxHeight)+'px rgb('+options.color+')'}}
var animationDuration=Math.round(array[index].speed*maxHeight/2000);var className='t826__galaxy-'+array[index].name+'-'+currentRecId;newStyle.innerHTML+='.'+className+':after, .'+className+'{'+'box-shadow:'+dot+';'+'animation-duration:'+animationDuration+'s;'+'animation-name:'+animationName+';'+(options.color.indexOf('#')!==-1?'color:'+options.color+';':'')+(options.color.indexOf('#')!==-1&&options.opacity<1?'opacity:'+options.opacity:'')+'}'+'.'+className+':after{'+"content:' ';"+'position:absolute;'+'top:'+maxHeight+'px'+'}';var galaxies=currentRec.querySelectorAll('.t826__galaxy > .t826__galaxy-wrapper > .t826__galaxy-'+array[index].name);Array.prototype.forEach.call(galaxies,function(galaxy){galaxy.classList.add(className)})});currentRec.insertAdjacentElement('afterbegin',newStyle);var galaxyWrappers=currentRec.querySelectorAll('.t826__galaxy > .t826__galaxy-wrapper');Array.prototype.forEach.call(galaxyWrappers,function(galaxy){galaxy.style.animationName='t826__galaxy-fadeIn'})}