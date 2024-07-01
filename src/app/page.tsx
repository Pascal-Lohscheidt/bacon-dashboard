export default function Home() {
  return (
    <main className="relative min-h-screen h-screen p-0">
      <iframe
        src="https://nodered.caps-platform.de/gps/"
        className="w-full h-screen rounded-md"
        title="Embedded Page"
      />

      {/* Overlay Grid */}
      <div className="absolute -inset-0 grid grid-cols-overlay grid-rows-overlay pointer-events-none">
        <div className="col-start-1 -col-end-1 row-start-1 p-4">
          <div className="w-full h-full backdrop-blur-md bg-gray-200/40 text-slate-900 rounded-md px-4  flex flex-row items-center">
            <h1 className="font-bold text-2xl">Beacon Dashboard</h1>
          </div>
        </div>

        <div className="col-span-1 col-start-1 row-start-2 row-span-1 p-4">
          <div className="w-full h-full backdrop-blur-md bg-gray-200/40 rounded-md p-4">
            <h2 className="text-xl text-slate-700">Settings</h2>
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
