"use client";
import axios from "axios";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, ArrowUp, Loader2, Download, X, Globe, Lock } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [videoTitle, setVideoTitle] = useState("");
  const [externalPrompt, setExternalPrompt] = useState("");
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
    return fileUrl;
  };

  const processSelectedFiles = async (files: File[]) => {
    if (files.length === 0) return;
    if (files.length > 5) {
      toast("You can upload up to 5 images.");
      return;
    }
    try {
      setUploading(true);
      setSelectedFiles(files);
      const uploadedLinks = await Promise.all(
        files.map((file) => uploadWithPresignedUrl(file))
      );
      setImageLinks(uploadedLinks);
    } catch (error) {
      console.error("Error uploading selected files:", error);
      toast("Failed to upload one or more images.");
      setSelectedFiles([]);
      setImageLinks([]);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await processSelectedFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length === 0) {
      toast("Please drop image files only.");
      return;
    }
    await processSelectedFiles(files);
  };

  const clearImages = () => {
    setSelectedFiles([]);
    setImageLinks([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function handleClick() {
    setLoading(true);
    setProgressState({ step: "Initializing...", progress: 0 });

    if (!videoTitle.trim()) {
      toast("Please enter the video title.");
      setLoading(false);
      setProgressState({ step: "", progress: 0 });
      return;
    }

    if (!externalPrompt.trim()) {
      toast("Please enter an external prompt.");
      setLoading(false);
      setProgressState({ step: "", progress: 0 });
      return;
    }

    try {
      const basicPrompt = [
        `Video title: ${videoTitle.trim()}`,
        `External prompt: ${externalPrompt.trim()}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const response = await axios.post("/api/generate-thumbnail", {
        basicPrompt,
        videoTitle: videoTitle.trim(),
        externalPrompt: externalPrompt.trim(),
        isPublic,
        image_url: imageLinks[0],
        image_urls: imageLinks.length > 0 ? imageLinks : undefined,
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

        {/* Bento Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Video Title — full width */}
          <div className="rounded-2xl border border-border/50 bg-card/30 p-5 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Video title <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="10 AI Tools That Save Me 10 Hours/Week"
              className="w-full rounded-xl border border-border/40 bg-background/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>

          {/* External Prompt */}
          <div className="rounded-2xl border border-border/50 bg-card/30 p-5 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              External prompt <span className="text-red-500">*</span>
            </p>
            <textarea
              value={externalPrompt}
              onChange={(e) => setExternalPrompt(e.target.value)}
              placeholder="Style, composition, mood, text overlays, colors..."
              rows={6}
              className="w-full rounded-xl border border-border/40 bg-background/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>

          {/* Reference Images — full width */}
          <div className="rounded-2xl border border-border/50 bg-card/30 p-5 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground mb-3">
              Reference images{" "}
              <span className="text-muted-foreground/50">(optional, up to 5)</span>
            </p>

            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`rounded-xl border-2 border-dashed p-5 transition-colors ${
                isDragging
                  ? "border-red-500 bg-red-500/5"
                  : "border-border/50 bg-background/20"
              }`}
            >
              <p className="text-xs text-muted-foreground mb-3">
                Drag &amp; drop up to 5 images here, or choose files manually.
              </p>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-lg gap-2 border-border/50"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ImagePlus className="h-3.5 w-3.5" />
                    )}
                    {uploading
                      ? "Uploading..."
                      : selectedFiles.length > 0
                        ? `${selectedFiles.length} image${selectedFiles.length > 1 ? "s" : ""} selected`
                        : "Choose files"}
                  </Button>

                  {selectedFiles.length > 0 && !uploading && (
                    <button
                      onClick={clearImages}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="Clear selection"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Public / Private toggle */}
                  <div className="relative group/vis">
                    <button
                      type="button"
                      onClick={() => setIsPublic((v) => !v)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        isPublic
                          ? "border-green-500/40 bg-green-500/10 text-green-500"
                          : "border-border/50 bg-background/20 text-muted-foreground"
                      }`}
                    >
                      {isPublic ? (
                        <Globe className="h-3.5 w-3.5" />
                      ) : (
                        <Lock className="h-3.5 w-3.5" />
                      )}
                      {isPublic ? "Public" : "Private"}
                    </button>

                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-52 opacity-0 group-hover/vis:opacity-100 transition-opacity duration-150 z-10">
                      <div className="rounded-lg bg-popover border border-border/60 px-3 py-2 shadow-md text-xs text-muted-foreground leading-relaxed">
                        {isPublic
                          ? "Your thumbnail will be visible to everyone on the Explore page. Click to make it private."
                          : "Your thumbnail will only be visible to you. Click to show it on the Explore page."}
                      </div>
                      {/* Arrow */}
                      <div className="absolute right-3 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border/60" />
                    </div>
                  </div>

                  <button
                    onClick={handleClick}
                    disabled={loading || uploading}
                    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <p className="mt-2.5 text-xs text-muted-foreground/70 truncate">
                  {selectedFiles.map((f) => f.name).join(", ")}
                </p>
              )}
            </div>
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
            <h2 className={`text-lg font-semibold mb-4 ${sora.className}`}>
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
