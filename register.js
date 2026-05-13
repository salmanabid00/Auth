document.getElementById("registerForm").addEventListener("submit",function(event){
  event.preventDefault();
  var name= document.getElementById("name").value;
 var  username= document.getElementById("username").value;
 var  password= document.getElementById("password").value;
 var confirmPassword= document.getElementById("confirmPassword").value;

 if(password !== confirmPassword){
    alert("Passwords do not match!");
    return;
 }
 const user= {
  name: name,
  username: username,
  password: password,

 }
 localStorage.setItem(username, JSON.stringify(user));
 alert("Registration successful! You can now log in.");
 window.location.href = "login.html";

})