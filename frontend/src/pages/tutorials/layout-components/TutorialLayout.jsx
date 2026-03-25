import HeroSection from "./HeroSection";
import CTASection from "./CTASection";

export default function TutorialLayout({ children, heroProps, ctaProps }) {
  return (
    <div className="tutorial-page">
      <HeroSection {...heroProps} />
      <div className="container">
        <main>{children}</main>
      </div>
      <CTASection {...ctaProps} />
    </div>
  );
}
