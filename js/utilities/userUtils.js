
export function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

export function getUserData(type) {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    return JSON.parse(localStorage.getItem(`${currentUser}-${type}`)) || {};
}

export function setUserData(type, data) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    localStorage.setItem(`${currentUser}-${type}`, JSON.stringify(data));
}   

export function getProfilePic() {
    const currentUser = getCurrentUser();
    return localStorage.getItem(`${currentUser}-profile-pic`) || "/images/profile.png";
}

export function setProfilePic(dataURL) {
    const currentUser = getCurrentUser();
    if (currentUser) {
        localStorage.setItem(`${currentUser}-profile-pic`, dataURL);
    }
}

export function formatDate(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
}

export function updateLocalStorage(currentUser, cartItems) {
    return localStorage.setItem(`${currentUser}-cart`, JSON.stringify(cartItems));
}