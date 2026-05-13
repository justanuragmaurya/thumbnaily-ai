import { Queue } from "bullmq";
import { getRedisConnection } from "./redis";
import type { GenerationJobPayload, PaymentJobPayload } from "./types";

export const THUMBNAIL_GENERATION_QUEUE = "thumbnail-generation";
export const PAYMENT_PROCESSING_QUEUE = "payment-processing";

let thumbnailGenerationQueue: Queue<GenerationJobPayload> | undefined;
let paymentProcessingQueue: Queue<PaymentJobPayload> | undefined;

export const getThumbnailGenerationQueue = () => {
  if (!thumbnailGenerationQueue) {
    thumbnailGenerationQueue = new Queue<GenerationJobPayload>(
      THUMBNAIL_GENERATION_QUEUE,
      {
        connection: getRedisConnection(),
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5000,
          },
          removeOnComplete: {
            age: 60 * 60 * 24,
            count: 1000,
          },
          removeOnFail: {
            age: 60 * 60 * 24 * 7,
          },
        },
      }
    );
  }

  return thumbnailGenerationQueue;
};

export const getPaymentProcessingQueue = () => {
  if (!paymentProcessingQueue) {
    paymentProcessingQueue = new Queue<PaymentJobPayload>(
      PAYMENT_PROCESSING_QUEUE,
      {
        connection: getRedisConnection(),
        defaultJobOptions: {
          attempts: 5,
          backoff: {
            type: "exponential",
            delay: 3000,
          },
          removeOnComplete: {
            age: 60 * 60 * 24,
            count: 1000,
          },
          removeOnFail: {
            age: 60 * 60 * 24 * 14,
          },
        },
      }
    );
  }

  return paymentProcessingQueue;
};
