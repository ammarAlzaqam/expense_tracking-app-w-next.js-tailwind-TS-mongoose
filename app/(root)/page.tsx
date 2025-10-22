import { GiWideArrowDunk } from "react-icons/gi";
export default async function HomePage() {
  return (
    <section className="space-y-10">
      <h1 className="flex gap-3 items-center text-heading1 text-light-1 uppercase">
        <GiWideArrowDunk />
        <span>finance</span>
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {/*//! Net */}
        <div className="finance-light relative finance-card col-span-2">
          <h1 className="text-heading1 text-primary-500">6,250.00</h1>
          <h3 className="finance-text">Net Balance</h3>
        </div>

        {/*//! Income */}
        <div className="finance-card finance-sub-bg p-4">
          <h3 className="finance-text font-normal text-small sm:text-base">Income</h3>
          <h2 className="text-heading3 overflow-auto no-scrollbar text-blue">
            8,500.00
          </h2>
        </div>

        {/*//! Expenses */}
        <div className="finance-card finance-sub-bg p-4">
          <h3 className="finance-text font-normal text-small sm:text-base">Expenses</h3>
          <h2 className="text-heading3 text-secondary-500">2,250.00</h2>
        </div>
      </div>
    </section>
  );
}
