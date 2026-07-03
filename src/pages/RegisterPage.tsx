import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, SelectField, Button, Card, Alert } from '../components/FormFields';
import { generateId, getHouses, saveHouse, setActiveHouseId } from '../lib/storage';
import type { House } from '../types';

const TAMIL_NADU_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
  'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur',
  'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris',
  'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga',
  'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
  'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
  'Viluppuram', 'Virudhunagar',
].map((d) => ({ value: d, label: d }));

interface FormErrors {
  [key: string]: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const existingHouses = getHouses();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    houseNumber: '',
    streetName: '',
    ward: '',
    village: '',
    district: '',
    pincode: '',
    headOfFamily: '',
    phone: '',
    familyMembers: '1',
    voterId: '',
  });

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

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.houseNumber.trim()) newErrors.houseNumber = 'House number is required';
    if (!form.streetName.trim()) newErrors.streetName = 'Street name is required';
    if (!form.ward.trim()) newErrors.ward = 'Ward number is required';
    if (!form.village.trim()) newErrors.village = 'Village/Town is required';
    if (!form.district) newErrors.district = 'District is required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = 'Valid 6-digit pincode required';
    }
    if (!form.headOfFamily.trim()) newErrors.headOfFamily = 'Head of family name is required';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }
    const members = parseInt(form.familyMembers, 10);
    if (isNaN(members) || members < 1) newErrors.familyMembers = 'At least 1 family member';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const house: House = {
      id: generateId(),
      houseNumber: form.houseNumber.trim(),
      streetName: form.streetName.trim(),
      ward: form.ward.trim(),
      village: form.village.trim(),
      district: form.district,
      pincode: form.pincode.trim(),
      headOfFamily: form.headOfFamily.trim(),
      phone: form.phone.trim(),
      familyMembers: parseInt(form.familyMembers, 10),
      voterId: form.voterId.trim() || undefined,
      registeredAt: new Date().toISOString(),
    };

    saveHouse(house);
    setActiveHouseId(house.id);
    setSuccess(true);
    setTimeout(() => navigate('/complaint'), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-tvk-black">House Registration</h2>
        <p className="text-gray-600 mt-1">வீடு பதிவு — Register your household with TVK district office</p>
      </div>

      {success && (
        <Alert type="success">
          Registration successful! Redirecting to complaint form...
        </Alert>
      )}

      {existingHouses.length > 0 && (
        <Card>
          <p className="text-sm font-medium text-gray-700 mb-2">Previously registered houses:</p>
          <ul className="space-y-2">
            {existingHouses.map((h) => (
              <li key={h.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                <span>
                  <strong>{h.headOfFamily}</strong> — {h.houseNumber}, {h.streetName}, Ward {h.ward}
                </span>
                <Button
                  variant="outline"
                  className="text-xs px-3 py-1"
                  type="button"
                  onClick={() => {
                    setActiveHouseId(h.id);
                    navigate('/dashboard');
                  }}
                >
                  Select
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Address Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField
              label="House / Door Number"
              labelTa="வீட்டு எண்"
              value={form.houseNumber}
              onChange={(e) => updateField('houseNumber', e.target.value)}
              error={errors.houseNumber}
              required
              placeholder="e.g. 12A"
            />
            <TextField
              label="Street Name"
              labelTa="தெரு பெயர்"
              value={form.streetName}
              onChange={(e) => updateField('streetName', e.target.value)}
              error={errors.streetName}
              required
              placeholder="e.g. Anna Street"
            />
            <TextField
              label="Ward Number"
              labelTa="வார்டு எண்"
              value={form.ward}
              onChange={(e) => updateField('ward', e.target.value)}
              error={errors.ward}
              required
              placeholder="e.g. 15"
            />
            <TextField
              label="Village / Town"
              labelTa="கிராமம் / நகரம்"
              value={form.village}
              onChange={(e) => updateField('village', e.target.value)}
              error={errors.village}
              required
            />
            <SelectField
              label="District"
              labelTa="மாவட்டம்"
              value={form.district}
              onChange={(e) => updateField('district', e.target.value)}
              error={errors.district}
              options={TAMIL_NADU_DISTRICTS}
              required
            />
            <TextField
              label="Pincode"
              labelTa="அஞ்சல் குறியீடு"
              value={form.pincode}
              onChange={(e) => updateField('pincode', e.target.value)}
              error={errors.pincode}
              required
              maxLength={6}
              placeholder="600001"
            />
          </div>

          <h3 className="font-semibold text-gray-800 border-b pb-2 pt-2">Family Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField
              label="Head of Family"
              labelTa="குடும்பத் தலைவர்"
              value={form.headOfFamily}
              onChange={(e) => updateField('headOfFamily', e.target.value)}
              error={errors.headOfFamily}
              required
            />
            <TextField
              label="Mobile Number"
              labelTa="கைபேசி எண்"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              error={errors.phone}
              required
              maxLength={10}
              placeholder="9876543210"
            />
            <TextField
              label="Family Members"
              labelTa="குடும்ப உறுப்பினர்கள்"
              type="number"
              min={1}
              value={form.familyMembers}
              onChange={(e) => updateField('familyMembers', e.target.value)}
              error={errors.familyMembers}
              required
            />
            <TextField
              label="Voter ID (Optional)"
              labelTa="வாக்காளர் அடையாள அட்டை"
              value={form.voterId}
              onChange={(e) => updateField('voterId', e.target.value)}
              placeholder="ABC1234567"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              Register House
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
