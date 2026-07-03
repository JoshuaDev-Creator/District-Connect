export interface House {
  id: string;
  houseNumber: string;
  streetName: string;
  ward: string;
  village: string;
  district: string;
  pincode: string;
  headOfFamily: string;
  phone: string;
  familyMembers: number;
  voterId?: string;
  registeredAt: string;
}

export interface Complaint {
  id: string;
  houseId: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  attachments: ComplaintAttachment[];
  submittedAt: string;
  updatedAt: string;
}

export interface ComplaintAttachment {
  id: string;
  name: string;
  type: string;
  dataUrl: string;
}

export type ComplaintCategory =
  | 'water'
  | 'electricity'
  | 'roads'
  | 'drainage'
  | 'health'
  | 'education'
  | 'employment'
  | 'corruption'
  | 'other';

export const COMPLAINT_CATEGORIES: { value: ComplaintCategory; label: string; labelTa: string }[] = [
  { value: 'water', label: 'Water Supply', labelTa: 'நீர் வழங்கல்' },
  { value: 'electricity', label: 'Electricity', labelTa: 'மின்சாரம்' },
  { value: 'roads', label: 'Roads & Transport', labelTa: 'சாலை & போக்குவரத்து' },
  { value: 'drainage', label: 'Drainage & Sanitation', labelTa: 'வடிகால் & சுகாதாரம்' },
  { value: 'health', label: 'Health Services', labelTa: 'சுகாதார சேவைகள்' },
  { value: 'education', label: 'Education', labelTa: 'கல்வி' },
  { value: 'employment', label: 'Employment', labelTa: 'வேலைவாய்ப்பு' },
  { value: 'corruption', label: 'Corruption / Grievance', labelTa: 'ஊழல் / புகார்' },
  { value: 'other', label: 'Other', labelTa: 'மற்றவை' },
];

export const STATUS_LABELS: Record<Complaint['status'], { en: string; ta: string }> = {
  pending: { en: 'Pending', ta: 'நிலுவையில்' },
  'in-progress': { en: 'In Progress', ta: 'செயல்பாட்டில்' },
  resolved: { en: 'Resolved', ta: 'தீர்க்கப்பட்டது' },
  rejected: { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது' },
};
