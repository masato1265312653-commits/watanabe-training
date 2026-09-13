import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/marketing/ServiceDetailTemplate";
import { getServiceBySlug } from "@/lib/data/services";

const service = getServiceBySlug("massage")!;

export const metadata: Metadata = {
  title: `${service.name} | 渡邊 将人 コンディショニング`,
  description: service.description,
};

export default function MassagePage() {
  return <ServiceDetailTemplate service={service} />;
}
