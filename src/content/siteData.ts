// src/content/siteData.ts
const siteDomain = import.meta.env.PUBLIC_SITE_DOMAIN;
import Logo from "@/assets/i75/i75logo.webp";

export const course = "CPA";

export const siteData = {
  title: `i75 ${course} Review`,
  legalName: `i75 ${course} Review LLC`,
  logo: Logo,
  tagline:
    "Get On i75 with Darius Clark, because The Right Teacher Makes All The Difference!",
  description: `Welcome to i75 ${course} Review, your clear and direct road to passing the ${course} exam. Led by Darius Clark, our course is designed to simplify complex topics and offer focused, practical insights that help you efficiently prepare for success.`,
  mainCTAText: `Get On The Right Road To ${course}!`,
  mainCTAurl: "/",
  domain: siteDomain,
  url: `https://${siteDomain}`,
  location: "Monmouth County, NJ",
  address: "Monmouth County, NJ",
};

export const contactItems = [
  {
    type: "email",
    label: "darius@i75courses.com",
    href: "mailto:darius@i75courses.com",
    icon: "fa6:envelope",
  },
  {
    type: "phone",
    label: "(904) 800-7751",
    href: "tel:904-800-7751",
    icon: "fa6:phone",
  },
  {
    type: "location",
    label: "Monmouth County, NJ",
    href: null,
    icon: "fa6:map-pin",
  },
];

export const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/darius.clark.54",
    icon: "fa6:facebook",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/i75/",
    icon: "fa6:linkedin",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/c/DariusClarkcpaexamtutoring",
    icon: "fa6:youtube",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/i75cpareview/",
    icon: "fa6:instagram",
  },
];

export const ctaData = {
  text: "Get On The Right Road",
  link: "/",
};
