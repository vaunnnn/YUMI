function initProfilePage() {
    const currentUser = localStorage.getItem("currentUser");

    // if (!currentUser) {
    //     alert("You must be logged in to view this page.");
    //     window.location.href = "signin.html";
    //     return;
    // }

    const personalInputs = ["fname", "lname", "email", "phone", "age", "gender"];
    const addressInputs = ["street", "town", "province", "country", "zip", "payment"];
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

            reader.onload = function(e) {
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
    
        // 🚫 Don't proceed if newUsername is the same or empty
        if (!newUsername || newUsername === oldUsername) return;
    
        // ✅ Check if newUsername is already in use (by someone else)
        if (credentials.hasOwnProperty(newUsername)) {
            alert("This username is already taken. Keeping your current username.");
            
            // 🧹 Reset the input field back to old username in the UI
            const usernameDisplay = document.getElementById("username");
            if (usernameDisplay) {
                usernameDisplay.value = oldUsername;
            }
            return;
        }
    
        // ✅ Move credentials to newUsername
        if (credentials.hasOwnProperty(oldUsername)) {
            credentials[newUsername] = credentials[oldUsername];
            delete credentials[oldUsername];
            localStorage.setItem("user-credentials", JSON.stringify(credentials));
        }
    
        // ✅ Move saved profile data
        const profileData = localStorage.getItem(`${oldUsername}-profile`);
        const addressData = localStorage.getItem(`${oldUsername}-address`);
        const profilePic = localStorage.getItem(`${oldUsername}-profile-pic`);
    
        if (profileData) localStorage.setItem(`${newUsername}-profile`, profileData);
        if (addressData) localStorage.setItem(`${newUsername}-address`, addressData);
        if (profilePic) localStorage.setItem(`${newUsername}-profile-pic`, profilePic);
    
        // 🧹 Clean up old keys
        localStorage.removeItem(`${oldUsername}-profile`);
        localStorage.removeItem(`${oldUsername}-address`);
        localStorage.removeItem(`${oldUsername}-profile-pic`);
    
        // 🆕 Set new current user
        localStorage.setItem("currentUser", newUsername);
    
        // 🔁 Reload to apply changes
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
