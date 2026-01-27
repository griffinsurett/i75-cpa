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
  topBarText: "Welcome To i75! The Right Road to Passing the CPA Exam!",
  mainCTAText: `Get On The Right Road To ${course}!`,
  mainCTAurl: "/",
  domain: siteDomain,
  url: `https://${siteDomain}`,
  location: "Monmouth County, NJ",
  address: "Monmouth County, NJ",
};

export const ctaData = {
  text: "Get On The Right Road",
  link: "/contact-us",
};
