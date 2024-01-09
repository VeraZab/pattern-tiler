import { CSSProperties } from "react";

import { ImageInputProps } from "../types/imageInput";

const imageInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
}

const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => (
  <input
    type="file"
    style={imageInputStyles}
    onChange={onChange} />
)

export default ImageInput;
