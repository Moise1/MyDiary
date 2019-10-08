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

    }else if(mediaQueries[2].matches){
        return document.getElementById("myNav").style.width = "100%";
    }
} 


const closeNav = ()=>{
    document.getElementById("myNav").style.width = "0%";
} 


formValidator = () => {
    const mediaQueries = [
        window.matchMedia("(min-width: 1224px)"),
        window.matchMedia("(min-width: 700px)"),
        window.matchMedia("(max-width: 320px)")
    ]
        const invalidInput = document.getElementById("invalidInput"); 
        const email = document.getElementById("email"); 
        const pswd = document.getElementById("password"); 
        if(mediaQueries[0].matches && email.value == null || email.value == "" || pswd.value == ""){

        invalidInput.innerHTML = "All fields are required.";
        invalidInput.style = `
        color: #FF5733;
        position: absolute; 
        left: 47%; 
        font-size: 20px;
        top: 63%;
        padding: 5px;
        `
    }else if(mediaQueries[1].matches && email.value == null || email.value == "" || pswd.value == "") {
        invalidInput.innerHTML = "All fields are required.";
        invalidInput.style = `
        color: #FF5733;
        position: absolute; 
        left: 47%; 
        font-size: 20px;
        top: 80%;
        border: 2px solid green;
        `
    }else if(mediaQueries[2].matches && email.value == null || email.value == "" || pswd.value == ""){
        invalidInput.innerHTML = "This field is required";
        invalidInput.style = `
        color: #FF5733;
        position: absolute; 
        margin-left: 30%; 
        font-size: 20px;
        top: 80%;
        border: 2px solid red;
        `
    }else {
        return window.location.assign('./entries.html');
    }
}