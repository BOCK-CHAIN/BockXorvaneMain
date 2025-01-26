import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { event_type, resource } = await req.json();
    console.log(event_type, resource)
    if (event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
        const subscriptionId = resource.id;
        const startDate = new Date(resource.start_time);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + resource.billing_info.frequency.interval_count);
        console.log(subscriptionId)
        // Save the subscription details in the database
        // db.saveSubscription({
        //     subscriptionId,
        //     startDate,
        //     endDate,
        //     status: 'active',
        // });
        // console.log

    } else if (event_type === 'BILLING.SUBSCRIPTION.EXPIRED') {
        // Update the subscription status in your database
        // db.updateSubscriptionStatus(resource.id, 'expired');
        console.log(resource)
    }
    return NextResponse.json({ success: true });
}