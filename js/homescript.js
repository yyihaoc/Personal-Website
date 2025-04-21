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
                }, 0); // 1000ms = 1 second delay before triggering animation
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

// Expanding effect for greetings ------------------------------------

const circle = document.querySelector('.oval');  // Ensure you target your circle element

let scaleValue = 1;  // Initial scale value
let opacityValue = 0; // Initial opacity value
let scrollDelta = window.scrollY;  // Initialize scrollDelta to track the scroll position

const maxDelta = 1; // Maximum delta for scaling

function update() {
    // Continuously track the scroll position
    const scrollY = window.scrollY;
    const delta = scrollY - scrollDelta; // Calculate the change in scroll position
    const changeDelta = Math.max(-maxDelta, Math.min(maxDelta, delta));

    window += changeDelta; // Update scrollDelta with the change
    
    // Scaling ranges
    const expansionStartingHeight = 50;
    const expansionEndingHeight = 450;

    const contractionStartingHeight = 1300;
    const contractionEndingHeight = 1700;

    // If scrolling within the expansion range
    if (scrollY > expansionStartingHeight && scrollY < expansionEndingHeight) {
        opacityValue = Math.min(1, (scrollY - expansionStartingHeight) / 100); // Increase opacity based on scroll
        scaleValue = 1 + (scrollY - expansionStartingHeight) / 100; // Increase scale based on scroll
    } 
    // If scrolling within the contraction range
    else if (scrollY > contractionStartingHeight && scrollY < contractionEndingHeight) {
        opacityValue = Math.max(0, - (scrollY - contractionEndingHeight) / 100); // Decrease opacity based on scroll
        scaleValue = 5 - (scrollY - contractionStartingHeight) / 100; // Decrease scale based on scroll
    }

    // Apply the scaling transformation
    circle.style.transform = `scale(${scaleValue})`;
    circle.style.opacity = opacityValue; // Set the opacity

    // Request the next animation frame to keep updating
    window.requestAnimationFrame(update);
}

// Start the update loop
window.requestAnimationFrame(update);


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


window.onload = function () {
    // window.history.scrollRestoration = "manual"; // Stop browser from remembering scroll
    window.scrollTo(0, 0);  // Instantly move to top
};


