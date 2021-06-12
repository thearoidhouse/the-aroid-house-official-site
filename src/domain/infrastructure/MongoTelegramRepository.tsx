export class MongoTelegramRepo {
  public readonly db: any;

  private constructor(db: any) {
    this.db = db;
  }

  addUser(name: string, chatID: number): void {
    this.db.collection("telegram").insertOne({ name, chatID });
  }

  getAllUsers(): Promise<any> {
    return this.db.collection("telegram").find({});
  }

  public static create(db: any): MongoTelegramRepo {
    return new MongoTelegramRepo(db);
  }
}
