export function StatsSection() {
  const stats = [
    { value: "2M+", label: "Active Users" },
    { value: "$50B+", label: "Transactions" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
  ];
  return (
    <section className="border-y border-neutral-800 bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {stat.value}
              </p>
              <p className="text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
