const reveals = document.querySelectorAll('.reveal');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {

    reveals.forEach(reveal => {

        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            reveal.classList.add('active');
        }

    });

    if (window.scrollY > 50) {
        nav.style.background = "rgba(16, 37, 66, 0.98)";
        nav.style.padding = "14px 10%";
    } else {
        nav.style.background = "rgba(16, 37, 66, 0.95)";
        nav.style.padding = "18px 10%";
    }

});