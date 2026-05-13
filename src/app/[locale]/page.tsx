"use client";
import { CtaSections } from "@/components/landing/ctaSection";
import { FeaturesSection } from "@/components/landing/featureSection";
import { Footer } from "@/components/landing/footer";
import { HeroSectiobs } from "@/components/landing/heroSection";
import { Navigation } from "@/components/landing/navigations";
import { StatsSection } from "@/components/landing/statsSection";

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navigation />
      <HeroSectiobs />
      <StatsSection />
      <FeaturesSection />
      <CtaSections />
      <Footer />
    </div>
  );
}
