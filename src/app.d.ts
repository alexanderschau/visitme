type ProfileType = {
  img: string;
  name: string;
  description: string;
  links: LinkType[];
  primaryColor?: [number, number, number];
};

type LinkType = {
  url: string;
  label: string;
  img?: string;
};
