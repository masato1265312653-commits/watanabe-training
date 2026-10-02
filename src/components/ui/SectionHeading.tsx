import { Fragment } from "react";
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
        <span className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-khaki-700 uppercase">
          <span className="h-px w-6 bg-khaki-600" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-slate-600 leading-relaxed">
          {description.split("\n").map((line, i, lines) => (
            <Fragment key={i}>
              {line}
              {i < lines.length - 1 && <br className="hidden sm:block" />}
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
}
