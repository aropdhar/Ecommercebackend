const EmailChecker = (email = "arop.cit.bd@gmail.com" ) =>{
    
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailtest = emailregex.test(email)
    return emailtest;
    

}

const passwordChecker = (password = "Mern@2306") =>{
    
    const passwordregex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const passwordtest = passwordregex.test(password)  
    return passwordtest;
    
}

const phonenumberChecker = (PhoneNumber)=>{
    const bdPhoneNumberRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return bdPhoneNumberRegex.test(PhoneNumber)
}

module.exports = {EmailChecker , passwordChecker , phonenumberChecker}