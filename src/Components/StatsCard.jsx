function StatsCard({ label, value, icon, iconColor, bg }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 md:p-5 flex items-center gap-4 hover:border-[#10B981]/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconColor || "bg-[#10B981]/10 text-[#10B981]"}`}>
        {icon}
      </div>
      <div className="flex flex-col text-left min-w-0">
        <span className="text-xl md:text-2xl font-extrabold text-[var(--text)] tracking-tight truncate">
          {value}
        </span>
        <span className="text-[10px] font-bold text-[var(--muted)] mt-0.5 uppercase tracking-widest truncate">
          {label}
        </span>
      </div>
    </div>
  );
}

export default StatsCard;
