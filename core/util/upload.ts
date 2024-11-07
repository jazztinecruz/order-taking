import { PutBlobResult } from "@vercel/blob";
import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import type { OmittedProduct } from "../types";

const handleUpload = async (
  event: ChangeEvent<HTMLInputElement>,
  inputFileRef: React.RefObject<HTMLInputElement>,
  setValue: UseFormSetValue<OmittedProduct>
) => {
  event.preventDefault();

  if (!inputFileRef.current?.files) {
    throw new Error("No file selected");
  }

  const file = inputFileRef.current.files[0];

  const response = await fetch(`/api/storage?filename=${file.name}`, {
    method: "POST",
    body: file,
  });

  const newBlob = (await response.json()) as PutBlobResult;
  setValue("imageUrl", newBlob.url);
};

export default handleUpload;
