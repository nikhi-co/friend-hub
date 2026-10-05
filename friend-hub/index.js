const enterHubButton = document.getElementById("enterHubBtn");

enterHubButton.addEventListener("click", () => {
    const hubName = document.getElementById("hubName").value.trim();
    const hubCode = document.getElementById("hubCode").value.trim();

    if (!hubName || !hubCode) {
        alert("♡ Please enter your hub name and hub code!");
        return;
    }

    sessionStorage.setItem("loginHubName", hubName);
    sessionStorage.setItem("loginHubCode", hubCode);

    window.location.href = "accountlogin.html";
});