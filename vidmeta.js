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

var loaded =  false;

// while(!loaded){
//   console.log("loading")

//   try {
//   channelNameTag = document.getElementById("text").textContent; //for name
//   subscribeButton = document.getElementById("subscribe-button-shape").getElementsByTagName("span")[0].textContent;//for sub status
//   description = Array.from( document.getElementById("description-inner").getElementsByClassName("style-scope yt-formatted-string bold")).filter(el => el.textContent.includes("ago") )[0].textContent;// for livestream
  
//   loaded =
//     typeof(channelNameTag).startsWith("string") &&
//     typeof(subscribeButton).startsWith("string") &&
//     typeof(description).startsWith("string") && 
//     (channelNameTag.length >= 1) &&
//     (subscribeButton.length >= 1) &&
//     (description.length >= 1) ; 
//   }
//   catch{
//     loaded = false;
//   }

// }
// console.log("done")

function loadTheThing() {

  console.log("loading");

  try {
  channelNameTag = document.getElementById("text").textContent; //for name
  subscribeButton = document.getElementById("subscribe-button-shape").getElementsByTagName("span")[0].textContent;//for sub status
  description = Array.from( document.getElementById("description-inner").getElementsByClassName("style-scope yt-formatted-string bold")).filter(el => el.textContent.includes("ago") )[0].textContent;// for livestream
  
  loaded =
    typeof(channelNameTag).startsWith("string") &&
    typeof(subscribeButton).startsWith("string") &&
    typeof(description).startsWith("string") && 
    (channelNameTag.length >= 1) &&
    (subscribeButton.length >= 1) &&
    (description.length >= 1) ; 


    console.log(channelNameTag);
    console.log(subscribeButton);
    console.log(description); 
  }
  catch{
    console.log("Crashed!");

    loaded = false;
  }

  console.log("Loaded: "+loaded);
}

// Tab title addon
const titleSuffix = " ;; ytc:"+channelNameTag+" sbd:"+subscribeButton.endsWith("d")+" strm:"+description.includes("Stream");

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      if(!document.title.includes(titleSuffix))  {
        if(loaded){
          document.title = document.title + titleSuffix;
        }
        else {
          loadTheThing();
        }
      }
    } 
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);



// Start observing the target node for configured mutations
observer.observe(targetNode, config);


