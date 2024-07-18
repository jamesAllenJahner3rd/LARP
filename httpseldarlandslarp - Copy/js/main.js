
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
document.querySelectorAll(".scrollTitle").forEach((element,index)=>
    element.addEventListener("click", () => openScroll(index)));
function openScroll(index) {
    const scroll = document.querySelectorAll(".scroll")[index];
    const isHidden = scroll.querySelector("p").hasAttribute("hidden");
    if (isHidden) {
         // Open the scroll
        scroll.querySelectorAll("p,span,table").forEach(element=>element.toggleAttribute("hidden"));
        scroll.style.backgroundPosition="50% 6%";
            scroll.style.height = "79vw"; 
    } else {
         // Close the scroll
         scroll.querySelectorAll('p, span, table').forEach(element => element.setAttribute('hidden', true));
            scroll.style.backgroundPosition = "45% 100%";
            scroll.style.height = "22vw";
    }
};











