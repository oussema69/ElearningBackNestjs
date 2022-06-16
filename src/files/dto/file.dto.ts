import { IsNotEmpty, IsEmail } from "class-validator";
export class FichierDto {
    fieldname: String;
    originalname: String;
    encoding: String;
    mimetype: String;
    buffer: {
        type: Buffer,
        data:[]
    }
    size: number ;
 }
  
