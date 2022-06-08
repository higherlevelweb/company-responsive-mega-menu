// ** main.js - JavaScript Page Functions ** //

// Back to Top Functionality
// Get the button
var backToTopButton = document.getElementById("back-to-top");

// Function for when the user scrolls down a certain distance from the top of the document, to show the back-to-button
window.addEventListener('scroll', throttle(scrollFunction, 100));

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Function for when the user clicks on the back-to-top button, scroll to the top of the document
function backToTopFunction() {
    setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, 100); // Slight millisecond delay when user clicks back-to-top
}

// Feedback modal functionality
// Get the modal
var feedBackModal = document.getElementById("feedback-modal");
// Get the button that opens the feedBackModal
var feedBackTab = document.getElementById("feedback-tab");
// Get the <span> element that closes the feedBackModal
var feedBackSpan = document.getElementsByClassName("close")[0];

// Function to bring up feedback model display
setTimeout(() => {
    let element = document.getElementById('feedback-tab');
    let elementRect = element.getBoundingClientRect();
    let newHeight = Math.ceil(elementRect.height) % 2 === 0 ? Math.ceil(elementRect.height) : Math.ceil(elementRect.height) + 1;
    element['style'].height = newHeight.toString() + "px";
    element['style'].maxHeight = newHeight.toString() + "px";
    element['style'].top = "440px";
    element['style'].opacity = "1";
}, 300); // Give the feedBackModal some time to finish animating

// When the user clicks the button, open the feedBackModal 
feedBackTab.onclick = function () {
    setTimeout(() => {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        feedBackModal.style.position = "fixed";
        feedBackModal.style.display = "block";
    }, 100); // Give the feedBackModal some time to finish animating
}

// When the user clicks on <span> (x), close the feedBackModal
feedBackSpan.onclick = function () {
    feedBackModal.style.display = "none";
    document.body.style.overflow = "auto";
}
// End of feedback feedBackModal functionality

// Function to close feedBackModal and/or responsive menu (by removing class attribute), if the user clicks anywhere outside of the modal or responsive menu (if either open), close it
document.addEventListener("click", function(event) {
    if (event.target == feedBackModal) {
        feedBackModal.style.display = "none";
        document.body.style.overflow = "auto";
        document.body.style.height = "100%";
    }
    // Remove responsive attribute if exists in class list of main-nav
    var element = document.getElementById("main-nav");
    if (element.classList.contains('responsive')) {
        resetResponsive();
    }
});

// Function for when user hovers over main navigation dropdown items (to dim main section brightness, etc.)
function dropDownHover() {
    var sectionMain = document.getElementById("section-main");
    var sectionHighlight = document.getElementById("section-highlight");
    var helpBtnSubText = document.getElementById("help-btn-sub-text");
    sectionMain.style.filter = "brightness(0.4)";
    sectionHighlight.style.filter = "brightness(0.4)";
    helpBtnSubText.style.opacity = "0.15";
}

// Function to toggle main section background back to normal brightness
function normalMain() {
    var sectionMain = document.getElementById("section-main");
    var sectionHighlight = document.getElementById("section-highlight");
    var helpBtnSubText = document.getElementById("help-btn-sub-text");
    sectionMain.style.filter = "brightness(1)";
    sectionHighlight.style.filter = "brightness(1)";
    helpBtnSubText.style.opacity = "1";
}

// Function to toggle responsive menu display
function responsiveMenuToggle() {
    var element = document.getElementById("main-nav");
    // Check for 'responsive' class for toggle
    if (element.className === "navbar navbar-sub") {
        setTimeout(() => { //this timeout prevents class detection from function (document click event listener) to close responsive menu (by removing class attribute), if the user clicks the responsive menu button itself
            element.className += " responsive"; // Add 'responsive' class to main-nav id
        }, 100); // Give the responsive menu a slight delay before removing display
        dropDownHover();
    } else {
        resetResponsive();
    }
}

// Function to reset the responsive menu from displaying
function resetResponsive() {
    var element = document.getElementById("main-nav");
    element.className = "navbar navbar-sub";
    normalMain();
}

// Window listener for resize event to reset responsive menu and arrtibute tags 
document.addEventListener("DOMContentLoaded", function (event) {
    // This method should be debounced for permormance, so that it doesn't have to execute on every resize event, but only once the user is done resizing.
    var removeResponsiveAttributes = debounce(function () {
        var element = document.getElementById("main-nav");
        if (window.innerWidth >= 992 && element.classList.contains('responsive')) {
            resetResponsive();
            normalMain();
        }
    }, 250);
    window.addEventListener('resize', removeResponsiveAttributes);
});

// Reusable debouncing function (for window resize event)
// This function returns a function, that, as long as it continues to be invoked, will not be triggered. 
// It will only be called after it stops being called for N milliseconds. 
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Hide responsive navigation dropdown on event of user scrolling
window.addEventListener('scroll', throttle(resetResponsive, 100));

// Reusable function for event listener throttling
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}
