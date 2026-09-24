import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-teal-700 uppercase">
          <span className="h-px w-6 bg-teal-600" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
