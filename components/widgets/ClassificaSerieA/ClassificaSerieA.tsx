import Image from "next/image";
import { getClassificaSerieA } from "@/lib/footBallData";
import { ClassificaSerieAResponse } from "@/lib/footBallData";

function TeamRow({ team }: { team: ClassificaSerieAResponse }) {
  return (
    <tr className="border-b border-gray-200 text-sm">
      <td className="px-3 py-2 font-semibold">{team.position}</td>

      <td className="px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src={team.logo}
            alt={`Logo ${team.team}`}
            width={20}
            height={20}
            className="object-contain shrink-0"
          />
          <span className="truncate font-medium">{team.team}</span>
        </div>
      </td>

      <td className="px-3 py-2 text-right font-medium">{team.played}</td>

      <td
        className={`px-3 py-2 text-right font-medium ${
          team.goalDifference >= 0 ? "text-blue-900" : "text-red-600"
        }`}
      >
        {team.goalDifference > 0
          ? `+${team.goalDifference}`
          : team.goalDifference}
      </td>

      <td className="px-3 py-2 text-right font-bold">{team.points}</td>
    </tr>
  );
}

export default async function ClassificaSerieA() {
  const { data, error } = await getClassificaSerieA();

  return (
    <section
      aria-labelledby="classifica-serie-a-title"
      className="w-full rounded-xl bg-white flex flex-col overflow-hidden border border-gray-200 lg:max-w-70.25 max-w-81.5 max-h-[583px] lg:max-h-[503px]"
    >
      <header className="w-full py-3 px-4 bg-[var(--color-primary)]">
        <h2
          id="classifica-serie-a-title"
          className="text-white text-[15px] font-medium"
        >
          Classifica Serie A
        </h2>
      </header>

      {error ? (
        <div className="p-4" role="alert">
          <p className="text-red-500 text-sm">
            Errore nel recupero della classifica.
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto ">
          <table className="w-full table-fixed border-collapse">
            <caption className="sr-only">
              Classifica aggiornata della Serie A con posizione, squadra,
              partite giocate, differenza reti e punti.
            </caption>

            <thead className="sticky top-0 z-10 bg-white">
              <tr className="text-xs font-semibold text-gray-500 border-b border-gray-200">
                <th className="px-3 py-2 text-left w-[30px]">#</th>
                <th className="px-3 py-2 text-left">Squadra</th>
                <th className="px-3 py-2 text-right w-[35px]">G</th>
                <th className="px-3 py-2 text-right w-[45px]">DR</th>
                <th className="px-3 py-2 text-right w-[35px]">PT</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((team) => (
                <TeamRow key={team.position} team={team} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}