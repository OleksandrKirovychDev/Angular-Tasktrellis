export class PersistenceService {
  set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  get<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
