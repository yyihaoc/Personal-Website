let currentPage = 0;

// Read the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get('section'); // Get 'section' parameter from the URL

// If the section is 'about', update currentPage to 2
if (section === 'about') {
    currentPage = 2;
    const targetElement = document.getElementById(section);  // Get the element with that ID
    if (targetElement) {
        const pages = document.querySelector('.fullpage');
        pages.style.transform = `translateY(-${2 * (window.innerHeight - 100)}px)`;  // Scroll smoothly to the section
    }
}


let startTime = 0;  // Time when the scroll starts
let endTime = 0;    // Time when the scroll ends
let accumulatedDistance = 0;  // Accumulated scroll distance
let swipeThreshold = 20;  // Minimum distance (in pixels) for swipe detection
let timeThreshold = 300;   // Maximum time (in ms) to consider the scroll a swipe
let isSwiping = false;  // Flag to indicate a swipe is in progress


// Event listener for wheel event
document.addEventListener('wheel', (event) => {
    if (startTime === 0) {
        startTime = Date.now();  // Record the start time
    }

    // Accumulate the scroll distance
    accumulatedDistance += event.deltaY;

    // Optionally, prevent default scrolling behavior for custom handling
    let enableNormalScroll = (currentPage == 2 && accumulatedDistance > 0) || currentPage > 2;

    if (!enableNormalScroll) {
        event.preventDefault();
    }
    
    // Detect swipe threshold based on accumulated distance and speed
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    if (Math.abs(accumulatedDistance) > swipeThreshold && elapsedTime < timeThreshold) {
        // If the accumulated distance is larger than the threshold and the duration is short enough
        if (!isSwiping && !(enableNormalScroll)) {
            // Start of swipe
            isSwiping = true;
            // Handle the swipe
            handleSwipe(accumulatedDistance);
        } else if (!isSwiping && currentPage == 2 && accumulatedDistance > 0) {
            isSwiping = true;
            handleSpecialSwipeDown();
        } else if (!isSwiping && currentPage == 3 && accumulatedDistance < 0) {
            isSwiping = true;
            handleSpecialSwipeUp();
            currentPage--;
        }
    }

    // Reset after the swipe is detected or timeout happens
    if (elapsedTime > timeThreshold || Math.abs(accumulatedDistance) < swipeThreshold) {
        // Reset everything when the time is exceeded or accumulated distance is too small
        accumulatedDistance = 0;
        startTime = 0;
        isSwiping = false;
    }
}, { passive: false });

function handleSpecialSwipeDown() {
    const pages = document.querySelector('.fullpage');
    pages.style.transform = `translateY(-${2 * (window.innerHeight - 100) + 284}px)`;
    currentPage++;
}

function handleSpecialSwipeUp() {
    const pages = document.querySelector('.fullpage');
    pages.style.transform = `translateY(-${2 * (window.innerHeight - 100)}px)`;
}

function handleSwipe(distance) {
    
    const pages = document.querySelector('.fullpage');
    const totalPages = document.querySelectorAll('.container').length - 2;

    if (distance > 0 && currentPage < totalPages - 1) {
        // Swiped up
        currentPage++;
    } else if (distance < 0 && currentPage > 0) {
        // Swiped down
        currentPage--;
    }

    // Move the pages container
    pages.style.transform = `translateY(-${currentPage * (window.innerHeight - 100)}px)`;
}

document.querySelector('.scroll').addEventListener('click', () => {
    const pages = document.querySelector('.fullpage');
    pages.style.transform = `translateY(-${2 * (window.innerHeight - 100)}px)`;
    currentPage = 2;
    accumulatedDistance = 0;
    startTime = 0;
    isSwiping = false;
});






document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const target = entry.target;
                // When the element is in view, add the 'start-typing' class
                entry.target.timer = setTimeout(() => {

                    if (target.classList.contains('hero-heading')) {
                        target.classList.add('typed-out1');
                    } else if (target.classList.contains('first-greeting-content')) {
                        target.classList.add('typed-out2');
                    }

                    // entry.target.classList.add('typed-out'); // Add typing animation
                    observer.unobserve(entry.target); // Stop observing once the animation starts
                }, 1000); // 1000ms = 1 second delay before triggering animation
            } else {
                clearTimeout(entry.target.timer); // Clear timer if element leaves viewport
            }
        });
    }, {
        threshold: 1 // Adjust this to decide when the element should be considered "in view"
    });

    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach((element) => observer.observe(element)); // Start observing the elements
    // console.log(typingElements[0].classList.contains('hero-heading'));

});


// ------------------------------------------------------------------------------------


const target = document.querySelector('.second-greeting-content');
const text = target.textContent;
target.textContent = ''; // Clear the content initially

let charIndex = 0;

function typeNextCharacter() {
  if (charIndex < text.length) {
    target.textContent += text[charIndex]; // Add character to the paragraph
    charIndex++;
    setTimeout(typeNextCharacter, 30); // Adjust typing speed here
  }

}

const next_target = document.querySelector('.third-greeting-content');
const next_text = next_target.textContent;
next_target.textContent = ''; // Clear the content initially

let next_charIndex = 0;

function typeNextCharacter1() {
  if (next_charIndex < next_text.length) {
    next_target.textContent += next_text[next_charIndex]; // Add character to the paragraph
    next_charIndex++;
    setTimeout(typeNextCharacter1, 30); // Adjust typing speed here
  }
}


document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const target = entry.target;
                // When the element is in view, add the 'start-typing' class
                entry.target.timer = setTimeout(() => {

                    if (target.classList.contains('second-greeting-content')) {
                        setTimeout(typeNextCharacter, 4000);
                    } else if (target.classList.contains('third-greeting-content')) {
                        setTimeout(typeNextCharacter1, 11000);
                    }
                    
                    observer.unobserve(entry.target); // Stop observing once the animation starts
                }, 1000); // 1000ms = 1 second delay before triggering animation
            } else {
                clearTimeout(entry.target.timer); // Clear timer if element leaves viewport
            }
        });
    }, {
        threshold: 1 // Adjust this to decide when the element should be considered "in view"
    });

    const second = document.querySelector('.second-greeting-content');
    const third = document.querySelector('.third-greeting-content');

    observer.observe(second); 
    observer.observe(third);

});


window.addEventListener('load', function () {
    history.replaceState({}, document.title, window.location.origin + window.location.pathname);
    const pages = document.querySelector('.hero');
    pages.scrollIntoView({ behavior: "smooth" });
});