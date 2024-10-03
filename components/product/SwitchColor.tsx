type SwitchColorProps = {
  colors: string[];
  selectedColor: string;
};

const SwitchColor: React.FC<SwitchColorProps> = ({
  colors,
  selectedColor,
}) => {
  return (
    <div className="flex items-center gap-3 ml-20">
      {colors.map((color) => (
        <div
          key={color}
          className={`size-5 rounded-full ${
            color === selectedColor
              ? "outline outline-4 outline-space-cadet/10"
              : ""
          }`}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default SwitchColor;
