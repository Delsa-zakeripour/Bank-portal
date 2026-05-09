import { ChevronRight } from "lucide-react";

export function CtaSections() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10" />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-neutral-400 mb-8">
          Join millions of users who trust BankPro for their financial needs.
        </p>
        <button
          //   onClick={onLogin}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 text-lg mx-auto"
        >
          Open Your Account
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
