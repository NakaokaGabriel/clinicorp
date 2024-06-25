export default interface HttpServer {
  listen (port: number | string): void;
  route (method: 'get' | 'post', path: string, callback: Function): any;
}
