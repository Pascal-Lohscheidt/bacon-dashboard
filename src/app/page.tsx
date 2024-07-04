'use client';

import { useMemo, useState } from 'react';
import SettingsTabView from './(components)/SettingsTabView';
import Select from './(components)/Select';
import Button from './(components)/Button';

type MapMode = 'ESRI Satellite' | 'Open Streets';

function mapToEndPoint(view: string, mapMode: MapMode): string {
  const viewModeMapper: { [key: string]: string } = {
    Standard: 'gps',
    Heatmap: 'heatmap',
    Track: 'tracking',
    'Other 1': 'other1',
  };
  const mapModeMapper: { [key in MapMode]: string } = {
    'ESRI Satellite': 'esri-satellite',
    'Open Streets': 'open-streets',
  };

  return `${viewModeMapper[view]}-${mapModeMapper[mapMode]}`;
}

export default function Home() {
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

            <div className="flex flex-row space-x-4 ml-auto pointer-events-auto">
              <Button onClick={zoomInN6}>Zoom In N6</Button>
              <Select
                onChange={(event) => setMapMode(event.target.value as MapMode)}
              >
                <option value="ESRI Satellite">ESRI Satellite</option>
                <option value="Open Streets">Open Streets</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="col-span-1 col-start-1 row-start-2 row-span-1 p-4">
          <div className="w-full h-full backdrop-blur-md bg-gray-200/40 rounded-md p-4">
            <SettingsTabView setSelectedView={setSelectedView} />
          </div>
        </div>
      </div>

      {/*
      <div className="w-full h-[700px] grid grid-cols-main-grid gap-4 grid-rows-main-grid">
        <iframe
          src="https://nodered.caps-platform.de/gps/"
          className=" w-full h-full rounded-md col-span-1 col-start-1 row-span-1 row-start-1"
          title="Embedded Page"
        />

        <iframe
          src="https://nodered.caps-platform.de/gps"
          className="w-full h-full rounded-md col-span-1 col-start-2 row-span-1 row-start-1"
          title="Embedded Page"
        />
      </div>
*/}
    </main>
  );
}

function zoomInN6() {
  fetch('https://nodered.caps-platform.de/find-n6');
}
