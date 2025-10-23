import Finance from "@/components/shared/Finance";
import { getUserFinanceSummary } from "@/lib/actions/transaction.action";

export default async function HomePage() {
  const { income, expenses, netBalance } = await getUserFinanceSummary();
  return (
    <section className="space-y-10">
      <Finance income={income} expenses={expenses} netBalance={netBalance} />
    </section>
  );
}
