function initProfilePage() {
    const currentUser = localStorage.getItem("currentUser");
    const personalInputs = ["fname", "lname", "email", "phone", "age", "gender"];
    const addressInputs = ["street", "brgy", "town", "province", "country", "zip"];
    const saveButton = document.getElementById("save");
    const profileInput = document.getElementById("input-file");
    const profilePic = document.getElementById("profile-pic");
    const usernameDisplay = document.getElementById("username");

    // ---------DISPLAYS DATA---------
    function loadSavedData() {
        const profileData = JSON.parse(localStorage.getItem(`${currentUser}-profile`)) || {};
        const addressData = JSON.parse(localStorage.getItem(`${currentUser}-address`)) || {};
        const savedImage = localStorage.getItem(`${currentUser}-profile-pic`);

        personalInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = profileData[id] || "";
        });

        addressInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = addressData[id] || "";
        });

        usernameDisplay.value = currentUser || "Guest";

        if (savedImage && profilePic) {
            profilePic.src = savedImage;
        }
    }

    // ------------SAVES DATA---------------
    function saveData() {
        const profileData = {};
        const addressData = {};
        const newUsernameInput = document.getElementById("username");

        if (newUsernameInput) {
            const newUsername = newUsernameInput.value.trim();
            if (newUsername && newUsername !== currentUser) {
                updateUsername(newUsername);
            }
        }

        personalInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) profileData[id] = input.value;
        });

        addressInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) addressData[id] = input.value;
        });

        localStorage.setItem(`${currentUser}-profile-pic`, profilePic.src);
        localStorage.setItem(`${currentUser}-profile`, JSON.stringify(profileData));
        localStorage.setItem(`${currentUser}-address`, JSON.stringify(addressData));
    }

    // ------------IMAGE UPLOAD & SAVE---------------
    function updateProfilePic(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const dataURL = e.target.result;
                profilePic.src = dataURL;
                localStorage.setItem(`${currentUser}-profile-pic`, dataURL);
            };

            reader.readAsDataURL(file);
        }
    }

    function updateUsername(newUsername) {
        const oldUsername = localStorage.getItem("currentUser");
        const credentials = JSON.parse(localStorage.getItem("user-credentials")) || {};

        if (!newUsername || newUsername === oldUsername) return;

        if (credentials.hasOwnProperty(newUsername)) {
            alert("This username is already taken. Keeping your current username.");

            const usernameDisplay = document.getElementById("username");
            if (usernameDisplay) {
                usernameDisplay.value = oldUsername;
            }
            return;
        }

        if (credentials.hasOwnProperty(oldUsername)) {
            credentials[newUsername] = credentials[oldUsername];
            delete credentials[oldUsername];
            localStorage.setItem("user-credentials", JSON.stringify(credentials));
        }

        const profileData = localStorage.getItem(`${oldUsername}-profile`);
        const addressData = localStorage.getItem(`${oldUsername}-address`);
        const profilePic = localStorage.getItem(`${oldUsername}-profile-pic`);

        if (profileData) localStorage.setItem(`${newUsername}-profile`, profileData);
        if (addressData) localStorage.setItem(`${newUsername}-address`, addressData);
        if (profilePic) localStorage.setItem(`${newUsername}-profile-pic`, profilePic);

        localStorage.removeItem(`${oldUsername}-profile`);
        localStorage.removeItem(`${oldUsername}-address`);
        localStorage.removeItem(`${oldUsername}-profile-pic`);

        localStorage.setItem("currentUser", newUsername);

        location.reload();
    }




    if (saveButton) {
        saveButton.addEventListener("click", saveData);
    }

    if (profileInput) {
        profileInput.addEventListener("change", updateProfilePic);
    }

    loadSavedData();
}

window.addEventListener("DOMContentLoaded", initProfilePage);
window.addEventListener("pageshow", initProfilePage);

document.getElementById("delete-pic").addEventListener("click", () => {
    console.log("Delete button clicked");

    const profilePic = document.getElementById("profile-pic");
    const currentUser = localStorage.getItem("currentUser");

    console.log("Current user:", currentUser);

    if (!currentUser) {
        console.error("No current user found. Unable to delete profile picture.");
        return;
    }

    if (profilePic) {
        profilePic.src = "/images/profile.png";
        console.log("Profile picture source reset to default.");
    }

    localStorage.removeItem(`${currentUser}-profile-pic`);
    console.log("Profile picture removed from localStorage");
});

// -----------------------MODAL------------------------------
const modal = document.getElementById("password-modal");
const openModalBtn = document.querySelector(".s-input button"); 
const closeModalBtn = document.getElementById("close-modal");
const savePasswordBtn = document.getElementById("save-password");
const changePasswordForm = document.getElementById("change-password-form");

openModalBtn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

changePasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    const credentials = JSON.parse(localStorage.getItem("user-credentials")) || {};
    const currentUser = localStorage.getItem("currentUser");

    if (!credentials[currentUser]) {
        alert("User not found.");
        return;
    }

    if (credentials[currentUser] !== oldPassword) {
        alert("Old password is incorrect.");
        return;
    }


    credentials[currentUser] = newPassword;
    localStorage.setItem("user-credentials", JSON.stringify(credentials));
    alert("Password changed successfully.");

    modal.style.display = "none";
    changePasswordForm.reset();
});


// ------------------------LOG OUT MODAL----------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const logoutTab = document.getElementById("logout-tab");
    const logoutModal = document.getElementById("logout-modal");
    const closeLogoutModal = document.getElementById("close-logout-modal");
    const confirmLogout = document.getElementById("confirm-logout");
    const cancelLogout = document.getElementById("cancel-logout");

    logoutTab.addEventListener("click", function () {
        logoutModal.style.display = "block";
    });

    closeLogoutModal.addEventListener("click", function () {
        logoutModal.style.display = "none";
    });

    cancelLogout.addEventListener("click", function () {
        logoutModal.style.display = "none";
    });

    confirmLogout.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "signin.html";
    });

    window.addEventListener("click", function (event) {
        if (event.target == logoutModal) {
            logoutModal.style.display = "none";
        }
    });
});