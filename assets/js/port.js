//Intersection observer
var sect1 = document.querySelector("section");

var menu = document.querySelector(".menu");
var navlinks = document.querySelectorAll(".nav-item:not(.logo)");
var socialLinks = document.querySelectorAll(".nav-item>i");
var summli = document.querySelectorAll(".summon li");
var navbar = document.querySelector("nav");
let svgIcons = document.querySelectorAll('svg');

var options = {
  root: null,
  rootMargin: "-100px",
  treshold: 1.0
};
var myobsvr = new IntersectionObserver(callback, options);
var imgObserver = new IntersectionObserver(fillImg, options);

function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting == 0) {
      menu.style.backgroundColor = "black";
      svgIcons.forEach(icon => (icon.style.fill = "#000000"));
      svgIcons.forEach(icon => (icon.style.stroke = "#ffffff"));
      navlinks.forEach(link => (link.style.color = "white"));
      socialLinks.forEach(link => (link.style.backgroundColor = "white"));
      socialLinks.forEach(link => (link.style.backgroundColor = "white"));

    } else {
      svgIcons.forEach(icon => (icon.style.fill = "#ffffff"));
      svgIcons.forEach(icon => (icon.style.stroke = "#ffffff"));
      navlinks.forEach(link => (link.style.color = "black"));
      navlinks.forEach(link => (menu.style.backgroundColor = "white"));
      socialLinks.forEach(link => (link.style.backgroundColor = "black"));
    }
    console.log(`the ratio is : ${entry.intersectionRatio}`);
  });
}

myobsvr.observe(sect1);
//End intersection observer

// Region 1
var mainNavLinks = document.querySelectorAll("li a.link");

mainNavLinks.forEach(a => {
  a.addEventListener("click", e => {
    //Change main navigation link to active onclick
    mainNavLinks.forEach(c => c.parentNode.classList.remove("active"));
    if (!e.target.classList.contains("active"))
      e.target.parentElement.classList.add("active");
    //End active onclick handler
  });
});

//Summon div onclick
// End region 1
//Defer image load
var dsrcs = document.querySelectorAll("[data-src]");

function fillImg(entries, self) {
  entries.forEach(entry => {
    dsrcs.forEach(dsrc => {
      if (entry.isIntersecting) {
        dsrc.src = dsrc.dataset.src;
      }
    });
  });
}

imgObserver.observe(sect);
window.requestIdleCallback();