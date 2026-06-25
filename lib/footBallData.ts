export async function getClassificaSerieA() {
  try {
    const response = await fetch(
      `${process.env.NEXT_FOOTBALL_DATA_ORG_API_URL}/v4/competitions/SA/standings`,
      {
        headers: {
          'X-Auth-Token': process.env.NEXT_FOOTBALL_DATA_ORG_API_KEY!,
        },
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Errore API football-data.org: ${response.status}`
      );
    }

    const parsedData = parseClassificaData(await response.json());

    return {
      error: false,
      data: parsedData,
    };
  } catch (err) {
    console.error(err);

    return {
      error: true,
      data: null,
    };
  }
}

export type ClassificaSerieAResponse = {
    position: number;
    team: string;
    logo: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

function parseClassificaData(data: any): ClassificaSerieAResponse[] {
    const standings = data.standings.find(
        (standing: any) => standing.type === 'TOTAL'
    );

    if (!standings) {
        return [];
    }

    return standings.table.map((team: any) => ({
        position: team.position,
        team: team.team.shortName,
        logo: team.team.crest,
        played: team.playedGames,
        won: team.won,
        draw: team.draw,
        lost: team.lost,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        goalDifference: team.goalDifference,
        points: team.points,
    }));
}