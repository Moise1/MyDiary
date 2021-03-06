const openNav = ()=>{
    const mediaQueries = [
        window.matchMedia("(min-width: 1224px)"),
        window.matchMedia("(min-width: 700px)"),
        window.matchMedia("(max-width: 320px)")
    ]
    
    if(mediaQueries[0].matches){
       return document.getElementById("myNav").style.width = "25%";

    }
    else if(mediaQueries[1].matches){
        return document.getElementById("myNav").style.width = "35%";

    }else if(mediaQueries[2]){
        return document.getElementById("myNav").style.width = "100%";
    }
} 


const closeNav = ()=>{
    document.getElementById("myNav").style.width = "0%";
}


const fold = document.getElementsByClassName("foldable");
const imgs = document.getElementById("icons");
let i;

for(i = 0; i < fold.length; i++) {
  fold[i].addEventListener("click", function(){

    this.classList.toggle("active");
    const content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
  });
}

const editContent = ()=>{ 
  document.querySelectorAll(".foldable, .content").contentEditable="true";

} 

const pageTwo = document.getElementById("page2");
pageTwo.style.visibility = "hidden";
const pageOne = document.getElementById("page1");

const Next = ()=>{
   pageOne.parentNode.replaceChild(pageTwo, pageOne); 
  pageTwo.style.visibility="visible";
}

const Prev = () => {
  pageTwo.parentNode.replaceChild(pageOne, pageTwo);
} 
