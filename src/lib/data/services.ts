import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "team-support",
    name: "スポーツチームサポート",
    shortName: "チームサポート",
    category: "team",
    tagline: "チーム・団体単位でのコンディショニング支援",
    description:
      "地域のスポーツチームや学生団体向けに、練習・大会帯同でのコンディショニングやテーピング、怪我予防のための身体づくり指導を行います。人数・頻度に応じてプランをご提案します。",
    icon: "team",
    image: "/images/taping-1.jpg",
    durationMinutes: 90,
    priceOptions: [
      { label: "練習帯同(1回・チーム単位)", price: 12000 },
      { label: "大会帯同(1日・チーム単位)", price: 20000 },
      { label: "月間契約(要相談)", price: 0 },
    ],
    benefits: [
      "メディカルサポート",
      "トレーニング指導",
      "テーピング",
      "アスレチックリハビリテーション",
      "パフォーマンスアップトレーニング",
      "コンディショニング",
      "救急対応",
    ],
    targets: [
      "地域の少年団・クラブチーム",
      "学生スポーツ団体",
      "大会前後のケアを強化したいチーム",
    ],
  },
  {
    slug: "massage",
    name: "整体施術",
    shortName: "整体",
    category: "individual",
    tagline: "凝り・疲労をほぐし、日常のパフォーマンスを底上げ",
    description:
      "筋肉の張りや疲労の蓄積を丁寧にほぐす施術です。デスクワークによる肩こり・腰痛から、運動後のケアまで、お客様の状態に合わせて圧の強さや部位を調整します。",
    icon: "massage",
    image: "/images/massage.jpg",
    durationMinutes: 60,
    priceOptions: [
      { label: "60分", price: 7000 },
      { label: "90分", price: 10000 },
    ],
    priceNote: "初回はカウンセリングを含むため、プラス1,000円となります。",
    benefits: [
      "可動域の改善",
      "痛みの軽減",
      "血行促進で疲労回復をサポート",
      "睡眠の質向上につながるリラックス効果",
    ],
    targets: [
      "デスクワークで肩こり・腰痛が気になる方",
      "運動後のケアをしたい方",
      "むくみや冷えが気になる方",
    ],
  },
  {
    slug: "acupuncture",
    name: "鍼灸施術",
    shortName: "鍼灸",
    category: "individual",
    tagline: "メンテナンスから美容鍼まで幅広く対応",
    description:
      "国家資格を持つ施術者が、鍼と灸を用いて身体の不調にアプローチします。慢性的な痛みや自律神経の乱れ、スポーツによる怪我のケアまで幅広く対応します。",
    icon: "acupuncture",
    image: "/images/acupuncture.jpg",
    durationMinutes: 50,
    priceOptions: [
      { label: "はりきゅう 60分", price: 7000 },
      { label: "美容鍼 60分", price: 8000 },
    ],
    priceNote: "初回はカウンセリングを含むため、プラス1,000円となります。",
    benefits: [
      "慢性痛・関節痛への専門的アプローチ",
      "自律神経を整え、心身のコンディションを安定させる",
      "怪我からの回復をサポート",
    ],
    targets: [
      "肩・腰・膝などの慢性的な痛みがある方",
      "自律神経の乱れ・不眠が気になる方",
      "スポーツ外傷のリハビリ中の方",
    ],
  },
  {
    slug: "personal-training",
    name: "パーソナルトレーニング",
    shortName: "パーソナル",
    category: "individual",
    tagline: "目的に合わせて、一人ひとりにオーダーメイドのプログラムを提供",
    description:
      "ダイエット、姿勢改善、競技力向上など、お客様の目的に合わせて完全個別にプログラムを設計します。年齢・運動経験を問わず、無理のない負荷から始められます。",
    icon: "training",
    image: "/images/personal-training.jpg",
    durationMinutes: 60,
    priceOptions: [
      { label: "体験セッション 60分", price: 2980 },
      { label: "通常セッション 60分", price: 8800 },
      { label: "回数券(10回・有効期限1年)", price: 82000, unit: "10回分" },
    ],
    benefits: [
      "目的別のオーダーメイドプログラム",
      "正しいフォーム習得による怪我予防",
      "継続しやすい負荷設定と記録管理",
    ],
    targets: [
      "初めて筋トレに取り組む方",
      "競技パフォーマンスを高めたいアスリート",
      "姿勢改善・ダイエットが目的の方",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
