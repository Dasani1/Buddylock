const blockedSites = ["facebook.com", "instagram.com", "youtube.com"];
let safe_mode = 10
const Safe = setInterval(() => {
  safe_mode--;




if (safe_mode <= 0) {
  clearInterval(Safe);
  let original = window.location.href
// Check if current page matches any blocked site
blockedSites.forEach(site => {
  if (window.location.hostname.includes(site)) {
    let place = original;


    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.runtime.getURL("blocker.css");  // Path to your CSS file


    // Append the <link> element to the <head>
    document.head.appendChild(link);

    //getting breathing gif
    const gifUrl = chrome.runtime.getURL("424-breathing.gif");


    // Block the site by injecting a custom message
    document.body.innerHTML = `
      <div>
        <h1 style="color:white; text-align:center;">Access to this site is blocked! You'll get access in <span id="timer"></span> seconds</h1>
        
      </div>`
    ;
    let countdown = 30;
    const timerElement = document.getElementById("timer")


    const Countdown = setInterval(() => {
      countdown--;
      timerElement.textContent = countdown;


      if (countdown <= 0){
        clearInterval(Countdown);
        window.location.href = place;


            }
           } , 1000);
         }
        });
      }
}, 1000);

