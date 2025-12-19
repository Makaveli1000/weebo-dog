// app.module.js (your main application JavaScript file)

// =======================================================================
// --- ADD ALL IMPORTS HERE AT THE VERY TOP OF THE FILE ---
// =======================================================================
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp as firestoreServerTimestamp, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, validatePassword, createUserWithEmailAndPassword, updatePassword, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getRemoteConfig } from 'firebase/remote-config';

// -----------------------------------------------------------------------
// --- Firebase Configuration ---
// Using your remembered project details - ENSURE YOUR_WEB_API_KEY and YOUR_WEB_APP_ID are replaced!
// -----------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "YOUR_WEB_API_KEY", // <--- IMPORTANT: Replace with your actual Web API Key
    authDomain: "sntlmoexclusivesportsgrid.firebaseapp.com",
    projectId: "sntlmoexclusivesportsgrid",
    storageBucket: "sntlmoexclusivesportsgrid.appspot.com",
    messagingSenderId: "735791748207",
    appId: "YOUR_WEB_APP_ID" // <--- IMPORTANT: Replace with your actual Web App ID
};

// Initialize Firebase App and Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the auth instance once
const db = getFirestore(app); // Get the Firestore instance once
// const storage = getStorage(app); // Uncomment if you use Storage
// const remoteConfig = getRemoteConfig(app); // Uncomment if you use Remote Config

// Function to hide the loading overlay
function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Get common DOM elements ---
    const loadingOverlay = document.getElementById('loading-overlay');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorDisplay = document.getElementById('login-error');
    const headerAuthBtn = document.getElementById('header-auth-btn');
    const accountBtn = document.getElementById('account-btn');
    const zeusAvatarSvg = document.getElementById('zeus-avatar-svg'); // Corrected ID from HTML
    const logoutBtn = document.getElementById('logout-btn'); // Corrected ID from HTML
    const accountModal = document.getElementById('account-modal');
    const accountNewPasswordInput = document.getElementById('account-new-password');
    const accountPasswordError = document.getElementById('account-password-error');
    const updatePasswordBtn = document.getElementById('update-password-btn'); // Corrected ID from HTML (button within div)
    const loginModal = document.getElementById('login-modal');


    // -----------------------------------------------------------------------
    // --- onAuthStateChanged Listener ---
    // This is now inside DOMContentLoaded to ensure all referenced elements exist.
    // -----------------------------------------------------------------------
    onAuthStateChanged(auth, async (user) => {
        console.log("Authentication state changed. User:", user ? user.uid : "No user");

        // Update global state
        window.isLoggedIn = !!user; // true if user exists, false otherwise
        window.currentUserId = user ? user.uid : null;

        // Update UI visibility based on auth state
        if (user) {
            // User is signed in
            if (headerAuthBtn) headerAuthBtn.classList.add('hidden');
            if (accountBtn) accountBtn.classList.remove('hidden');
            if (zeusAvatarSvg) zeusAvatarSvg.style.opacity = '1'; // Make Zeus visible
            if (logoutBtn) logoutBtn.classList.remove('hidden'); // Show logout button if exists

            // Optionally fetch user profile data from Firestore here if needed for UI
            // Example for `account-premium-status` and `account-uid`:
            // const accountUidSpan = document.getElementById('account-uid');
            // const accountPremiumStatusSpan = document.getElementById('account-premium-status');
            // if (accountUidSpan) accountUidSpan.textContent = user.uid;

            // try {
            //     const userProfileDocRef = doc(db, 'artifacts', 'YOUR_APP_ID_HERE', 'users', user.uid, 'profile', 'info');
            //     const userProfileSnap = await getDoc(userProfileDocRef);
            //     if (userProfileSnap.exists()) {
            //         const profileData = userProfileSnap.data();
            //         console.log("User profile data:", profileData);
            //         if (accountPremiumStatusSpan) {
            //             accountPremiumStatusSpan.textContent = profileData.isPro ? 'PRO MEMBER' : 'STANDARD';
            //             if (profileData.isPro) accountPremiumStatusSpan.classList.add('text-green-600');
            //             else accountPremiumStatusSpan.classList.remove('text-green-600');
            //         }
            //         const accountNicknameInput = document.getElementById('account-nickname');
            //         if (accountNicknameInput) accountNicknameInput.value = profileData.nickname || '';
            //     }
            // } catch (error) {
            //     console.error("Error fetching user profile:", error);
            // }

        } else {
            // User is signed out
            if (headerAuthBtn) headerAuthBtn.classList.remove('hidden');
            if (accountBtn) accountBtn.classList.add('hidden');
            if (zeusAvatarSvg) zeusAvatarSvg.style.opacity = '0'; // Hide Zeus
            if (logoutBtn) logoutBtn.classList.add('hidden'); // Hide logout button

            // Hide any open modals related to authentication/account
            if (loginModal) loginModal.classList.add('hidden');
            if (accountModal) accountModal.classList.add('hidden');
        }
        // This is a good place to hide the overall loading overlay once auth state is determined
        hideLoadingOverlay();
    });

    // --- Sign Out Button Listener ---
    if (logoutBtn) { // Changed to logoutBtn based on HTML ID
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                console.log("User signed out.");
                // onAuthStateChanged will handle UI updates
            } catch (error) {
                console.error("Error signing out:", error);
            }
        });
    }

    // *** Register button event listener ***
    const registerAuthBtn = document.getElementById('register-auth-btn');
    if (registerAuthBtn) {
        registerAuthBtn.addEventListener('click', async () => {
            console.log("Register button clicked. Initiating registration process.");
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
                loginErrorDisplay.classList.remove('text-green-500');
                loginErrorDisplay.classList.add('text-red-500');
            }

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            if (!email || !password) {
                loginErrorDisplay.textContent = 'Please enter both email and password for registration.';
                return;
            }

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
                loginErrorDisplay.classList.remove('text-red-500');
                loginErrorDisplay.classList.add('text-green-500');
                if (loginModal) loginModal.classList.add('hidden');
            } catch (error) {
                console.error("Registration failed:", error.code, error.message);
                loginErrorDisplay.classList.remove('text-green-500');
                loginErrorDisplay.classList.add('text-red-500');
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

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Login form submitted via JavaScript, default browser action prevented.");

            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
                loginErrorDisplay.classList.remove('text-green-500');
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

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User logged in:", user.uid);
                if (loginModal) loginModal.classList.add('hidden');
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

    if (headerAuthBtn) {
        headerAuthBtn.addEventListener('click', () => {
            if (loginModal) loginModal.classList.remove('hidden');
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPasswordInput) loginPasswordInput.value = '';
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
                loginErrorDisplay.classList.remove('text-green-500');
                loginErrorDisplay.classList.add('text-red-500');
            }
        });
    }

    // *** Account button event listener ***
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            if (accountModal) {
                accountModal.classList.remove('hidden');
                // Populate account details when modal opens
                const accountUidSpan = document.getElementById('account-uid');
                const accountPremiumStatusSpan = document.getElementById('account-premium-status');
                const accountNicknameInput = document.getElementById('account-nickname');

                if (auth.currentUser) {
                    if (accountUidSpan) accountUidSpan.textContent = auth.currentUser.uid;
                    // You'll need to fetch user profile data from Firestore to populate premium status and nickname
                    // This is commented out to avoid clutter, but you'd put your Firestore fetch logic here.
                    // For now, it will show default or last loaded values.
                    if (accountPremiumStatusSpan) accountPremiumStatusSpan.textContent = 'Loading...'; // Placeholder
                    if (accountNicknameInput) accountNicknameInput.value = ''; // Placeholder
                }
            }
        });
    }

    // *** Change Password functionality ***
    // NOTE: Your HTML does not have a <form id="change-password-form">.
    // We're attaching the listener directly to the "Update Password" button.
    if (updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent default button action

            accountPasswordError.textContent = '';
            accountPasswordError.classList.remove('text-green-500');
            accountPasswordError.classList.add('text-red-500');

            const newPassword = accountNewPasswordInput.value;
            if (!newPassword) {
                accountPasswordError.textContent = 'Please enter a new password.';
                return;
            }

            const user = auth.currentUser;

            if (user) {
                // --- Optional: Client-side password policy validation ---
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
                    await updatePassword(user, newPassword);
                    accountPasswordError.textContent = 'Password updated successfully!';
                    accountPasswordError.classList.remove('text-red-500');
                    accountPasswordError.classList.add('text-green-500');
                    accountNewPasswordInput.value = '';
                    console.log("User password updated.");
                } catch (error) {
                    console.error("Error updating password:", error.code, error.message);
                    accountPasswordError.classList.remove('text-green-500');
                    accountPasswordError.classList.add('text-red-500');
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


    // *** Close Account Modal button listener ***
    const closeAccountModalBtn = document.getElementById('close-account-modal-btn');
    if (closeAccountModalBtn) {
        closeAccountModalBtn.addEventListener('click', () => {
            if (accountModal) {
                accountModal.classList.add('hidden');
                accountNewPasswordInput.value = '';
                accountPasswordError.textContent = '';
                accountPasswordError.classList.remove('text-green-500');
                accountPasswordError.classList.add('text-red-500');
            }
        });
    }

    const closeLoginModalBtn = document.getElementById('close-login-modal-btn');
    if (closeLoginModalBtn) {
        closeLoginModalBtn.addEventListener('click', () => {
            if (loginModal) loginModal.classList.add('hidden');
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
                loginErrorDisplay.classList.remove('text-green-500');
                loginErrorDisplay.classList.add('text-red-500');
            }
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPasswordInput) loginPasswordInput.value = '';
        });
    }

    // --- Other initializations (e.g., QR Code generation) ---
    // Make sure qrcode.js library is loaded and QR code generation happens after DOMContentLoaded
    if (typeof QRCode !== 'undefined') { // Check if QRCode library is available
        const loginQrcodeContainer = document.getElementById('login-qrcode');
        if (loginQrcodeContainer) {
            new QRCode(loginQrcodeContainer, {
                text: "https://your-app-domain.com/login-redirect?qr=true", // Replace with your actual QR login URL
                width: 100,
                height: 100,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }
        const cashappQrcodeContainer = document.getElementById('cashapp-qrcode');
        if (cashappQrcodeContainer) {
            new QRCode(cashappQrcodeContainer, {
                text: "$Mac100dime", // Your Cash Tag
                width: 180,
                height: 180,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }
    } else {
        console.warn("qrcode.js library not loaded. QR code generation will not work.");
    }

    // You might also want to hide the loading overlay here if all other initializations are complete
    // Or you can leave it to the onAuthStateChanged listener to hide it, as done above.
    // hideLoadingOverlay();
});
