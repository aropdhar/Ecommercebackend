const EmailChecker = (email = "arop.cit.bd@gmail.com" ) =>{
    
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailtest = emailregex.test(email)
    return emailtest;
    

}

const passwordChecker = (password = "Mern@2306") =>{
    
    const passwordregex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const passwordtest = passwordregex.test(password)
    console.log(passwordtest);
    
    return passwordtest;
    

}


module.exports = {EmailChecker , passwordChecker}