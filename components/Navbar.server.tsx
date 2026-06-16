import NavbarClient from "@/components/Navbar.client";
import { getOnAirData } from "@/lib/wp";

export default async function Navbar() {
  const onAir = await getOnAirData();
  console.log("Fetched onAir data in Navbar:", onAir);
  return <NavbarClient initialOnAir={onAir} />;
}