document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var user = localStorage.getItem(username);

  if (user) {
    var parsedUser = JSON.parse(user);
    if (parsedUser.password === password) {
      localStorage.setItem("user", JSON.stringify(parsedUser));
      window.location.href = "index.html";

    } else {
      alert("Invalid username or password");
    }

  } else {
    alert("user not found");

  }

});