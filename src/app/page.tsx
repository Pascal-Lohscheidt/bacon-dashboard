'use client';

import { useEffect, useMemo, useState } from 'react';
import SettingsTabView from './(components)/SettingsTabView';
import Select from './(components)/Select';
// import Button from './(components)/Button';
import { DateTime } from 'luxon';
import ComboBox from './(components)/ComboBox';
import useSWR from 'swr';
import InfoBox from './(components)/InfoBox';
import DatePicker from './(components)/DatePicker';
import Link from 'next/link';

type MapMode = 'ESRI Satellite' | 'Open Streets';

function mapToEndPoint(view: string, mapMode: MapMode): string {
  const viewModeMapper: { [key: string]: string } = {
    Standard: 'gps',
    Heatmap: 'heatmap',
    Track: 'track',
    Cluster: 'cluster',
  };
  const mapModeMapper: { [key in MapMode]: string } = {
    'ESRI Satellite': 'esri-satellite',
    'Open Streets': 'open-streets',
  };

  return `${viewModeMapper[view]}-${mapModeMapper[mapMode]}`;
}

export default function Home() {
  const [startDate, setStartDate] = useState<DateTime>(
    DateTime.fromISO('2024-07-11T16:30:00.000')
  );
  const [endDate, setEndDate] = useState<DateTime>(
    DateTime.fromISO('2024-07-11T17:00:00.000')
  );
  const [selectedView, setSelectedView] = useState<string>('Standard');
  const [mapMode, setMapMode] = useState<MapMode>('ESRI Satellite');

  const mapEndpoint = useMemo(
    () => mapToEndPoint(selectedView, mapMode),
    [mapMode, selectedView]
  );

  return (
    <main className="relative min-h-screen h-screen p-0">
      <iframe
        src={`https://nodered.caps-platform.de/${mapEndpoint}`}
        className="w-full h-screen rounded-md"
        title="Embedded Page"
      />

      {/* Overlay Grid */}
      <div className="absolute -inset-0 grid grid-cols-overlay grid-rows-overlay pointer-events-none">
        <div className="col-start-1 -col-end-1 row-start-1 p-4">
          <div className="w-full h-full backdrop-blur-md bg-gray-200/40 text-slate-900 rounded-md px-4  flex flex-row items-center">
            <h1 className="font-bold text-2xl">
              Beacon Dashboard - {selectedView}
            </h1>

            <div className="flex flex-row space-x-4 ml-auto pointer-events-auto items-center">
              {/* 
              <Button onClick={refreshMap}>Refresh</Button>
              <Button onClick={zoomInN6}>Zoom In N6</Button>
            
              <Select
                value={timeRange}
                onChange={(event) => setTimeRange(event.target.value)}
              >
                <option value="5min">5 min</option>
                <option value="10min">10 min</option>
                <option value="15min">15 min</option>
                <option value="30min">30 min</option>
                <option value="60min">1h</option>
                <option value="240min">4h</option>
                <option value="720min">12h</option>
              </Select>
              */}

              <Link
                replace
                className="text-teal-400 font-semibold underline"
                href={
                  'https://kibana.caps-platform.de/s/chiemsee_space/app/dashboards#/view/1b470bd0-90d8-11ed-b6ae-7b8527ecb153'
                }
              >
                Kibana Dashboard
              </Link>
              <Link
                replace
                className="text-teal-400 font-semibold underline"
                href={'https://nodered.caps-platform.de/ui/'}
              >
                NodeRed Dashboard
              </Link>

              <DatePicker
                onChange={(date: DateTime) => {
                  setStartDate(date);
                  updateDateRange(date, endDate);
                }}
                value={startDate}
              />

              <DatePicker
                onChange={(date: DateTime) => {
                  setEndDate(date);
                  updateDateRange(startDate, date);
                }}
                value={endDate}
              />
              <Select
                onChange={(event) => setMapMode(event.target.value as MapMode)}
              >
                <option value="ESRI Satellite">ESRI Satellite</option>
                <option value="Open Streets">Open Streets</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="col-span-1 col-start-1 row-start-2 row-span-1 p-4 h-full overflow-hidden">
          <div className="w-full h-full overflow-hidden backdrop-blur-md bg-gray-200/40 rounded-md p-4">
            <SettingsTabView tabs={tabs} setSelectedView={setSelectedView} />
          </div>
        </div>
      </div>
    </main>
  );
}

async function updateDateRange(startDate: DateTime, endDate: DateTime) {
  console.log('Transmitting startDate: ', startDate.toISO());
  console.log('Transmitting endDate: ', endDate.toISO());

  await fetch(`https://nodered.caps-platform.de/set-date-range`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate: startDate.toISO(),
      endDate: endDate.toISO(),
    }),
  });
}

async function zoomInN6() {
  await fetch('https://nodered.caps-platform.de/find-n6');
}

async function refreshMap() {
  await fetch('https://nodered.caps-platform.de/refresh');
}

async function setFilteredMac(mac: string) {
  await fetch('https://nodered.caps-platform.de/set-macs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ macs: [mac] }),
  });
}

const tabs = [
  {
    name: 'Standard',
    content: () => (
      <div className="w-full h-full flex flex-col space-y-4">
        <InfoBox
          title={<h1 className="text-lg font-bold text-teal-800">Hint:</h1>}
        >
          <p className="text-mg text-teal-800">
            Displays the positions of nodes and the probe requests sniffed by
            each node during the selected time period.
          </p>
        </InfoBox>
      </div>
    ),
  },
  {
    name: 'Heatmap',
    content: () => (
      <div className="w-full h-full flex flex-col space-y-4">
        {' '}
        <InfoBox
          title={<h1 className="text-lg font-bold text-teal-800">Hint:</h1>}
        >
          <p className="text-mg text-teal-800">
            The heatmap visualizes the amount of beacon signals received near a
            node within a specific time frame. The more signals there are, the
            more intense the color will be.
          </p>
        </InfoBox>
      </div>
    ),
  },
  {
    name: 'Track',
    content: () => <TrackTab />,
  },
  {
    name: 'Cluster',
    content: () => <ClusterTab />,
  },
];

const TrackTab = () => {
  const [macs, setMacs] = useState<string[]>([]);

  useEffect(() => {
    async function getMacs() {
      const response = await fetch('https://nodered.caps-platform.de/get-macs');
      const data = await response.json();
      console.log(data);

      setMacs(data.macs);
    }
    getMacs();
  }, []);

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <InfoBox
        title={<h1 className="text-lg font-bold text-teal-800">Hint:</h1>}
      >
        <p className="text-mg text-teal-800">
          Illustrates the path traced by a specific trackable MAC address. A MAC
          address is considered trackable if it appears in at least three
          different nodes.
        </p>
      </InfoBox>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-slate-800">Macs to track</label>
        <ComboBox
          onChange={({ id }) => {
            setFilteredMac(id);
          }}
          items={macs.map((i) => ({ id: i, value: i }))}
        />
      </div>
    </div>
  );
};

const ClusterTab = () => {
  const { data: peopleCount, isLoading } = useSWR(
    '/get-people-count',
    async (key) => {
      const response = await fetch(`https://nodered.caps-platform.de${key}`);
      return (await response.json()).count;
    },
    {
      refreshInterval: 1000,
    }
  );

  return (
    <div className="w-full overflow-scroll h-full flex flex-col space-y-4">
      <InfoBox
        title={<h1 className="text-lg font-bold text-teal-800">Hint:</h1>}
      >
        <p className="text-mg text-teal-800">
          Displays the positions of nodes and the probe requests sniffed by each
          node during the selected time period. Track: Illustrates the path
          traced by a specific trackable MAC address. A MAC address is
          considered trackable if it appears in at least three different nodes.
        </p>
      </InfoBox>
      {isLoading && (
        <span className="text-slate-600">Fetching people count...</span>
      )}
      {!isLoading && (
        <div className="flex flex-col space-y-2">
          <span className="text-slate-800 font-semibold">
            People count: {peopleCount}{' '}
          </span>
        </div>
      )}
    </div>
  );
};
