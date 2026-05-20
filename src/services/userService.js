import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";

export async function upsertUserProfile(user) {
  if (!user) return null;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const profile = {
    uid: user.uid,
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    lastLoginAt: serverTimestamp(),
  };

  await setDoc(
    userRef,
    snapshot.exists() ? profile : { ...profile, createdAt: serverTimestamp() },
    { merge: true }
  );

  return profile;
}
