import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';

type Tab = {
  name: string;
  content: () => JSX.Element;
};

type Props = {
  setSelectedView: (view: string) => void;
  tabs: Array<Tab>;
};

export default function SettingsTabView({ setSelectedView, tabs }: Props) {
  return (
    <TabGroup
      className="w-full h-full text-slate-600 pointer-events-auto"
      onChange={(index) => setSelectedView(tabs[index].name)}
    >
      <TabList className="flex flex-wrap gap-4 bg-slate-100 rounded-md p-2">
        {tabs.map(({ name }) => (
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
      <TabPanels className="mt-3 overflow-scroll">
        {tabs.map(({ name, content: Content }) => (
          <TabPanel key={name} className="p-3">
            <Content />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
