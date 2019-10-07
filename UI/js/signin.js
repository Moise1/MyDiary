const openNav = ()=>{
    const mediaQueries = [
        window.matchMedia("(min-width: 1224px)"),
        window.matchMedia("(max-width: 700px)"),
       ]
       
    if(mediaQueries[0].matches){
       return document.getElementById("myNav").style.width = "25%";

    }
    else if(mediaQueries[1].matches){
        return document.getElementById("myNav").style.width = "35%";

    }else{
        return document.getElementById("myNav").style.width = "100%";
    }
} 


const closeNav = ()=>{
    document.getElementById("myNav").style.width = "0%";
}