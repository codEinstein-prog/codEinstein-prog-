document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for project details buttons
    const projectButtons = document.querySelectorAll(".project-btn");
    projectButtons.forEach(button => {
        button.addEventListener("click", function () {
            const projectId = button.getAttribute("data-project-id");
            openModal(projectId);
        });
    });

    // Add event listener for modal close button (ensure it exists before adding)
    const closeModalButton = document.getElementById("close-modal");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeModal);
    }

    // Function to open the modal
    function openModal(projectId) {
        const modal = document.getElementById("project-modal");
        const modalContent = document.getElementById("modal-content");

        // Example project details (replace with your own content)
        const projectDetails = {
            1: {
                title: "Project 1",
                description: "Description for Project 1.",
                technologies: "HTML, CSS, JavaScript",
                link: "https://example.com/project1",
            },
            2: {
                title: "Project 2",
                description: "Description for Project 2.",
                technologies: "React, Node.js",
                link: "https://example.com/project2",
            },
            // Add more projects if needed
        };

        // Ensure project exists before displaying
        if (projectDetails[projectId]) {
            const details = projectDetails[projectId];
            modalContent.innerHTML = `
                <h2>${details.title}</h2>
                <p>${details.description}</p>
                <p><strong>Technologies:</strong> ${details.technologies}</p>
                <p><a href="${details.link}" target="_blank">View Project</a></p>
            `;
            modal.style.display = "block";
        }
    }

    // Function to close the modal
    function closeModal() {
        const modal = document.getElementById("project-modal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Tab navigation functionality
    let tabLinks = document.querySelectorAll(".tab-links");
    let tabContents = document.querySelectorAll(".tab-contents");

    tabLinks.forEach(link => {
        link.addEventListener("click", function () {
            let target = this.getAttribute("data-tab");

            tabLinks.forEach(link => link.classList.remove("active-link"));
            tabContents.forEach(content => content.classList.remove("active-tab"));

            this.classList.add("active-link");
            document.getElementById(target).classList.add("active-tab");
        });
    });

    // Function to open a default tab
    function openTab(tabName) {
        document.querySelector(`.tab-links[data-tab="${tabName}"]`).classList.add("active-link");
        document.getElementById(tabName).classList.add("active-tab");
    }

    // Initialize with the first tab as active
    openTab("Skills");
});
