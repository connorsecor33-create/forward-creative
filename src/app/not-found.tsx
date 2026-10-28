import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[80svh] flex-col justify-end bg-paper pb-16 pt-40">
      <p className="eyebrow mb-6 text-mute-dark">404 / Page not found</p>
      <h1 className="display-xxl">
        Wrong turn<span className="sr-only">.</span>
      </h1>
      <p className="lede mt-8 max-w-md">This page doesn&rsquo;t exist — but the only way from here is forward.</p>
      <div className="mt-10">
        <Button href="/" variant="ink" size="lg">Back to home</Button>
      </div>
    </section>
  );
}
