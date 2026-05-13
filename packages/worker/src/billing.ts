import { deleteCacheKeys, type PaymentJobPayload } from "@repo/queue";
import db from "@repo/db";
import type { WebhookPayload } from "./types.js";

const productCredits: Record<string, number> = {
  pdt_vNJc6ot0MMBfxSWtg6p2l: 100,
  pdt_B5VzoGkDoHNqiXk7ySoLQ: 50,
  pdt_fiZwCeFFCoOk0YB3fNrOH: 25,
};

export const processPaymentJob = async ({ webhookEventId }: PaymentJobPayload) => {
  const event = await db.webhookEvent.findUnique({
    where: { id: webhookEventId },
  });

  if (!event || event.status === "processed") {
    return;
  }

  const payload = event.payload as unknown as WebhookPayload;
  const email = payload.data.customer.email;
  const totalCredits = payload.data.product_cart.reduce((sum, item) => {
    return sum + (productCredits[item.product_id] ?? 0) * (item.quantity || 1);
  }, 0);

  if (!email || totalCredits <= 0) {
    await db.webhookEvent.update({
      where: { id: webhookEventId },
      data: {
        status: "ignored",
        processedAt: new Date(),
        errorMessage: "No matching credit product found",
      },
    });
    return;
  }

  await db.$transaction([
    db.user.update({
      where: { email },
      data: { credits: { increment: totalCredits } },
    }),
    db.webhookEvent.update({
      where: { id: webhookEventId },
      data: {
        status: "processed",
        processedAt: new Date(),
        errorMessage: null,
      },
    }),
  ]);
  await deleteCacheKeys(`credits:email:${email}`);
};
