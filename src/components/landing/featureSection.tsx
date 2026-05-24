import { Shield, Zap, Clock, CreditCard, TrendingUp, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("Landing.features");

  const features = [
    {
      icon: Shield,
      title: t("gradeSecurity"),
      description: t("gradeSecurityDes"),
    },
    {
      icon: Zap,
      title: t("instantTransfers"),
      description: t("instantTransfersDescription"),
    },
    {
      icon: Clock,
      title: t("support"),
      description: t("supportDes"),
    },
    {
      icon: TrendingUp,
      title: t("smartAnalys"),
      description: t("smartAnalysDes"),
    },
    {
      icon: CreditCard,
      title: t("multipleCards"),
      description: t("multipleDes"),
    },
    {
      icon: Lock,
      title: t("privacy"),
      description: t("privacyDes"),
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("title")} </h2>
          <p className="text-xl text-neutral-400">{t("subtitle")} </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl hover:border-blue-600/50 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
