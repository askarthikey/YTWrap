"use client";
import { useState } from "react";
import { VideoDropzone } from "@/app/components/MultiFileDropzone/page";
import { useEdgeStore } from "@/lib/edgestore";
import { formatFileSize } from "@edgestore/react/utils";
import { toast } from "react-hot-toast";
import { FileIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
export default function VideoUploadPage() {
  const [file, setFile] = useState<File | null>();
  const [progress, setprogress] = useState(0);
  const [uploadstate, setuplaodstate] = useState(false);
  const [channelid, setchannelid] = useState<String | null>();
  const { edgestore } = useEdgeStore();
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const handleFileChange = (file: File | null) => {
    setFile(file);
  };
  async function handleupload() {
    if (file) {
      try {
        setuplaodstate(true);
        const res = await edgestore.videoFiles.upload({
          file,
          onProgressChange(progress) {
            setprogress(progress);
          },
        });
        if (res) {
          toast.success("Video uplaoded successfully");
          const videoid = uuidv4();
          const url = res.url;
          const dbres = await fetch("/api/videos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videoid: videoid,
              url: res.url,
              channelid: channelid,
            }),
          });
          console.log(dbres);
        }
      } catch (error) {}
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

      <VideoDropzone
        onChange={handleFileChange}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 50, // 50MB
          accept: {
            "video/*": [".mp4", ".mov", ".avi"],
          },
        }}
      />
      {file && (
        <div className="flex h-16 w-full flex-col justify-center rounded border border-gray-300 px-4 py-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-white">
            <FileIcon size={30} className="text-black shrink-0" />
            <div className="min-w-0 text-sm">
              <div className="truncate">{file.name}</div>
              <div className="text-xs text-gray-400">
                {formatFileSize(file.size)}
              </div>
            </div>
            {uploadstate && progress != 100 && (
              <div className="relative size-8">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="black"
                    className="stroke-current text-gray-100 dark:text-gray-800" // Light background in light mode, darker in dark mode
                    strokeWidth="2.5"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-black dark:text-white" // Black in light mode, white in dark mode
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-black dark:text-white">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* You can use the videoFile state here */}
      {file && (
        <div className="mt-4">
          <div className="my-5">
            <label className="text-black mx-2  font-semibold">Channel Id</label>
            <input
              type="text"
              className="border border-black h-1rem rounded-sm "
              onChange={(e) => {
                setchannelid(e.target.value);
              }}
            />
          </div>
          <button className="btn" onClick={handleupload}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
