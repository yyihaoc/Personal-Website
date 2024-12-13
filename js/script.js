let currentPage = 0;

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
