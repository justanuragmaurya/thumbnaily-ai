"use client";
import axios from "axios";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, ArrowUp, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProgressState {
  step: string;
  progress: number;
  imageUrl?: string; // To store the final image URL
  error?: string;    // To store any error messages
}

export default function GenerationPage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[] | []>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageLink, setLink] = useState<string | "">("");
  const [progressState, setProgressState] = useState<ProgressState>({
    step: "",
    progress: 0,
  });

  // Poll progress function
     // Inside GenerationPage component
     const pollProgress = useCallback(async (progressId: string) => {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/generate-thumbnail?progressId=${progressId}`);
          if (!response.ok) {
            // Handle non-2xx responses from polling if necessary, e.g. 404 if progressId expires
            if (response.status === 404) {
              toast("Session expired or progress ID is invalid.");
              clearInterval(pollInterval);
              setLoading(false);
              setProgressState({ step: "Error", progress: 100, error: "Polling failed: Invalid ID" });
            }
            // Potentially throw to be caught by catch block
            throw new Error(`Polling failed with status: ${response.status}`);
          }
          
          const progressData = await response.json() as ProgressState;
          setProgressState(progressData); // Update UI with current step and progress
 
          if (progressData.imageUrl) { // Success
            setImages((prev) => [...prev, progressData.imageUrl!]);
            toast("Thumbnail generated successfully!");
            clearInterval(pollInterval);
            setLoading(false);
            // Optionally reset progressState after a delay or keep "Complete"
            // setProgressState({ step: "Complete!", progress: 100 }); 
          } else if (progressData.error) { // Error reported by backend
            toast(`Error: ${progressData.error}`);
            clearInterval(pollInterval);
            setLoading(false);
            // setProgressState({ step: `Error: ${progressData.error}`, progress: 100 });
          } else if (progressData.progress >= 100) {
             // If progress is 100 but no imageUrl or error, it might be an intermediate "Complete" state
             // or the final state hasn't propagated fully.
             // If the backend guarantees imageUrl/error with 100% for final states, this branch might not be strictly needed.
             // However, to be safe, if it's 100% and not yet final, keep polling for a bit or handle.
             // For now, we assume imageUrl or error will arrive with or soon after 100%.
             // If after a few more polls at 100% nothing changes, then stop.
          }
 
        } catch (error) {
          console.error("Error polling progress:", error);
          toast("Error checking generation progress.");
          clearInterval(pollInterval);
          setLoading(false);
          setProgressState({ step: "Polling Error", progress: 100, error: "Could not retrieve progress" });
        }
      }, 1000); // Poll every 1 second (adjust as needed)
 
      return pollInterval; // Not strictly needed to return it here unless managed outside
    }, [setImages, setLoading, setProgressState, toast]); // Add dependencies

  const uploadWithPresignedUrl = async (file: File): Promise<string> => {
    try {
      setUploading(true);
      console.log(
        "Uploading file:",
        file.name,
        "Type:",
        file.type,
        "Size:",
        file.size
      );

      // Get presigned URL from API
      const response = await fetch("/api/presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Presigned URL Error:", errorData);
        throw new Error(
          `Failed to get presigned URL: ${errorData.error || response.statusText}`
        );
      }

      const { signedUrl, fileUrl, key } = await response.json();
      console.log("Got presigned URL for key:", key);

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("S3 Upload Error Details:");
        console.error(
          "Status:",
          uploadResponse.status,
          uploadResponse.statusText
        );
        console.error("Response:", errorText);
        console.error("Request URL:", signedUrl);
        throw new Error(
          `Failed to upload file to S3: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }
      setUploading(false);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading with presigned URL:", error);
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Inside GenerationPage component
  async function handleClick() {
    setLoading(true);
    setProgressState({ step: "Initializing...", progress: 0 }); // Initial visual feedback

    if (!inputRef.current?.value) {
      toast("Please enter a prompt.");
      setLoading(false);
      setProgressState({ step: "", progress: 0 });
      return;
    }

    try {
      const response = await axios.post("/api/generate-thumbnail", {
        basicPrompt: inputRef.current.value,
        image_url: imageLink, // Ensure imageLink is the string URL or ""
      });

      if (response.data.progressId) {
        pollProgress(response.data.progressId);
      } else if (response.data.error) {
        // Handle immediate errors from POST if any
        toast(response.data.message || "Failed to start generation.");
        setLoading(false);
        setProgressState({ step: "", progress: 0 });
      }
    } catch (error: any) {
      console.error("Generation initiation error:", error);
      toast(
        error.response?.data?.message ||
          "Failed to initiate thumbnail generation."
      );
      setLoading(false);
      setProgressState({ step: "", progress: 0 });
    }
    // No setLoading(false) in a finally block here
  }

  return (
    <div className="w-full">
      <div className="w-full top-0 p-5">
        <div className="max-w-5xl mx-auto pt-24">
          <div className="flex flex-col w-full">
            <div className="text-center">
              <h2 className="text-8xl">🔥</h2>
              <h1 className="p-3 mx-auto text-4xl font-black">
                Idea to thumbnail in seconds.
              </h1>
              <h1 className="text-primary/70">
                Thumbnaily is your superhuman thumbnail artist.
              </h1>
            </div>
            <div className="max-w-2xl w-full flex flex-col mx-auto border rounded-md mt-5">
              <textarea
                ref={inputRef}
                placeholder="Enter your prompt here."
                className="px-3 rounded-md text-md border-none focus:border-none focus:outline-none mt-2 resize-none text-primary/80"
              />
              <div className="flex justify-between items-center p-3">
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    variant={"outline"}
                    className="text-xs rounded-sm"
                    onClick={triggerFileInput}
                  >
                    {uploading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <ImagePlus className="mr-1" />
                    )}
                    {uploading ? (
                      <>Uploading to server...</>
                    ) : selectedFile ? (
                      selectedFile.name.substring(0, 15) + "..."
                    ) : (
                      "Attach Reference"
                    )}
                  </Button>
                </div>
                {!loading && (
                  <ArrowUp
                    onClick={handleClick}
                    aria-disabled={loading || uploading}
                    className="rounded-full text-secondary bg-primary hover:scale-110 p-1"
                  />
                )}
                {loading && <Loader2 className="animate-spin" />}
              </div>
            </div>

            {/* Progress Bar */}
            {loading && progressState.step && (
              <div className="max-w-2xl w-full mx-auto mt-4 p-4 bg-background border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary/80">
                    {progressState.step}
                  </span>
                  <span className="text-sm text-primary/60">
                    {progressState.progress}%
                  </span>
                </div>
                <div className="w-full bg-background border rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressState.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="">
            {!(images.length == 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10">
                {images &&
                  [...images].reverse().map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="group bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <Image
                          src={`${image}`}
                          width={1920}
                          height={1080}
                          alt={`image${index}`}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
