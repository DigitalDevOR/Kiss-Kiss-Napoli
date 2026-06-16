// hooks/useOnAirPolling.ts
"use client";

import { useEffect, useRef, useState } from "react";

export type OnAirResponse = {
  success: boolean;
  data: {
    program: {
      id: number;
      meta_id: number;
      title: string;
      slug: string;
      url: string;
      image: string;
    };
    schedule: {
      date: string;
      day: string;
      start: string;
      end: string;
      duration: number;
      days: string[];
      date_start: string;
      date_end: string;
    };
    speakers: {
      id: number;
      name: string;
      slug: string;
      url: string;
      image: string;
    }[];
    raw?: {
      speaker_intervall_event?: {
        id: string;
        name: string;
      }[];
      speaker_status?: {
        id: string;
        name: string;
      }[];
    };
  };
};

function getEndDateTime(onAir: OnAirResponse) {
  return new Date(`${onAir.data.schedule.date}T${onAir.data.schedule.end}:00`);
}

function isDifferentProgram(current: OnAirResponse, next: OnAirResponse) {
  return (
    current.data.program.id !== next.data.program.id ||
    current.data.schedule.date !== next.data.schedule.date ||
    current.data.schedule.start !== next.data.schedule.start ||
    current.data.schedule.end !== next.data.schedule.end
  );
}

async function fetchOnAir() {
  const res = await fetch("/api/on-air", {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json() as Promise<OnAirResponse>;
}

export function useOnAirPolling(initialOnAir: OnAirResponse) {
  const [onAir, setOnAir] = useState(initialOnAir);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function clearTimers() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      timeoutRef.current = null;
      intervalRef.current = null;
    }

    function startPolling() {
      intervalRef.current = setInterval(async () => {
        const nextOnAir = await fetchOnAir();

        if (!nextOnAir) return;

        if (isDifferentProgram(onAir, nextOnAir)) {
          clearTimers();
          setOnAir(nextOnAir);
        }
      }, 30_000);
    }

    clearTimers();

    const endDate = getEndDateTime(onAir);
    const delay = endDate.getTime() - Date.now();

    if (delay <= 0) {
      startPolling();
    } else {
      timeoutRef.current = setTimeout(startPolling, delay);
    }

    return clearTimers;
  }, [onAir]);

  return onAir;
}