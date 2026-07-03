import { DISTRICT_NAME, DISTRICT_NAME_TA } from './district';

export interface Leader {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  roleTa: string;
  image: string;
}

export const PARTY_LOGO = './images/tvk-party-logo.svg';

export const VIJAY_LEADER: Leader = {
  id: 'vijay',
  name: 'Thalapathy Vijay',
  nameTa: 'தளபதி விஜய்',
  role: 'Founder & President, TVK',
  roleTa: 'தமிழக வெற்றிக் கழகம் — நிறுவனர் & தலைவர்',
  image: './images/vijay-cm.jpg',
};

export const DISTRICT_LEADER: Leader = {
  id: 'district-leader',
  name: 'S. Maria John',
  nameTa: 'எஸ். மரியா ஜான்',
  role: `TVK ${DISTRICT_NAME} District Secretary`,
  roleTa: `தமிழக வெற்றிக் கழகம் — ${DISTRICT_NAME_TA} மாவட்ட செயலாளர்`,
  image: './images/district-leader.jpg',
};

export const KOLGAI_LEADERS: Leader[] = [
  {
    id: 'velu-nachiyar',
    name: 'Velu Nachiyar',
    nameTa: 'வேலு நாச்சியார்',
    role: 'Freedom Fighter & Queen',
    roleTa: 'வீராங்கனை & சுதந்திர போராட்ட வீரர்',
    image: './images/kolgai/velu-nachiyar.svg',
  },
  {
    id: 'kamaraj',
    name: 'K. Kamaraj',
    nameTa: 'கு. காமராஜ்',
    role: 'Former Chief Minister',
    roleTa: 'முன்னாள் முதலமைச்சர்',
    image: './images/kolgai/kamaraj.svg',
  },
  {
    id: 'periyar',
    name: 'Periyar E. V. Ramasamy',
    nameTa: 'பெரியார் ஈ.வே.ரா',
    role: 'Social Reformer',
    roleTa: 'சமூக சீர்திருத்தவாதி',
    image: './images/kolgai/periyar.svg',
  },
  {
    id: 'ambedkar',
    name: 'Dr. B. R. Ambedkar',
    nameTa: 'டாக்டர் பி.ஆர். அம்பேத்கர்',
    role: 'Architect of the Constitution',
    roleTa: 'அரசியலமைப்பு தந்தை',
    image: './images/kolgai/ambedkar.svg',
  },
  {
    id: 'anjalai-ammal',
    name: 'Anjalai Ammal',
    nameTa: 'அஞ்சலை அம்மாள்',
    role: 'Freedom Fighter',
    roleTa: 'சுதந்திர போராட்ட வீராங்கனை',
    image: './images/kolgai/anjalai-ammal.svg',
  },
];

export const KOLGAI_BANNER = './images/kolgai-leaders-banner.svg';
