import { AuditFormData } from "./types";

const STORAGE_KEY = "stackaudit_form_data";

export function saveFormData(data: AuditFormData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFormData(): AuditFormData | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuditFormData;
  } catch {
    return null;
  }
}

export function clearFormData(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}

