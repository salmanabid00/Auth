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

function showBanner(message, type) {
  const existing = document.getElementById("formBanner");
  if (existing) existing.remove();

  const banner = document.createElement("div");
  banner.id = "formBanner";
  banner.textContent = message;
  banner.style.cssText = `
    background: ${type === "error" ? "#e74c3c" : "#27ae60"};
    color: white;
    padding: 10px 16px;
    border-radius: 6px;
    margin-bottom: 12px;
    font-size: 14px;
    text-align: center;
  `;
  const form = document.getElementById("loginForm");
  form.insertBefore(banner, form.firstChild);
}

const pageParams = new URLSearchParams(window.location.search);

if (pageParams.get("registered") === "true") {
  const name = decodeURIComponent(pageParams.get("name") || "");
  showBanner(`Welcome ${name}! Registration successful. Please login.`, "success");
}

if (pageParams.get("logout") === "true") {
  showBanner("You have been logged out successfully.", "success");
}

if (pageParams.get("error") === "invalid_credentials") {
  showBanner("Invalid username/email or password.", "error");
}


document.getElementById("identifier").addEventListener("input", function () {
  if (this.value.trim().length >= 3) showValid("identifier", "identifierError");
  else showError("identifier", "identifierError");
});

document.getElementById("password").addEventListener("input", function () {
  if (this.value.length > 0) showValid("password", "passwordError");
  else showError("password", "passwordError");
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const identifier = document.getElementById("identifier").value.trim();
  const password   = document.getElementById("password").value;
  let valid = true;

  if (identifier.length < 3) { showError("identifier", "identifierError"); valid = false; }
  if (password.length === 0) { showError("password", "passwordError");     valid = false; }
  if (!valid) return;

  let username = identifier;
  if (isValidEmail(identifier)) {
    const mappedUsername = localStorage.getItem("email_" + identifier);
    if (!mappedUsername) {
      window.location.href = "login.html?error=invalid_credentials";
      return;
    }
    username = mappedUsername;
  }

  const userData = localStorage.getItem("user_" + username);
  if (!userData) {
    window.location.href = "login.html?error=invalid_credentials";
    return;
  }

  const parsedUser = JSON.parse(userData);
  if (parsedUser.password !== password) {
    window.location.href = "login.html?error=invalid_credentials";
    return;
  }
  localStorage.setItem("loggedInUser", JSON.stringify({
    name: parsedUser.name,
    email: parsedUser.email,
    username: parsedUser.username,
  }));

  window.location.href = `index.html?loggedIn=true&name=${encodeURIComponent(parsedUser.name)}`;
});
