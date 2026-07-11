import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export function subscribeAthletes(db, callback) {
  return onSnapshot(collection(db, "athletes"), (snapshot) => {
    const athletes = snapshot.docs.map((item) => ({
      id: item.id,
      data: item.data()
    }));

    callback(athletes);
  });
}

export function createAthlete(db, athlete) {
  return addDoc(collection(db, "athletes"), {
    ...athlete,
    createdAt: serverTimestamp()
  });
}

export function updateAthlete(db, id, updates) {
  return updateDoc(doc(db, "athletes", id), {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export function deleteAthlete(db, id) {
  return deleteDoc(doc(db, "athletes", id));
}