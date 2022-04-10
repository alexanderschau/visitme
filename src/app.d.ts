type ProfileType = {
  img: string;
  name: string;
  description: string;
  links: LinkType[];
  primaryColor: [number, number, number];
};

type LinkType = {
  text: string;
  url: string;
};

type RGBType = {
  r: number;
  g: number;
  b: number;
};

type ColorListType = {
  2: string;
  6: string;
  14: string;
  35: string;
  80: string;
  96: string;
};
