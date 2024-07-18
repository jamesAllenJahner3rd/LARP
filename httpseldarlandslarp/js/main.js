
let messText = document.querySelectorAll("img[class*=mess] + div");
let imgStraighten = document.querySelectorAll("img[class*=mess]");
let stickyNoteSlide = document.querySelectorAll("div[class*=sticky]");

Array.from(imgStraighten).forEach((element,index) =>   element.addEventListener('mouseover', () => {
        element.style.transform = 'rotate(0) translate(0, 0)';
        element.style.boxShadow = '10px 10px 10px black';
        stickyNoteSlide[index].style.top = '-60%';
        stickyNoteSlide[index].style.opacity = '1';
        messText[index].style.opacity='1';
    }));









