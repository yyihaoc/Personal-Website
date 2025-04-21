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


