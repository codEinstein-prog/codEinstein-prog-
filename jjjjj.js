// JavaScript for interactive features

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for project details buttons
    const projectButtons = document.querySelectorAll(".project-btn");
    projectButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const projectId = button.getAttribute("data-project-id");
            openModal(projectId);
        });
    });

    // Server-side code
const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast real-time updates to all connected clients
  setInterval(() => {
    io.emit('update', { message: 'New data available' });
  }, 1000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

    // Add event listener for modal close button
    const closeModalButton = document.getElementById("close-modal");
    closeModalButton.addEventListener("click", closeModal);

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
            // Add more project details as needed
        };

        // Populate modal content with project details
        const details = projectDetails[projectId];
        modalContent.innerHTML = `
            <h2>${details.title}</h2>
            <p>${details.description}</p>
            <p><strong>Technologies:</strong> ${details.technologies}</p>
            <p><a href="${details.link}" target="_blank">View Project</a></p>
        `;

        // Display the modal
        modal.style.display = "block";
    }

    // Function to close the modal
    function closeModal() {
        const modal = document.getElementById("project-modal");
        modal.style.display = "none";
    }

document.addEventListener("DOMContentLoaded", function () {
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
});


        // Initialize with the first tab as active
        openTab('Skills');
    });
});
