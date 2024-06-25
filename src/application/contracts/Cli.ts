export default interface Cli {
  option (flag: string, description: string): Promise<void>;
  execution (callback: Function): Promise<void>;
  invoke (args: string[]): void;
}