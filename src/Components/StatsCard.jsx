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

function StatsCard({ label, value, icon, bg }) {
  return (
    <div className={`${bg} rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
      <div className="text-3xl">{icon}</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-white/70 text-sm">{label}</span>
      </div>
    </div>
  );
}

export default StatsCard;
