const EmailChecker = (email = "arop.cit.bd@gmail.com" ) =>{
    
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailtest = emailregex.test(email)
    return emailtest;
    

}

const passwordChecker = (password = "mern2306") =>{
    
    const passwordregex = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/;

    const passwordtest = passwordregex.test(password)
 
    return passwordtest;
    

}


module.exports = {EmailChecker , passwordChecker}