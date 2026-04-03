import { NavLink } from 'react-router';

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
  ].join(' ');

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-slate-900">
          React Flow
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/test" className={navLinkClassName}>
            Test
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
