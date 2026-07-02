import ProgrammiSlider from "./ProgrammiSlider";
import { getAllProgrammiData, getBestProgrammaCover } from "@/lib/wp";

export default async function ProgrammiSection() {
  const programmi = await getAllProgrammiData();

  const programmiConCover = await Promise.all(
    programmi.map(async (programma) => ({
      ...programma,
      cover:
        (await getBestProgrammaCover(programma)) ??
        "/images/placeholder-programma.jpg",
    }))
  );

  return <ProgrammiSlider programmi={programmiConCover} />;
}