import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { WebhookPayload } from "@/lib/types";
import db from "@repo/db";
import { getPaymentProcessingQueue } from "@repo/queue";

export const runtime = "nodejs";

const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error(
    "DODO_PAYMENTS_WEBHOOK_SECRET environment variable is required"
  );
}

const webhook = new Webhook(WEBHOOK_SECRET);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const webhookId = request.headers.get("webhook-id");
    const webhookSignature = request.headers.get("webhook-signature");
    const webhookTimestamp = request.headers.get("webhook-timestamp");

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      console.error("Missing required webhook headers");
      return NextResponse.json(
        { error: "Missing webhook headers" },
        { status: 400 }
      );
    }

    const headers = {
      "webhook-id": webhookId,
      "webhook-signature": webhookSignature,
      "webhook-timestamp": webhookTimestamp,
    };

    const payload = webhook.verify(body, headers) as WebhookPayload;

    if(payload.data.payload_type==="Payment" && payload.type === "payment.succeeded"){
      const webhookEvent = await db.webhookEvent.upsert({
        where: {
          provider_providerEventId: {
            provider: "dodo",
            providerEventId: webhookId,
          },
        },
        create: {
          provider: "dodo",
          providerEventId: webhookId,
          type: payload.type,
          status: "pending",
          payload: payload as unknown as object,
        },
        update: {},
      });

      if (webhookEvent.status === "pending") {
        await getPaymentProcessingQueue().add(
          "process-payment",
          { webhookEventId: webhookEvent.id },
          { jobId: webhookEvent.id }
        );
      }
    }

    return NextResponse.json({ message: "webhook accepted" }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json("hi");
}