import { Link, Outlet, useLocation } from 'react-router-dom';
import { getActiveHouse } from '../lib/storage';
import { PartyLogo } from './PartyLogo';

const navItems = [
  { path: '/', label: 'Home', labelTa: 'முகப்பு' },
  { path: '/register', label: 'Register House', labelTa: 'வீடு பதிவு' },
  { path: '/complaint', label: 'Submit Complaint', labelTa: 'புகார் சமர்ப்பி' },
  { path: '/dashboard', label: 'My Complaints', labelTa: 'என் புகார்கள்' },
];

export default function Layout() {
  const location = useLocation();
  const activeHouse = getActiveHouse();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-tvk-red text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <PartyLogo className="w-14 h-14 border-2 border-tvk-gold" />
              <div>
                <h1 className="text-xl font-bold tracking-wide group-hover:text-tvk-gold transition-colors">
                  TVK District Connect
                </h1>
                <p className="text-sm text-red-100">தமிழக வெற்றிக் கழகம் — மாவட்ட இணைப்பு</p>
              </div>
            </Link>
            {activeHouse && (
              <div className="hidden sm:block text-right text-sm">
                <p className="text-tvk-gold font-medium">{activeHouse.headOfFamily}</p>
                <p className="text-red-100">
                  {activeHouse.houseNumber}, {activeHouse.streetName}
                </p>
              </div>
            )}
          </div>
        </div>
        <nav className="bg-tvk-red-dark border-t border-red-800">
          <div className="max-w-5xl mx-auto px-4">
            <ul className="flex gap-1 overflow-x-auto py-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-tvk-gold text-tvk-black'
                          : 'text-red-100 hover:bg-red-800 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-tvk-black text-gray-400 text-center py-6 text-sm">
        <p>© {new Date().getFullYear()} TVK — Tamizhaga Vettri Kazhagam</p>
        <p className="mt-1">Serving every household in our district</p>
      </footer>
    </div>
  );
}
