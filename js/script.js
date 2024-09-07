document.addEventListener("DOMContentLoaded", function() {
    const lazyElements = document.querySelectorAll('.lazy');
    
    function loadResource(element) {
        const dataSrc = element.getAttribute('data-src');
        
        if (element.tagName.toLowerCase() === 'img') {
            element.src = dataSrc;
            element.onload = () => element.classList.add('loaded');
        } else if (element.tagName.toLowerCase() === 'video') {
            element.src = dataSrc;
            element.load();
            element.onloadeddata = () => element.classList.add('loaded');
        }
        element.classList.remove('lazy');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadResource(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyElements.forEach(element => observer.observe(element));
});
