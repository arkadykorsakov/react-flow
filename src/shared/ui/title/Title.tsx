import type { ComponentPropsWithoutRef } from 'react';

type TitleLevel = 1 | 2 | 3;

interface TitleProps extends ComponentPropsWithoutRef<'h1'> {
  level?: TitleLevel;
}

export function Title({ level = 1, className = '', ...props }: TitleProps) {
  const Tag = `h${level}` as const;

  const sizeClass =
    level === 1
      ? 'text-3xl font-bold'
      : level === 2
        ? 'text-2xl font-semibold'
        : 'text-xl font-semibold';

  return (
    <Tag className={`${sizeClass} tracking-tight text-slate-900 ${className}`.trim()} {...props} />
  );
}
