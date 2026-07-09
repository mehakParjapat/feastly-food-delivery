export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <i className="fa-solid fa-spinner fa-spin text-3xl text-brand-500 mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
