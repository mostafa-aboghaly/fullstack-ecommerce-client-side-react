export interface IProduct {
  id?: number;
  documentId?: string | null;
  title: string;
  description: string;
  price: number;
  category: {
    documentId: string;
    id: number;
    title: string;
  };
  stock: number;
  thumbnail: {
    url?: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      small?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  };
  quantity?: number;
}
export interface IFormInput {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: File;
}
