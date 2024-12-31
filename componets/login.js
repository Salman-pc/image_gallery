// from the sign up page
fullName=document.getElementById("fullName")
signupemail=document.getElementById("signupemail")
signuppass=document.getElementById("signuppass")
confirmsignuppass=document.getElementById("confirmsignuppass")
// login ids
loginpassword = document.getElementById("loginpassword")
loginemail = document.getElementById("loginemail")
//forgott
forgotemail=document.getElementById("forgotemail")
forgotpass=document.getElementById("forgotpass")
confirmforgotpass=document.getElementById("confirmforgotpass")

const gotosignUp = ()=>{
    window.location="signup.html"
}
const gotologinpage=()=>{
    window.location="index.html"
}
let emailvalidcheck=/^[a-zA-Z0-9._%+-]+@gmail\.com$/

//user first signup
const usersignupedd=()=>{
    if (fullName.value&&signupemail.value&&signuppass.value&&confirmsignuppass.value) {
        if(confirmsignuppass.value==signuppass.value){
            if (emailvalidcheck.test(signupemail.value)) {
                const accountdetails = JSON.parse(sessionStorage.getItem("useraccount")) || []

                accountdetails.push({
                    username:fullName.value,
                    useremail:signupemail.value,
                    userpass:confirmsignuppass.value
                })
                sessionStorage.setItem("useraccount",JSON.stringify(accountdetails ))
                sessionStorage.removeItem("images");
                 window.location="landing.html"
            } else {
                
                alert("You entered a wrong email")
            }
        }
        else{
            alert("please enter the same password")
        }
    } else {
        alert("please complete the form!")
    }
}

// user login
const userlogined=()=>{
    if (loginemail.value&&loginpassword.value) {
        if (emailvalidcheck.test(loginemail.value)) {
            let account = JSON.parse(sessionStorage.getItem("useraccount")) 
            console.log("acoount",account);
            try{
                let validaccount = account.find(userdata=>{ return userdata.useremail==loginemail.value&&userdata.userpass==loginpassword.value }
                )
                if (validaccount) {
                    sessionStorage.setItem("logindatas",JSON.stringify([{email:loginemail.value,pass:loginpassword.value}]))
                    window.location="./componets/landing.html"
                }
                else if(account==null){
                    alert("Please sign up ")
                }
                else{
                    alert("You entered wrong address please sign up")
                } 
            }
            catch(error){
                alert("Please sign up") 
            }
        } 
        else {
            alert("Please enter valid email")
        }
    } 
    else {
        alert("Please enter valid password and email")
    }

}

// userforggotten password
const changepass=()=>{
    if (forgotemail.value&&forgotpass.value&&confirmforgotpass.value) {
        if(emailvalidcheck.test(forgotemail.value)){
            let account = JSON.parse(sessionStorage.getItem("useraccount")) 
            console.log("acoount",account);
            try{
                let validaccount = account.find(userdata=>{ return userdata.useremail==forgotemail.value }    
                )
                console.log("iam",validaccount.useremail==forgotemail.value);
                if (validaccount) {
                    
                    validaccount.useremail=forgotemail.value
                    validaccount.userpass=confirmforgotpass.value
                    sessionStorage.setItem("useraccount",JSON.stringify([{useremail:validaccount.useremail,userpass:validaccount.userpass}]))
                    window.location="../index.html"
                }
                else if(account==null){
                    alert("Please sign up ")
                }
                else{
                    alert("You entered wrong address please sign up")
                } 
             }
            catch(error){
                
                alert("Please sign up") 
            }
        }
        else{
            alert("please enter the valid email")
        }
    } else {
        alert("please fill the form")
    }
}

