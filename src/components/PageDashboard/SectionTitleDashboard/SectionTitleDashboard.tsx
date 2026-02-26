import { Icon } from '@iconify/react';

export default function SectionTitleDashboard({
  icon,
  children,
  right,
}: {
  icon: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <Icon icon={icon} className="h-6 w-6 text-gray-700 shrink-0" />
        <p className="text-sm font-semibold text-gray-900 truncate">{children}</p>
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
