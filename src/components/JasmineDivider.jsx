// Signature element: a line-art jasmine garland (the strand Chennai salons weave
// into hair, "malli poo"), used as a recurring section divider instead of a
// generic rule. Tiled across the width via a repeating unit.

const FlowerUnit = ({ x }) => (
  <g transform={`translate(${x} 0)`}>
    <line x1="0" y1="0" x2="0" y2="28" stroke="#B98B42" strokeWidth="1" opacity="0.55" />
    <circle cx="0" cy="14" r="5.5" fill="none" stroke="#B98B42" strokeWidth="1.1" />
    <circle cx="0" cy="14" r="1.4" fill="#B98B42" />
    {[0, 72, 144, 216, 288].map((deg) => (
      <ellipse
        key={deg}
        cx="0"
        cy="8.2"
        rx="1.6"
        ry="3.4"
        fill="none"
        stroke="#B98B42"
        strokeWidth="0.9"
        opacity="0.85"
        transform={`rotate(${deg} 0 14)`}
      />
    ))}
  </g>
);

export default function JasmineDivider({ tone = "light", className = "" }) {
  const spacing = 46;
  const count = 24;
  const width = spacing * count;

  return (
    <div
      className={`w-full overflow-hidden select-none ${tone === "dark" ? "opacity-70" : "opacity-90"} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} 28`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-6 md:h-7"
      >
        <line x1="0" y1="14" x2={width} y2="14" stroke="#B98B42" strokeWidth="0.6" opacity="0.3" />
        {Array.from({ length: count }).map((_, i) => (
          <FlowerUnit key={i} x={spacing / 2 + i * spacing} />
        ))}
      </svg>
    </div>
  );
}
