fetch(`http://localhost:3000/check-session`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        document.getElementById("auth-login-button").style.display = "none"
        document.getElementById("auth-logout-button").className = "auth-button"
        document.getElementById("login-menu").style.display = "none"
    } else {
        document.getElementById("auth-logout-button").style.display = "none"
        document.getElementById("add-item-bttn").style.display = "none";
        document.getElementById("remove-item-bttn").style.display = "none";
        document.getElementById("update-item-bttn").style.display = "none";
        document.getElementById("remove-selected-item-bttn").style.display = "none";
        document.getElementById("update-selected-item-bttn").style.display = "none";

    }
})
