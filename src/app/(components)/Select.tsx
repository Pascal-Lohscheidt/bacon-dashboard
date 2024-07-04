import { Select as HeadlessSelect } from '@headlessui/react';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}>;

export default function Select({ children, onChange, className }: Props) {
  return (
    <HeadlessSelect
      onChange={onChange}
      className={clsx(
        'bg-slate-100 px-4 py-2 rounded-md border-2 border-slate-400',
        className
      )}
      name="esri-selct"
      aria-label="Project status"
    >
      {children}
    </HeadlessSelect>
  );
}
