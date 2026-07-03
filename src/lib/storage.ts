import type { House, Complaint } from '../types';

const HOUSES_KEY = 'tvk_houses';
const COMPLAINTS_KEY = 'tvk_complaints';
const ACTIVE_HOUSE_KEY = 'tvk_active_house';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getHouses(): House[] {
  return readJson<House[]>(HOUSES_KEY, []);
}

export function saveHouse(house: House): void {
  const houses = getHouses();
  const index = houses.findIndex((h) => h.id === house.id);
  if (index >= 0) {
    houses[index] = house;
  } else {
    houses.push(house);
  }
  writeJson(HOUSES_KEY, houses);
}

export function getHouseById(id: string): House | undefined {
  return getHouses().find((h) => h.id === id);
}

export function getActiveHouseId(): string | null {
  return localStorage.getItem(ACTIVE_HOUSE_KEY);
}

export function setActiveHouseId(id: string): void {
  localStorage.setItem(ACTIVE_HOUSE_KEY, id);
}

export function getActiveHouse(): House | undefined {
  const id = getActiveHouseId();
  return id ? getHouseById(id) : undefined;
}

export function getComplaints(): Complaint[] {
  return readJson<Complaint[]>(COMPLAINTS_KEY, []);
}

export function getComplaintsByHouse(houseId: string): Complaint[] {
  return getComplaints()
    .filter((c) => c.houseId === houseId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export function saveComplaint(complaint: Complaint): void {
  const complaints = getComplaints();
  const index = complaints.findIndex((c) => c.id === complaint.id);
  if (index >= 0) {
    complaints[index] = complaint;
  } else {
    complaints.push(complaint);
  }
  writeJson(COMPLAINTS_KEY, complaints);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
