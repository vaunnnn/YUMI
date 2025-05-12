import { getCurrentUser, getProfilePic, setProfilePic } from '../js/utilities/userUtils.js';

function loadHeaderProfilePic() {
    const headerPicElement = document.getElementById('header-profile-pic');

    const currentUser = getCurrentUser();
    let profilePicSrc = '/images/profile.png';

    if (currentUser) {
        const savedImage = getProfilePic();
        if (savedImage && (savedImage.startsWith('data:image') || savedImage.startsWith('http'))) {
            profilePicSrc = savedImage;
        }
    }

    headerPicElement.src = profilePicSrc;
}

function watchProfilePicChanges() {
    const profileInput = document.getElementById("input-file");

    profileInput.addEventListener("change", (event) => {
        const headerPicElement = document.getElementById('header-profile-pic');

        if (event.target.files.length > 0 && headerPicElement) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const dataURL = e.target.result;
                headerPicElement.src = dataURL;
                setProfilePic(dataURL);
            };

            reader.readAsDataURL(file);
        }
    });
}

function watchProfilePicDeletion() {
    const deleteButton = document.getElementById("delete-pic");

    deleteButton.addEventListener("click", () => {
        const headerPicElement = document.getElementById('header-profile-pic');
        const currentUser = getCurrentUser();

        if (!currentUser) {
            console.error("No current user found. Unable to delete profile picture.");
            return;
        }

        if (headerPicElement) {
            headerPicElement.src = '/images/profile.png';
        }

        localStorage.removeItem(`${currentUser}-profile-pic`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderProfilePic();
    watchProfilePicChanges();
    watchProfilePicDeletion();
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        loadHeaderProfilePic();
    }
});
