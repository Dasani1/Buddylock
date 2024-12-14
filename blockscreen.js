// List of blocked websites
const blockedSites = ["facebook.com", "instagram.com", "youtube.com"];

// Check if current page matches any blocked site
blockedSites.forEach(site => {
  if (window.location.hostname.includes(site)) {

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.runtime.getURL("blocker.css");  // Path to your CSS file

    // Append the <link> element to the <head>
    document.head.appendChild(link);

    //storing og link
    const originalUrl = window.location.href;

    //list of html prompt pages
    const promptpages = ["breathing.html", "elevator.html"];

    //block the site by injecting one of the prompts html into it
    loadHtmlFile(getRandomElement(promptpages, 30000));


    // Block the site by injecting a custom message
    document.body.innerHTML = `
      <div>
        <h1>Access to this site is blocked!</h1>
      </div>
    `;
  }
});

//gets random prompt from the list
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

//loads new prompt html into the blacklisted webpage for 30 seconds before redirecting to the url again. 
function loadHtmlFile(file, delayInMilliseconds) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Failed to load the HTML file");
        return response.text();
      })
      .then(htmlContent => {
        document.getElementById("content").innerHTML = htmlContent;
        setTimeout(() => {
            document.body.innerHTML = originalContent; // Restore original content
          }, delayInMilliseconds);
      })
      .catch(error => console.error("Error:", error));
  }

  
//save the og webpage so it can change back, loads the new prompt for 30 seconds
function replaceHtmlTemporarily(newHtmlFile, delayInMilliseconds) {
    // saving the original content
    const originalContent = document.body.innerHTML;
     // Load and replace with new HTML content
  fetch(newHtmlFile)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load the HTML file");
    }
    return response.text(); // Get the HTML content
  })
  .then(htmlContent => {
    document.body.innerHTML = htmlContent; // Replace with new content

    // After the specified delay, restore the original content
    setTimeout(() => {
      document.body.innerHTML = originalContent; // Restore original content
    }, delayInMilliseconds);
  })
  .catch(error => console.error("Error:", error));
}
 