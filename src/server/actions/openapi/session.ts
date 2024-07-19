class Session {
  private threadId: string;
  private userID: string;

  constructor(threadId: string, userID: string) {
    (this.threadId = threadId), (this.userID = userID);
  }
}
