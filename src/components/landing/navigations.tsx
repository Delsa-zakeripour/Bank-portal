import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Navigation() {
  const t = useTranslations("Landing.nav");
  return (
    <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold">BankPro</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t("features")}
          </a>
          <a
            href="#security"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t("security")}
          </a>
          <a
            href="#about"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t("about")}
          </a>
          <a
            href="#contact"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {t("contact")}
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* <button
            onClick={onLogin}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            Sign In
          </button> */}

          <Link
            href="/auth/login"
            // className="font-medium text-blue-600 hover:text-blue-800"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 text-lg"
          >
            {t("signIn")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
