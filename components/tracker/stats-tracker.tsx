import { StatsTrackerInfo } from '@/types/tracker.types';

export default function StatsTracker({
  wpm,
  accuracy,
  progress,
}: StatsTrackerInfo) {
  return (
    <div className="grid grid-cols-2">
      <StatLabel>Speed</StatLabel>
      <StatValue>{wpm ? `${wpm}wpm` : '-'}</StatValue>
      <StatLabel>Accuracy</StatLabel>
      <StatValue>{accuracy ? `${accuracy}%` : '-'}</StatValue>
      <StatLabel>Progress</StatLabel>
      <StatValue>{progress}%</StatValue>
    </div>
  );
}

function StatLabel({ children }: { children?: React.ReactNode }) {
  return <p>{children}</p>;
}

function StatValue({ children }: { children?: React.ReactNode }) {
  return <p className="ml-1">: {children}</p>;
}
