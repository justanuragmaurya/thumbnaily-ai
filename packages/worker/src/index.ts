import { Worker } from "bullmq";
import {
  PAYMENT_PROCESSING_QUEUE,
  THUMBNAIL_GENERATION_QUEUE,
  getRedisConnection,
  type GenerationJobPayload,
  type PaymentJobPayload,
} from "@repo/queue";
import { processPaymentJob } from "./billing.js";
import { processGenerationJob } from "./generation.js";

const generationConcurrency = Number(process.env.GENERATION_WORKER_CONCURRENCY ?? 2);
const paymentConcurrency = Number(process.env.PAYMENT_WORKER_CONCURRENCY ?? 5);

const generationWorker = new Worker<GenerationJobPayload>(
  THUMBNAIL_GENERATION_QUEUE,
  processGenerationJob,
  {
    connection: getRedisConnection(),
    concurrency: generationConcurrency,
  }
);

const paymentWorker = new Worker<PaymentJobPayload>(
  PAYMENT_PROCESSING_QUEUE,
  async (job) => processPaymentJob(job.data),
  {
    connection: getRedisConnection(),
    concurrency: paymentConcurrency,
  }
);

generationWorker.on("completed", (job) => {
  console.log(`Generation job ${job.data.jobId} completed`);
});

generationWorker.on("failed", (job, error) => {
  console.error(`Generation job ${job?.data.jobId ?? "unknown"} failed`, error);
});

paymentWorker.on("completed", (job) => {
  console.log(`Payment job ${job.data.webhookEventId} completed`);
});

paymentWorker.on("failed", (job, error) => {
  console.error(`Payment job ${job?.data.webhookEventId ?? "unknown"} failed`, error);
});

const shutdown = async () => {
  await Promise.all([generationWorker.close(), paymentWorker.close()]);
  await getRedisConnection().quit();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(
  `Worker started: generation concurrency ${generationConcurrency}, payment concurrency ${paymentConcurrency}`
);
