// Switches between the Login form and the Signup form
function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
}
function login() {
    // Redirects directly to the home screen
    window.location.href = "home.html";
}

function signup() {
    // Redirects directly to the home screen
    window.location.href = "home.html";
}
    alert("Connecting to database... Next we will load your personalized gaming dashboard!");

// Temporary signup action to collect onboarding data
function signup() {
    const name = document.getElementById('user-name').value;
    const age = document.getElementById('user-age').value;
    const condition = document.getElementById('user-condition').value;
    const medName = document.getElementById('med-name').value;
    const medTime = document.getElementById('med-time').value;

    // Validation check to make sure they filled everything out
    if (!name || !medName || !medTime) {
        alert("Please fill in your name, medicine, and reminder time!");
        return;
    }

    alert(`Account profile created for ${name}! Main focus: ${condition}. We will track your ${medName} at ${medTime}.`);
}