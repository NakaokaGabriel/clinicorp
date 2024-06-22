export default interface FirestoreConnection {
  query (referenceModel: 'add' | 'get' | 'getAll', col: string, data?: any): Promise<any>;
}