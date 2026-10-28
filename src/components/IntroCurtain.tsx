/**
 * A brief branded loading curtain on the first visit of a session.
 *
 * Pure CSS so it paints with the first byte of HTML (no flash before
 * hydration). An inline script adds `.no-intro` to <html> on repeat views
 * within a session and for reduced-motion users, which removes it entirely.
 */
export function IntroCurtain() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var d=document.documentElement;if(sessionStorage.getItem('fc-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches||location.hash){d.classList.add('no-intro')}sessionStorage.setItem('fc-intro','1')}catch(e){document.documentElement.classList.add('no-intro')}`,
        }}
      />
      <div className="intro-curtain" aria-hidden="true">
        <div className="gutter flex w-full items-end justify-between pb-8">
          <div className="overflow-hidden">
            <p className="intro-word font-display text-[clamp(3rem,14vw,12rem)] font-black uppercase leading-[0.85] tracking-[-0.06em]">
              Forward<span className="text-lime">.</span>
            </p>
          </div>
          <div className="intro-line mb-3 hidden h-px w-1/4 bg-lime md:block" />
        </div>
      </div>
    </>
  );
}
