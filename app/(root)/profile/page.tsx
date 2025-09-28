import UserInfo from "@/components/shared/UserInfo";

export default async function ProfilePage() {
  return (
    <section>
      <h1 className="text-heading1 text-light-1">Profile</h1>

      <div className="mt-10">
        <UserInfo route="/profile" />
      </div>
    </section>
  );
}
