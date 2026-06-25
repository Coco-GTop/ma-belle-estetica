import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/** Palette brand (allineata a src/app/globals.css) */
const GOLD = "#e4c590";
const ROSE = "#e2a6be";
const BG = "#0b0610";

/** Foto reali "di gesto/cura" — vivono in public/gallery (servite via staticFile). */
export const HERO_PHOTOS = [
  "hero/frames/f-mask.jpg", // maschera viso (1101x1600)
  "hero/frames/f-nails.jpg", // unghie (743x1600)
  "hero/frames/f-massage.jpg", // massaggio viso (1200x1600)
  "hero/frames/f-product.jpg", // prodotti professionali (1200x1600)
];

type Props = { photos: string[] };

/** Distanza circolare (per loop seamless): l'ultima foto rientra sulla prima. */
function circularDistance(a: number, b: number, total: number) {
  const d = Math.abs(a - b);
  return Math.min(d, total - d);
}

export const HeroLoop: React.FC<Props> = ({ photos }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const n = photos.length;
  const seg = durationInFrames / n; // finestra per foto
  const fade = 22; // frame di cross-fade
  const hold = seg / 2 - fade / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {photos.map((src, i) => {
        const center = i * seg;
        const d = circularDistance(frame, center, durationInFrames);
        // Trapezio: piena al centro, cross-fade lineare ai bordi → somma ~1 tra adiacenti
        const opacity = interpolate(d, [0, hold, hold + fade], [1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        // Ken-Burns: leggero zoom-out attorno al centro della finestra
        const scale = interpolate(d, [0, seg], [1.08, 1.0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        if (opacity <= 0.001) return null;
        return (
          <AbsoluteFill key={src} style={{ opacity }}>
            <Img
              src={staticFile(src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale})`,
              }}
            />
          </AbsoluteFill>
        );
      })}

      {/* Grading brand: tinta calda + sollevamento ombre verso il near-black */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(11,6,16,0.18) 0%, rgba(11,6,16,0.04) 38%, rgba(11,6,16,0.42) 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 30%, ${ROSE}14 0%, transparent 55%)`,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Light-leak oro che pulsa e si muove lentamente */}
      <LightLeak />

      {/* Vignette near-black ai bordi */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 220px 60px rgba(11,6,16,0.85)",
        }}
      />

      {/* Grana sottile */}
      <Grain />
    </AbsoluteFill>
  );
};

const LightLeak: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = (frame / durationInFrames) * Math.PI * 2;
  const x = 50 + Math.sin(p) * 26;
  const y = 28 + Math.cos(p * 0.8) * 14;
  const opacity = 0.18 + Math.sin(p * 1.3) * 0.1;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(40% 36% at ${x}% ${y}%, ${GOLD} 0%, transparent 70%)`,
        mixBlendMode: "screen",
        opacity,
      }}
    />
  );
};

const Grain: React.FC = () => {
  // Pattern di rumore via SVG feTurbulence — leggero, nessun asset esterno.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  const url = `data:image/svg+xml;utf8,${svg}`;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${url}")`,
        backgroundSize: "320px 320px",
        opacity: 0.06,
        mixBlendMode: "overlay",
      }}
    />
  );
};
