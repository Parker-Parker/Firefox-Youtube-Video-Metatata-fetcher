// Select the node that will be observed for mutations
const targetNode = document.querySelector('title');;

// Options for the observer (which mutations to observe)
const config = {childList: true};

// Video length
var videoLengthSeconds = document.getElementsByTagName("video")[0].duration;

// get channel elements
var channelNameTag; //for name
var subscribeButton; //for sub status
var description; //for name

// Tab title addon
var titleSuffix;



function loadTheThing() {

  channelNameTag = document.getElementById("text").textContent; //for name
  subscribeButton = document.getElementById("subscribe-button-shape").getElementsByTagName("span")[0].textContent;//for sub status
  description = Array.from( document.getElementById("description-inner").getElementsByClassName("style-scope yt-formatted-string bold")).filter(el => el.textContent.includes("ago") )[0].textContent;// for livestream
  titleSuffix = ' ;; ytc:('+channelNameTag+") sbd:("+subscribeButton.endsWith("d")+") strm:("+description.includes("Stream")+")";
}

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      if(!document.title.includes(titleSuffix))  {
        loadTheThing();
        document.title = document.title + titleSuffix;
      }
    } 
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);



// Start observing the target node for configured mutations
observer.observe(targetNode, config);

