'use strict';

///////////////////////////////////////
//Selectors

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sect1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContain = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//Scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = sect1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  /*   window.scrollTo(
    s1coords.left + window.pageXOffset, //have to have the window Offset or else it doesn't work when you scroll
    s1coords.top + window.pageYOffset
  ); */
  //This is the "Old school way of doing it", figuring out the coordinates and passing them
  /*   window.scrollTo({
    left: s1coords.left + window.pageXOffset, //have to have the window Offset or else it doesn't work when you scroll
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth', //this makes the scroll smooth
  }); */

  //new way that only works with the modern browsers.
  sect1.scrollIntoView({ behavior: 'smooth' });
});
//Page Navigation

/* document.querySelectorAll('.nav__link').forEach(nav =>
  nav.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
); */
//Event Delegation (this is better than attaching an event listener onto every element...scaled to 1000 elements, it could majorly hamper performance, so better to attach the event listener onto the parent element instead)
//1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

//Using event delegation, which attaches to the common parent element of the tabs, instead of attaching each event listener to each tab
tabsContain.addEventListener('click', function (e) {
  //const clicked = e.target; //cAN'T USE this because will return whatever is clicked, button or span element. Looking for the data-tab attribute
  //const clicked = e.target.parentElement; //Can't use this bc button click will return the div not the button.
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause
  if (!clicked) return; //need to ignore any clicks where the result is null

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //Remove active classes first
  clicked.classList.add('operations__tab--active');

  //Activate content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active')); //Remove active classes first
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); //just the part after the "data-""
});

//Passing Arguments to Event Handlers
//Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    //Element Selectors
    const link = e.target; //there are no child elements that can accidentally be clicked so this will work
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Event delegation
/* nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
}); */
//Can also use the bind method
//Passing "arg" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation bar
const initialCoords = sect1.getBoundingClientRect();
//console.log(initialCoords);

//absolute garbage wayh to do it, but it works
window.addEventListener('scroll', function () {
  //console.log(window.scrollY);
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//The Intersection Observer API
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(sect1); */
//actually making the sticky header
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//Lazy loading
//Loading a low-res image then replacing it with a higher-res one on scroll. low-res in src, high res in data-src attribute. Also removing the lazy-img class.
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); //don't want to do this by itself, because a slow network will just have the blurry img for a looooong time.
  });
  observer.observe(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //making the pics load 200px before we get to them.
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnL = document.querySelector('.slider__btn--left');
  const btnR = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    //select all the dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  //Event Handlers
  btnR.addEventListener('click', nextSlide);
  btnL.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    /* console.log(e); */
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

////////////Lectures//////////////////////

// Efficient Script Loading: defer and async

//Lifecycle DOM Events

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML Parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

/* window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
}); */
/*
//DOM Traversing
const h1 = document.querySelector('h1');

//Going downwards (child elements)
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); //only works for direct children
h1.firstElementChild.style.color = 'red';

//Going upwards (parent elements)
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //finds parents no matter how for up they are in the DOM Tree
h1.closest('h1').style.background = 'var(--gradient-secondary)';

//Sideways (siblings) - can only select the next sibs, b4 and after
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//to find all the siblings, move up to parent and select all children
console.log(h1.parentElement.children); //this is an HTML collection, which is not an array, but still an iterable
[...h1.parentElement.children].forEach(function (e) {
  if (e !== h1) e.style.transform = 'scale(0.5)';
});

//Event Propagation: Bubbling and Capturing////////

const randomInt = (min, max) => Math.floor(Math.random() * max - min + 1) + min;
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
//console.log(randomColor());

//Instead of adding the event listener to each link, will add to the container
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop Propagation
  e.stopPropagation(); //usually don't want to do this.
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  onsole.log('LINK', e.target, e.currentTarget);
});


//Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading');
  //h1.removeEventListener('mouseenter', alertH1);
};
//newer way of listening for events
h1.addEventListener('mouseenter', alertH1);
//old way of doing it
/* h1.onmouseenter = function (e) {
  alert('Adios: you are reading the heading part 2');
}; 

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//Should NOT be used



//Apply things to the whole page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); //returns a nodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); //returns an HTML collection

//Creating and inserting elements
//.insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
//header.prepend(message);
header.append(message); //Cannot be at multiple places at the same time, so it moved the element.
//header.append(message.cloneNode(true));
//header.before(message);
//header.after(message);

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove();
    message.parentElement.removeChild(message); //old way of doing it
  });

//Style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); //will show nothing bc we did not set it / need getComputedStyle
console.log(message.style.backgroundColor); //will show
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful Min logo';

//Non-standard: this would not work as there is not a standard designer attribute
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

//Don't use, as it wipes all the classes and only lets you set one class.
logo.className = 'trevin';
*/
