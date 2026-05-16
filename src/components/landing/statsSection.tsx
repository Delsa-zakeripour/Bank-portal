import { useTranslations } from "next-intl";

export function StatsSection() {
  const t = useTranslations("Landing.stats");
  const stats = [
    { value: "2M+", label: t("active") },
    { value: "$50B+", label: t("transactions") },
    { value: "99.9%", label: t("uptime") },
    { value: "150+", label: t("countries") },
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
