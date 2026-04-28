"use client";

import type { Id } from "../../../convex/_generated/dataModel";

interface OpenSlot {
  _id: Id<"availabilitySlots">;
  startsAt: number;
  endsAt: number;
  veterinarianId: Id<"veterinarians">;
  vetName: string;
  vetSpecialty?: string;
  vetPhotoUrl?: string;
}

export interface CalendarGridProps {
  slots: OpenSlot[];
  fromTs: number;
  days: number;
  onSelect: (slot: OpenSlot) => void;
  selectedSlotId?: Id<"availabilitySlots">;
}

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function CalendarGrid({
  slots,
  fromTs,
  days,
  onSelect,
  selectedSlotId,
}: CalendarGridProps) {
  const today = startOfDay(fromTs);
  const dayStarts = Array.from({ length: days }, (_, i) => today + i * DAY_MS);

  const slotsByDay = new Map<number, OpenSlot[]>();
  for (const s of slots) {
    const key = startOfDay(s.startsAt);
    const list = slotsByDay.get(key) ?? [];
    list.push(s);
    slotsByDay.set(key, list);
  }
  for (const list of slotsByDay.values()) {
    list.sort((a, b) => a.startsAt - b.startsAt);
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dayStarts.map((dayTs) => {
        const dateLabel = new Date(dayTs).toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        const list = slotsByDay.get(dayTs) ?? [];
        return (
          <section
            key={dayTs}
            className="rounded-md border border-border-default bg-bg-elevated p-3"
          >
            <h3 className="mb-2 text-sm font-semibold capitalize text-sage-700">
              {dateLabel}
            </h3>
            {list.length === 0 ? (
              <p className="text-xs text-text-secondary">Sin huecos.</p>
            ) : (
              <ul className="space-y-1.5">
                {list.map((s) => {
                  const time = new Date(s.startsAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const isSelected = selectedSlotId === s._id;
                  return (
                    <li key={s._id}>
                      <button
                        type="button"
                        onClick={() => onSelect(s)}
                        className={
                          "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors " +
                          (isSelected
                            ? "border-sage-500 bg-sage-200 text-sage-700"
                            : "border-border-default bg-bg-base text-text-primary hover:border-sage-500 hover:bg-bg-muted")
                        }
                      >
                        <span className="font-medium">{time}</span>
                        <span className="text-xs text-text-secondary">
                          {s.vetName.split(" ")[0]}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
