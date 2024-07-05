import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { on } from 'events';
import { useState } from 'react';

interface ComboBoxProps {
  items: { id: string; value: string }[];
  onChange?: (value: { id: string; value: string }) => void;
}

export default function ComboBox({ items, onChange }: ComboBoxProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<
    { id: string; value: string } | undefined
  >(items[1]);

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) => {
          return item.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value ?? undefined);
        if (value && onChange) {
          onChange(value);
        }
      }}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            'w-full rounded-lg border-2 boder-slate-400 bg-white py-1.5 pr-8 pl-3 text-sm/6 text-slate-500',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-teal-400'
          )}
          displayValue={(item) => (item as any).value ?? ''}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-slate-400 group-data-[hover]:fill-slate-500" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'w-[var(--input-width)] rounded-xl border border-slate-400 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {filteredItems.map((item) => (
          <ComboboxOption
            key={item.id}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-slate-100"
          >
            <CheckIcon className="invisible size-4 fill-slate-400 group-data-[selected]:visible" />
            <div className="text-sm/6 text-slate-400">{item.value}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
