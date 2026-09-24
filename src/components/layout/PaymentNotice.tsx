import { Container } from "@/components/ui/Container";

export function PaymentNotice() {
  return (
    <Container className="py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-500 sm:p-8">
        <p className="font-semibold text-slate-700">お支払いについて</p>
        <p className="mt-2">現金またはお振込でのお支払いに対応しています。</p>
        <p className="mt-4 font-semibold text-slate-700">キャンセルポリシー</p>
        <p className="mt-2">
          整体施術・パーソナルトレーニングは、ご予約日前日の21時までのご連絡でキャンセル料はかかりません。前日21時以降〜当日のキャンセルは、施術料金の100%をキャンセル料として申し受けます。
        </p>
      </div>
    </Container>
  );
}
