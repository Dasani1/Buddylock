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

    // Block the site by injecting a custom message
    document.body.innerHTML = `
      <div>
        <h1>Access to this site is blocked!</h1>
      </div>
    `;
  }
});

