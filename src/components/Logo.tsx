export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Hexagon crypto icon */}
      <path
        d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
        fill="none"
        stroke="hsl(36, 100%, 50%)"
        strokeWidth="2"
      />
      <path
        d="M20 10L28 15V25L20 30L12 25V15L20 10Z"
        fill="hsl(36, 100%, 50%)"
        opacity="0.3"
      />
      <text
        x="15"
        y="24"
        fill="hsl(36, 100%, 50%)"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="monospace"
      >
        ₿
      </text>
      {/* NEXUS text */}
      <text
        x="46"
        y="25"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        letterSpacing="2"
      >
        NEXUS
      </text>
      {/* TRADE subtitle */}
      <text
        x="120"
        y="25"
        fill="white"
        opacity="0.5"
        fontSize="12"
        fontFamily="monospace"
        letterSpacing="1"
      >
        TRADE
      </text>
    </svg>
  );
};
