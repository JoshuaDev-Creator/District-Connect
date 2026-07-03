import { PARTY_LOGO } from '../data/leaders';

interface PartyLogoProps {
  className?: string;
}

export function PartyLogo({ className = 'w-12 h-12' }: PartyLogoProps) {
  return (
    <img
      src={PARTY_LOGO}
      alt="TVK Party Logo"
      className={`rounded-full object-cover ${className}`}
      onError={(e) => {
        e.currentTarget.src = './tvk-logo.svg';
      }}
    />
  );
}
