const emerald = "var(--color-primary)";
const forest = "var(--color-secondary)";
const amber = "var(--color-accent)";

// ── Logo Mark: two leaves + amber pixel ──────────────────────────────────────
export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect x="26" y="30" width="4" height="21" rx="2" fill={emerald} />
      <path d="M28 34 C20 34 4 28 5 14 C6 4 18 8 28 24 Z" fill={emerald} />
      <path d="M28 30 C36 28 52 22 51 9 C50 1 37 5 28 20 Z" fill={forest} />
      <rect x="21" y="1" width="14" height="14" rx="3" fill={amber} />
    </svg>
  );
}

// ── Letter Mark: CB monogram ─────────────────────────────────────────────────
export function LetterMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="12" fill="var(--surface)" />
      <path d="M30 14 C18 14 12 20 12 28 C12 36 18 42 30 42" stroke={emerald} strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <rect x="29" y="14" width="4.5" height="28" rx="2" fill={forest} />
      <path d="M33 14 C40 14 44 18 44 21.5 C44 25 40 28 33 28" stroke={forest} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M33 28 C41 28 45 32 45 35.5 C45 39 41 42 33 42" stroke={forest} strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ── "bit" with amber square replacing the dot of the i ───────────────────────
function BitWord({ fontSize, color }) {
  return (
    <span style={{ color, display: "inline-flex", alignItems: "baseline", fontSize, fontWeight: 800 }}>
      b
      <span style={{ position: "relative", display: "inline-block" }}>
        {/* dotless i (U+0131) */}
        ı
        <span
          style={{
            position: "absolute",
            top: "0.04em",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0.28em",
            height: "0.28em",
            backgroundColor: amber,
            borderRadius: "3px",
            display: "block",
          }}
        />
      </span>
      t
    </span>
  );
}

// ── Full Wordmark: logomark + "Crop" + "bit" (with amber dot) ────────────────
// size: "sm" | "md" | "lg"
export function Wordmark({ size = "md", lightText = false }) {
  const cfg = {
    sm: { mark: 28, cropSize: "16px", bitSize: "16px", gap: "8px" },
    md: { mark: 34, cropSize: "20px", bitSize: "20px", gap: "10px" },
    lg: { mark: 48, cropSize: "28px", bitSize: "28px", gap: "14px" },
  }[size];

  const cropColor = lightText ? "#ffffff" : "var(--text)";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: cfg.gap }}>
      <LogoMark size={cfg.mark} />
      <span style={{ display: "inline-flex", alignItems: "baseline", lineHeight: 1, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <span style={{ color: cropColor, fontSize: cfg.cropSize, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Crop
        </span>
        <BitWord fontSize={cfg.bitSize} color={emerald} />
      </span>
    </span>
  );
}
