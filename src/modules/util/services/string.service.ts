export class StringService {
  public capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default new StringService();
