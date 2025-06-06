"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, ArrowUp, Loader2 } from "lucide-react";
import Image from "next/image";

export default function GenerationPage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[] | []>([]);
  const [prev,setPrev]=useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBase64 , setBase64]  = useState<string|"">("");

    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.readAsDataURL(file);
        
        fileReader.onload = () => {
          resolve(fileReader.result as string);
        };
        fileReader.onerror = (e) => {
          reject(e);
        };
      });
    };

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files[0]){
        const base64: string = await convertToBase64(e.target.files[0]);
        setBase64(base64)
        setSelectedFile(e.target.files[0])
      }
    };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  async function handleClick() {
    setLoading(true);

    if (!inputRef.current?.value) {
      console.log("no prompt");
      setLoading(false);
      return;
    }

    const response = await axios.post("/api/generate-thumbnail", {
      basicPrompt: inputRef.current.value,
      image_url:imageBase64
    });

    if (!response.data.imageURL) {
      console.log(response.data);
      setLoading(false);
      return;
    }

    setImages((prev) => [...prev, response.data.imageURL]);
    setLoading(false);
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
                  <ImagePlus className="mr-1" />
                  {selectedFile ? selectedFile.name.substring(0, 15) + "..." : "Attach Reference"}
                </Button>
              </div>
              {!loading&&<ArrowUp onClick={handleClick} className="rounded-full text-secondary bg-primary hover:scale-110 p-1"/>}
              {loading&&<Loader2 className="animate-spin"/>}
            </div>
          </div>
        </div>        
        <div className="">
        {!(images.length==0)&&<div className="grid grid-cols-2 gap-2 mt-10 p-10">
          {images &&
            [...images].reverse().map((image, index) => {
              return (
                <div 
                key={index} 
                className="group bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Image src={`${image}`} width={1920} height={1080} alt={`image${index}`}/>
              </div>
              );
            })}
        </div>}
        </div>
      </div>
    </div>
    </div>
  );
}