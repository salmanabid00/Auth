var user = localStorage.getItem("loggedInUser");

if (user) {
  var parsedUser = JSON.parse(user);
  document.getElementById("welcomMessage").innerHTML = `Welcome, ${parsedUser.name}!`;
  document.getElementById("LogoutButton").classList.remove("hidden");
} else {
  document.getElementById("welcomMessage").innerHTML = `Hello, please <a href="login.html">Login</a>`;
  document.getElementById("LogoutButton").classList.add("hidden");
}

document.getElementById("LogoutButton").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});