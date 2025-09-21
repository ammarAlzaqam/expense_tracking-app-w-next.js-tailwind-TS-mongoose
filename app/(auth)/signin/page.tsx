import SigninForm from "@/components/forms/SigninForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SigninPage() {
  return (
    <section className="w-full flex flex-col items-center gap-5">
      <h1 className="text-body-bold text-light-3 capitalize">
        Login to your account
      </h1>
      <SigninForm />
      <p className="text-gray-1">
        Create a new account?
        <Link href="/signup" className="ms-2 text-primary-500">
          Signup
        </Link>
      </p>
    </section>
  );
}
