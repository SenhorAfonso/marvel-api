interface IORM {
  connect(URL?: string, options?: object): Promise<any>,
  disconnect(): Promise<void>
}

export default IORM;