import { Hand, Syringe, Dumbbell, Users, type LucideIcon } from "lucide-react";
import type { Service } from "@/lib/types";

export const SERVICE_ICONS: Record<Service["icon"], LucideIcon> = {
  massage: Hand,
  acupuncture: Syringe,
  training: Dumbbell,
  team: Users,
};
