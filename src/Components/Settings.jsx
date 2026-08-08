function Settings() {
  return (
    <div className="p-4 md:p-6 bg-[var(--bg)] min-h-screen">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-[var(--text)] mb-2">Settings</h2>
        <p className="text-[var(--muted)] text-sm mb-6">Manage your account preferences and profile.</p>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">⚙️</div>
          <p className="text-[var(--muted)] font-medium text-sm">Settings panel coming soon.</p>
          <p className="text-[var(--subtle)] text-xs mt-1">Profile editing, notifications, and more will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
