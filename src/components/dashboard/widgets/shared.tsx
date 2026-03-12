/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useId, type CSSProperties, type ReactNode } from "react";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { ChevronDown, ChevronsUpDown, GripVertical, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts";

const WidgetDragHandleContext = createContext<DraggableProvidedDragHandleProps | null>(null);

export function WidgetDragHandleProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: DraggableProvidedDragHandleProps | null | undefined;
}) {
  return <WidgetDragHandleContext.Provider value={value ?? null}>{children}</WidgetDragHandleContext.Provider>;
}

export function useWidgetDragHandle() {
  return useContext(WidgetDragHandleContext);
}

export function DragHandle({
  dragHandleProps,
  className = "",
}: {
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  className?: string;
}) {
  if (!dragHandleProps) return null;

  return (
    <span
      {...dragHandleProps}
      className={`drag-handle inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[#e7e7ea] bg-white text-[#7e838f] shadow-[0_4px_12px_rgba(15,23,42,0.06)] ${className}`.trim()}
      aria-label="Drag component"
    >
      <GripVertical size={14} />
    </span>
  );
}

export function panelClassName(className = "") {
  return `  shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${className}`.trim();
}

export function SectionShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={panelClassName(className)}>{children}</section>;
}

export function SectionHeader({
  icon,
  title,
  subtitle,
  actions,
  className = "",
  dragHandleProps,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) {
  const widgetDragHandleProps = useWidgetDragHandle();
  const resolvedDragHandleProps = dragHandleProps ?? widgetDragHandleProps;

  return (
    <div className={`flex items-start  justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          {icon ? (
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] border border-[#e9e9ea] bg-[#fafafa] text-[#54596a]">
              {icon}
            </div>
          ) : null}
          <h2 className="text-[16px] font-semibold tracking-[-0.02em] text-[#2f3137]">{title}</h2>
        </div>
        {subtitle ? <p className="mt-1 text-[9.5px] text-[#8b8f99]">{subtitle}</p> : null}
      </div>
      {(actions || resolvedDragHandleProps) ? (
        <div className="flex items-start gap-2">
          {actions}
          <DragHandle dragHandleProps={resolvedDragHandleProps} className="drag-handle-parent" />
        </div>
      ) : null}
    </div>
  );
}

export function FilterButton({
  label = "Month",
  value,
  options,
  onChange,
  className = "",
}: {
  label?: string;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
  className?: string;
}) {
  const items = options?.length ? options : [label];
  const selected = value ?? label;

  return (
    <label className={`relative inline-flex h-[32px] items-center rounded-[9px] border border-[#e7e7e9] bg-white ${className}`.trim()}>
      <select
        value={selected}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-full appearance-none rounded-[9px] bg-transparent pl-3.5 pr-8 text-[10px] font-medium text-[#7f8490] outline-none"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ChevronDown size={13} className="pointer-events-none absolute right-3 text-[#7f8490]" />
    </label>
  );
}

export function SortHeader({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <ChevronsUpDown size={10} />
      <span>{label}</span>
    </span>
  );
}

export function UpgradeButton({ subtle = false }: { subtle?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-[9px] border px-4 text-[11px] font-medium ${
        subtle
          ? "border-[#5468ff] text-[#5468ff]"
          : "border-[#5468ff] bg-[#5468ff] text-white shadow-[0_8px_18px_rgba(84,104,255,0.2)]"
      }`}
      style={{ height: 32 }}
    >
      <Zap size={12} className="shrink-0" />
      <span className="whitespace-nowrap">Upgrade Plan</span>
    </button>
  );
}

export function TrendBadge({
  change,
  positiveColor = "#67b82f",
  negativeColor = "#ff5d5d",
}: {
  change: number;
  positiveColor?: string;
  negativeColor?: string;
}) {
  const positive = change > 0;
  const color = positive ? positiveColor : negativeColor;
  const Icon = positive ? TrendingUp : TrendingDown;

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium" style={{ color }}>
      <Icon size={10} strokeWidth={2.2} />
      {Math.abs(change)}%
    </span>
  );
}

export function DashboardTooltip({
  active,
  payload,
  label,
  formatter,
}: TooltipProps<number, string> & {
  formatter?: (value: number, name: string) => string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-[10px] border border-[#ececf0] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      {label ? <div className="mb-1 text-[10px] font-semibold text-[#40444c]">{label}</div> : null}
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey as string} className="flex items-center justify-between gap-4 text-[10px]">
            <div className="flex items-center gap-2 text-[#5a5f69]">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}</span>
            </div>
            <span className="font-medium text-[#2f3137]">
              {formatter ? formatter(Number(entry.value), String(entry.name)) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SparkAreaChart({
  data,
  dataKey,
  stroke,
  fill,
  className = "",
  labelKey = "label",
}: {
  data: Array<Record<string, string | number>>;
  dataKey: string;
  stroke: string;
  fill: string;
  className?: string;
  labelKey?: string;
}) {
  const gradientId = useId();

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity={0.35} />
              <stop offset="100%" stopColor={fill} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={false}
            content={<DashboardTooltip formatter={(value) => `${value}`} />}
            labelFormatter={(value) => String(value)}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            name="Value"
            stroke={stroke}
            fill={`url(#${gradientId})`}
            strokeWidth={1.8}
            dot={false}
            activeDot={{ r: 3, fill: "#fff", stroke, strokeWidth: 2 }}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Progress({
  value,
  color = "#67b82f",
  track = "#e5e7eb",
  height = 5,
}: {
  value: number;
  color?: string;
  track?: string;
  height?: number;
}) {
  return (
    <div className="w-full rounded-full" style={{ backgroundColor: track, height }}>
      <div className="rounded-full transition-[width] duration-300" style={{ width: `${value}%`, backgroundColor: color, height }} />
    </div>
  );
}

export function Dot({
  color,
  square = false,
  size = 8,
}: {
  color: string;
  square?: boolean;
  size?: number;
}) {
  const style: CSSProperties = { backgroundColor: color, width: size, height: size };
  return <span className={square ? "rounded-[2px]" : "rounded-full"} style={style} />;
}
