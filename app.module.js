// app.module.js (your main application JavaScript file)

// =======================================================================
// --- ADD ALL IMPORTS HERE AT THE VERY TOP OF THE FILE ---
// =======================================================================
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp as firestoreServerTimestamp, doc, getDoc } from 'firebase/firestore';
// *** UPDATED IMPORTS: Added validatePassword, createUserWithEmailAndPassword, AND updatePassword ***
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, validatePassword, createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getRemoteConfig } from 'firebase/remote-config';

// ... (rest of your existing code - no changes needed until the DOMContentLoaded listener) ...


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorDisplay = document.getElementById('login-error');

    // *** NEW: Event listener for Register button ***
    const registerAuthBtn = document.getElementById('register-auth-btn');
    if (registerAuthBtn) {
        registerAuthBtn.addEventListener('click', async () => { // Changed to async to handle createUserWithEmailAndPassword
            console.log("Register button clicked. Initiating registration process.");
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = ''; // Clear previous errors
                loginErrorDisplay.classList.remove('text-green-500'); // Ensure it's red for errors
                loginErrorDisplay.classList.add('text-red-500');
            }

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            if (!email || !password) {
                loginErrorDisplay.textContent = 'Please enter both email and password for registration.';
                return;
            }

            const auth = getAuth(); // Get the auth instance

            // *** Optional: Client-side password policy validation for REGISTRATION ***
            // Uncomment and configure if you have password policies set in Firebase Console
            /*
            try {
                const passwordPolicyStatus = await validatePassword(auth, password);
                if (!passwordPolicyStatus.isValid) {
                    let feedback = "Password does not meet requirements: ";
                    if (passwordPolicyStatus.meetsMinPasswordLength === false) feedback += "minimum length, ";
                    if (passwordPolicyStatus.containsLowercaseLetter === false) feedback += "lowercase, ";
                    if (passwordPolicyStatus.containsUppercaseLetter === false) feedback += "uppercase, ";
                    if (passwordPolicyStatus.containsNumericCharacter === false) feedback += "numeric, ";
                    if (passwordPolicyStatus.containsNonAlphanumericCharacter === false) feedback += "special character, ";
                    loginErrorDisplay.textContent = feedback.slice(0, -2) + ".";
                    return;
                }
            } catch (policyError) {
                console.error("Error validating password policy:", policyError);
                loginErrorDisplay.textContent = "Error checking password policy.";
                return;
            }
            */

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("New user registered:", user.uid);
                loginErrorDisplay.textContent = 'Registration successful! You are now logged in.';
                loginErrorDisplay.classList.remove('text-red-500'); // Change color for success
                loginErrorDisplay.classList.add('text-green-500');
                const loginModal = document.getElementById('login-modal');
                if (loginModal) loginModal.classList.add('hidden');
                // The onAuthStateChanged listener will handle updating global state and Zeus visibility
            } catch (error) {
                console.error("Registration failed:", error.code, error.message);
                loginErrorDisplay.classList.remove('text-green-500');
                loginErrorDisplay.classList.add('text-red-500'); // Ensure error color
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        loginErrorDisplay.textContent = 'This email is already registered. Try logging in.';
                        break;
                    case 'auth/invalid-email':
                        loginErrorDisplay.textContent = 'Please enter a valid email address.';
                        break;
                    case 'auth/weak-password':
                        loginErrorDisplay.textContent = 'Password is too weak. Please choose a stronger one (min 6 chars recommended).';
                        break;
                    default:
                        loginErrorDisplay.textContent = `Registration failed: ${error.message}`;
                        break;
                }
            }
        });
    }
    // *** END NEW: Event listener for Register button ***


    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Login form submitted via JavaScript, default browser action prevented.");

            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = ''; // Clear previous errors
                loginErrorDisplay.classList.remove('text-green-500'); // Ensure it's red for errors
                loginErrorDisplay.classList.add('text-red-500');
            }

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            if (!email || !password) {
                if (loginErrorDisplay) {
                    loginErrorDisplay.textContent = 'Please enter both email and password.';
                }
                return;
            }

            const auth = getAuth(); // Get the auth instance

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User logged in:", user.uid);
                const loginModal = document.getElementById('login-modal');
                if (loginModal) loginModal.classList.add('hidden');
                // The onAuthStateChanged listener will now handle updating global state and Zeus visibility
                // window.isLoggedIn = true;
                // window.currentUserId = user.uid;
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Login failed:", errorCode, errorMessage);
                if (loginErrorDisplay) {
                    switch(errorCode) {
                        case 'auth/user-not-found':
                        case 'auth/wrong-password':
                            loginErrorDisplay.textContent = 'Invalid email or password.';
                            break;
                        case 'auth/invalid-email':
                            loginErrorDisplay.textContent = 'Please enter a valid email address.';
                            break;
                        case 'auth/too-many-requests':
                            loginErrorDisplay.textContent = 'Too many failed login attempts. Please try again later.';
                            break;
                        case 'auth/user-disabled':
                            loginErrorDisplay.textContent = 'Your account has been disabled.';
                            break;
                        default:
                            loginErrorDisplay.textContent = `Login failed: ${errorMessage}`;
                            break;
                    }
                }
            }
        });
    }

    const headerAuthBtn = document.getElementById('header-auth-btn');
    if (headerAuthBtn) {
        headerAuthBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.classList.remove('hidden');
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPasswordInput) loginPasswordInput.value = '';
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
                loginErrorDisplay.classList.remove('text-green-500'); // Reset color
                loginErrorDisplay.classList.add('text-red-500');
            }
        });
    }

    // *** NEW: Account button event listener ***
    const accountBtn = document.getElementById('account-btn');
    const accountModal = document.getElementById('account-modal');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            if (accountModal) {
                accountModal.classList.remove('hidden');
                // Optionally populate account details here if they aren't reactive
            }
        });
    }
    // *** END NEW ***

    // *** NEW: Change Password Form submission listener ***
    const changePasswordForm = document.getElementById('change-password-form');
    const accountNewPasswordInput = document.getElementById('account-new-password');
    const accountPasswordError = document.getElementById('account-password-error');

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            accountPasswordError.textContent = ''; // Clear previous errors
            accountPasswordError.classList.remove('text-green-500'); // Reset color
            accountPasswordError.classList.add('text-red-500'); // Ensure it's red for errors

            const newPassword = accountNewPasswordInput.value;
            if (!newPassword) {
                accountPasswordError.textContent = 'Please enter a new password.';
                return;
            }

            const auth = getAuth(); // Get auth instance
            const user = auth.currentUser; // Get current logged-in user

            if (user) {
                // --- Optional: Client-side password policy validation for changing password ---
                /*
                try {
                    const passwordPolicyStatus = await validatePassword(auth, newPassword);
                    if (!passwordPolicyStatus.isValid) {
                        let feedback = "New password does not meet requirements: ";
                        if (passwordPolicyStatus.meetsMinPasswordLength === false) feedback += "minimum length, ";
                        if (passwordPolicyStatus.containsLowercaseLetter === false) feedback += "lowercase, ";
                        if (passwordPolicyStatus.containsUppercaseLetter === false) feedback += "uppercase, ";
                        if (passwordPolicyStatus.containsNumericCharacter === false) feedback += "numeric, ";
                        if (passwordPolicyStatus.containsNonAlphanumericCharacter === false) feedback += "special character, ";
                        accountPasswordError.textContent = feedback.slice(0, -2) + ".";
                        return;
                    }
                } catch (policyError) {
                    console.error("Error validating password policy:", policyError);
                    accountPasswordError.textContent = "Error checking password policy for new password.";
                    return;
                }
                */

                try {
                    await updatePassword(user, newPassword); // Make sure 'updatePassword' is imported
                    accountPasswordError.textContent = 'Password updated successfully!';
                    accountPasswordError.classList.remove('text-red-500');
                    accountPasswordError.classList.add('text-green-500');
                    accountNewPasswordInput.value = ''; // Clear the input field
                    console.log("User password updated.");
                } catch (error) {
                    console.error("Error updating password:", error.code, error.message);
                    accountPasswordError.classList.remove('text-green-500');
                    accountPasswordError.classList.add('text-red-500');
                    // Provide user-friendly error messages based on error.code
                    if (error.code === 'auth/weak-password') {
                        accountPasswordError.textContent = 'New password is too weak. Please choose a stronger one.';
                    } else if (error.code === 'auth/requires-recent-login') {
                         accountPasswordError.textContent = 'This is a security-sensitive operation. Please log out and log back in, then try changing your password again.';
                    } else {
                        accountPasswordError.textContent = `Error updating password: ${error.message}`;
                    }
                }
            } else {
                accountPasswordError.textContent = 'No user is currently logged in. Please log in to change your password.';
            }
        });
    }
    // *** END NEW ***


    // *** NEW: Close Account Modal button listener ***
    const closeAccountModalBtn = document.getElementById('close-account-modal-btn');
    if (closeAccountModalBtn) {
        closeAccountModalBtn.addEventListener('click', () => {
            if (accountModal) {
                accountModal.classList.add('hidden');
                // Optionally clear password fields/error messages when closing
                accountNewPasswordInput.value = '';
                accountPasswordError.textContent = '';
                accountPasswordError.classList.remove('text-green-500');
                accountPasswordError.classList.add('text-red-500');
            }
        });
    }
    // *** END NEW ***


    const closeLoginModalBtn = document.getElementById('close-login-modal-btn');
    if (closeLoginModalBtn) {
        closeLoginModalBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.classList.add('hidden');
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
                loginErrorDisplay.classList.remove('text-green-500'); // Reset color
                loginErrorDisplay.classList.add('text-red-500');
            }
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPasswordInput) loginPasswordInput.value = '';
        });
    }

    // ... (any other event listeners or application logic that needs to run after DOM is ready) ...
});