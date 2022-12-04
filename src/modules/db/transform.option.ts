import { Schema } from 'mongoose';

export class Transform {
  private removeIdOptions = {
    virtuals: true,
    transform: (doc: any, ret: any, options: any) => {
      delete ret._id;
    },
  };

  public setId(scheme: Schema) {
    scheme.set('toJSON', this.removeIdOptions);
    scheme.set('toObject', this.removeIdOptions);
  }
}

export default new Transform();
