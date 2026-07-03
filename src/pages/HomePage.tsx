import { Link } from 'react-router-dom';
import { Button, Card } from '../components/FormFields';
import {
  HeroLeaderSection,
  KolgaiLeadersSection,
  DistrictLeaderSection,
} from '../components/LeaderSections';
import { getActiveHouse, getComplaintsByHouse } from '../lib/storage';
import { DISTRICT_NAME, DISTRICT_NAME_TA } from '../data/district';

const features = [
  {
    title: 'Register Your House',
    titleTa: 'உங்கள் வீட்டை பதிவு செய்யுங்கள்',
    description: `Every household in ${DISTRICT_NAME} can register with TVK to stay connected with local party representatives.`,
    icon: '🏠',
    link: '/register',
    linkText: 'Register Now',
  },
  {
    title: 'Submit Complaints',
    titleTa: 'புகார்களை சமர்ப்பிக்கவும்',
    description: 'Upload your grievances with photos and documents. Water, roads, electricity, health — we hear you.',
    icon: '📋',
    link: '/complaint',
    linkText: 'File Complaint',
  },
  {
    title: 'Track Progress',
    titleTa: 'முன்னேற்றத்தை கண்காணிக்கவும்',
    description: 'Monitor the status of your submitted complaints from pending to resolved.',
    icon: '📊',
    link: '/dashboard',
    linkText: 'View Dashboard',
  },
];

export default function HomePage() {
  const activeHouse = getActiveHouse();
  const complaintCount = activeHouse ? getComplaintsByHouse(activeHouse.id).length : 0;

  return (
    <div className="space-y-10">
      <div className="text-center">
        <span className="inline-block bg-tvk-red/10 text-tvk-red px-4 py-1.5 rounded-full text-sm font-semibold border border-tvk-red/20">
          {DISTRICT_NAME} — {DISTRICT_NAME_TA} | Tirunelveli
        </span>
      </div>

      <HeroLeaderSection />

      <section className="text-center space-y-4">
        {!activeHouse ? (
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button>Register Your House</Button>
            </Link>
            <Link to="/complaint">
              <Button variant="outline">Submit a Complaint</Button>
            </Link>
          </div>
        ) : (
          <Card className="max-w-md mx-auto text-left">
            <p className="text-sm text-gray-500">Registered as</p>
            <p className="font-semibold text-lg">{activeHouse.headOfFamily}</p>
            <p className="text-gray-600">
              {activeHouse.houseNumber}, {activeHouse.streetName}, Ward {activeHouse.ward}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {complaintCount} complaint{complaintCount !== 1 ? 's' : ''} submitted
            </p>
            <div className="flex gap-2 mt-4">
              <Link to="/complaint">
                <Button className="text-sm">New Complaint</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="text-sm">View Complaints</Button>
              </Link>
            </div>
          </Card>
        )}
      </section>

      <KolgaiLeadersSection />

      <section className="grid sm:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-lg text-tvk-black">{feature.title}</h3>
            <p className="text-sm text-tvk-red mb-1">{feature.titleTa}</p>
            <p className="text-gray-600 text-sm flex-1">{feature.description}</p>
            <Link to={feature.link} className="mt-4">
              <Button variant="outline" className="w-full text-sm">
                {feature.linkText}
              </Button>
            </Link>
          </Card>
        ))}
      </section>

      <DistrictLeaderSection />

      <section className="bg-tvk-black text-white rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-tvk-gold mb-2">How It Works</h3>
        <div className="grid sm:grid-cols-3 gap-6 mt-6 text-sm">
          <div>
            <div className="w-8 h-8 bg-tvk-gold text-tvk-black rounded-full flex items-center justify-center font-bold mx-auto mb-2">1</div>
            <p className="font-medium">Register your house with address and contact details</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-tvk-gold text-tvk-black rounded-full flex items-center justify-center font-bold mx-auto mb-2">2</div>
            <p className="font-medium">Submit complaints with photos and documents</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-tvk-gold text-tvk-black rounded-full flex items-center justify-center font-bold mx-auto mb-2">3</div>
            <p className="font-medium">Track resolution status on your dashboard</p>
          </div>
        </div>
      </section>
    </div>
  );
}
