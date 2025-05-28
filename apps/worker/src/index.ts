import { Worker } from "bullmq";
import IORedis from "ioredis";
import { generateThumbnail } from "./services/generateThumbnail";
import { inputType } from "@repo/types";

const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker("foo", async (job) => {
  try {
    const valid = inputType.safeParse(job.data);
    if(!valid.success){
      throw Error("Invalid input")
    }
    
    // const thumbnail = await generateThumbnail(job.data);
    // console.log(thumbnail.data);

  }catch (error) {
    console.error(`Job ${job.id} failed:`, error);
    throw error;
  }
},{connection});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id || 'unknown'} failed:`, err);
});