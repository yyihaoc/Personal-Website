


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


window.onload = function () {
    // window.history.scrollRestoration = "manual"; // Stop browser from remembering scroll
    window.scrollTo(0, 0);  // Instantly move to top
};



;(function(main) {
    main();
})(function() {

    'use strict';

    var c = document.getElementById('c');
    var ctx = c.getContext('2d');

    var WIDTH = c.width = window.innerWidth;
    var HEIGHT = c.height = window.innerHeight;
    var mouse = {
        x: 0,
        y: 0,
        isMoved: false
    };

    var Particle = function() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.a = 0;
        this.life = 0;
        this.radius = Math.random() * 5;
    };

    Particle.prototype = {
        constructor: Particle,
        update: function() {
            if(this.life > 0) {
                this.life -= 2;
                if(this.life < 50) {
                    this.vx += Math.random() * 4 - 2;
                    this.vy += Math.random() * 4 - 2;
                    this.vx *= 0.9;
                    this.vy *= 0.9;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.a = this.life / 50;						
                }
            }
        },
        render: function(ctx) {
            ctx.save();
            ctx.fillStyle = 'rgba('+ this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a +')';
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        },
        reset: function(tx, ty) {
            this.x = tx;
            this.y = ty;
            this.vx = Math.random() * 4 - 1;
            this.vy = Math.random() * 4 - 1;
            this.life = 150;
            this.a = 1;
            this.g = Math.round(255 * (this.x / WIDTH));
            this.b = Math.round(255 * (this.y / HEIGHT));
            this.radius = Math.random() * 5;
        }
    };

    var particles = [];
    var particle = null;
    var particleCount = 500;
    var tx = 0;
    var ty = HEIGHT / 2;
    var idx = 0;
    var temp = {
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 4 - 2,
        x: WIDTH / 2,
        y: HEIGHT / 2
    }

    for(var i = 0; i < particleCount; i++) {
        particle = new Particle();
        particles.push(particle);
    }

    function spawn(target) {

        tx += (target.x - tx) * 0.2;
        ty += (target.y - ty) * 0.2;

        particles[idx].reset(tx, ty);
        if(++idx >= particles.length) idx = 0;

    }

    c.addEventListener('mousemove', function(e) {

        var rect = c.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.isMoved = true;

        spawn(mouse);

    });

    requestAnimationFrame(function loop() {
        requestAnimationFrame(loop);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        if(!mouse.isMoved) {
            temp.vx += Math.random() * 4 - 2;
            temp.vy += Math.random() * 4 - 2;
            temp.vx *= 0.98;
            temp.vy *= 0.98;
            temp.x += temp.vx;
            temp.y += temp.vy;
            if(temp.x > WIDTH) {
                temp.x = WIDTH;
                temp.vx *= -1;
            }
            if(temp.x < 0) {
                temp.x = 0;
                temp.vx *= -1;
            }
            if(temp.y > HEIGHT) {
                temp.y = HEIGHT;
                temp.vy *= -1;
            }
            if(temp.y < 0) {
                temp.y = 0;
                temp.vy *= -1;
            }				
            spawn(temp);
        }

        for(var i = 0; i < particleCount; i++) {
            particle = particles[i];
            particle.update();
            particle.render(ctx);
        }
    });


});