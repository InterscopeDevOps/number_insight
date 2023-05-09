
interface RiskBarProps {
  riskRating: number;
  width: string;
  heigth: string;
}

const RiskBar = ({ riskRating, width, heigth }: RiskBarProps) => {
  const circleRadius = 50;
  const strokeWidth = 8;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = (riskRating / 100) * circleCircumference;

  const getRiskLevel = () => {
    if (riskRating < 30) {
      return "Low";
    } else if (riskRating >= 31 && riskRating < 50) {
      return "Neutral";
    } else {
      return "Spam";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center self-center">
      <svg width={width} height={heigth} viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#f0f0f0"
        />
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth={strokeWidth}
          stroke={riskRating >= 50 ? "red" : "green"}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circleCircumference} ${circleCircumference}`}
          strokeDashoffset={circleCircumference - progress}
          transform="rotate(-90, 60, 60)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="36px"
          fontWeight="bold"
          fill="#333"
        >
          {riskRating}
        </text>
      </svg>
      <div className="flex flex-col">
        <span>User Reputation:</span>
        <span className="text-[22px] font-bold">{getRiskLevel()}</span>
      </div>
    </div>
  );
};

export default RiskBar;
