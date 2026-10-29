import { memo, useId, type MouseEvent } from "react";
import { routePosition, type Point } from "@/lib/rover-sim";

type Props = {
  rows: number;
  route: Point[];
  progress: number;
  position?: (Point & { heading: number }) | undefined;
  trail: Point[];
  moving: boolean;
  operation: string;
  planning: boolean;
  onPoint: (point: Point) => void;
};

const groundColors = ["#73a05a", "#51783e", "#8bb564", "#66924d"];
const toPath = (points: Point[]) =>
  points.map((p, i) => `${i ? "L" : "M"}${p.x * 10} ${p.y * 6.6}`).join(" ");

const FieldGround = memo(function FieldGround({ rows, prefix }: { rows: number; prefix: string }) {
  const lanes = Array.from({ length: rows }, (_, i) => 22 + (i * 56) / (rows - 1));
  const crops = [18, ...lanes.map((y) => Math.min(82, y + 3.6))];
  return (
    <>
      <rect width="1000" height="660" fill={`url(#${prefix}-bg)`} />
      <rect width="1000" height="660" fill={`url(#${prefix}-grid)`} opacity=".5" />
      <path d="M50 592H950M95 60V592M905 60V592" stroke="#344b36" strokeWidth="28" fill="none" />
      <path
        d="M50 592H950M95 60V592M905 60V592"
        stroke="#71805b"
        strokeWidth="1"
        strokeDasharray="3 8"
        fill="none"
        opacity=".45"
      />
      <rect x="130" y="96" width="740" height="470" rx="20" fill="#060f09" opacity=".55" />
      <rect
        x="138"
        y="100"
        width="724"
        height="452"
        rx="12"
        fill={`url(#${prefix}-soil)`}
        stroke="#6a8050"
        strokeWidth="2"
      />
      <rect x="147" y="110" width="706" height="432" rx="6" fill={`url(#${prefix}-soil-lines)`} />
      {crops.map((rowY, row) => (
        <g key={row}>
          <rect x="221" y={rowY * 6.6 - 8} width="558" height="17" rx="8" fill="#192d13" />
          {Array.from({ length: 28 }, (_, column) => {
            const x = 232 + column * 20;
            const y = rowY * 6.6;
            return (
              <g key={column} transform={`translate(${x} ${y})`}>
                <ellipse cx="2" cy="5" rx="10" ry="4" fill="#0e2110" opacity=".7" />
                <path
                  d="M0 4Q-12-3-7-8Q0-7 0 1Q1-10 8-8Q12-2 0 4"
                  fill={groundColors[(column + row) % 4]}
                />
                <path d="M0 4V-4" stroke="#a6c279" strokeWidth="1" />
              </g>
            );
          })}
        </g>
      ))}
      {lanes.map((y, i) => (
        <text
          key={i}
          x="112"
          y={y * 6.6 + 3}
          fill="#8b9d7c"
          fontSize="9"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {String(i + 1).padStart(2, "0")}
        </text>
      ))}
      <g transform="translate(690 586)">
        <rect width="155" height="34" rx="4" fill="#12281b" stroke="#486448" />
        <rect x="8" y="8" width="139" height="18" fill="#223d2a" />
        <path d="M15 7V27M43 7V27M71 7V27M99 7V27M127 7V27" stroke="#577150" />
        <text
          x="77"
          y="50"
          textAnchor="middle"
          fill="#8f9f85"
          fontSize="8"
          letterSpacing="2"
          fontFamily="monospace"
        >
          FIELD STATION
        </text>
      </g>
      <g transform="translate(145 588)">
        <circle cx="18" cy="16" r="17" fill="#213e35" stroke="#587e6c" />
        <circle cx="18" cy="16" r="10" fill="#355548" />
        <text x="45" y="20" fill="#899f8b" fontSize="9" fontFamily="monospace">
          WATER RESERVE
        </text>
      </g>
      <path
        d="M138 122V100H160M840 100H862V122M138 530V552H160M840 552H862V530"
        stroke="#d5ed9b"
        strokeWidth="3"
        fill="none"
      />
      <text x="140" y="75" fill="#c8d6b7" fontSize="10" letterSpacing="3" fontFamily="monospace">
        AGRIVION / TEST FIELD
      </text>
      <text x="858" y="75" textAnchor="end" fill="#91a186" fontSize="9" fontFamily="monospace">
        ILLUSTRATED ENVIRONMENT
      </text>
    </>
  );
});

export function DemoFieldScene({
  rows,
  route,
  progress,
  position,
  trail,
  moving,
  operation,
  planning,
  onPoint,
}: Props) {
  const prefix = useId().replace(/:/g, "");
  const rover = position ?? routePosition(route, progress);
  const radians = (rover.heading * Math.PI) / 180;
  const projectedHeading =
    (Math.atan2(Math.sin(radians) * 6.6, Math.cos(radians) * 10) * 180) / Math.PI;
  const visualHeading =
    projectedHeading + Math.round((rover.heading - projectedHeading) / 360) * 360;
  const path = toPath(route);
  const onClick = (event: MouseEvent<SVGSVGElement>) => {
    if (!planning) return;
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const screen = event.currentTarget.createSVGPoint();
    screen.x = event.clientX;
    screen.y = event.clientY;
    const local = screen.matrixTransform(matrix.inverse());
    onPoint({
      x: Math.max(16, Math.min(84, local.x / 10)),
      y: Math.max(18, Math.min(82, local.y / 6.6)),
    });
  };
  return (
    <svg
      viewBox="0 0 1000 660"
      className={`demo-field-svg ${planning ? "is-planning" : ""}`}
      onClick={onClick}
      role="img"
      aria-label={
        position
          ? `Manual rover at X ${rover.x.toFixed(1)}, Y ${rover.y.toFixed(1)}`
          : `Automatic GPS mission, ${Math.round(progress * 100)} percent complete`
      }
    >
      <defs>
        <radialGradient id={`${prefix}-bg`}>
          <stop stopColor="#254733" />
          <stop offset="1" stopColor="#11251c" />
        </radialGradient>
        <linearGradient id={`${prefix}-soil`} x2="0" y2="1">
          <stop stopColor="#4b5131" />
          <stop offset="1" stopColor="#333b26" />
        </linearGradient>
        <pattern id={`${prefix}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#668269" strokeWidth=".5" opacity=".22" />
        </pattern>
        <pattern id={`${prefix}-soil-lines`} width="9" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 2H9" stroke="#283420" strokeWidth="1" opacity=".4" />
        </pattern>
        <radialGradient id={`${prefix}-scan`}>
          <stop stopColor="#d6f6a0" stopOpacity=".15" />
          <stop offset="1" stopColor="#d6f6a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${prefix}-spray`} x2="0" y2="1">
          <stop stopColor="#bce9b6" stopOpacity=".65" />
          <stop offset="1" stopColor="#bce9b6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${prefix}-body`}>
          <stop stopColor="#f0f6da" />
          <stop offset=".5" stopColor="#b6d57d" />
          <stop offset="1" stopColor="#84ad58" />
        </linearGradient>
      </defs>
      <FieldGround rows={rows} prefix={prefix} />
      {!position && (
        <>
          <path
            d={path}
            fill="none"
            stroke="#d5ed9b"
            strokeWidth="2"
            strokeDasharray="5 8"
            opacity=".42"
          />
          <path
            d={path}
            pathLength="1"
            fill="none"
            stroke="#d5ed9b"
            strokeWidth={operation === "Spraying" ? 22 : 9}
            opacity=".13"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            strokeLinecap="round"
          />
          <path
            d={path}
            pathLength="1"
            fill="none"
            stroke="#e0f5ac"
            strokeWidth="3"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            strokeLinecap="round"
          />
          {route
            .filter((_, i) => planning || i === 0 || i === route.length - 1)
            .map((p, i) => (
              <g key={i} transform={`translate(${p.x * 10} ${p.y * 6.6})`}>
                <circle r="8" fill="#172a1b" stroke="#d5ed9b" strokeWidth="1.5" />
                <text y="3" textAnchor="middle" fill="#d5ed9b" fontSize="8" fontFamily="monospace">
                  {i + 1}
                </text>
              </g>
            ))}
        </>
      )}
      {position && (
        <path
          d={toPath(trail)}
          fill="none"
          stroke="#d5ed9b"
          strokeWidth="3"
          strokeDasharray="2 4"
          strokeLinecap="round"
          opacity=".65"
        />
      )}
      <g transform={`translate(${rover.x * 10} ${rover.y * 6.6})`}>
        {moving && operation === "Crop scouting" && (
          <circle r="62" fill={`url(#${prefix}-scan)`} className="demo-scan-ring" />
        )}
        <circle r="34" fill="none" stroke="#d5ed9b" strokeOpacity=".25" strokeDasharray="3 6" />
        <g
          style={{ transform: `rotate(${visualHeading}deg)`, transition: "transform 170ms linear" }}
        >
          <ellipse cx="1" cy="7" rx="31" ry="19" fill="#000" opacity=".3" />
          {moving && operation === "Spraying" && (
            <g opacity=".8">
              <path d="M-18-24L-40-42L-50-16Z" fill={`url(#${prefix}-spray)`} />
              <path d="M-18 24L-40 42L-50 16Z" fill={`url(#${prefix}-spray)`} />
              <path d="M-18-27V27" stroke="#c4d8ad" strokeWidth="3" />
            </g>
          )}
          {operation === "Inter-row" && (
            <g stroke="#a4ad8b" strokeWidth="2">
              <path d="M-23-11H-35V11H-23" fill="none" />
              <path d="M-35-8H-42M-35 0H-42M-35 8H-42" />
            </g>
          )}
          {[-15, 14].map((x) =>
            [-17, 10].map((y) => (
              <g key={`${x}-${y}`}>
                <rect
                  x={x - 5}
                  y={y}
                  width="12"
                  height="8"
                  rx="2"
                  fill="#0c1711"
                  stroke="#68815b"
                  strokeWidth="1"
                />
                <path
                  d={`M${x - 2} ${y + 1}V${y + 7}M${x + 2} ${y + 1}V${y + 7}`}
                  stroke="#4e5e47"
                  strokeWidth="1"
                />
              </g>
            )),
          )}
          <rect
            x="-24"
            y="-11"
            width="49"
            height="23"
            rx="6"
            fill={`url(#${prefix}-body)`}
            stroke="#e0edc5"
            strokeWidth="1.2"
          />
          <rect x="-13" y="-8" width="23" height="17" rx="3" fill="#31553b" />
          <path d="M-9-4H6M-9 0H6M-9 4H6" stroke="#83ad6b" strokeWidth="1" />
          <rect x="16" y="-8" width="5" height="4" rx="1" fill="#f3f9da" />
          <rect x="16" y="5" width="5" height="4" rx="1" fill="#f3f9da" />
          <circle cx="-18" cy="0" r="3" fill="#d5ed9b" />
          <path d="M-18 0V-12" stroke="#e7eac9" strokeWidth="1.5" />
        </g>
        <g transform="translate(0 -48)">
          <rect x="-31" y="-10" width="62" height="18" rx="9" fill="#102719" stroke="#719855" />
          <text textAnchor="middle" y="2" fill="#deefc2" fontSize="8" fontFamily="monospace">
            AGV-01
          </text>
        </g>
      </g>
      <g transform="translate(941 119)">
        <circle r="23" fill="#0c2117" stroke="#425d45" />
        <path d="M0-13L-5 5L0 2L5 5Z" fill="#d5ed9b" />
        <text y="37" textAnchor="middle" fill="#a8bb9c" fontSize="9" fontFamily="monospace">
          N
        </text>
      </g>
    </svg>
  );
}
