import anime from "animejs";

let logo = document.querySelector('span.logo');
logo.addEventListener('click',
    () => {
        anime({
            target: '.active::before',
            width: ['12px', '100px'],
            scale: 1.2,
            duration: 5000,
            loop: true
        })
    }
);