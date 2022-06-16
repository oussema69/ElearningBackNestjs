export interface Fichier extends Blob {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: {
        type: Buffer,
        data:[]
    },
    size: number  }
  
export class Fichier {
    _id : String;
    fieldname: String;
    originalname: String;
    encoding: String;
    mimetype: String;
    buffer: {
        type: Buffer;
        data:[]
    };
    size: number  }