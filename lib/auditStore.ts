import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { AuditResult } from "./types";

export async function saveAuditResult(result: AuditResult): Promise<void> {
  await addDoc(collection(db, "audits"), {
    ...result,
    createdAt: new Date().toISOString()
  });
}

export async function getAuditResult(id: string): Promise<AuditResult | null> {
  const q = query(collection(db, "audits"), where("id", "==", id));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as AuditResult;
}
