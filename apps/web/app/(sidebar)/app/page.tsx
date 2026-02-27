"use client";
import axios from "axios";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, ArrowUp, Loader2, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Sora } from "next/font/google";
import { appCache } from "@/lib/cache";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

interface ProgressState {
  step: string;
  progress: number;
  imageUrl?: string;
  error?: string;
}

export default function GenerationPage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageLink, setLink] = useState<string>("");
  const [progressState, setProgressState] = useState<ProgressState>({
    step: "",
    progress: 0,
  });

  const pollProgress = useCallback(
    async (progressId: string) => {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/generate-thumbnail?progressId=${progressId}`
          );
          if (!response.ok) {
            if (response.status === 404) {
              toast("Session expired or progress ID is invalid.");
              clearInterval(pollInterval);
              setLoading(false);
              setProgressState({
                step: "Error",
                progress: 100,
                error: "Polling failed: Invalid ID",
              });
            }
            throw new Error(
              `Polling failed with status: ${response.status}`
            );
          }

          const progressData = (await response.json()) as ProgressState;
          setProgressState(progressData);

          if (progressData.imageUrl) {
            setImages((prev) => [...prev, progressData.imageUrl!]);
            appCache.del("my-thumbnails");
            appCache.del("explore");
            appCache.del("credits");
            toast("Thumbnail generated successfully!");
            clearInterval(pollInterval);
            setLoading(false);
          } else if (progressData.error) {
            toast(`Error: ${progressData.error}`);
            clearInterval(pollInterval);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error polling progress:", error);
          toast("Error checking generation progress.");
          clearInterval(pollInterval);
          setLoading(false);
          setProgressState({
            step: "Polling Error",
            progress: 100,
            error: "Could not retrieve progress",
          });
        }
      }, 1000);

      return pollInterval;
    },
    [setImages, setLoading, setProgressState]
  );

  const uploadWithPresignedUrl = async (file: File): Promise<string> => {
    try {
      setUploading(true);
      const response = await fetch("/api/presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to get presigned URL: ${errorData.error || response.statusText}`
        );
      }

      const { signedUrl, fileUrl } = await response.json();
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }
      setUploading(false);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading:", error);
      setUploading(false);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const fileURL = await uploadWithPresignedUrl(e.target.files[0]);
      setLink(fileURL);
    }
  };

  async function handleClick() {
    setLoading(true);
    setProgressState({ step: "Initializing...", progress: 0 });

    if (!inputRef.current?.value) {
      toast("Please enter a prompt.");
      setLoading(false);
      setProgressState({ step: "", progress: 0 });
      return;
    }

    try {
      const response = await axios.post("/api/generate-thumbnail", {
        basicPrompt: inputRef.current.value,
        image_url: imageLink,
      });

      if (response.data.progressId) {
        pollProgress(response.data.progressId);
      } else if (response.data.error) {
        toast(response.data.message || "Failed to start generation.");
        setLoading(false);
        setProgressState({ step: "", progress: 0 });
      }
    } catch (error: unknown) {
      console.error("Generation error:", error);

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: { message?: string; error?: boolean };
            status?: number;
          };
        };
        const apiMessage = axiosError.response?.data?.message;

        if (apiMessage) {
          toast(apiMessage);
        } else {
          const status = axiosError.response?.status;
          if (status === 401) toast("Please sign in to generate thumbnails.");
          else if (status === 402)
            toast("Insufficient credits, please recharge.");
          else if (status === 404)
            toast("User not found. Please try signing in again.");
          else toast("Failed to start thumbnail generation.");
        }
      } else if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("Failed to initiate thumbnail generation.");
      }

      setLoading(false);
      setProgressState({ step: "", progress: 0 });
    }
  }

  return (
    <div className="w-full min-h-full">
      <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold tracking-tight ${sora.className}`}
          >
            Describe your thumbnail.
          </h1>
          <p className="text-muted-foreground mt-2">
            AI turns your words into click-worthy visuals.
          </p>
        </div>

        {/* Input Area */}
        <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
          <textarea
            ref={inputRef}
            placeholder="A tech review thumbnail with bold text, dark background, and a glowing laptop..."
            rows={4}
            className="w-full px-5 pt-5 pb-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none"
          />
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                className="text-xs rounded-lg gap-2 border-border/50"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ImagePlus className="h-3.5 w-3.5" />
                )}
                {uploading
                  ? "Uploading..."
                  : selectedFile
                    ? selectedFile.name.substring(0, 20) + "..."
                    : "Attach reference"}
              </Button>
            </div>

            <button
              onClick={handleClick}
              disabled={loading || uploading}
              className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <ArrowUp className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Progress */}
        {loading && progressState.step && (
          <div className="mt-5 p-4 rounded-xl border border-border/50 bg-card/30">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-foreground">
                {progressState.step}
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {progressState.progress}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressState.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {images.length > 0 && (
          <div className="mt-10">
            <h2
              className={`text-lg font-semibold mb-4 ${sora.className}`}
            >
              Generated
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...images].reverse().map((image) => (
                <div
                  key={image}
                  className="group relative rounded-xl overflow-hidden border border-border/50"
                >
                  <Image
                    src={image}
                    width={1920}
                    height={1080}
                    alt="Generated thumbnail"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                    <Link
                      href={image}
                      target="_blank"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <Download className="h-4 w-4 text-black" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
