import NavbarClient from "@/components/layout/Navbar/Navbar.client";
import { getOnAirData } from "@/lib/wp";

export default async function Navbar() {
  const onAir = await getOnAirData();
  return <NavbarClient initialOnAir={onAir} />;
}