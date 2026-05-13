export type GenerationJobStatus =
  | "queued"
  | "started"
  | "enhancing_prompt"
  | "generating"
  | "uploading"
  | "saving"
  | "completed"
  | "failed";

export interface GenerationJobPayload {
  jobId: string;
  userId: string;
  basicPrompt: string;
  imageUrls: string[];
  isPublic: boolean;
}

export interface PaymentJobPayload {
  webhookEventId: string;
}

export interface GenerationProgress {
  jobId: string;
  status: GenerationJobStatus;
  step: string;
  progress: number;
  imageUrl?: string;
  thumbnailId?: string;
  error?: string;
}
