/**
 * Minimal Sweden outline with a beacon on Gothenburg.
 *
 * The coastline is a smoothed trace of real lon/lat points under a sinusoidal
 * projection, so the silhouette stays true rather than merely suggestive. The
 * marker is positioned as a percentage of the viewBox — 41.7/162 across and
 * 373.4/456 down — which keeps the label as crisp HTML text at any map size.
 */
const SWEDEN_PATH =
  "M72.2 8.0C69.2 7.7 50.0 22.3 48.9 24.4C47.7 26.5 53.0 41.7 52.1 43.7C51.3 45.7 35.4 56.2 34.2 58.2C32.9 60.1 30.9 75.2 30.3 77.5C29.7 79.7 23.4 93.8 23.4 96.8C23.5 99.8 30.9 125.7 30.9 128.9C30.9 132.1 24.9 149.0 23.6 151.5C22.3 153.9 8.2 168.1 8.0 170.7C7.8 173.4 19.4 192.2 20.2 196.5C20.9 200.8 19.9 240.7 20.5 244.7C21.1 248.8 29.7 262.6 30.6 265.6C31.5 268.6 36.6 293.5 36.4 296.2C36.2 298.9 27.1 310.0 26.4 312.3C25.8 314.5 24.8 332.4 25.4 334.8C26.0 337.1 36.0 350.2 36.8 352.5C37.6 354.7 38.2 371.2 38.8 373.4C39.4 375.5 45.6 386.8 46.8 389.5C48.0 392.1 57.9 416.3 59.1 418.4C60.3 420.5 66.5 423.1 67.4 424.8C68.3 426.6 72.7 446.7 74.4 448.0C76.2 449.3 95.7 448.9 97.2 447.4C98.6 445.8 97.6 423.2 99.0 421.6C100.4 420.0 120.2 421.0 121.9 420.0C123.5 419.1 127.5 407.7 127.4 405.5C127.3 403.4 120.6 385.7 120.2 383.0C119.7 380.4 119.8 362.8 119.8 360.5C119.9 358.3 120.1 345.9 120.9 344.4C121.7 342.9 132.5 336.2 133.4 334.8C134.3 333.4 137.4 323.7 136.0 320.3C134.7 316.9 111.1 280.0 109.9 276.9C108.6 273.8 115.9 269.7 115.1 267.2C114.3 264.8 96.8 238.0 95.7 235.1C94.6 232.2 95.7 220.2 96.2 217.4C96.7 214.6 102.7 189.0 104.4 186.8C106.1 184.7 123.9 182.6 125.3 180.4C126.7 178.1 128.3 151.6 128.8 148.2C129.2 144.9 131.9 124.6 133.4 122.5C134.9 120.4 154.1 114.7 154.4 112.9C154.7 111.0 140.3 93.3 138.7 90.3C137.0 87.3 128.7 65.0 126.5 61.4C124.2 57.8 103.2 32.3 100.0 29.2C96.9 26.1 75.2 8.3 72.2 8.0Z";

export function SwedenMap() {
  return (
    <div className="relative mx-auto w-40 sm:w-48 md:w-56">
      <svg
        viewBox="0 0 162 456"
        fill="none"
        className="h-auto w-full"
        role="img"
        aria-label="Map of Sweden with Gothenburg marked on the west coast"
      >
        <path d={SWEDEN_PATH} fill="#F2EADF" stroke="#c4a98e" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>

      <span className="absolute top-[81.9%] left-[25.7%] block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2">
        <span className="map-pulse" aria-hidden="true" />
        <span className="map-pulse map-pulse--offset" aria-hidden="true" />
        <span
          className="absolute inset-0 rounded-full bg-[#E8833A] ring-2 ring-[#fdfaf6]"
          aria-hidden="true"
        />
        <span className="absolute top-1/2 left-full ml-3 -translate-y-1/2 font-display text-xs font-bold tracking-[0.18em] whitespace-nowrap text-[#B85F1E] uppercase">
          Gothenburg
        </span>
      </span>
    </div>
  );
}
