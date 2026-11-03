import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: {
    label: string;
    positive?: boolean;
  };
  variant?: "default" | "tanggamus" | "warning" | "info";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  variant = "default",
  className,
}) => {
  const iconVariants = {
    default: "bg-slate-100 text-slate-700",
    tanggamus: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-sky-100 text-sky-800",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={cn("p-2.5 rounded-lg", iconVariants[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </div>
        {subValue && (
          <p className="text-xs text-slate-500 mt-1 font-medium">{subValue}</p>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "font-semibold px-1.5 py-0.5 rounded",
              trend.positive !== false
                ? "text-emerald-700 bg-emerald-50"
                : "text-rose-700 bg-rose-50"
            )}
          >
            {trend.positive !== false ? "↑" : "↓"} {trend.label}
          </span>
          <span className="text-slate-400">vs target periode</span>
        </div>
      )}
    </div>
  );
};
