import { Link } from "@mui/material";
import Image from "next/image";
import GreenCross from "../public/green-cross.svg";

function FileList({ uploadedFiles, onRemoveFile }) {
  const files = uploadedFiles.map((file) => {
    return (
      <li key={file.path}>
        <div>
          <p>{file.path}</p>
          <Link>
            <Image
              src={GreenCross}
              alt="cross icon"
              onClick={() => onRemoveFile(file.path)}
            />
          </Link>
        </div>
      </li>
    );
  });
  return <ul className="chip-list">{files}</ul>;
}

export default FileList;
