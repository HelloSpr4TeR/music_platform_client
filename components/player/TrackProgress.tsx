interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange, className }) => {
  return (
    <div className={className} style={{ width: '100%' }}>
      <input
        type="range"
        min="0"
        max={right}
        value={left}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default TrackProgress;