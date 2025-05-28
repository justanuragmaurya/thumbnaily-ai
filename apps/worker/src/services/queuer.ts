import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { inputType } from '@repo/types';
import { z } from 'zod/v4';
import { error } from 'console';

const connection = new IORedis({ maxRetriesPerRequest: null });

const queue = new Queue('foo', { connection });

async function addJob(id:string , data: any) {
  await queue.add('generate-thumbnail',data);
  console.log('Job added to queue:', data);
}

addJob("1", {prompt:"Make a thumbnail for youtube video with pop colors on documentry style , dramatic , of a boy and a gloden palce behind him , with title behind the boy called { Haldirams } ",creatorID:"cmb387bn60000jzcew55pblcs"})
.catch((e)=>{console.log(e)});
