import PricingPage from "@/components/Pricing/PricingPage";
import Button from "./button/page";
import TimeLine from "./stickyTimeline/page";

export default function Home() {
  console.log("envirnment", process.env.NEXT_PUBLIC_ENV);
  return (
    <main className="min-h-screen">
      <TimeLine />
    </main>
  );
}
