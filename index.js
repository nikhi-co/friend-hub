const enterHubButton = document.getElementById("enterHubBtn");

enterHubButton.addEventListener("click", () => {
    const hubName = document.getElementById("hubName").value.trim();
    const hubCode = document.getElementById("hubCode").value.trim();

    if (!hubName || !hubCode) {
        alert("♡ Please enter your hub name and hub code!");
        return;
    }

    // Keep the hub information while moving to account login
    sessionStorage.setItem("loginHubName", hubName);
    sessionStorage.setItem("loginHubCode", hubCode);

    // Go to the separate account login page
    window.location.href = "accountlogin.html";
});
<script src="index.js"></script>