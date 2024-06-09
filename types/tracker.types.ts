export interface TextTrackerInfo {
  text: string;
  highlight: number;
  fails: Set<number>;
}

export interface StatsTrackerInfo {
  wpm: number | null;
  accuracy: number | null;
  progress: number | null;
}
