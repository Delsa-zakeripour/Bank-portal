import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function CtaSections() {
  const t = useTranslations("Landing.cta");
  const router = useRouter();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10" />
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {" "}
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-xl text-neutral-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {" "}
          {t("subtitle")}
        </motion.p>
        <motion.button
          // onClick={onLogin}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 text-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/auth/login")}
        >
          {t("action")}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
