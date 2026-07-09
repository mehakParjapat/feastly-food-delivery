const STAGES = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
const LABELS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out For Delivery',
  DELIVERED: 'Delivered',
};
const ICONS = {
  PENDING: 'fa-clock',
  CONFIRMED: 'fa-circle-check',
  PREPARING: 'fa-fire-burner',
  OUT_FOR_DELIVERY: 'fa-truck-fast',
  DELIVERED: 'fa-house-circle-check',
};

export default function OrderTracker({ status = 'PENDING' }) {
  const currentIndex = Math.max(0, STAGES.indexOf(status));

  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg mb-6">Order Tracking</h3>
      <div className="relative flex justify-between">
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 mx-5" />
        <div
          className="absolute top-5 left-0 h-1 bg-brand-500 mx-5 transition-all"
          style={{ width: `calc(${(currentIndex / (STAGES.length - 1)) * 100}% - 40px * ${currentIndex / (STAGES.length - 1)})` }}
        />
        {STAGES.map((stage, idx) => {
          const done = idx <= currentIndex;
          return (
            <div key={stage} className="relative z-10 flex flex-col items-center text-center flex-1">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  done ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <i className={`fa-solid ${ICONS[stage]}`} />
              </div>
              <span className={`mt-2 text-xs font-medium ${done ? 'text-gray-900' : 'text-gray-400'}`}>
                {LABELS[stage]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
