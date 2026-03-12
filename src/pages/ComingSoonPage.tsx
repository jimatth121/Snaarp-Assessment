type ComingSoonPageProps = {
  title: string;
};

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <section className="rounded-[18px] border border-[#ececee] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#2f3137]">{title}</h1>
      <p className="mt-3 text-[14px] text-[#7a7f89]">Coming soon</p>
    </section>
  );
}
