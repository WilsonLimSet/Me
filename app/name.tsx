export function NameTransition() {
  return (
    <h1
      className="text-xl font-bold pt-16 transition-element"
      style={{ viewTransitionName: 'name' }}
    >
      <span className="sr-only">Wilson Lim Setiawan</span>
      <span aria-hidden="true" className="block overflow-hidden group relative">
        <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full whitespace-nowrap">
          {'Wilson Lim Setiawan'.split('').map((letter, index) => (
            <span key={index} className="inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
        <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
          {'林伟生'.split('').map((letter, index) => (
            <span key={index} className="inline-block">
              {letter}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
}
