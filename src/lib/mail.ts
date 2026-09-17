import nodemailer from "nodemailer";
import { getServiceBySlug } from "@/lib/data/services";

const SITE_NAME = "渡邊 将人 コンディショニング";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export type InquiryMailInput = {
  inquiryType: "reservation" | "general";
  serviceSlug: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

function buildSummaryLines(input: InquiryMailInput): string[] {
  const service = input.serviceSlug ? getServiceBySlug(input.serviceSlug) : undefined;
  const lines = [
    `種別: ${input.inquiryType === "reservation" ? "ご予約" : "ご相談・その他のお問い合わせ"}`,
  ];
  if (service) lines.push(`メニュー: ${service.name}`);
  lines.push(`お名前: ${input.name}`);
  lines.push(`メール: ${input.email}`);
  if (input.phone) lines.push(`電話番号: ${input.phone}`);
  lines.push("", "内容:", input.message);
  return lines;
}

export async function sendCustomerConfirmation(input: InquiryMailInput) {
  const transporter = getTransporter();
  const subject =
    input.inquiryType === "reservation"
      ? `【${SITE_NAME}】ご予約を受け付けました`
      : `【${SITE_NAME}】お問い合わせを受け付けました`;

  const body = [
    `${input.name} 様`,
    "",
    "この度はお問い合わせいただきありがとうございます。以下の内容で受け付けました。",
    "内容を確認の上、担当より改めてご連絡いたします。",
    "",
    "---",
    ...buildSummaryLines(input),
    "---",
    "",
    SITE_NAME,
  ].join("\n");

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.GMAIL_USER}>`,
    to: input.email,
    subject,
    text: body,
  });
}

export async function sendOwnerNotification(input: InquiryMailInput) {
  const transporter = getTransporter();
  const subject =
    input.inquiryType === "reservation"
      ? `【新規予約】${input.name} 様より`
      : `【新規お問い合わせ】${input.name} 様より`;

  const body = buildSummaryLines(input).join("\n");

  await transporter.sendMail({
    from: `"${SITE_NAME} サイト通知" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
    replyTo: input.email,
    subject,
    text: body,
  });
}
