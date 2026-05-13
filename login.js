function showError(fieldId, errorId) {
  document.getElementById(fieldId).classList.add("invalid");
  document.getElementById(fieldId).classList.remove("valid");
  document.getElementById(errorId).style.display = "block";
}

function showValid(fieldId, errorId) {
  document.getElementById(fieldId).classList.remove("invalid");
  document.getElementById(fieldId).classList.add("valid");
  document.getElementById(errorId).style.display = "none";
}
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}


document.getElementById("identifier").addEventListener("input", function () {
  if (this.value.trim().length >= 3) {
    showValid("identifier", "identifierError");
  } else {
    showError("identifier", "identifierError");
  }
});

document.getElementById("password").addEventListener("input", function () {
  if (this.value.length > 0) {
    showValid("password", "passwordError");
  } else {
    showError("password", "passwordError");
  }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const identifier = document.getElementById("identifier").value.trim();
  const password   = document.getElementById("password").value;
  let valid = true;

  if (identifier.length < 3) {
    showError("identifier", "identifierError");
    valid = false;
  }

  if (password.length === 0) {
    showError("password", "passwordError");
    valid = false;
  }

  if (!valid) return;

  let username = identifier;
  if (isValidEmail(identifier)) {
    const mappedUsername = localStorage.getItem("email_" + identifier);
    if (!mappedUsername) {
      alert("No account found with this email.");
      return;
    }
    username = mappedUsername;
  }

 
  const userData = localStorage.getItem("user_" + username);

  if (!userData) {
    alert("User not found! Please register first.");
    return;
  }

  const parsedUser = JSON.parse(userData);

  if (parsedUser.password !== password) {
    alert("Incorrect password! Please try again.");
    showError("password", "passwordError");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify({
    name: parsedUser.name,
    email: parsedUser.email,
    username: parsedUser.username,
  }));

  alert("Login successful! Welcome, " + parsedUser.name + "!");
  window.location.href = "index.html";
});