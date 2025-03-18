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


/*
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
*/




// "Hi there" typing effect ------------------------------

document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const target = entry.target;
                // When the element is in view, add the 'start-typing' class
                entry.target.timer = setTimeout(() => {
                    if (target.classList.contains('hero-heading')) {
                        target.classList.add('typed-out1');
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


// The other greetings content typing effect ---------------------------------

let target = document.querySelector('.first-greeting-content');
const text1 = target.textContent;
target.textContent = ''; // Clear the content initially

target = document.querySelector('.second-greeting-content');
const text2 = target.textContent;
target.textContent = ''; // Clear the content initially


target = document.querySelector('.third-greeting-content');
const text3 = target.textContent;
target.textContent = ''; // Clear the content initially


function typeNextCharacter(target, text) {
    let charIndex = 0;

    function innerLoop() {
        if (charIndex < text.length) {
            target.textContent += text[charIndex];
            charIndex++;
            setTimeout(innerLoop, 30);
        }
    }

    innerLoop();
}


document.addEventListener('DOMContentLoaded', () => {

    const first = document.querySelector('.first-greeting-content');
    const second = document.querySelector('.second-greeting-content');
    const third = document.querySelector('.third-greeting-content');

    const observer = new IntersectionObserver((entries) => {
        
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const target = entry.target;
                // When the element is in view, add the 'start-typing' class
                entry.target.timer = setTimeout(() => {

                    if (target.classList.contains('first-greeting-content')) {
                        setTimeout(() => typeNextCharacter(first, text1), 2000)
                    } else if (target.classList.contains('second-greeting-content')) {
                        setTimeout(() => typeNextCharacter(second, text2), 6000);
                    } else if (target.classList.contains('third-greeting-content')) {
                        setTimeout(() => typeNextCharacter(third, text3), 14000);
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

    

    observer.observe(first);
    observer.observe(second); 
    observer.observe(third);

});


/*
window.addEventListener('load', function () {
    history.replaceState({}, document.title, window.location.origin + window.location.pathname);
    const pages = document.querySelector('.hero');
    pages.scrollIntoView({ behavior: "smooth" });
});
*/


// Expanding effect for greetings ------------------------------------

const circle = document.querySelector('.oval');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const expansionStartingHeight = 50;
    const expansionEndingHeight = 450;

    const contractionStartingHeight = 1300;
    const contractionEndingHeight = 1700;
    
    if (scrollY > expansionStartingHeight && scrollY < expansionEndingHeight) {
        const scaleValue = 1 + (scrollY - expansionStartingHeight) / 100; // Increase scale based on scroll
        circle.style.transform = `scale(${scaleValue})`;
    } else if (scrollY > contractionStartingHeight && scrollY < contractionEndingHeight) {
        const scaleValue = 5 - (scrollY - contractionStartingHeight) / 100; // Increase scale based on scroll
        circle.style.transform = `scale(${scaleValue})`;
    }
        
});


// Toggling the menu button --------------------------------

function toggleMenu() {
    console.log("Menu toggled!");
    document.querySelector(".menu-btn").classList.toggle("active");
    document.getElementById("Sidenav").classList.toggle("active");
    
    const subnavbars = ['subnavbar-first', 'subnavbar-second', 'subnavbar-third'];
    subnavbars.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.classList.contains("show")) {
                element.style.maxHeight = "0px";
                setTimeout(() => element.classList.remove("show"), 0); // Remove class after transition
            } 
        }
    });

    document.body.classList.toggle("no-scroll");
}

// Clicking the sub navigation headers in menu ----------------------

function openSubNavBarContents(button) {
    const targetId = button.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    
    const firstButton = document.getElementById(button.getAttribute("data-icon-1"));
    const secondButton = document.getElementById(button.getAttribute("data-icon-2"));
    
    if (targetElement.classList.contains("show")) {
        targetElement.style.maxHeight = "0px";
        setTimeout(() => targetElement.classList.remove("show"), 0); // Remove class after transition
        firstButton.style.display = "none";
        secondButton.style.display = "inline-block";
    } else {
        targetElement.classList.add("show");
        targetElement.style.maxHeight = targetElement.scrollHeight + "px"; // Match content height
        firstButton.style.display = "inline-block";
        secondButton.style.display = "none";
    }
}


const body = document.body;
const main = document.querySelector('main');

let sy = 0;
let dy = sy;

body.style.height = main.clientHeight + 'px';
main.style.position = 'fixed';
main.style.top = 0;
main.style.left = 0;
main.style.width = '100%';  // Prevent unwanted shrinking

window.addEventListener('scroll', () => {
  sy = window.pageYOffset;
});

window.requestAnimationFrame(render);

function render() {
  dy = lerp(dy, sy, 0.05);
  dy = Math.floor(dy * 100) / 100;

  main.style.transform = `translateY(-${dy}px)`;

  window.requestAnimationFrame(render);
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}




const items = document.querySelectorAll('.item'); // All items
const container = document.querySelector('.floating-container'); // Container

// Function to randomly position an item within the container
function randomPosition(item) {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Random position (X and Y) within the container
    const randomX = Math.random() * (containerWidth - item.offsetWidth);
    const randomY = Math.random() * (containerHeight - item.offsetHeight);

    // Apply the random position
    item.style.left = randomX + 'px';
    item.style.top = randomY + 'px';
}

// Function to animate items (move them around)
function animateItems() {
    items.forEach(item => {
        randomPosition(item);
    });

    // Call animateItems every 2 seconds (you can adjust this interval)
    setTimeout(animateItems, 2000);
}

// Initially position all items randomly
animateItems();