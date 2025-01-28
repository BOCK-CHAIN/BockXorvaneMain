import { SubscriptionCard } from "@/components/_components/subscription-card";

export default function SettingsPage() {
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Subscription</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Membership</h2>
          <SubscriptionCard />
        </section>
      </div>
    </div>
  )
}