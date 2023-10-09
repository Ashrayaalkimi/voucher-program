import PricingPage from '@/components/Pricing/PricingPage'

export default function Home() {
  console.log("envirnment",process.env.NEXT_PUBLIC_ENV)
  return (
    <main className="min-h-screen">
      <PricingPage/>
    </main>
  )
}
