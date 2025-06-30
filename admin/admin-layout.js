document.addEventListener("DOMContentLoaded", () => {
    fetch('includes/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initializeMenu();
        });
});

function initializeMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuToggles = document.querySelectorAll('.menu-toggle');

    menuToggles.forEach(toggle => {
        const subMenu = toggle.nextElementSibling;
        const subMenuLinks = subMenu.querySelectorAll('a');
        let isCurrentMenuActive = false;

        subMenuLinks.forEach(link => {
            if (link.getAttribute('href').split('/').pop() === currentPage) {
                link.classList.add('active');
                isCurrentMenuActive = true;
            }
        });

        if (isCurrentMenuActive) {
            toggle.classList.add('active');
            subMenu.style.display = 'block';
        }

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggle.classList.toggle('active');
            const subMenu = toggle.nextElementSibling;
            if (subMenu.style.display === 'block') {
                subMenu.style.display = 'none';
            } else {
                subMenu.style.display = 'block';
            }
        });
    });

    // For non-group menus
    const singleLinks = document.querySelectorAll('.sidebar > a');
    singleLinks.forEach(link => {
      if (link.getAttribute('href') && link.getAttribute('href').split('/').pop() === currentPage) {
        link.classList.add('active');
      }
    })
} 