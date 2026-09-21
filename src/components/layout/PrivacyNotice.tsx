import { Container } from "@/components/ui/Container";

export function PrivacyNotice() {
  return (
    <Container className="py-12">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-relaxed text-slate-600 sm:p-8">
        <h2 className="text-base font-bold text-slate-900">個人情報の取扱いについて</h2>
        <p className="mt-3">
          お客様の個人情報を以下のように取り扱います。下記の内容をご確認いただき、ご同意の程お願い申し上げます。
        </p>

        <p className="mt-5 font-semibold text-slate-800">1. 個人情報の利用目的</p>
        <p className="mt-1">取得する個人情報の利用目的は以下のとおり限定しております。</p>
        <ol className="mt-1 flex list-decimal flex-col gap-1 pl-5">
          <li>お客様への適切なサービス提供のため</li>
          <li>お客様へのサービス向上のため</li>
          <li>事務・管理を適切に取り扱うため</li>
        </ol>

        <p className="mt-5">
          2. 取得した個人情報は、あらかじめご本人様の同意を得ることなく、第三者に提供することはありません。
        </p>
        <p className="mt-3">3. お客様の個人情報を委託することはありません。</p>
        <p className="mt-3">
          4.
          個人情報の取扱いに関する法令、国が定める指針、その他規範を遵守します。個人情報の管理、安全対策について個人情報への不正アクセス、個人情報の滅失、き損、改ざんおよび漏えい等のリスクに対して適切な予防措置を講ずることにより、個人情報の安全性、正確性の確保を図ります。また、万が一、問題が発生した場合には、被害の最小限化に努めるとともに、速やかに是正措置を実施します。
        </p>
        <p className="mt-3">
          5.
          上記利用目的の一部にご同意いただけない事項がある方や当個人情報の利用目的の通知、開示、内容の訂正・追加または削除、利用の停止・消去および第三者への提供の停止、ご質問・ご相談のある方は、下記の＜相談窓口＞までお問い合せください。
        </p>

        <p className="mt-5 font-semibold text-slate-800">＜相談窓口＞</p>
        <p className="mt-1">watanabe0503at@gmail.com</p>
      </div>
    </Container>
  );
}
