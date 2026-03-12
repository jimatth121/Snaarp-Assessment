import { MapPin, UserRound } from "lucide-react";
import ukFlag from "@/assests/uinitedkingdom.png";
import nigeriaFlag from "@/assests/nigeria.png";
import uaeFlag from "@/assests/uae.png";
import canadaFlag from "@/assests/canada.png";
import usaFlag from "@/assests/uintedstates.png";
import { FilterButton, Progress, SectionHeader, SectionShell } from "./shared";

const countries = [
  { name: "United Kingdom", pct: 78, flag: ukFlag },
  { name: "Nigeria", pct: 61, flag: nigeriaFlag },
  { name: "UAE", pct: 45, flag: uaeFlag },
  { name: "Canada", pct: 59, flag: canadaFlag },
  { name: "United States of America", pct: 78, flag: usaFlag },
];

function MapCard() {
  return (
    <div className="relative h-[272px] overflow-hidden rounded-[12px] border border-[#e7e7ea] ">
      <iframe
        title="Active Users Map"
        className="absolute left-0 top-[-44px] h-[calc(100%+44px)] w-full grayscale-[0.08]"
        src="https://maps.google.com/maps?ll=6.5244,3.3792&z=17&t=&output=embed"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/22" />

      <div className="pointer-events-none absolute left-[108px] top-[58px]">
        <div className="flex flex-col items-center">
          <MapPin size={26} className="text-[#5a69ff]" fill="#5a69ff" />
          <div className="mt-1 rounded-[8px] bg-[#5a69ff] px-3 py-1 text-[12px] font-medium text-white shadow-sm">
            Stanley
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[32px] left-[62px]">
        <div className="flex flex-col items-center">
          <MapPin size={26} className="text-[#ff5b56]" fill="#ff5b56" />
          <div className="mt-1 rounded-[8px] bg-[#ff5b56] px-3 py-1 text-[12px] font-medium text-white shadow-sm">
            Samuel
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[84px] right-[58px]">
        <div className="flex flex-col items-center">
          <MapPin size={26} className="text-[#74c72f]" fill="#74c72f" />
          <div className="mt-1 rounded-[8px] bg-[#74c72f] px-3 py-1 text-[12px] font-medium text-white shadow-sm">
            Chisom
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActiveUsersWidget() {
  return (
    <SectionShell className="h-full p-3 bg-white rounded-2xl">
      <SectionHeader
        icon={<UserRound size={13} />}
        title="Active Users"
        actions={<FilterButton label="Month" options={["Month", "Week", "Day"]} className="w-[84px]" />}
      />

      <div className="mt-5 flex h-[272px] items-stretch gap-4">
        <div className="h-full min-w-0 basis-[48%]">
          <MapCard />
        </div>

        <div className="flex h-full basis-[52%] flex-col gap-3">
          {countries.map((country) => (
            <div key={country.name} className="flex min-h-0 flex-1 items-center rounded-[12px] border border-[#e5e5e8] bg-[#fcfcfd] px-3 py-2.5">
              <div className="flex w-full items-center gap-3">
                <img src={country.flag} alt={country.name} className="h-[22px] w-[32px] rounded-[4px] border border-[#e4e4e7] object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[10px] font-medium text-[#555b66]">{country.name}</div>
                  <div className="mt-2">
                    <Progress value={country.pct} height={5} track="#dfdfdf" />
                  </div>
                </div>
                <span className="shrink-0 text-[9.5px] text-[#787d88]">{country.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
