// Select the node that will be observed for mutations
const targetNode = document.querySelector('title');;

// Options for the observer (which mutations to observe)
const config = {childList: true};

// Video Title
const initialTitle = document.title;

// Video length
var videoLengthSeconds = document.getElementsByTagName("video")[0].duration;

// get channel elements
var channelNameTag; //for name
var subscribeButton; //for sub status
var description; //for name


// channelNameTag = document.getElementById("upload-info"); //for name
// subscribeButton = document.getElementById("upload-info");//for sub status
// description = document.getElementById("info");//for name
// channelNameTag = document.getElementById("text"); //for name
channelNameTag = document.getElementById("text").textContent; //for name
subscribeButton = document.getElementById("subscribe-button-shape").getElementsByTagName("span")[0].textContent;//for sub status
description = Array.from( document.getElementById("description-inner").getElementsByClassName("style-scope yt-formatted-string bold")).filter(el => el.textContent.includes("ago") )[0].textContent;// for livestream

// Array.from(document.getElementById("description-inner").getElementsByTagName("span")).filter( (el)=>{return el.id === ""}  );

const pad = (number) => {
    let retstr = number+"";
    if(retstr.length<2){
        retstr = "0"+retstr;
    }
    return retstr;
};

const makeDurationString = (seconds) => {
    const secR = Math.round(seconds);
    secs = Math.floor(secR)%60;
    mins = Math.floor(secR/60)%(60);
    hrs  = Math.floor(secR/(60*60));
    len  =  (secR<60)       ? (secs+"").length   : 
            (secR<(60*60))  ? (mins+"").length+2 : 
                               (hrs+"").length+4 ;
    
    return ("_"+len+" "+hrs+":"+pad(mins)+":"+pad(secs)+" ");
};

// Tab title
const finalTitle = makeDurationString(videoLengthSeconds)+initialTitle;

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      if(!document.title.startsWith("_"))  {
        document.title = finalTitle;
      }
    } 
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);



// Start observing the target node for configured mutations
observer.observe(targetNode, config);


