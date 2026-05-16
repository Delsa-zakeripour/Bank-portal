import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function CtaSections() {
  const t = useTranslations("Landing.cta");
  const router = useRouter();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10" />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h2>
        <p className="text-xl text-neutral-400 mb-8">{t("subtitle")}</p>
        <button
          //   onClick={onLogin}
          onClick={() => router.push("/auth/login")}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 text-lg mx-auto"
        >
          {t("action")}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
