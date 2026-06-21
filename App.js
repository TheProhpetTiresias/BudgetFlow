import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy
} from "./firebase.js";

const authSection = document.getElementById("authSection");
const dashboard = document.getElementById("dashboard");

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const addTxnBtn = document.getElementById("addTxn");
const txnList = document.getElementById("txnList");
const balanceEl = document.getElementById("balance");

let transactions = [];

signupBtn.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value);
};

loginBtn.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value);
};

logoutBtn.onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadTransactions(user.uid);
  } else {
    authSection.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});

addTxnBtn.onclick = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  await addDoc(collection(db, "users", user.uid, "transactions"), {
    desc,
    amount,
    type,
    date: Date.now()
  });
};

function loadTransactions(uid) {
  const q = query(
    collection(db, "users", uid, "transactions"),
    orderBy("date", "desc")
  );

  onSnapshot(q, (snapshot) => {
    transactions = [];
    txnList.innerHTML = "";

    let balance = 0;

    snapshot.forEach(doc => {
      const t = doc.data();
      transactions.push(t);

      const li = document.createElement("li");
      li.textContent = `${t.desc} - $${t.amount} (${t.type})`;
      txnList.appendChild(li);

      balance += t.type === "income" ? t.amount : -t.amount;
    });

    balanceEl.textContent = `$${balance.toFixed(2)}`;
  });
}
