// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function() {
  // Select all navigation links
  const links = document.querySelectorAll("nav ul li a");
  // Select all section elements within the main content area
  const sections = document.querySelectorAll("main section");

  // Add an event listener to the window for the scroll event
  window.addEventListener("scroll", function() {
    // Variable to keep track of the current section ID
    let current = "";

    // Iterate over each section to determine which section is currently in view
    sections.forEach(section => {
      // Get the top offset of the section
      const sectionTop = section.offsetTop;
      // Check if the current scroll position is past the section top minus an offset (e.g., 60px)
      if (pageYOffset >= sectionTop - 60) {
        // Update the current section ID
        current = section.getAttribute("id");
      }
    });

    // Iterate over each navigation link
    links.forEach(link => {
      // Remove the 'active' class from all links
      link.classList.remove("active");
      // Check if the href attribute of the link matches the current section ID
      if (link.getAttribute("href") == `#${current}`) {
        // Add the 'active' class to the matching link
        link.classList.add("active");
      }
    });
  });
});

// Function to open the mobile menu
function openMenu() {
    // Slide the menu into view by setting its right position to 0px
    document.getElementById('nav-links').style.right = '0px';
    // Display the close icon and hide the hamburger icon
    document.querySelector('.close-icon').style.display = 'block';
    document.querySelector('.fas.fa-bars.hamburger').style.display = 'none';
}

// Function to close the mobile menu
function closeMenu() {
    // Hide the menu by setting its right position to -250px
    document.getElementById('nav-links').style.right = '-250px';
    // Hide the close icon and display the hamburger icon
    document.querySelector('.close-icon').style.display = 'none';
    document.querySelector('.fas.fa-bars.hamburger').style.display = 'block';
}

// Event listener for the back button on desktop view
document.getElementById("back-button").addEventListener("click", function() {
    // Navigate to the relative URL of the shop page
    window.location.href = "../";
});

// Event listener for the back button on mobile view
document.getElementById("back-buttons").addEventListener("click", function() {
    // Navigate to the relative URL of the shop page
    window.location.href = "../";
});

// Add an event listener to the close icon to trigger the closeMenu function
document.querySelector('.close-icon').addEventListener('click', closeMenu);
