import { motion } from "motion/react";
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
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {" "}
              <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {stat.value}
              </p>
              <p className="text-neutral-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
