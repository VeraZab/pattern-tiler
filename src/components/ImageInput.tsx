import { imageInputStyles } from "../styles/ImageInput";
import { ImageInputProps } from "../types/imageInput";

const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => (
  <input type="file" style={imageInputStyles} onChange={onChange} />
);

export default ImageInput;
