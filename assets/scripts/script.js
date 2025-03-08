

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

// Check if we're on the projects page before running loadCategory
function loadCategory(page, activeTabId, category) {
    const projectContent = document.getElementById("project-content");
    if (!projectContent) {
        return;
    }

    fetch(page)
        .then(response => response.text())
        .then(data => {
            projectContent.innerHTML = data;

            // Ensure pagination initializes AFTER content loads
            setTimeout(() => {
                if (typeof initializePagination === "function") {
                    initializePagination(category);
                } else {
                    console.warn("⚠️ initializePagination function is not available.");
                }
            }, 300);
        });

    // Check if tab elements exist before modifying them
    const softwareTab = document.getElementById("software-tab");
    const hackingTab = document.getElementById("hacking-tab");
    const hardwareTab = document.getElementById("hardware-tab");
    const extraTab = document.getElementById("extra-tab");

    if (softwareTab && hackingTab && hardwareTab && extraTab) {
        softwareTab.classList.remove("active");
        hackingTab.classList.remove("active");
        hardwareTab.classList.remove("active");
        extraTab.classList.remove("active");

        document.getElementById(activeTabId).classList.add("active");
    }
}

// Only run on the projects page
window.onload = function() {
    const projectPage = document.getElementById("project-content");
    if (projectPage) {
        setTimeout(() => {
            loadCategory('projects/software-projects.html', 'software-tab', 'software');
        }, 200);
    } else {
        
    }
};



// Pagination

// Pagination for dynamically loaded projects
document.addEventListener("DOMContentLoaded", function () {
    function initializePagination(category) {
        setTimeout(() => {
            if (!category) return; // Skip if no category is provided

            // Select dynamically loaded elements
            const projectsContainer = document.querySelector("#project-content .projects-container");
            const dotsContainer = document.querySelector("#project-content .pagination-dots");
            const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

            if (!projectsContainer || dots.length === 0) {
                console.warn(`⚠️ No projects or pagination dots found for ${category}.`);
                return;
            }

            function updateActiveDot() {
                let index = Math.round(projectsContainer.scrollLeft / projectsContainer.clientWidth);
                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === index);
                });
            }

            // Reset previous event listeners before adding new ones
            projectsContainer.removeEventListener("scroll", updateActiveDot);
            projectsContainer.addEventListener("scroll", updateActiveDot);

            dots.forEach((dot, i) => {
                dot.removeEventListener("click", scrollToProject); // Remove old listener
                dot.addEventListener("click", scrollToProject);
            });

            function scrollToProject(event) {
                const dotIndex = Array.from(dots).indexOf(event.target);
                projectsContainer.scrollTo({
                    left: dotIndex * projectsContainer.clientWidth,
                    behavior: "smooth"
                });
            }

            // Ensure pagination starts correctly
            projectsContainer.scrollLeft = 0;
            updateActiveDot();
        }, 500);
    }

    function loadCategory(page, activeTabId, category) {
        const projectContent = document.getElementById("project-content");
        if (!projectContent) return; // Stop execution if we’re not on the projects page

        fetch(page)
            .then(response => response.text())
            .then(data => {
                projectContent.innerHTML = data;
                setTimeout(() => {
                    initializePagination(category); //Initialize pagination after content loads
                }, 500);
            })
            .catch(error => console.error(`Error loading ${category}:`, error));

        // Update active tab
        ["software-tab", "hacking-tab", "hardware-tab", "extra-tab"].forEach(id => {
            const tab = document.getElementById(id);
            if (tab) tab.classList.remove("active");
        });

        document.getElementById(activeTabId)?.classList.add("active");
    }

    // Only run script if the project page exists
    const projectPage = document.getElementById("project-content");
    if (projectPage) {
        window.initializePagination = initializePagination;

        // Load Software Projects by default on page load
        setTimeout(() => {
            loadCategory('projects/software-projects.html', 'software-tab', 'software');
        }, 200);

        // Attach event listeners to category pills
        ["software", "hacking", "hardware", "extra"].forEach(category => {
            const tabId = `${category}-tab`;
            const tab = document.getElementById(tabId);
            if (tab) {
                tab.addEventListener("click", () => {
                    loadCategory(`projects/${category}-projects.html`, tabId, category);
                });
            }
        });
    }
});





    