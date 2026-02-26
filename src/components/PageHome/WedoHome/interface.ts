export interface ImageObject {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ServiceWedoHome {
  id: number;
  name: string;
  icon: React.ReactNode;
  description?: string;
  image: ImageObject;
}
