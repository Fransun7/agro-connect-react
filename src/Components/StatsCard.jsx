// function StatsCard({ label, value, icon, bg }) {
//   return (
//     <div className={`${bg} h-50 w-50 grid grid-cols-2`}>
//       <div className="w-[30%]">{icon}</div>
//       <div className="w-[70%] flex flex-row">
//         <p>{value}</p>
//         <p>{label}</p>
//       </div>
//     </div>
//   );
// }

// export default StatsCard;

// function StatsCard({ label, value, icon, bg }) {
//   return (
//     <div className={`${bg} rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
//       <div className="text-3xl">{icon}</div>
//       <div className="flex flex-col">
//         <span className="text-2xl font-bold text-white">{value}</span>
//         <span className="text-white/70 text-sm">{label}</span>
//       </div>
//     </div>
//   );
// }

// export default StatsCard;

function StatsCard({ label, value, icon, iconColor }) {
  return (
    <div className="bg-white border border-slate-100/80 rounded-3xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      
      {/* Sleek Circular Icon Badge */}
      <div className={`w-6 h-6 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${iconColor}`}>
        {icon}
      </div>
      
      {/* Metric details */}
      <div className="flex flex-col text-left">
        {/* Bold, premium dark text for the metric */}
        <span className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
          {value}
        </span>
        {/* Subdued uppercase tracking for the label */}
        <span className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
          {label}
        </span>
      </div>
      
    </div>
  );
}

export default StatsCard;