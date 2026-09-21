import { panelGroups } from "@/content/panel";
import { cn } from "@/lib/cn";

const COLUMNS = [panelGroups.slice(0, 4), panelGroups.slice(4, 8)];

/**
 * The eight biomarker groups, split into two columns of four.
 *
 * A 2-column split with grouped items, rather than one long table with a
 * hairline under all eight rows: long divided lists read as a spec dump, and
 * four items per column stays scannable.
 */
export function MarkerGroups({
  size = "compact",
  className,
}: {
  size?: "compact" | "full";
  className?: string;
}) {
  return (
    <div className={cn("grid sm:grid-cols-2", className)}>
      {COLUMNS.map((column, ci) => (
        <div
          key={ci}
          className={
            ci === 1 ? "border-t border-line-2 sm:border-l sm:border-t-0" : ""
          }
        >
          {column.map((group, gi) => (
            <div
              key={group.id}
              className={cn(
                size === "full" ? "px-6 py-5" : "px-6 py-4",
                gi < column.length - 1 && "border-b border-line-2",
              )}
            >
              <h3
                className={cn(
                  "text-bone",
                  size === "full"
                    ? "font-display text-base font-semibold tracking-[-0.015em]"
                    : "text-[0.875rem]",
                )}
              >
                {group.name}
              </h3>
              <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed text-bone-2">
                {group.markers.join("  ·  ")}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
