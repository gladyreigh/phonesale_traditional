document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("main section");

  window.addEventListener("scroll", function() {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") == `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// Hamburger menu functionality
function openMenu() {
    document.getElementById('nav-links').style.right = '0px';  
    document.querySelector('.close-icon').style.display = 'block';
    document.querySelector('.fas.fa-bars.hamburger').style.display = 'none';
}
 
function closeMenu() {
    document.getElementById('nav-links').style.right = '-250px';
    document.querySelector('.close-icon').style.display = 'none';
    document.querySelector('.fas.fa-bars.hamburger').style.display = 'block';
}

document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "../";
});


document.getElementById("back-buttons").addEventListener("click", function() {
    window.location.href = "../";
});

// Add event listener for close button in mobile menu
document.querySelector('.close-icon').addEventListener('click', closeMenu);
