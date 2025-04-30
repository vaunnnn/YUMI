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
                return;
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
        newUsername = newUsername.trim();
        
        if (!newUsername || newUsername === oldUsername) return;

        const credentials = JSON.parse(localStorage.getItem("user-credentials")) || {};


        if (credentials.hasOwnProperty(newUsername)) {
            alert("This username is already taken. Keeping your current username.");

            const usernameDisplay = document.getElementById("username");
            if (usernameDisplay) usernameDisplay.value = oldUsername;
            return;
        }

        if (credentials.hasOwnProperty(oldUsername)) {
            credentials[newUsername] = credentials[oldUsername];
            delete credentials[oldUsername];
            localStorage.setItem("user-credentials", JSON.stringify(credentials));
        }

        const suffixes = [
            "profile",
            "address",
            "profile-pic",
            "cart",
            "wishlist",
            "recently-viewed"
        ];


        suffixes.forEach(suffix => {
        const oldKey = `${oldUsername}-${suffix}`;
        const newKey = `${newUsername}-${suffix}`;
        const value = localStorage.getItem(oldKey);

        if (value !== null) {
            localStorage.setItem(newKey, value);
            localStorage.removeItem(oldKey);
        }

        });


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
const savePasswordBtn = document.getElementById("save-password");
const changePasswordForm = document.getElementById("change-password-form");

openModalBtn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "flex";
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