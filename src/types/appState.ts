export interface CanvasDimensions {
  width: number;
  height: number;
}

export interface TileDimensions {
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
}

export interface ImageAttributes {
  url: string | null;
  fileName: string | null;
  image: HTMLImageElement | null;
}
