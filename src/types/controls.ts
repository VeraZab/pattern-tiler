import { CanvasDimensions, ImageAttributes, TileDimensions } from "../types/appState";

export interface ControlsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasState: CanvasDimensions;
  setCanvasState: React.Dispatch<React.SetStateAction<CanvasDimensions>>;
  tileState: TileDimensions;
  setTileState: React.Dispatch<React.SetStateAction<TileDimensions>>;
  imageState: ImageAttributes;
  setImageState: React.Dispatch<React.SetStateAction<ImageAttributes>>;
}
