import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[100dvh] flex justify-center items-center max-xs:py-5">
      <div className="border-1 border-dark-2 mx-5 w-full sm:w-md lg:w-lg px-3 py-5 xs:p-5 flex flex-col items-center gap-7 bg-dark-1 rounded-lg shadow-md shadow-light-3/20">
        <div className="flex flex-col gap-3 items-center">
          <div className="relative h-24 xs:h-26 w-24 xs:w-26">
            <Image
              src="/owner.jpg"
              alt="logo"
              fill
              placeholder="empty"
              quality={100}
              className="rounded-full object-cover shadow-lg shadow-light-3/30"
            />
          </div>
          <h1 className="text-center text-heading3 xs:text-heading2 text-primary-500 text-shadow-lg text-shadow-light-1/20 uppercase tracking-wider">
            Mora Tracker
          </h1>
        </div>
        {children}
      </div>
    </section>
  );
}
