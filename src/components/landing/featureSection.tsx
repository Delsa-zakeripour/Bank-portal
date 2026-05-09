import { Shield, Zap, Clock, CreditCard, TrendingUp, Lock } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Your money is protected with 256-bit encryption and multi-factor authentication.",
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly between accounts with zero processing time.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you.",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Track your spending patterns and get insights to help you save more.",
    },
    {
      icon: CreditCard,
      title: "Multiple Cards",
      description:
        "Manage all your credit and debit cards in one convenient place.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "We never sell your data. Your financial information stays private.",
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-neutral-400">
            Powerful features to manage your finances with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl hover:border-blue-600/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
