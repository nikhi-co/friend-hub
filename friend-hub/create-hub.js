const continueButton = document.getElementById("continueBtn");

continueButton.addEventListener("click", () => {
    const hubName = document.getElementById("newHubName").value.trim();
    const hubCode = document.getElementById("newHubCode").value.trim();

    if (!hubName || !hubCode) {
        alert("♡ Please enter a hub name and hub code!");
        return;
    }

    // Temporarily save the hub information
    sessionStorage.setItem("newHubName", hubName);
    sessionStorage.setItem("newHubCode", hubCode);

    // Go to the account creation page
    window.location.href = "account.html";
});