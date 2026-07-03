import type { Leader } from '../data/leaders';

interface LeaderImageProps {
  leader: Leader;
  className?: string;
  rounded?: 'full' | 'xl' | 'lg';
}

export function LeaderImage({ leader, className = '', rounded = 'xl' }: LeaderImageProps) {
  const roundedClass = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    lg: 'rounded-lg',
  }[rounded];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-tvk-red to-tvk-red-dark ${roundedClass} ${className}`}>
      <img
        src={leader.image}
        alt={leader.name}
        className={`w-full h-full object-cover ${roundedClass}`}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div
        className={`absolute inset-0 hidden items-center justify-center text-white text-center p-2 ${roundedClass}`}
        aria-hidden
      >
        <div>
          <p className="text-2xl font-bold opacity-90">{leader.name.charAt(0)}</p>
          <p className="text-xs mt-1 opacity-75 leading-tight">{leader.nameTa}</p>
        </div>
      </div>
    </div>
  );
}

interface LeaderCardProps {
  leader: Leader;
  size?: 'sm' | 'md' | 'lg';
}

export function LeaderCard({ leader, size = 'md' }: LeaderCardProps) {
  const sizes = {
    sm: { image: 'w-20 h-20', name: 'text-sm', role: 'text-xs' },
    md: { image: 'w-28 h-28', name: 'text-base', role: 'text-sm' },
    lg: { image: 'w-36 h-36', name: 'text-lg', role: 'text-sm' },
  };
  const s = sizes[size];

  return (
    <div className="flex flex-col items-center text-center">
      <LeaderImage leader={leader} className={`${s.image} shadow-md border-2 border-tvk-gold`} rounded="full" />
      <h4 className={`font-bold text-tvk-black mt-3 ${s.name}`}>{leader.name}</h4>
      <p className="text-tvk-red text-xs font-medium">{leader.nameTa}</p>
      <p className={`text-gray-500 mt-1 ${s.role}`}>{leader.role}</p>
      <p className="text-gray-400 text-xs">{leader.roleTa}</p>
    </div>
  );
}
