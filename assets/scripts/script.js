console.log("script.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".project a").forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "white";
        });
        link.addEventListener("mouseleave", () => {
            link.style.color = "cyan";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const text = "Aspiring Software Developer... solving complex problems with clean code.";
    let index = 0;
    const speed = 50;
    const pauseTime = 700;
    const breakPoints = ["...", "problems..."];
    const typedTextElement = document.getElementById("typed-text");

    function typeEffect() {
        if (index < text.length) {
            typedTextElement.innerHTML += text.charAt(index);
            index++;
            
            if (breakPoints.some(bp => text.substring(0, index).endsWith(bp))) {
                setTimeout(typeEffect, pauseTime);
            } else {
                setTimeout(typeEffect, speed);
            }
        }
    }

    if (typedTextElement) {
        typeEffect();
    }
});

function loadCategory(page, activeTabId) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("project-content").innerHTML = data;
        });

    // Update active class for pills
    document.getElementById("software-tab").classList.remove("active");
    document.getElementById("hacking-tab").classList.remove("active");
    document.getElementById("hardware-tab").classList.remove("active");

    document.getElementById(activeTabId).classList.add("active");
}

// Load Software Projects by default on page load
window.onload = function() {
    setTimeout(() => {
        loadCategory('projects/software-projects.html', 'software-tab');
    }, 200);
};


