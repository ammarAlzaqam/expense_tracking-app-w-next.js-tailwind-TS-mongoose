import SignupForm from "@/components/forms/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="w-full flex flex-col items-center gap-5">
      <h1 className="text-body-bold text-light-3 capitalize">
        Create your account
      </h1>
      <SignupForm />
      <p className="text-gray-1">
        Already have an account?
        <Link href="/signin" className="ms-2 text-primary-500">
          Signin
        </Link>
      </p>
    </section>
  );
}
