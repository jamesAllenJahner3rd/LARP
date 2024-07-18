
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

let tableAppear = document.querySelector("span[class*=scrollTitle]");
let scrollAppear =document.querySelector("div[class*=scroll]");
tableAppear.addEventListener("click", () => { scrollAppear.removeAttribute("hidden");
});
let practiceButton= document.querySelector("span[class*=scrollTitle]");
let openPractice=false;
practiceButton.addEventListener("click", openPracticeScroll);
function openPracticeScroll(click){
    let scrollElement = document.querySelector("div[class*=scroll]");
    let scrollP = document.querySelector("div[class*=scroll] p");
    let scrollSpan = document.querySelector("div[class*=scroll] span");
    let practiceTable = document.querySelector("#practice");
    if (openPractice==false){
        scrollP.style.display = "block";
        scrollElement.style.backgroundPosition = "50% 44%";
        scrollElement.style.height ="100vw";
        practiceTable.style.display = "table";
        scrollSpan.style.display="block";
        openPractice = true;
}   else{
    scrollP.style.display = "none";
        scrollElement.style.backgroundPosition = "50% 110%";
        scrollElement.style.height ="29vw";
        practiceTable.style.display = "none";
        scrollSpan.style.display="none";
        openPractice = false;
}
}









