import { KOLGAI_BANNER, KOLGAI_LEADERS, DISTRICT_LEADER, VIJAY_LEADER } from '../data/leaders';
import { LeaderCard, LeaderImage } from './LeaderImage';
import { Card } from './FormFields';

export function HeroLeaderSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-tvk-red via-tvk-red-dark to-tvk-black text-white shadow-xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-tvk-gold)_0%,_transparent_50%)]" />
      <div className="relative grid md:grid-cols-2 gap-6 p-6 sm:p-8 items-center">
        <div className="order-2 md:order-1 space-y-4 text-center md:text-left">
          <p className="text-tvk-gold font-semibold text-sm uppercase tracking-wider">
            தமிழக வெற்றிக் கழகம்
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
            Your Voice, Our Priority
          </h2>
          <p className="text-red-100 text-sm sm:text-base">
            உங்கள் குரல், எங்கள் முன்னுரிமை — Every household in our district can register and submit complaints directly to TVK.
          </p>
          <div className="pt-2">
            <p className="text-tvk-gold font-medium text-lg">{VIJAY_LEADER.name}</p>
            <p className="text-red-200 text-sm">{VIJAY_LEADER.nameTa}</p>
            <p className="text-red-200/80 text-xs mt-1">{VIJAY_LEADER.roleTa}</p>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-tvk-gold rounded-2xl opacity-60 blur-sm" />
            <LeaderImage
              leader={VIJAY_LEADER}
              className="relative w-48 h-56 sm:w-56 sm:h-64 shadow-2xl border-4 border-tvk-gold"
              rounded="xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function KolgaiLeadersSection() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-tvk-black">Our Ideological Leaders</h3>
        <p className="text-tvk-red font-medium mt-1">தமிழக வெற்றிக் கழகத்தின் கொள்கைத் தலைவர்கள்!</p>
        <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
          TVK draws inspiration from these great leaders who fought for justice, equality, and Tamil Nadu&apos;s progress.
        </p>
      </div>

      <Card className="p-0 overflow-hidden border-tvk-gold/30">
        <img
          src={KOLGAI_BANNER}
          alt="TVK Kolgai Leaders — Velu Nachiyar, Kamaraj, Periyar, Vijay, Ambedkar, Anjalai Ammal"
          className="w-full h-auto object-cover max-h-64 sm:max-h-80"
        />
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {KOLGAI_LEADERS.map((leader) => (
          <Card key={leader.id} className="!p-4 hover:shadow-lg transition-shadow border-tvk-red/10">
            <LeaderCard leader={leader} size="sm" />
          </Card>
        ))}
      </div>
    </section>
  );
}

export function DistrictLeaderSection() {
  return (
    <section>
      <Card className="bg-gradient-to-br from-white to-red-50 border-tvk-red/20">
        <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <LeaderImage
            leader={DISTRICT_LEADER}
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto sm:mx-0 shadow-lg border-4 border-tvk-gold"
            rounded="full"
          />
          <div className="text-center sm:text-left">
            <p className="text-tvk-red text-sm font-semibold uppercase tracking-wide">Your District Representative</p>
            <h3 className="text-xl sm:text-2xl font-bold text-tvk-black mt-1">{DISTRICT_LEADER.role}</h3>
            <p className="text-tvk-red font-medium">{DISTRICT_LEADER.roleTa}</p>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Reach out to your TVK district leader for local grievances, community support, and party initiatives in your area.
              Register your house and submit complaints through this portal — we are here to serve every family.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              உங்கள் மாவட்ட தலைவர் மூலம் உள்ளூர் பிரச்சினைகள், சமூக ஆதரவு மற்றும் கழக முயற்சிகளை அணுகலாம்.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
