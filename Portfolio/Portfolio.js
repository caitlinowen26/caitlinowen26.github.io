// ================================
// ROUTES
// ================================

const routes = {

  '/':
    document.getElementById('home'),

  '/projects':
    document.getElementById('projects'),

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

    // Removed scroll parallax so images stay stable and hover motion remains smooth.

    navigate();

  }
);

// STUDIO EDITION: meaningful interactions, not decorative scroll effects.
(function(){
  const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const filters=document.querySelectorAll('.filter-btn');
  const cards=[...document.querySelectorAll('#projects .work-item')];
  const progressHeading=document.querySelector('#projects .development-heading');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>{b.classList.toggle('is-selected',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
    const filter=btn.dataset.filter;
    cards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;});
    if(progressHeading) progressHeading.hidden=filter!=='all'&&filter!=='progress';
    // Existing reveal animations should not hide newly filtered cards.
    cards.forEach(card=>{if(!card.hidden) card.classList.add('visible');});
  }));
  document.querySelectorAll('.project-open').forEach(btn=>btn.addEventListener('click',()=>{
    const panel=btn.nextElementSibling;
    const expanding=panel.hidden;
    panel.hidden=!expanding;
    btn.setAttribute('aria-expanded',String(expanding));
    btn.textContent=expanding?'CLOSE NOTES −':'PROJECT NOTES +';
  }));
  const bar=document.querySelector('.scroll-progress');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?100*scrollY/max:0)+'%';ticking=false;});
  },{passive:true});
  const orb=document.querySelector('.cursor-orb');
  if(motionOK&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('pointermove',e=>{orb.style.left=e.clientX+'px';orb.style.top=e.clientY+'px';orb.style.opacity='1';},{passive:true});
    document.querySelectorAll('a,button,.work-image').forEach(el=>{
      el.addEventListener('pointerenter',()=>orb.classList.add('is-hovering'));
      el.addEventListener('pointerleave',()=>orb.classList.remove('is-hovering'));
    });
    const portrait=document.querySelector('.studio-portrait');
    if(portrait){portrait.addEventListener('pointermove',e=>{const r=portrait.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;portrait.querySelector('img').style.transform=`scale(1.08) translate(${x*-15}px,${y*-15}px)`;});portrait.addEventListener('pointerleave',()=>portrait.querySelector('img').style.transform='scale(1.04)');}
  }
})();

// Horizontal project reel: buttons, filters, keyboard, and directional slide-ins.
(function(){
  const track=document.querySelector('#projects .work-list');
  if(!track)return;
  const prev=document.querySelector('.gallery-prev');
  const next=document.querySelector('.gallery-next');
  const counter=document.querySelector('.gallery-count');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let previousIndex=0;
  const items=()=>[...track.querySelectorAll('.work-item:not([hidden])')];
  const currentIndex=()=>{
    const visible=items();
    if(!visible.length)return 0;
    let index=0,smallest=Infinity;
    visible.forEach((el,i)=>{const delta=Math.abs(el.offsetLeft-track.offsetLeft-track.scrollLeft);if(delta<smallest){smallest=delta;index=i;}});
    return index;
  };
  const update=()=>{
    const all=items(),index=currentIndex();
    counter.textContent=String(index+1).padStart(2,'0')+' / '+String(all.length).padStart(2,'0');
    prev.disabled=index===0;next.disabled=index>=all.length-1;
    if(index!==previousIndex&&!reduce){
      const card=all[index];if(card){card.classList.remove('reel-enter-left','reel-enter-right');void card.offsetWidth;card.classList.add(index>previousIndex?'reel-enter-right':'reel-enter-left');}
    }
    previousIndex=index;
  };
  const go=(delta)=>{
    const all=items();const i=Math.max(0,Math.min(all.length-1,currentIndex()+delta));
    if(all[i])track.scrollTo({left:all[i].offsetLeft-track.offsetLeft,behavior:reduce?'instant':'smooth'});
  };
  prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(e.key==='ArrowRight'?1:-1);}});
  let raf=false;track.addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(()=>{update();raf=false;});}},{passive:true});
  document.querySelectorAll('#projects .filter-btn').forEach(b=>b.addEventListener('click',()=>{track.scrollLeft=0;previousIndex=0;requestAnimationFrame(update);}));
  update();
})();
