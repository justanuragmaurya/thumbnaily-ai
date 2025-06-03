import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';

const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error('DODO_PAYMENTS_WEBHOOK_SECRET environment variable is required');
}

const webhook = new Webhook(WEBHOOK_SECRET);

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received!');

  try {
    // Get the raw body as text (important for signature verification)
    const body = await request.text();


    // Extract required headers
    const webhookId = request.headers.get('webhook-id');
    const webhookSignature = request.headers.get('webhook-signature');
    const webhookTimestamp = request.headers.get('webhook-timestamp');

    // Validate required headers
    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      console.error('❌ Missing required webhook headers');
      return NextResponse.json(
        { error: 'Missing webhook headers' },
        { status: 400 }
      );
    }

    const headers = {
      'webhook-id': webhookId,
      'webhook-signature': webhookSignature,
      'webhook-timestamp': webhookTimestamp,
    };


    let verifiedPayload;
    try {
      verifiedPayload = webhook.verify(body, headers);
      console.log('✅ Webhook signature verified successfully');
    } catch (error) {
      console.error('❌ Webhook verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    console.log('📦 Verified payload:', JSON.stringify(verifiedPayload, null, 2));

    const isDuplicate = await checkDuplicateWebhook(webhookId);
    if (isDuplicate) {
      console.log('⚠️ Duplicate webhook detected, skipping processing');
      return NextResponse.json({ 
        received: true, 
        processed: false,
        reason: 'duplicate' 
      });
    }
    await handleWebhookEvent(verifiedPayload, webhookId);

    await markWebhookProcessed(webhookId);

    console.log('✅ Webhook processed successfully');
    return NextResponse.json({ received: true, processed: true });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Webhook endpoint is active',
    timestamp: new Date().toISOString(),
    using: 'standardwebhooks library'
  });
}

async function handleWebhookEvent(payload: any, webhookId: string) {
  console.log(`🎯 Processing event: ${payload.event_type || 'unknown'}`);
  
  try {
    switch (payload.event_type) {
      case 'payment.succeeded':
      case 'payment.completed':
        await handlePaymentCompleted(payload, webhookId);
        break;
        
      case 'payment.failed':
        await handlePaymentFailed(payload, webhookId);
        break;
        
      case 'subscription.created':
        await handleSubscriptionCreated(payload, webhookId);
        break;
        
      case 'subscription.renewed':
        await handleSubscriptionRenewed(payload, webhookId);
        break;
        
      case 'checkout.session.completed':
        await handleCheckoutCompleted(payload, webhookId);
        break;
        
      default:
        console.log(`❓ Unhandled event type: ${payload.event_type}`);
        // Still log unhandled events for debugging
        await logUnhandledEvent(payload, webhookId);
    }
  } catch (error) {
    console.error(`❌ Error handling ${payload.event_type}:`, error);
    throw error; // Re-throw to trigger webhook retry
  }
}

// Event handlers
async function handlePaymentCompleted(payload: any, webhookId: string) {
  console.log('💰 Payment completed:', {
    paymentId: payload.payment_id,
    amount: payload.amount,
    currency: payload.currency,
    customerEmail: payload.customer?.email
  });

  // Your business logic here:
  // - Update database
  // - Send confirmation email
  // - Fulfill order
  // - Update user subscription status
  
  // Example database update (pseudocode):
  // await updatePaymentStatus(payload.payment_id, 'completed');
  // await sendConfirmationEmail(payload.customer.email, payload);
}

async function handlePaymentFailed(payload: any, webhookId: string) {
  console.log('❌ Payment failed:', {
    paymentId: payload.payment_id,
    reason: payload.failure_reason,
    customerEmail: payload.customer?.email
  });

  // Your business logic here:
  // - Update database
  // - Send failure notification
  // - Handle subscription issues
}

async function handleSubscriptionCreated(payload: any, webhookId: string) {
  console.log('🔄 Subscription created:', {
    subscriptionId: payload.subscription_id,
    customerId: payload.customer_id,
    planId: payload.plan_id
  });

  // Your business logic here:
  // - Create subscription record
  // - Grant access to services
  // - Send welcome email
}

async function handleSubscriptionRenewed(payload: any, webhookId: string) {
  console.log('🔄 Subscription renewed:', {
    subscriptionId: payload.subscription_id,
    nextBillingDate: payload.next_billing_date
  });

  // Your business logic here:
  // - Extend subscription
  // - Update billing information
}

async function handleCheckoutCompleted(payload: any, webhookId: string) {
  console.log('🛒 Checkout completed:', {
    sessionId: payload.session_id,
    customerId: payload.customer_id,
    totalAmount: payload.total_amount
  });

  // Your business logic here:
  // - Process order
  // - Send receipt
}

async function logUnhandledEvent(payload: any, webhookId: string) {
  console.log('📝 Logging unhandled event for future reference:', {
    webhookId,
    eventType: payload.event_type,
    payload: JSON.stringify(payload)
  });
  
  // Optional: Store in database for analysis
  // await storeUnhandledWebhook(webhookId, payload);
}

// Idempotency helpers (implement based on your database)
async function checkDuplicateWebhook(webhookId: string): Promise<boolean> {
  // Check your database/cache for this webhook ID
  // Return true if already processed
  
  // Example with in-memory cache (replace with proper database check):
  // return processedWebhooks.has(webhookId);
  
  return false; // Placeholder - implement your own logic
}

async function markWebhookProcessed(webhookId: string): Promise<void> {
   console.log(`✅ Marked webhook ${webhookId} as processed`);
}