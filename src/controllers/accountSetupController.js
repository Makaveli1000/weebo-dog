import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const ROLE_COLLECTIONS = {
  athlete: "athletes",
  school: "schools",
  recruiter: "recruiters",
  coach: "coaches",
  parent: "parents",
  media: "media",
  business: "businesses",
  fan: "fans"
};

export function registerAccountSetupHandlers(auth, db) {
  window.selectAccountRole = function(role, button) {
    const roleInput = document.getElementById("setup-role");
    if (roleInput) roleInput.value = role;

    document.querySelectorAll(".account-type-card").forEach((card) => {
      card.classList.remove("active");
    });

    button?.classList.add("active");
  };

  window.handleAccountSetup = async function(e) {
    e.preventDefault();

    const role = document.getElementById("setup-role")?.value;
    const name = document.getElementById("setup-name")?.value.trim();
    const email = document.getElementById("setup-email")?.value.trim();
    const password = document.getElementById("setup-password")?.value;

    const collectionName = ROLE_COLLECTIONS[role];

    if (!collectionName) return alert("Please select a valid account role.");
    if (!name || !email || !password) return alert("Please complete name, email, and password.");

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = credential.user.uid;

      const baseProfile = {
        uid,
        role,
        name,
        email,
        verified: false,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, collectionName, uid), {
        ...baseProfile,
        profileComplete: false
      });

      await setDoc(doc(db, "users", uid), {
        ...baseProfile,
        collectionName
      });

      alert("Account created successfully!");
      e.target.reset();

    } catch (err) {
      console.error("Account creation failed:", err);
      alert(err.message);
    }
  };
}