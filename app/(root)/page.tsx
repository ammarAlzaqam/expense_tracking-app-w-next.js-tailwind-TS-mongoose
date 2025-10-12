import UserInfo from "@/components/shared/UserInfo";

export default async function HomePage() {
  return (
    <section>
      <h1 className="text-heading1 text-light-1">Home</h1>

      <div className="mt-10">
        <UserInfo route="/" />
      </div>

      {/*//! Display users with startDate account & total mony */}
    </section>
  );
}
