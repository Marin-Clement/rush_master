export interface Game {
  info: {
    gameId: number;
    gameCreation: number;
    gameDuration: number;
    participants: participant[];
    teams: team[];
  },
  metadata: {
    matchId: string;
    participants: string[];
  }
}

interface team {
  teamId: number;
  win: boolean;
}

interface participant {
  teamId: number;
  win: boolean;
  lane: string;
  role: string;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  kills: number;
  puuid: string;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  champLevel: number;
  championId: number;
  championName: string;
  summonerName: string;
  summoner1Id: number;
  summoner2Id: number;
  visionScore: number;
}
