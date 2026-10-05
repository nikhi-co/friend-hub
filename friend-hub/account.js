const createAccountButton = document.getElementById("createAccountBtn");

createAccountButton.addEventListener("click", async () => {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("accountMessage");

    // Get the hub information saved on the previous page
    const hubName = sessionStorage.getItem("newHubName");
    const hubCode = sessionStorage.getItem("newHubCode");

    // Check that the hub information exists
    if (!hubName || !hubCode) {
        message.textContent = "♡ Something went wrong. Please start again.";
        return;
    }

    // Check the account fields
    if (!username || !password || !confirmPassword) {
        message.textContent = "♡ Please fill in everything!";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "♡ Your passwords don't match!";
        return;
    }

    if (password.length < 6) {
        message.textContent = "♡ Your password needs at least 6 characters!";
        return;
    }

    // Create a temporary email for Supabase Auth.
    // The user never needs to use or share this email.
    const authEmail = `${username.toLowerCase()}@friendhub.local`;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: authEmail,
            password: password
        });

        if (error) {
            message.textContent = "♡ " + error.message;
            return;
        }

        const user = data.user;

        if (!user) {
            message.textContent = "♡ Account couldn't be created. Please try again.";
            return;
        }

        // Save the username in the profile
        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                id: user.id,
                username: username
            });

        if (profileError) {
            message.textContent = "♡ Couldn't create your profile: " + profileError.message;
            return;
        }

        // Create the hub
        const { data: hub, error: hubError } = await supabase
            .from("hubs")
            .insert({
                name: hubName,
                code: hubCode,
                created_by: user.id
            })
            .select()
            .single();

        if (hubError) {
            message.textContent = "♡ Couldn't create the hub: " + hubError.message;
            return;
        }

        // Add the creator as the first member
        const { error: memberError } = await supabase
            .from("hub_members")
            .insert({
                hub_id: hub.id,
                user_id: user.id
            });

        if (memberError) {
            message.textContent = "♡ Couldn't add you to the hub: " + memberError.message;
            return;
        }

        // Save the hub ID for the next page
        sessionStorage.setItem("currentHubId", hub.id);

        // Clear the temporary hub information
        sessionStorage.removeItem("newHubName");
        sessionStorage.removeItem("newHubCode");

        // Go to the hub
        window.location.href = "hub.html";

    } catch (error) {
        console.error(error);
        message.textContent = "♡ Something went wrong. Please try again.";
    }
});