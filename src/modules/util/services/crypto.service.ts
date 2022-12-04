import crypto from 'crypto';

import appConfig from '../../../config/app.config';

export class CryptoService {
  private ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  private IV_LENGTH = 16;

  public encrypt(text: string, algorithm?: string) {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(
      algorithm || appConfig.ENCRYPTION_ALGORITHM,
      Buffer.from(this.ENCRYPTION_KEY as string),
      iv,
    );
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  public decrypt(text: string, algorithm?: string) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift() as string, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      algorithm || appConfig.ENCRYPTION_ALGORITHM,
      Buffer.from(this.ENCRYPTION_KEY as string),
      iv,
    );
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

  public hash(text: string, algorithm?: string) {
    return crypto
      .createHash(algorithm || appConfig.HASHING_ALGORITHM)
      .update(text)
      .digest('hex');
  }
}

export default new CryptoService();
