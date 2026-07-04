export function WovenBorder({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      role="presentation"
      className={`${size === "lg" ? "weave-band-lg" : "weave-band"} w-full ${className}`}
    />
  );
}
