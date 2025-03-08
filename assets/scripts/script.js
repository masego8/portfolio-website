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

// Intro text animation 
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

// Load Category Pill
function loadCategory(page, activeTabId, category) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("project-content").innerHTML = data;
            console.log(`✅ Loaded ${category} projects`);

            // Ensure pagination initializes AFTER content loads
            setTimeout(() => {
                console.log(`🔄 Initializing pagination for ${category}`);
                initializePagination(category);
            }, 300);
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
        loadCategory('projects/software-projects.html', 'software-tab', 'software');
    }, 200);
};


document.addEventListener("DOMContentLoaded", function () {
    function initializePagination(category) {
        setTimeout(() => {
            if (!category) return; // 🚀 Skip if no category is provided

            const projectsContainer = document.querySelector(`#${category}-container`);
            const dotsContainer = document.querySelector(`#${category}-pagination`);
            const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

            if (!projectsContainer || dots.length === 0) return; // 🚀 Skip if no projects or dots exist

            function updateActiveDot() {
                let index = Math.round(projectsContainer.scrollLeft / projectsContainer.clientWidth);
                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === index);
                });
            }

            projectsContainer.removeEventListener("scroll", updateActiveDot);
            projectsContainer.addEventListener("scroll", updateActiveDot);

            dots.forEach((dot, i) => {
                dot.removeEventListener("click", () => {}); // Ensure no duplicate event listeners
                dot.addEventListener("click", () => {
                    projectsContainer.scrollTo({
                        left: i * projectsContainer.clientWidth,
                        behavior: "smooth"
                    });
                });
            });

            updateActiveDot();
        }, 500);
    }

    function loadCategory(page, activeTabId, category) {
        if (!category) return; // 🚀 Skip execution if category is missing

        fetch(page)
            .then(response => response.text())
            .then(data => {
                document.getElementById("project-content").innerHTML = data;
                setTimeout(() => {
                    initializePagination(category); // 🚀 Initialize pagination after content loads
                }, 300);
            })
            .catch(error => console.error(`❌ Error loading ${category}:`, error));

        // Update active class for pills
        document.getElementById("software-tab").classList.remove("active");
        document.getElementById("hacking-tab").classList.remove("active");
        document.getElementById("hardware-tab").classList.remove("active");

        document.getElementById(activeTabId).classList.add("active");
    }

    // Make `initializePagination` globally accessible
    window.initializePagination = initializePagination;

    // Load Software Projects by default on page load
    setTimeout(() => {
        loadCategory('projects/software-projects.html', 'software-tab', 'software');
    }, 200);

    // Attach click events to the pills
    document.getElementById("software-tab").addEventListener("click", () => {
        loadCategory('projects/software-projects.html', 'software-tab', 'software');
    });
    document.getElementById("hacking-tab").addEventListener("click", () => {
        loadCategory('projects/hacking-projects.html', 'hacking-tab', 'hacking');
    });
    document.getElementById("hardware-tab").addEventListener("click", () => {
        loadCategory('projects/hardware-projects.html', 'hardware-tab', 'hardware');
    });
});



    