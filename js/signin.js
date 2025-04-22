document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("signup-username").value.trim();
            const password = document.getElementById("signup-password").value;
            const confirmPassword = document.getElementById("signup-confirm-password").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const credentials = JSON.parse(localStorage.getItem("user-credentials")) || {};

            if (credentials[username]) {
                alert("Username already exists!");
                return;
            }

            credentials[username] = password;
            localStorage.setItem("user-credentials", JSON.stringify(credentials));

            alert("Account created successfully! You can now sign in.");
            window.location.href = "signin.html";
        });
    }

    if (signinForm) {
        signinForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username-login").value.trim();
            const password = document.getElementById("password-login").value;

            const credentials = JSON.parse(localStorage.getItem("user-credentials")) || {};
            const storedPassword = credentials[username];

            if (!storedPassword) {
                alert("Account not found!");
                return;
            }

            if (storedPassword !== password) {
                alert("Incorrect password!");
                return;
            }

            alert(`Welcome, ${username}!`);
            localStorage.setItem("currentUser", username);
            window.location.href = "dashboard.html";
        });
    }
});

// --------------------------ANIMATION + TRANSITION-----------------------------
const signUpButton = document.getElementById('signup-btn');
const signInButton = document.getElementById('signin-btn');
const container = document.getElementById('container');

if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

const overlay = document.getElementById("overlay");
const toSignup = document.getElementById("to-signup");
const toSignin = document.getElementById("to-signin");

if (overlay && toSignup && toSignin) {
    toSignup.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("move-left");
    });

    toSignin.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("move-left");
    });
}
