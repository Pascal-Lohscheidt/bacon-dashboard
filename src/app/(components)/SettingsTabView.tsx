import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';

const categories = [
  {
    name: 'Standard',
    content: () => <>TBD</>,
  },
  {
    name: 'Heatmap',
    content: () => <>TBD</>,
  },
  {
    name: 'Track',
    content: () => <>TBD</>,
  },
  {
    name: 'Other 1',
    content: () => <>TBD</>,
  },
];

type Props = {
  setSelectedView: (view: string) => void;
};

export default function SettingsTabView({ setSelectedView }: Props) {
  return (
    <TabGroup
      className="w-full h-full text-slate-600 pointer-events-auto"
      onChange={(index) => setSelectedView(categories[index].name)}
    >
      <TabList className="flex flex-wrap gap-4 bg-slate-100 rounded-md p-2">
        {categories.map(({ name }) => (
          <Tab
            key={name}
            className={clsx(
              'rounded-md py-1 px-3 text-sm/6 font-semibold focus:outline-none',
              'data-[hover]:bg-white/70',
              'data-[selected]:bg-white data-[selected]:shadow-md data-[selected]:shadow-teal-100'
            )}
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {categories.map(({ name, content: Content }) => (
          <TabPanel key={name} className="p-3">
            <Content />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
