export interface Tracker {
  text: string;
  highlight: number;
  fails: Set<number>;
}
