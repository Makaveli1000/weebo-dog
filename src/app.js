import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

/* ------------------------------
   Firebase config
------------------------------ */
const firebaseConfig =
  window.NETLIFY_FIREBASE_CONFIG ||
  window.__firebase_config ||
  null;

if (!firebaseConfig || !firebaseConfig.apiKey) {
  console.error('Firebase config missing.');

  window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div class="text-center px-6">
          <p class="text-2xl font-black uppercase text-red-500 mb-3">Configuration Error</p>
          <p class="text-sm text-white/80">Firebase setup is missing or invalid.</p>
          <p class="text-xs text-white/60 mt-2">Check env-config.js and remove conflicting inline config.</p>
        </div>
      `;
    }
  });

  throw new Error('Firebase configuration missing.');
}

/* ------------------------------
   Firebase init
------------------------------ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ------------------------------
   Helpers
------------------------------ */
const $ = (id) => document.getElementById(id);

const show = (el) => {
  if (el) el.classList.remove('hidden');
};

const hide = (el) => {
  if (el) el.classList.add('hidden');
};

const setText = (el, value) => {
  if (el) el.textContent = value ?? '';
};

const setHTML = (el, value) => {
  if (el) el.innerHTML = value ?? '';
};

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const formatTimestamp = (ts) => {
  if (!ts?.toDate) return '';
  return ts.toDate().toLocaleString();
};

const minutesAgo = (ts) => {
  if (!ts?.toDate) return 'just now';
  const diff = Date.now() - ts.toDate().getTime();
  const mins = Math.max(0, Math.round(diff / 60000));
  return mins === 0 ? 'just now' : `${mins} min ago`;
};

const isAdminLike = (profile) =>
  profile?.role === 'admin' || profile?.role === 'editor';

/* ------------------------------
   State
------------------------------ */
let currentUser = null;
let currentUserProfile = null;
let presenceHeartbeat = null;

let unsubscribers = {
  athletes: null,
  chat: null,
  presence: null,
  liveFeed: null,
  sportsData: null,
  media: null
};

let els = {};

/* ------------------------------
   Cache DOM
------------------------------ */
function cacheElements() {
  els = {
    loadingOverlay: $('loading-overlay'),

    headerAuthBtn: $('header-auth-btn'),
    accountBtn: $('account-btn'),
    userStatus: $('user-status'),

    paywallContent: $('paywall-content'),
    mainContent: $('main-content'),
    adminPanel: $('admin-panel'),

    loginModal: $('login-modal'),
    accountModal: $('account-modal'),

    loginForm: $('login-form'),
    loginEmail: $('login-email'),
    loginPassword: $('login-password'),
    loginError: $('login-error'),
    loginSubmitBtn: $('login-submit-btn'),

    accountUID: $('account-uid'),
    accountEmail: $('account-email'),
    accountRole: $('account-role'),
    accountPremiumStatus: $('account-premium-status'),
    accountNickname: $('account-nickname'),
    accountNewPassword: $('account-new-password'),
    saveNicknameBtn: $('save-nickname-btn'),
    updatePasswordBtn: $('update-password-btn'),
    logoutBtn: $('logout-btn'),

    addAthleteForm: $('add-athlete-form'),
    playerName: $('player-name'),
    playerSport: $('player-sport'),
    score0: $('score0'),
    score1: $('score1'),
    score2: $('score2'),
    score3: $('score3'),
    score4: $('score4'),
    topAthleteDisplay: $('top-athlete-display'),
    matchGridBody: $('match-grid-body'),

    chatMessages: $('chat-messages'),
    chatMessageInput: $('chat-message-input'),
    sendChatMessageBtn: $('send-chat-message-btn'),

    latestData: $('latest-data'),
    dataStream: $('data-stream'),
    activeUsersList: $('active-users-list'),
    sportsDataDisplay: $('sports-data-display'),

    mediaFileInput: $('media-file-input'),
    lockerUploadBtn: $('locker-upload-btn'),
    lockerMediaDisplay: $('locker-media-display'),
    lockerStatusText: $('locker-status-text'),
    uploadCounterDisplay: $('upload-counter-display'),
    uploadProgressBar: $('upload-progress-bar')
  };
}

/* ------------------------------
   Dynamic UI for missing HTML
------------------------------ */
function ensureLoginErrorElement() {
  if (els.loginError || !els.loginForm) return;

  const errorEl = document.createElement('p');
  errorEl.id = 'login-error';
  errorEl.className = 'text-xs text-red-500 font-bold';
  errorEl.textContent = '';

  const submitBtn =
    els.loginSubmitBtn || els.loginForm.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.insertAdjacentElement('beforebegin', errorEl);
  } else {
    els.loginForm.appendChild(errorEl);
  }

  els.loginError = errorEl;
}

function ensureAccountModal() {
  if ($('account-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'account-modal';
  modal.className =
    'hidden fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4';

  modal.innerHTML = `
    <div class="bg-gray-900 border border-yellow-500/30 p-8 rounded-3xl max-w-md w-full shadow-2xl">
      <h2 class="text-2xl font-black text-yellow-500 mb-4 uppercase italic">My Grid</h2>

      <div class="space-y-3 text-sm">
        <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <p class="text-[10px] uppercase tracking-widest text-gray-500">Email</p>
          <p id="account-email" class="text-white font-bold break-all">N/A</p>
        </div>

        <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <p class="text-[10px] uppercase tracking-widest text-gray-500">UID</p>
          <p id="account-uid" class="text-white font-mono text-xs break-all">N/A</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
            <p class="text-[10px] uppercase tracking-widest text-gray-500">Role</p>
            <p id="account-role" class="text-white font-bold">user</p>
          </div>
          <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
            <p class="text-[10px] uppercase tracking-widest text-gray-500">Membership</p>
            <p id="account-premium-status" class="text-white font-bold">Standard User</p>
          </div>
        </div>

        <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <label for="account-nickname" class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Nickname</label>
          <input id="account-nickname" type="text" class="grid-input" placeholder="Your nickname" />
          <button id="save-nickname-btn" type="button" class="mt-3 w-full bg-yellow-500 text-black font-bold py-2 rounded uppercase">
            Save Nickname
          </button>
        </div>

        <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <label for="account-new-password" class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Update Password</label>
          <input id="account-new-password" type="password" class="grid-input" placeholder="New password" />
          <button id="update-password-btn" type="button" class="mt-3 w-full border border-yellow-500 text-yellow-500 font-bold py-2 rounded uppercase">
            Update Password
          </button>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-3">
        <button id="logout-btn" type="button" class="border border-red-500 text-red-400 font-bold py-2 rounded uppercase">
          Log Out
        </button>
        <button id="close-account-btn" type="button" class="text-gray-400 font-bold py-2 rounded uppercase border border-gray-700">
          Close
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-account-btn')?.addEventListener('click', () => {
    window.toggleAccountModal(false);
  });

  cacheElements();
}

function ensureOptionalUI() {
  ensureLoginErrorElement();
  ensureAccountModal();
}

/* ------------------------------
   Global modal functions
------------------------------ */
window.toggleLoginModal = function toggleLoginModal(showModal) {
  const modal = $('login-modal');
  if (!modal) return;

  modal.classList.toggle('hidden', !showModal);

  if (showModal) {
    setText($('login-error'), '');
    $('login-email')?.focus();
  }
};

window.toggleAccountModal = function toggleAccountModal(showModal) {
  const modal = $('account-modal');
  if (!modal) return;

  if (showModal) {
    renderAccountPanel();
  }

  modal.classList.toggle('hidden', !showModal);
};

/* ------------------------------
   UI state
------------------------------ */
function setUserStatusText() {
  if (!els.userStatus) return;

  if (!currentUser) {
    els.userStatus.textContent = 'Status: Mortal Vision';
    return;
  }

  const nickname =
    currentUserProfile?.nickname ||
    currentUser.email?.split('@')[0] ||
    'Grid Member';

  els.userStatus.textContent = `Status: ${nickname}`;
}

function renderAccountPanel() {
  setText(els.accountUID, currentUser?.uid || 'N/A');
  setText(els.accountEmail, currentUser?.email || 'N/A');
  setText(els.accountRole, currentUserProfile?.role || 'user');
  setText(
    els.accountPremiumStatus,
    currentUserProfile?.isPro ? 'PRO Member' : 'Standard User'
  );

  if (els.accountNickname) {
    els.accountNickname.value = currentUserProfile?.nickname || '';
  }

  if (els.accountNewPassword) {
    els.accountNewPassword.value = '';
  }
}

function updateMainView() {
  hide(els.loadingOverlay);

  if (currentUser) {
    hide(els.paywallContent);
    show(els.mainContent);
    hide(els.headerAuthBtn);
    show(els.accountBtn);
  } else {
    show(els.paywallContent);
    hide(els.mainContent);
    show(els.headerAuthBtn);
    hide(els.accountBtn);
    window.toggleAccountModal(false);
  }

  if (els.adminPanel) {
    if (currentUser && isAdminLike(currentUserProfile)) {
      show(els.adminPanel);
    } else {
      hide(els.adminPanel);
    }
  }

  setUserStatusText();
}

function clearRealtimeListeners() {
  Object.values(unsubscribers).forEach((unsub) => {
    if (typeof unsub === 'function') unsub();
  });

  unsubscribers = {
    athletes: null,
    chat: null,
    presence: null,
    liveFeed: null,
    sportsData: null,
    media: null
  };
}

function resetUploadUI() {
  if (els.uploadProgressBar) {
    els.uploadProgressBar.style.width = '0%';
  }

  if (els.lockerUploadBtn) {
    els.lockerUploadBtn.disabled = false;
    els.lockerUploadBtn.textContent = 'Upload to Grid';
  }
}

/* ------------------------------
   Presence
------------------------------ */
async function markPresence(online = true) {
  if (!currentUser) return;

  try {
    await setDoc(
      doc(db, 'presence', currentUser.uid),
      {
        uid: currentUser.uid,
        email: currentUser.email || '',
        nickname:
          currentUserProfile?.nickname ||
          currentUser.email?.split('@')[0] ||
          'Grid Member',
        online,
        lastSeen: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Presence update failed:', error);
  }
}

function stopPresenceHeartbeat() {
  if (presenceHeartbeat) {
    clearInterval(presenceHeartbeat);
    presenceHeartbeat = null;
  }
}

function startPresenceHeartbeat() {
  stopPresenceHeartbeat();

  if (!currentUser) return;

  markPresence(true);

  presenceHeartbeat = setInterval(() => {
    markPresence(true);
  }, 60000);
}

/* ------------------------------
   Profile
------------------------------ */
async function loadUserProfile(user) {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const fallbackProfile = {
      uid: user.uid,
      email: user.email || '',
      nickname: user.email?.split('@')[0] || 'Grid Member',
      isPro: false,
      role: 'user'
    };

    await setDoc(
      userRef,
      {
        ...fallbackProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    currentUserProfile = fallbackProfile;
    return fallbackProfile;
  }

  currentUserProfile = snap.data();
  return currentUserProfile;
}

async function saveNickname() {
  if (!currentUser || !els.accountNickname) return;

  const nickname = els.accountNickname.value.trim();
  if (!nickname) return;

  try {
    await setDoc(
      doc(db, 'users', currentUser.uid),
      {
        nickname,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    currentUserProfile = {
      ...(currentUserProfile || {}),
      nickname
    };

    setUserStatusText();
    renderAccountPanel();
    await markPresence(true);
  } catch (error) {
    console.error('Nickname save failed:', error);
    alert(`Nickname save failed: ${error.message}`);
  }
}

async function handlePasswordUpdate() {
  if (!currentUser || !els.accountNewPassword) return;

  const newPassword = els.accountNewPassword.value.trim();

  if (!newPassword) {
    alert('Enter a new password first.');
    return;
  }

  if (newPassword.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  try {
    await updatePassword(currentUser, newPassword);
    els.accountNewPassword.value = '';
    alert('Password updated.');
  } catch (error) {
    console.error('Password update failed:', error);
    alert(`Password update failed: ${error.message}`);
  }
}

/* ------------------------------
   Auth
------------------------------ */
window.logIn = async function logIn() {
  const email = els.loginEmail?.value?.trim();
  const password = els.loginPassword?.value || '';

  if (!email || !password) {
    setText(els.loginError, 'Email and password are required.');
    return;
  }

  try {
    setText(els.loginError, '');

    if (els.loginSubmitBtn) {
      els.loginSubmitBtn.disabled = true;
      els.loginSubmitBtn.textContent = 'SIGNING IN...';
    }

    await signInWithEmailAndPassword(auth, email, password);
    window.toggleLoginModal(false);
  } catch (error) {
    console.error('Login failed:', error);
    setText(els.loginError, `Login failed: ${error.message}`);
  } finally {
    if (els.loginSubmitBtn) {
      els.loginSubmitBtn.disabled = false;
      els.loginSubmitBtn.textContent = 'SIGN IN';
    }
  }
};

window.register = async function register() {
  const email = els.loginEmail?.value?.trim();
  const password = els.loginPassword?.value || '';

  if (!email || !password) {
    setText(els.loginError, 'Email and password are required.');
    return;
  }

  if (password.length < 6) {
    setText(els.loginError, 'Password must be at least 6 characters.');
    return;
  }

  try {
    setText(els.loginError, '');

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const nickname = email.split('@')[0];

    await setDoc(
      doc(db, 'users', userCredential.user.uid),
      {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        nickname,
        isPro: false,
        role: 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    window.toggleLoginModal(false);
  } catch (error) {
    console.error('Registration failed:', error);
    setText(els.loginError, `Registration failed: ${error.message}`);
  }
};

window.logOut = async function logOut() {
  try {
    await markPresence(false);
    stopPresenceHeartbeat();
    await signOut(auth);
    window.toggleAccountModal(false);
  } catch (error) {
    console.error('Logout failed:', error);
    alert(`Logout failed: ${error.message}`);
  }
};

/* ------------------------------
   Athletes
------------------------------ */
function getAthleteScoresFromForm() {
  return [
    Number(els.score0?.value || 0),
    Number(els.score1?.value || 0),
    Number(els.score2?.value || 0),
    Number(els.score3?.value || 0),
    Number(els.score4?.value || 0)
  ];
}

async function handleAddAthlete(event) {
  event.preventDefault();

  if (!currentUser) {
    alert('Please log in first.');
    return;
  }

  if (!isAdminLike(currentUserProfile)) {
    alert('Only admin/editor users can deploy athletes.');
    return;
  }

  const name = els.playerName?.value?.trim();
  const sport = els.playerSport?.value || 'Football';
  const scores = getAthleteScoresFromForm();
  const total = scores.reduce((sum, n) => sum + Number(n || 0), 0);

  if (!name) {
    alert('Athlete name is required.');
    return;
  }

  try {
    await addDoc(collection(db, 'athletes'), {
      name,
      sport,
      scores,
      total,
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
      createdByNickname:
        currentUserProfile?.nickname ||
        currentUser.email?.split('@')[0] ||
        'Grid Member'
    });

    els.addAthleteForm?.reset();
  } catch (error) {
    console.error('Add athlete failed:', error);
    alert(`Failed to add athlete: ${error.message}`);
  }
}

window.deleteAthlete = async function deleteAthlete(id) {
  if (!currentUser) {
    alert('Please log in first.');
    return;
  }

  if (!isAdminLike(currentUserProfile)) {
    alert('Only admin/editor users can delete athletes.');
    return;
  }

  const confirmed = window.confirm('Delete this athlete entry?');
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, 'athletes', id));
  } catch (error) {
    console.error('Delete athlete failed:', error);
    alert(`Delete failed: ${error.message}`);
  }
};

function renderAthletes(snapshot) {
  if (!els.matchGridBody) return;

  const athletes = [];
  snapshot.forEach((d) => {
    athletes.push({ id: d.id, ...d.data() });
  });

  athletes.sort((a, b) => Number(b.total || 0) - Number(a.total || 0));
  setHTML(els.matchGridBody, '');

  if (!athletes.length) {
    els.matchGridBody.innerHTML = `
      <tr>
        <td colspan="5" class="p-6 text-center text-sm text-gray-500">
          No athletes deployed yet.
        </td>
      </tr>
    `;
    setText(els.topAthleteDisplay, 'No athletes yet');
    return;
  }

  const top = athletes[0];
  setText(
    els.topAthleteDisplay,
    `${top.name} • ${top.sport} • ${top.total ?? 0}`
  );

  athletes.forEach((athlete) => {
    const scores = Array.isArray(athlete.scores) ? athlete.scores : [];
    const s1 = scores[1] ?? scores[0] ?? 0;
    const s2 = scores[2] ?? scores[1] ?? 0;

    const tr = document.createElement('tr');
    tr.className = 'border-t border-gray-800 bg-black/20';

    tr.innerHTML = `
      <td class="p-3">
        <div class="font-bold uppercase text-white">${escapeHtml(athlete.name || 'Unknown')}</div>
        <div class="text-[10px] uppercase tracking-widest text-gray-500">${escapeHtml(athlete.sport || '')}</div>
      </td>
      <td class="p-3 text-center text-white">${s1}</td>
      <td class="p-3 text-center text-white">${s2}</td>
      <td class="p-3 text-center font-black text-yellow-500">${athlete.total ?? 0}</td>
      <td class="p-3 text-right">
        ${
          currentUser && isAdminLike(currentUserProfile)
            ? `<button
                class="rounded border border-red-500 px-3 py-1 text-[10px] font-black uppercase text-red-400 hover:bg-red-500 hover:text-white"
                onclick="window.deleteAthlete('${athlete.id}')"
              >Delete</button>`
            : `<span class="text-[10px] uppercase text-gray-600">View</span>`
        }
      </td>
    `;

    els.matchGridBody.appendChild(tr);
  });
}

function subscribeToAthletes() {
  if (!els.matchGridBody) return;

  const athletesRef = query(
    collection(db, 'athletes'),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  unsubscribers.athletes = onSnapshot(
    athletesRef,
    renderAthletes,
    (error) => {
      console.error('Athletes listener failed:', error);
      els.matchGridBody.innerHTML = `
        <tr>
          <td colspan="5" class="p-6 text-center text-sm text-red-500">
            Failed to load athletes.
          </td>
        </tr>
      `;
    }
  );
}

/* ------------------------------
   Chat
------------------------------ */
async function sendChatMessage() {
  if (!currentUser) {
    alert('Please log in first.');
    return;
  }

  const text = els.chatMessageInput?.value?.trim();
  if (!text) return;

  try {
    await addDoc(collection(db, 'chatMessages'), {
      uid: currentUser.uid,
      senderNickname:
        currentUserProfile?.nickname ||
        currentUser.email?.split('@')[0] ||
        'Grid Member',
      text,
      timestamp: serverTimestamp()
    });

    els.chatMessageInput.value = '';
  } catch (error) {
    console.error('Send message failed:', error);
    alert(`Message failed: ${error.message}`);
  }
}

function subscribeToChat() {
  if (!els.chatMessages) return;
  if (!currentUser) return;

  const chatRef = query(
    collection(db, 'chatMessages'),
    orderBy('timestamp', 'asc'),
    limit(50)
  );

  unsubscribers.chat = onSnapshot(
    chatRef,
    (snapshot) => {
      setHTML(els.chatMessages, '');

      snapshot.forEach((d) => {
        const msg = d.data();
        const mine = msg.uid === currentUser?.uid;

        const row = document.createElement('div');
        row.className = mine ? 'text-right' : 'text-left';

        row.innerHTML = `
          <div class="inline-block max-w-[85%] rounded-xl px-3 py-2 ${
            mine ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
          }">
            <div class="text-[10px] font-black uppercase opacity-70">
              ${escapeHtml(msg.senderNickname || 'Anon')}
            </div>
            <div class="mt-1 text-sm">${escapeHtml(msg.text || '')}</div>
            <div class="mt-1 text-[10px] opacity-60">
              ${msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString() : ''}
            </div>
          </div>
        `;

        els.chatMessages.appendChild(row);
      });

      els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
    },
    (error) => {
      console.error('Chat listener failed:', error);
      if (els.chatMessages) {
        els.chatMessages.innerHTML = `
          <div class="text-center text-sm text-red-500 py-6">
            Failed to load chat.
          </div>
        `;
      }
    }
  );
}

/* ------------------------------
   Optional sections
------------------------------ */
function subscribeToPresence() {
  if (!els.activeUsersList) return;
  if (!currentUser) return;

  const presenceRef = query(
    collection(db, 'presence'),
    orderBy('lastSeen', 'desc'),
    limit(10)
  );

  unsubscribers.presence = onSnapshot(
    presenceRef,
    (snapshot) => {
      setHTML(els.activeUsersList, '');

      const users = [];
      snapshot.forEach((d) => users.push(d.data()));

      const active = users.filter((u) => u.online !== false);

      if (!active.length) {
        els.activeUsersList.innerHTML =
          '<li class="text-sm text-gray-500">No active users yet.</li>';
        return;
      }

      active.forEach((user) => {
        const li = document.createElement('li');
        li.className =
          'flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-sm';

        li.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-green-500"></span>
            <span class="text-white">${escapeHtml(user.nickname || 'Grid User')}</span>
          </div>
          <span class="text-xs text-gray-500">${minutesAgo(user.lastSeen)}</span>
        `;

        els.activeUsersList.appendChild(li);
      });
    },
    (error) => {
      console.error('Presence listener failed:', error);
      if (els.activeUsersList) {
        els.activeUsersList.innerHTML =
          '<li class="text-sm text-red-500">Failed to load active users.</li>';
      }
    }
  );
}

function subscribeToLiveFeed() {
  if (!els.latestData && !els.dataStream) return;

  const liveRef = doc(db, 'liveFeed', 'latestScore');

  unsubscribers.liveFeed = onSnapshot(
    liveRef,
    (snap) => {
      if (!snap.exists()) {
        setText(els.latestData, 'No live data available.');
        setText(els.dataStream, 'No latestScore document found.');
        return;
      }

      const data = snap.data();
      setText(els.latestData, data.score || 'No score update.');
      setText(els.dataStream, JSON.stringify(data, null, 2));
    },
    (error) => {
      console.error('Live feed listener failed:', error);
      setText(els.latestData, 'Live feed error.');
    }
  );
}

function subscribeToSportsData() {
  if (!els.sportsDataDisplay) return;

  const sportsRef = query(
    collection(db, 'sportsData'),
    orderBy('timestamp', 'desc'),
    limit(10)
  );

  unsubscribers.sportsData = onSnapshot(
    sportsRef,
    (snapshot) => {
      setHTML(els.sportsDataDisplay, '');

      if (snapshot.empty) {
        els.sportsDataDisplay.innerHTML =
          '<p class="text-sm text-gray-500">No sports data submitted yet.</p>';
        return;
      }

      snapshot.forEach((d) => {
        const data = d.data();
        const card = document.createElement('div');
        card.className = 'rounded-xl border border-gray-800 bg-black/40 p-4';

        card.innerHTML = `
          <p class="font-bold text-white">${escapeHtml(data.sport || 'Sport')}: ${escapeHtml(data.score || '-')}</p>
          <p class="mt-1 text-sm text-gray-400">${escapeHtml(data.team1 || '')} vs ${escapeHtml(data.team2 || '')}</p>
          <p class="mt-2 text-[10px] uppercase text-gray-500">
            ${escapeHtml(data.submittedBy || 'Anon')} • ${formatTimestamp(data.timestamp)}
          </p>
        `;

        els.sportsDataDisplay.appendChild(card);
      });
    },
    (error) => {
      console.error('Sports data listener failed:', error);
    }
  );
}

/* ------------------------------
   Optional locker upload
------------------------------ */
function subscribeToUserMedia() {
  if (!els.lockerMediaDisplay) return;

  if (!currentUser) {
    els.lockerMediaDisplay.innerHTML =
      '<p class="col-span-full text-center text-sm text-gray-500">Log in to view your media.</p>';
    setText(els.lockerStatusText, 'Capacity: Log in to see status.');
    setText(els.uploadCounterDisplay, 'Uploads: 0');
    return;
  }

  const mediaRef = query(
    collection(db, 'users', currentUser.uid, 'media'),
    orderBy('uploadedAt', 'desc'),
    limit(12)
  );

  unsubscribers.media = onSnapshot(
    mediaRef,
    (snapshot) => {
      setHTML(els.lockerMediaDisplay, '');

      if (snapshot.empty) {
        els.lockerMediaDisplay.innerHTML =
          '<p class="col-span-full text-center text-sm text-gray-500">No media uploaded yet.</p>';
        setText(els.lockerStatusText, 'Capacity: 0 / 12 items');
        setText(els.uploadCounterDisplay, 'Uploads: 0');
        return;
      }

      let count = 0;

      snapshot.forEach((d) => {
        count += 1;
        const media = d.data();
        const item = document.createElement('div');
        item.className =
          'overflow-hidden rounded-xl border border-gray-800 bg-black/40';

        if (media.type?.startsWith('image/')) {
          item.innerHTML = `
            <img src="${media.url}" alt="${escapeHtml(media.name || 'media')}" class="h-32 w-full object-cover" />
            <div class="p-2 text-[10px] text-gray-400 truncate">${escapeHtml(media.name || '')}</div>
          `;
        } else {
          item.innerHTML = `
            <a href="${media.url}" target="_blank" class="flex h-32 items-center justify-center p-3 text-center text-xs text-yellow-500 hover:underline">
              ${escapeHtml(media.name || 'Open file')}
            </a>
          `;
        }

        els.lockerMediaDisplay.appendChild(item);
      });

      setText(els.lockerStatusText, `Capacity: ${count} / 12 items`);
      setText(els.uploadCounterDisplay, `Uploads: ${count}`);
    },
    (error) => {
      console.error('Media listener failed:', error);
      els.lockerMediaDisplay.innerHTML =
        '<p class="col-span-full text-center text-sm text-red-500">Failed to load media.</p>';
    }
  );
}

window.handleFileUpload = async function handleFileUpload() {
  if (!currentUser) {
    alert('Please log in first.');
    return;
  }

  if (!els.mediaFileInput?.files?.length) {
    alert('Please choose a file first.');
    return;
  }

  const file = els.mediaFileInput.files[0];
  const safeName = `${Date.now()}-${file.name}`;
  const filePath = `user_media/${currentUser.uid}/${safeName}`;
  const fileRef = storageRef(storage, filePath);

  try {
    if (els.lockerUploadBtn) {
      els.lockerUploadBtn.disabled = true;
      els.lockerUploadBtn.textContent = 'Uploading...';
    }

    resetUploadUI();

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (els.uploadProgressBar) {
          els.uploadProgressBar.style.width = `${progress}%`;
        }
      },
      (error) => {
        console.error('Upload failed:', error);
        alert(`Upload failed: ${error.message}`);
        resetUploadUI();
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(db, 'users', currentUser.uid, 'media'), {
          name: file.name,
          storagePath: filePath,
          url,
          type: file.type || 'application/octet-stream',
          uploadedAt: serverTimestamp()
        });

        if (els.mediaFileInput) els.mediaFileInput.value = '';
        resetUploadUI();
      }
    );
  } catch (error) {
    console.error('Upload failed:', error);
    alert(`Upload failed: ${error.message}`);
    resetUploadUI();
  }
};

/* ------------------------------
   Auth state handling
------------------------------ */
async function handleSignedInUser(user) {
  clearRealtimeListeners();
  stopPresenceHeartbeat();

  currentUser = user;
  await loadUserProfile(user);

  renderAccountPanel();
  updateMainView();

  if (els.chatMessageInput) {
    els.chatMessageInput.disabled = false;
    els.chatMessageInput.placeholder = 'Drop report...';
  }

  if (els.sendChatMessageBtn) {
    els.sendChatMessageBtn.disabled = false;
    els.sendChatMessageBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  await markPresence(true);
  startPresenceHeartbeat();

  subscribeToAthletes();
  subscribeToChat();
  subscribeToPresence();
  subscribeToLiveFeed();
  subscribeToSportsData();
  subscribeToUserMedia();
}

function handleSignedOutUser() {
  clearRealtimeListeners();
  stopPresenceHeartbeat();

  currentUser = null;
  currentUserProfile = null;

  updateMainView();

  if (els.accountUID) els.accountUID.textContent = 'N/A';
  if (els.accountEmail) els.accountEmail.textContent = 'N/A';
  if (els.accountRole) els.accountRole.textContent = 'user';
  if (els.accountPremiumStatus) els.accountPremiumStatus.textContent = 'Standard User';
  if (els.accountNickname) els.accountNickname.value = '';
  if (els.accountNewPassword) els.accountNewPassword.value = '';

  subscribeToAthletes();
  subscribeToLiveFeed();
  subscribeToSportsData();

  if (els.chatMessages) {
    els.chatMessages.innerHTML = `
      <div class="text-center text-sm text-gray-500 py-6">
        Log in to enter War Room Chat.
      </div>
    `;
  }

  if (els.chatMessageInput) {
    els.chatMessageInput.value = '';
    els.chatMessageInput.disabled = true;
    els.chatMessageInput.placeholder = 'Log in to chat...';
  }

  if (els.sendChatMessageBtn) {
    els.sendChatMessageBtn.disabled = true;
    els.sendChatMessageBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  if (els.activeUsersList) {
    els.activeUsersList.innerHTML = `
      <li class="text-sm text-gray-500">Log in to view active users.</li>
    `;
  }

  if (els.lockerMediaDisplay) {
    els.lockerMediaDisplay.innerHTML =
      '<p class="col-span-full text-center text-sm text-gray-500">Log in to view your media.</p>';
  }

  setText(els.lockerStatusText, 'Capacity: Log in to see status.');
  setText(els.uploadCounterDisplay, 'Uploads: 0');
  resetUploadUI();
}

/* ------------------------------
   Events
------------------------------ */
function bindEvents() {
  els.loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await window.logIn();
  });

  els.addAthleteForm?.addEventListener('submit', handleAddAthlete);

  els.sendChatMessageBtn?.addEventListener('click', sendChatMessage);

  els.chatMessageInput?.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await sendChatMessage();
    }
  });

  els.saveNicknameBtn?.addEventListener('click', saveNickname);

  els.accountNickname?.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await saveNickname();
    }
  });

  els.updatePasswordBtn?.addEventListener('click', handlePasswordUpdate);
  els.logoutBtn?.addEventListener('click', window.logOut);

  els.lockerUploadBtn?.addEventListener('click', window.handleFileUpload);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      window.toggleLoginModal(false);
      window.toggleAccountModal(false);
    }
  });

  window.addEventListener('beforeunload', () => {
    if (currentUser) {
      markPresence(false);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (!currentUser) return;

    if (document.hidden) {
      markPresence(false);
    } else {
      markPresence(true);
    }
  });
}

/* ------------------------------
   Boot
------------------------------ */
function init() {
  cacheElements();
  ensureOptionalUI();
  cacheElements();
  bindEvents();

  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        await handleSignedInUser(user);
      } else {
        handleSignedOutUser();
      }
    } catch (error) {
      console.error('Auth state handling failed:', error);
      hide(els.loadingOverlay);
      alert(`App error: ${error.message}`);
    } finally {
      hide(els.loadingOverlay);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
