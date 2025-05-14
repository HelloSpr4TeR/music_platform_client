interface VolumeProgressProps {
  left: number;
  right: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const VolumeProgress: React.FC<VolumeProgressProps> = ({ left, right, onChange, className }) => {
  return (
    <div className={className}>
      <input
        type="range"
        min="0"
        max={right}
        value={left}
        onChange={onChange}
      />
    </div>
  );
}

export default VolumeProgress;