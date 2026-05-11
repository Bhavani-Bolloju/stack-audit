import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { AuditResult } from "./types";

export type LeadData = {
  email: string;
  companyName?: string;
  role?: string;
  auditId: string;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  teamSize: number;
  useCase: string;
  highSavings: boolean;
};

export async function saveLead(
  email: string,
  result: AuditResult
): Promise<void> {
  await addDoc(collection(db, "leads"), {
    email,
    auditId: result.id,
    totalMonthlySavings: result.totalMonthlySavings,
    totalAnnualSavings: result.totalAnnualSavings,
    teamSize: result.teamSize,
    useCase: result.useCase,
    highSavings: result.totalMonthlySavings > 500,
    createdAt: serverTimestamp()
  });
}
