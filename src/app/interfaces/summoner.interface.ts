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
