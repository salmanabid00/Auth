const pageParams = new URLSearchParams(window.location.search);

var user = localStorage.getItem("loggedInUser");

if (user) {
  var parsedUser = JSON.parse(user);
  const displayName = parsedUser.name;

  document.getElementById("welcomMessage").innerHTML = `Welcome, ${displayName}!`;
  document.getElementById("LogoutButton").classList.remove("hidden");
} else {
  document.getElementById("welcomMessage").innerHTML = `Hello, please <a href="login.html">Login</a>`;
  document.getElementById("LogoutButton").classList.add("hidden");
}

document.getElementById("LogoutButton").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html?logout=true";
});
