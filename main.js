document.addEventListener('DOMContentLoaded', function() {
  // Splash Screen Behavior
  window.addEventListener('load', function() {
    setTimeout(function() {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 500);
      }
    }, 3000); // 3 seconds delay
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('header nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Light/Dark Mode Toggle
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  if (modeToggle) {
    // Function to update button icon based on current theme
    function updateButtonIcon() {
      if(body.classList.contains('dark-mode')) {
        // Currently in dark mode; show sun icon to indicate switching to light mode
        modeToggle.textContent = '☀️';
      } else {
        // In light mode; show moon icon to indicate switching to dark mode
        modeToggle.textContent = '🌙';
      }
    }
    
    modeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      // Store mode in localStorage
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      updateButtonIcon();
    });

    // On page load, restore saved mode
    if(localStorage.getItem('darkMode') === 'true') {
      body.classList.add('dark-mode');
      modeToggle.textContent = '☀️';
    }
    
    // Set initial icon when page loads
    updateButtonIcon();
  }
  
  // Language functionality has been removed
  
  // Search feature for destination categories
  const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');
  
  // Define a mapping of search keywords to section IDs
  const categoryMap = {
    "forts": "forts",
    "forests": "forests",
    "deserts": "deserts",
    "beaches": "beaches",
    "hill stations": "hillstations",
    "hillstation": "hillstations",
    "temples": "temples"
  };
  
  // Function for handling the search
  function handleSearch() {
    const query = searchBar.value.toLowerCase().trim();
    if (query in categoryMap) {
      const sectionId = categoryMap[query];
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert("Category not found. Please try: Forts, Forests, Deserts, Beaches, Hill Stations, or Temples.");
    }
  }
  
  // Trigger search on button click
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      handleSearch();
    });
  }

  // Also trigger search when user presses Enter in the search bar
  if (searchBar) {
    searchBar.addEventListener('keypress', function(e) {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }

  // Add filter buttons to the categories navigation
  const categoriesNav = document.querySelector('.categories-nav ul');
  const filterButtonsContainer = document.createElement('div');
  filterButtonsContainer.className = 'filter-buttons';
  filterButtonsContainer.innerHTML = `
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="north">North India</button>
      <button class="filter-btn" data-filter="south">South India</button>
      <button class="filter-btn" data-filter="east">East India</button>
      <button class="filter-btn" data-filter="west">West India</button>
  `;
  categoriesNav.appendChild(filterButtonsContainer);

  // Add filter styles
  const style = document.createElement('style');
  style.textContent = `
      .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
          flex-wrap: wrap;
      }

      .filter-btn {
          padding: 8px 16px;
          border: 1px solid #4CAF50;
          background: transparent;
          color: #4CAF50;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
      }

      .filter-btn:hover {
          background: #4CAF50;
          color: white;
      }

      .filter-btn.active {
          background: #4CAF50;
          color: white;
      }

      .sub-section {
          transition: all 0.3s ease;
      }

      .sub-section.hidden {
          display: none;
      }
  `;
  document.head.appendChild(style);

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.sub-section');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');

          const filter = button.dataset.filter;

          sections.forEach(section => {
              if (filter === 'all') {
                  section.classList.remove('hidden');
              } else {
                  const sectionTitle = section.querySelector('h3').textContent.toLowerCase();
                  if (sectionTitle.includes(filter)) {
                      section.classList.remove('hidden');
                  } else {
                      section.classList.add('hidden');
                  }
              }
          });
      });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
