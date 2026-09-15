export type ServiceCategory = "individual" | "team";

export type PriceOption = {
  label: string;
  price: number;
  unit?: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  icon: "massage" | "acupuncture" | "training" | "team";
  image?: string;
  durationMinutes: number;
  priceOptions: PriceOption[];
  priceNote?: string;
  benefits: string[];
  targets: string[];
  comingSoon?: boolean;
};
