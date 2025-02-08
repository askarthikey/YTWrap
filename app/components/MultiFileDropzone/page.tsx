"use client";

import { FileIcon, UploadCloudIcon } from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";

const variants = {
  base: "relative rounded-md p-4 w-full flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

interface VideoDropzoneProps {
  className?: string;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled" | "multiple">;
}

export function VideoDropzone({
  dropzoneOptions,
  className,
  disabled,
  onChange,
}: VideoDropzoneProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | undefined>();

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    disabled,
    multiple: false,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];
      setError(undefined);

      if (acceptedFile) {
        setFile(acceptedFile);
        onChange?.(acceptedFile);
      }
    },
    ...dropzoneOptions,
  });

  const dropZoneClassName = React.useMemo(
    () =>
      twMerge(
        variants.base,
        isFocused && variants.active,
        disabled && variants.disabled,
        (isDragReject ?? fileRejections[0]) && variants.reject,
        isDragAccept && variants.accept,
        className,
      ).trim(),
    [
      isFocused,
      fileRejections,
      isDragAccept,
      isDragReject,
      disabled,
      className,
    ],
  );

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-2">
        <div className="w-full">
          <div {...getRootProps({ className: dropZoneClassName })}>
            <input {...getInputProps()} accept="video/*" />
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <UploadCloudIcon className="mb-1 h-7 w-7" />
              <div className="text-gray-400">
                drag & drop or click to upload video
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
