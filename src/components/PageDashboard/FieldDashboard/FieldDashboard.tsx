export default function FieldDashboard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <label className="block text-[11px] font-medium text-gray-500">{label}</label>
      <input
        type="text"
        value={(value || '').trim()}
        readOnly
        className="mt-1 w-full rounded-xl border bg-gray-100 px-3 py-2 text-sm text-gray-800 outline-none"
      />
    </div>
  );
}
