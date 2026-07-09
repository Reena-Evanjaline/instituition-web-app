const bandClass = {
  md: "weave-band",
  lg: "weave-band-lg",
  xl: "weave-band-xl",
};

export function WovenBorder({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  return (
    <div role="presentation" className={`${bandClass[size]} w-full ${className}`} />
  );
}
