import { ArrowLeft, ArrowRight, CreditCard, TrendingUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function HeroSectiobs() {
  const t = useTranslations("Landing.hero");
  const locale = useLocale();
  const router = useRouter();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-sm mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              {t("available")}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t("bankingMade")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                {t("simpleSecure")}
              </span>
            </h1>
            <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
              {t("description")}{" "}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/auth/login")}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 text-lg"
              >
                {t("getStarted")}
                {locale === "en" ? (
                  <ArrowRight className="w-5 h-5" />
                ) : (
                  <ArrowLeft className="w-5 h-5" />
                )}
              </button>
              <button className="px-8 py-4 border border-neutral-700 hover:border-neutral-600 rounded-lg transition-colors font-medium text-lg">
                {t("secondaryAction")}
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
            <div className="relative bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-400">
                      {t("totalBalance")}
                    </p>
                    <p className="text-3xl font-bold mt-1">$87,094.07</p>
                  </div>
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>

                <div className="h-px bg-neutral-700" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {t("checkingAccount")}
                        </p>
                        <p className="text-xs text-neutral-400">****4532</p>
                      </div>
                    </div>
                    <p className="font-semibold">$12,453.82</p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {t("savingsAccount")}
                        </p>
                        <p className="text-xs text-neutral-400">****7821</p>
                      </div>
                    </div>
                    <p className="font-semibold">$28,750.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
