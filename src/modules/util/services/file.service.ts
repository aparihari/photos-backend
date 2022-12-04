export class FileService {
  public base64Encode(buffer: Buffer) {
    return buffer.toString('base64');
  }

  public base64Decode(imageStr: string) {
    return Buffer.from(imageStr, 'base64');
  }

  public getFileName(name: string) {
    return name.split(/[\\/]/).pop();
  }
}

export default new FileService();
