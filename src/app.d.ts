type ProfileType = {
  img: string;
  name: string;
  description: string;
  links?: LinkType[];
  content: ContentType[];
  primaryColor?: [number, number, number];
};

type ContentTypeOptions = "link" | "heading" | "iframe" | "image";
type ContentType = {
  type: ContentTypeOptions;
  data: LinkType | HeadingType | IframeType | ImageType;
};

type LinkType = {
  url: string;
  label: string;
  img?: string;
};

type HeadingType = {
  title: string;
};

type IframeType = {
  url: string;
};

type ImageType = {
  url: string;
};
