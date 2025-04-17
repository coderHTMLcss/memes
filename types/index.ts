import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export interface MemeFormErrors {
  name?: string;
  image?: string;
  likes?: string;
}
