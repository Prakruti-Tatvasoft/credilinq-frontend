import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "@mui/material";
import Image from "next/image";
import uploadIc from "../public/file-upload-icon.svg";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "rgba(0, 0, 0, 0.12)",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  transition: "border .3s ease-in-out",
  height: "100%",
};

const activeStyle = {
  borderColor: "#c4c4c4",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
function UploadFile({ disabled, totalFiles, addFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    addFiles((old) => [...old, ...acceptedFiles]);
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    disabled: disabled,
    accept: {
      "application/pdf": [],
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} disabled={true} />
      <Image src={uploadIc} alt="FileUpload" />
      <p>
        {" "}
        <Link>Click to upload</Link> or drag and drop Bank Statements
      </p>
    </div>
  );
}

export default UploadFile;
