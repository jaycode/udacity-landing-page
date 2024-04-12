/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Adds a new item to the navigation menu
 * @param {string} ulId - The ID of the UL element to add the LI
 * @param {string} itemId - The ID for the LI element
 * @param {string} itemText - The text content for the navigation link
 * @param {string} sessionId - The ID of the session to scroll to
 */
function addListItem(ulId, itemId, itemText, sessionId) {
    const ul = document.getElementById(ulId);
    const li = document.createElement('li');
    li.id = itemId;

    const a = document.createElement('a');
    a.textContent = itemText;
    a.href = '#';
    a.addEventListener('click', (event) => handleNavClick(event, sessionId));

    li.appendChild(a);
    ul.appendChild(li);
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav() {
    sections.forEach(section => {
        const text = section.getAttribute('data-nav') || 'Section';
        const id = section.id;
        addListItem(navbarList.id, id + '-link', text, id);
    });
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();

      // Select the link corresponding to the section
      const link = document.getElementById(`${section.id}-link`);
  
      if (rect.top <= 150 && rect.bottom >= 150) {
        // If the section is in the viewport, add active class
        section.classList.add('active');
        link.classList.add('active'); 
      } else {
        section.classList.remove('active');
        link.classList.remove('active');
      }
    });
  }
/**\
 * Scroll to section on link click
 * Scroll to anchor ID using scrollTO event
 * @param {Event} event - The click event object
 * @param {string} sessionId - The ID of the session element to scroll into view
 */
 function handleNavClick(event, sessionId) {
    event.preventDefault();
    const sessionElement = document.getElementById(sessionId);
    if (sessionElement) {
      // Calculate the top offset of the element
      const topPos = sessionElement.offsetTop;
  
      // Scroll to the element
      window.scrollTo({
        top: topPos, // Y position
        behavior: 'smooth' // Smooth scroll
      });
    }
  }

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', function () {
    buildNav();
});


// Set sections as active
window.addEventListener('scroll', function () {
    setActiveSection();
});

