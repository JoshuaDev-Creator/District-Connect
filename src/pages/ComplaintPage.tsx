import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { TextField, SelectField, TextAreaField, Button, Card, Alert } from '../components/FormFields';
import {
  generateId,
  getActiveHouse,
  saveComplaint,
  fileToDataUrl,
} from '../lib/storage';
import {
  COMPLAINT_CATEGORIES,
  type Complaint,
  type ComplaintAttachment,
  type ComplaintCategory,
} from '../types';
import { DISTRICT_NAME, DISTRICT_NAME_TA } from '../data/district';

interface FormErrors {
  [key: string]: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export default function ComplaintPage() {
  const activeHouse = getActiveHouse();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attachments, setAttachments] = useState<ComplaintAttachment[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [form, setForm] = useState({
    category: '' as ComplaintCategory | '',
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  if (!activeHouse) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-4">
        <Card>
          <div className="text-5xl mb-4">🏠</div>
          <h2 className="text-xl font-bold">Register Your House First</h2>
          <p className="text-gray-600 mt-2">
            You need to register your household before submitting a complaint.
          </p>
          <Link to="/register" className="inline-block mt-4">
            <Button>Register Now</Button>
          </Link>
        </Card>
      </div>
    );
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setUploadError('');
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError('Only JPG, PNG, WebP images and PDF files are allowed');
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setUploadError('Each file must be under 5MB');
        continue;
      }
      const dataUrl = await fileToDataUrl(file);
      const attachment: ComplaintAttachment = {
        id: generateId(),
        name: file.name,
        type: file.type,
        dataUrl,
      };
      setAttachments((prev) => [...prev, attachment]);
    }
    e.target.value = '';
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.category) newErrors.category = 'Please select a category';
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim() || form.description.trim().length < 20) {
      newErrors.description = 'Please provide at least 20 characters describing your complaint';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!activeHouse || !validate()) return;

    const complaint: Complaint = {
      id: generateId(),
      houseId: activeHouse.id,
      category: form.category as ComplaintCategory,
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      status: 'pending',
      attachments,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveComplaint(complaint);
    setSuccess(true);
    setForm({ category: '', title: '', description: '', priority: 'medium' });
    setAttachments([]);
  }

  const categoryOptions = COMPLAINT_CATEGORIES.map((c) => ({
    value: c.value,
    label: `${c.label} — ${c.labelTa}`,
  }));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-tvk-black">Submit Complaint — {DISTRICT_NAME}</h2>
        <p className="text-gray-600 mt-1">
          புகார் சமர்ப்பிப்பு — {DISTRICT_NAME_TA} — Filing on behalf of {activeHouse.headOfFamily}
        </p>
      </div>

      {success && (
        <Alert type="success">
          Complaint submitted successfully!{' '}
          <Link to="/dashboard" className="underline font-medium">View your complaints</Link>
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectField
            label="Complaint Category"
            labelTa="புகார் வகை"
            value={form.category}
            onChange={(e) => updateField('category', e.target.value)}
            error={errors.category}
            options={categoryOptions}
            required
          />

          <TextField
            label="Complaint Title"
            labelTa="புகார் தலைப்பு"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            error={errors.title}
            required
            placeholder="Brief summary of your issue"
          />

          <TextAreaField
            label="Detailed Description"
            labelTa="விரிவான விளக்கம்"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            error={errors.description}
            required
            rows={5}
            placeholder="Describe your complaint in detail — location, duration, impact on your family..."
          />

          <SelectField
            label="Priority"
            labelTa="முன்னுரிமை"
            value={form.priority}
            onChange={(e) => updateField('priority', e.target.value)}
            options={[
              { value: 'low', label: 'Low — Can wait' },
              { value: 'medium', label: 'Medium — Needs attention' },
              { value: 'high', label: 'High — Urgent' },
            ]}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Photos / Documents
              <span className="text-gray-400 ml-1">(புகைப்படம் / ஆவணம்)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-tvk-red transition-colors">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-3xl mb-2">📎</div>
                <p className="text-sm text-gray-600">
                  Click to upload photos or PDF documents
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, PDF — Max 5MB each</p>
              </label>
            </div>
            {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

            {attachments.length > 0 && (
              <ul className="space-y-2 mt-3">
                {attachments.map((att) => (
                  <li key={att.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      {att.type.startsWith('image/') ? (
                        <img src={att.dataUrl} alt={att.name} className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <span className="text-lg">📄</span>
                      )}
                      {att.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="text-red-600 hover:text-red-800 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit">Submit Complaint</Button>
            <Link to="/dashboard">
              <Button type="button" variant="outline">View My Complaints</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
