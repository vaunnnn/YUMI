const logoutTab = document.getElementById("logout-tab");
const logoutModal = document.getElementById("logout-modal");
const confirmLogout = document.getElementById("confirm-logout");
const cancelLogout = document.getElementById("cancel-logout");

if (logoutTab && logoutModal && confirmLogout && cancelLogout) {
    logoutTab.addEventListener("click", function () {
        logoutModal.style.display = "flex";
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
}

document.addEventListener("DOMContentLoaded", function () {
    const mainBox = document.getElementById("main-box");
    if (mainBox) {
        requestAnimationFrame(() => {
            mainBox.style.opacity = 1;
        });
    }
});