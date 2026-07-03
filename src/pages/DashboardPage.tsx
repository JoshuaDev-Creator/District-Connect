import { Link } from 'react-router-dom';
import { Button, Card, Alert } from '../components/FormFields';
import { getActiveHouse, getComplaintsByHouse } from '../lib/storage';
import { COMPLAINT_CATEGORIES, STATUS_LABELS, type Complaint } from '../types';
import { DISTRICT_NAME, DISTRICT_NAME_TA } from '../data/district';

function StatusBadge({ status }: { status: Complaint['status'] }) {
  const colors: Record<Complaint['status'], string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const label = STATUS_LABELS[status];
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {label.en} / {label.ta}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Complaint['priority'] }) {
  const colors = {
    low: 'text-gray-500',
    medium: 'text-orange-600',
    high: 'text-red-600 font-semibold',
  };
  return <span className={`text-xs uppercase ${colors[priority]}`}>{priority}</span>;
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const category = COMPLAINT_CATEGORIES.find((c) => c.value === complaint.category);

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
          <p className="text-sm text-gray-500">
            {category?.label} — {category?.labelTa}
          </p>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <p className="text-sm text-gray-700">{complaint.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span>Submitted: {new Date(complaint.submittedAt).toLocaleDateString('en-IN')}</span>
        <PriorityBadge priority={complaint.priority} />
        {complaint.attachments.length > 0 && (
          <span>{complaint.attachments.length} attachment(s)</span>
        )}
      </div>

      {complaint.attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {complaint.attachments.map((att) =>
            att.type.startsWith('image/') ? (
              <a key={att.id} href={att.dataUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={att.dataUrl}
                  alt={att.name}
                  className="w-16 h-16 object-cover rounded border hover:opacity-80"
                />
              </a>
            ) : (
              <a
                key={att.id}
                href={att.dataUrl}
                download={att.name}
                className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-xs hover:bg-gray-200"
              >
                📄 {att.name}
              </a>
            ),
          )}
        </div>
      )}
    </Card>
  );
}

export default function DashboardPage() {
  const activeHouse = getActiveHouse();

  if (!activeHouse) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-4">
        <Card>
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold">No House Registered</h2>
          <p className="text-gray-600 mt-2">
            Register your house to view and track your complaints.
          </p>
          <Link to="/register" className="inline-block mt-4">
            <Button>Register Now</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const complaints = getComplaintsByHouse(activeHouse.id);
  const pending = complaints.filter((c) => c.status === 'pending').length;
  const inProgress = complaints.filter((c) => c.status === 'in-progress').length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-tvk-black">My Complaints — {DISTRICT_NAME}</h2>
          <p className="text-gray-600 mt-1">
            என் புகார்கள் — {DISTRICT_NAME_TA} — {activeHouse.headOfFamily}, Ward {activeHouse.ward}
          </p>
        </div>
        <Link to="/complaint">
          <Button>+ New Complaint</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center !p-4">
          <p className="text-2xl font-bold text-yellow-600">{pending}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </Card>
        <Card className="text-center !p-4">
          <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </Card>
        <Card className="text-center !p-4">
          <p className="text-2xl font-bold text-green-600">{resolved}</p>
          <p className="text-xs text-gray-500">Resolved</p>
        </Card>
      </div>

      {complaints.length === 0 ? (
        <Alert type="info">
          No complaints submitted yet.{' '}
          <Link to="/complaint" className="underline font-medium">Submit your first complaint</Link>
        </Alert>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}
