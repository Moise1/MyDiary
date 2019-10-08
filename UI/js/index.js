let i = 0; 
const txt = 'Let\'s help you pen down your day!';
const speed = 70; 

const typeWriter = ()=>{
    const mobileScreen = window.matchMedia('(max-width: 700px)');
    const smallMobileScreen =  window.matchMedia('(min-width: 300px)');

    if(i < txt.length && mobileScreen.matches){
        document.getElementById('fadeInWow').style = `
        text-align: center; 
        margin-top: 35%; 
        color: #FDFEFE; 
        font-size: 30px;
        margin-left: -5%;`
        document.getElementById('fadeInWow').innerHTML += txt.charAt(i); 
        i++; 
        return setTimeout(typeWriter, speed);

    }else if(i < txt.length && smallMobileScreen.matches){
        document.getElementById('fadeInWow').style = `
        text-align: center; 
        margin-top: 15%; 
        color: #FDFEFE; 
        font-size: 30px;
        margin-left: -5%;`
        document.getElementById('fadeInWow').innerHTML += txt.charAt(i); 
        i++; 
        setTimeout(typeWriter, speed);
        return;
    }else {
        document.getElementById('fadeInWow').style = `
        text-align: center; 
        margin-top: 15%; 
        color: #FDFEFE; 
        font-size: 30px;
        margin-left: -5%;`
        document.getElementById('fadeInWow').innerHTML += txt.charAt(i); 
        i++; 
        setTimeout(typeWriter, speed);
        return;
    }
}

typeWriter();

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