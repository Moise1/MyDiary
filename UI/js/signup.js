const openNav = ()=>{
    const mediaQueries = [
        window.matchMedia("(min-width: 1224px)"),
        window.matchMedia("(max-width: 700px)"),
        window.matchMedia("(min-width: 300px)")
       ]
       
    if(mediaQueries[0].matches){
        console.log('media 1224')
       return document.getElementById("myNav").style.width = "25%";
    }
    else if(mediaQueries[1].matches){
        console.log('media 700');
        return document.getElementById("myNav").style.width = "45%";

    }else if(mediaQueries[2].matches){
        console.log('media 300');
        return document.getElementById("myNav").style.width = "100%";
    }
} 


const closeNav = ()=>{
    document.getElementById("myNav").style.width = "0%";
}