function showError(fieldId,  errorId) {
  document.getElementById(fieldId).classList.add("invalid");
  document.getElementById(fieldId).classList.remove("valid");
  document.getElementById(errorId).style.display = "block";
}

function showValid(fieldId, errorId) {
  document.getElementById(fieldId).classList.remove("invalid");
  document.getElementById(fieldId).classList.add("valid");
  document.getElementById(errorId).style.display = "none";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{4,20}$/.test(username);
}

function isStrongPassword(password) {  
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  );
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)  score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  if (score <= 2) return { label: "Weak 🔴", cls: "strength-weak" };
  if (score <= 4) return { label: "Medium 🟡", cls: "strength-medium" };
  return { label: "Strong 🟢", cls: "strength-strong" };
}

document.getElementById("name").addEventListener("input", function () {
  if (this.value.trim().length >= 3) {
    showValid("name", "nameError");
  } else {
    showError("name", "nameError");
  }
});


document.getElementById("email").addEventListener("input", function () {
  if (isValidEmail(this.value.trim())) {
    showValid("email", "emailError");
  } else {
    showError("email", "emailError");
  }
});


document.getElementById("username").addEventListener("input", function () {
  if (isValidUsername(this.value.trim())) {
    showValid("username", "usernameError");
  } else {
    showError("username", "usernameError");
  }
});

document.getElementById("password").addEventListener("input", function () {
  const strengthEl = document.getElementById("passwordStrength");
  const val = this.value;

  if (val.length > 0) {
    const s = getPasswordStrength(val);
    strengthEl.textContent = "Password Strength: " + s.label;
    strengthEl.className = "password-strength " + s.cls;
    strengthEl.style.display = "block";
  } else {
    strengthEl.style.display = "none";
  }  if (isStrongPassword(val)) {
    showValid("password", "passwordError");
  } else {
    showError("password", "passwordError");
  }

  const confirm = document.getElementById("confirmPassword").value;
  if (confirm.length > 0) {
    if (confirm === val) {
      showValid("confirmPassword", "confirmError");
    } else {
      showError("confirmPassword", "confirmError");
    }
  }
});

document.getElementById("confirmPassword").addEventListener("input", function () {
  const password = document.getElementById("password").value;
  if (this.value === password && this.value.length > 0) {
    showValid("confirmPassword", "confirmError");
  } else {
    showError("confirmPassword", "confirmError");
  }
});

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email= document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let valid = true;
  if (name.length < 3) {
    showError("name", "nameError");
    valid = false;
  } if (!isValidEmail(email)) {
    showError("email", "emailError");
    valid = false;
  }   if (!isValidUsername(username)) {
    showError("username", "usernameError");
    valid = false;
  }   if (!isStrongPassword(password)) {
    showError("password", "passwordError");
    valid = false;
  }  if (password !== confirmPassword) {
    showError("confirmPassword", "confirmError");
    valid = false;
  }   if (!valid) return;

 if (localStorage.getItem("email_" + email)) {
    alert("This email is already registered!");
    return;
  }

  if (localStorage.getItem("user_" + username)) {
    alert("Username already taken! Please choose another.");
    return;
  }

  const user = {
    name: name,
    email: email,
    username: username,
    password: password,
  };

  localStorage.setItem("user_" + username, JSON.stringify(user));
  localStorage.setItem("email_" + email, username); 
  alert("Registration successful! You can now log in.");
  window.location.href = "login.html";
});