// ================================
// ROUTES
// ================================

const routes = {

  '/':
    document.getElementById('home'),

  '/projects':
    document.getElementById('projects'),

  '/art':
    document.getElementById('art'),

  '/contact':
    document.getElementById('contact')

};



// ================================
// ACTIVE NAVIGATION
// ================================

function setActiveLink(path) {

  document
    .querySelectorAll('.nav-link')
    .forEach(link => {

      const href =
        link.getAttribute('href');

      const match =
        href === `#${path}`;

      link.classList.toggle(
        'active',
        match ||
        (
          path === '/' &&
          href === '#/'
        )
      );

    });

}



// ================================
// ROUTER
// ================================

function navigate() {

  const path =
    location.hash.slice(1) || '/';


  Object
    .entries(routes)
    .forEach(([route, element]) => {

      element.classList.toggle(
        'active',
        route === path
      );

    });


  setActiveLink(path);


  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });


  setTimeout(() => {

    initializeRevealAnimations();

  }, 100);

}



// ================================
// SCROLL REVEAL
// ================================

let revealObserver;


function initializeRevealAnimations() {

  if (revealObserver) {

    revealObserver.disconnect();

  }


  const revealElements =
    document.querySelectorAll(
      '.route.active .reveal'
    );


  revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target
              .classList
              .add('visible');


            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12,
        rootMargin:
          '0px 0px -40px 0px'
      }

    );


  revealElements.forEach(element => {

    element.classList.remove(
      'visible'
    );

    revealObserver.observe(
      element
    );

  });

}



// ================================
// HERO IMAGE MOVEMENT
// ================================

function heroMovement() {

  const hero =
    document.querySelector(
      '.hero-image-wrap'
    );


  if (!hero) return;


  hero.addEventListener(
    'mousemove',
    event => {

      if (
        window.innerWidth <= 820
      ) return;


      const rect =
        hero.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;


      const y =
        event.clientY -
        rect.top;


      const xPercent =
        x / rect.width -
        0.5;


      const yPercent =
        y / rect.height -
        0.5;


      const image =
        hero.querySelector(
          '.hero-photo'
        );


      image.style.transform =
        `scale(1.03)
         translate(
           ${xPercent * 8}px,
           ${yPercent * 8}px
         )`;

    }
  );


  hero.addEventListener(
    'mouseleave',
    () => {

      const image =
        hero.querySelector(
          '.hero-photo'
        );


      image.style.transform =
        '';

    }
  );

}



// ================================
// PROJECT IMAGE PARALLAX
// ================================

function projectParallax() {

  const images =
    document.querySelectorAll(
      '.work-image img'
    );


  window.addEventListener(
    'scroll',
    () => {

      if (
        window.innerWidth <= 820
      ) return;


      images.forEach(image => {

        const rect =
          image.getBoundingClientRect();


        const windowHeight =
          window.innerHeight;


        if (
          rect.bottom > 0 &&
          rect.top < windowHeight
        ) {

          const center =
            rect.top +
            rect.height / 2;


          const distance =
            center -
            windowHeight / 2;


          const movement =
            distance * -0.025;


          image.style.transform =
            `translateY(${movement}px)
             scale(1.04)`;

        }

      });

    },
    {
      passive: true
    }
  );

}



// ================================
// START
// ================================

window.addEventListener(
  'hashchange',
  navigate
);


window.addEventListener(
  'DOMContentLoaded',
  () => {


    // Current year

    document
      .getElementById('year')
      .textContent =
      new Date()
        .getFullYear();



    // Mobile navigation

    const toggle =
      document.querySelector(
        '.nav-toggle'
      );


    const nav =
      document.querySelector(
        '.site-nav'
      );


    toggle.addEventListener(
      'click',
      () => {

        const open =
          nav.classList.toggle(
            'open'
          );


        toggle.setAttribute(
          'aria-expanded',
          String(open)
        );

      }
    );



    // Close mobile menu
    // after clicking a page

    document
      .querySelectorAll(
        '[data-link]'
      )
      .forEach(link => {

        link.addEventListener(
          'click',
          () => {

            nav.classList.remove(
              'open'
            );


            toggle.setAttribute(
              'aria-expanded',
              'false'
            );

          }
        );

      });



    // Start effects

    heroMovement();

    projectParallax();

    navigate();

  }
);