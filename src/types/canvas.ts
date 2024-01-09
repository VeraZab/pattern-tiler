import { CanvasDimensions, ImageAttributes, TileDimensions } from "../types/appState";

export interface CanvasProps {
    canvasState: CanvasDimensions;
    tileState: TileDimensions;
    imageState: ImageAttributes;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}