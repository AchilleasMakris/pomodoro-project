document.addEventListener("DOMContentLoaded", function () {
  var spotifyLoginBtn = document.getElementById("spotifyLoginBtn");

  // Check if the user has already closed the popup
  var isPopupClosed = localStorage.getItem("popupClosed");

  if (isPopupClosed === "true") {
    spotifyLoginBtn.style.display = "none"; // Hide the button if the popup was closed
  }

  spotifyLoginBtn.addEventListener("click", function () {
    var popup = window.open(
      "https://accounts.spotify.com/login",
      "Spotify Login",
      "width=500,height=600"
    );

    // Check if the popup window is closed
    var timer = setInterval(function () {
      if (popup.closed) {
        clearInterval(timer);
        spotifyLoginBtn.style.display = "none"; // Hide the button
        localStorage.setItem("popupClosed", "true"); // Store the state in localStorage
      }
    }, 1000);
  });
});
