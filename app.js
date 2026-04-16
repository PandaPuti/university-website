//Toggle Nav bar and responsive navbar
const menuItems = document.getElementById("navLinks");
function showMenu(){
  menuItems.style.right = "0";
}
function hideMenu(){
  menuItems.style.right = "-200px";
}


// Add active class to active nav link

// Get the current URL path (e.g., "/about.html")
const currentPath = window.location.pathname.split("/").pop();

// Select all links in the navigation
const navLinks = document.querySelectorAll('.nav-links ul li a');

navLinks.forEach(link => {
  if(link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});


//Form submit handling from client side

//1. Select the form element
const contactForm = document.querySelector('.contact-us form');
const submitBtn = contactForm.querySelector('.hero-btn');

//2. Listen for the submit event
contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload

  // 1. Enter Loading State
  submitBtn.disabled = true; // Prevents double-clicking
  submitBtn.innerText = "Sending..."; 
  submitBtn.style.opacity = "0.7";

  //3. Create a FormData object from the form
  const formData = new FormData(this);

  // Convert FormData to a simple object
  const formObject = Object.fromEntries(formData.entries());

  console.log("Form Data Captured:", formObject);

  //4. Send the data (Simulated API call)
  //In a real scenario, replace this URL with your backend endpoint
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
  .then(response => {
      if (response.ok) {
          alert("Thank you! Your message has been sent.");
          contactForm.reset(); // Clear the form fields
      } else {
          alert("Oops! Something went wrong.");
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert("There was an error connecting to the server.");
  })
  .finally(() => {
    // 3. Exit Loading State (Always runs regardless of success or failure)
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
    submitBtn.style.opacity = "1";
  });
});


