// Image testimonials data
export type ImageTestimonial = {
    id: string;
    type: "image";
    imageUrl: string;
    alt: string;
};

export const imageTestimonials: ImageTestimonial[] = [
  {
    id: "img-1",
    type: "image",
    imageUrl:
      "https://res.cloudinary.com/desjc8vzi/image/upload/v1767694673/Screenshot_2026-01-06_at_3.46.38_PM_xynnam.png",
    alt: "User feedback about Opensox Pro",
  },
  {
    id: "img-2",
    type: "image",
    imageUrl:
      "https://res.cloudinary.com/desjc8vzi/image/upload/v1767694870/Screenshot_2026-01-06_at_3.51.05_PM_qai5xj.png",
    alt: "User feedback about Opensox Pro",
  },
  {
    id: "img-1",
    type: "image",
    imageUrl:
      "https://res.cloudinary.com/desjc8vzi/image/upload/v1767695552/Screenshot_2026-01-06_at_4.02.24_PM_ubg5ts.png",
    alt: "User feedback about Opensox Pro",
  },
];