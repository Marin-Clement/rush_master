export interface Summoner {
  summonerNames: string[];
  summonerIconsIds: string[];
}

export interface SummonerStat {
  summoner: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winrate: number;
}

export interface SummonerHistoryStat {
  summoner: string;
  numberOfGames: number;
  wins: number;
  losses: number;
  mainRole: string;
  champions: [];
  winrate: number;
  kda: number;
  csPerMin: number;
  goldPerMin: number;
  damagePerMin: number;
  visionPerMin: number;
}
