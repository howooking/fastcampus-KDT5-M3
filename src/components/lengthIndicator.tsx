interface LengthIndicatorProps {
  textLength: number;
}

const LengthIndicator = ({ textLength }: LengthIndicatorProps) => {
  return (
    <div
      className={`absolute right-3 top-[calc(50%-8px)] text-xs ${
        textLength >= 60 ? 'text-destructive' : ''
      } ${textLength >= 40 && textLength < 60 ? 'text-accent' : ''}`}
    >
      {`< ${textLength}/60 >`}
    </div>
  );
};

export default LengthIndicator;
