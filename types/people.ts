import { IconType } from "react-icons";

export interface MemberLink {
  type: string;
  url: string;
  icon: IconType;
  label: string;
}

export interface Member {
  name: string;
  position: string;
  major: string;
  year: string;
  image: string;
  linkedin: string;
  links: MemberLink[];
}
