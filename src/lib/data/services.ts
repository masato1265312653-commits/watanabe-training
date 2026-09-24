import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "team-support",
    name: "スポーツチームサポート",
    shortName: "チームサポート",
    category: "team",
    tagline: "チームのコンディショニングサポートからパフォーマンスアップまで",
    description:
      "スポーツチームや学生団体向けに、練習でのコンディショニングやテーピング、怪我予防やパフォーマンス強化のためのトレーニング指導を行います。人数・頻度に応じてプランをご提案します。",
    icon: "team",
    image: "/images/taping-1.jpg",
    priceOptions: [
      { label: "練習帯同(1回・チーム単位)", price: 12000 },
      { label: "大会帯同(1日・チーム単位)", price: 20000 },
      { label: "月間契約(要相談)", price: 0 },
    ],
    benefits: [
      "メディカルサポート",
      "テーピング",
      "アスレチックリハビリテーション",
      "ストレングス&コンディショニングトレーニング",
      "救急対応",
    ],
    targets: [
      "地域の少年団・クラブチーム",
      "学生スポーツ団体",
      "大会前後のケアを強化したいチーム",
      "スポーツパフォーマンスを上げたい方",
    ],
  },
  {
    slug: "massage",
    name: "整体施術",
    shortName: "整体",
    category: "individual",
    tagline: "凝り・疲労をほぐし、日常のパフォーマンスを底上げ",
    description:
      "筋肉の張りや疲労の蓄積を丁寧にほぐす施術です。デスクワークによる肩こり・腰痛から、運動前後のメンテナンスまで、お客様の状態に合わせて圧の強さや部位を調整します。オイルマッサージやカッピングも施術内容に含まれており、状態に応じて組み合わせて行います。",
    icon: "massage",
    image: "/images/massage.jpg",
    durationMinutes: 60,
    priceOptions: [
      { label: "整体施術 60分", price: 7000 },
      { label: "整体施術 90分", price: 10000 },
    ],
    priceNote: "初回はカウンセリングを含むため、プラス1,000円となります。",
    benefits: [
      "可動域の改善",
      "痛みの軽減",
      "睡眠の質向上につながるリラックス効果",
      "オイルマッサージ・カッピングにも対応",
    ],
    targets: [
      "デスクワークで肩こり・腰痛が気になる方",
      "どこにいっても良くならない慢性痛",
      "運動前後のメンテナンスをしたい方",
      "むくみや冷えが気になる方",
    ],
  },
  {
    slug: "acupuncture",
    name: "鍼灸施術",
    shortName: "鍼灸",
    category: "individual",
    comingSoon: true,
    tagline: "メンテナンスから美容鍼まで幅広く対応",
    description:
      "鍼と灸を用いて身体の不調にアプローチします。慢性的な痛みや自律神経の乱れ、スポーツによる怪我のケアまで幅広く対応します。徒手療法やカッピングも施術内容に含まれており、状態に応じて組み合わせて行います。",
    icon: "acupuncture",
    image: "/images/acupuncture.jpg",
    durationMinutes: 60,
    priceOptions: [
      { label: "はりきゅう 60分", price: 7000 },
      { label: "美容鍼 60分", price: 8000 },
    ],
    priceNote: "初回はカウンセリングを含むため、プラス1,000円となります。",
    benefits: [
      "慢性痛・関節痛への専門的アプローチ",
      "自律神経を整え、心身のコンディションを安定させる",
      "怪我からの回復をサポート",
      "美容鍼",
    ],
    targets: [
      "肩・腰・膝などの慢性的な痛みがある方",
      "自律神経の乱れ・不眠が気になる方",
      "スポーツ外傷のリハビリ中の方",
      "顔のたるみが気になる方",
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
