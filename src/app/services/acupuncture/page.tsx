import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/marketing/ServiceDetailTemplate";
import { getServiceBySlug } from "@/lib/data/services";

const service = getServiceBySlug("acupuncture")!;

export const metadata: Metadata = {
  title: `${service.name} | 渡邊 将人 コンディショニング`,
  description: service.description,
};

export default function AcupuncturePage() {
  return <ServiceDetailTemplate service={service} />;
}
