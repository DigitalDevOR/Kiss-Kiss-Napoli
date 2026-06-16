import { OnAirResponse } from "@/hooks/useOnAirPolling";
const BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://kisskissnapoli.it/';

export async function getOnAirData(): Promise<OnAirResponse> {
  const response = await fetch(`${BASE_URL}/wp-json/customApi/v1/on-air`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Errore API on-air: ${response.status}`);
  }

  return response.json();
}