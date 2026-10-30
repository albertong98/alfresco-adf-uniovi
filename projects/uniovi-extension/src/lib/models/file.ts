export class CreateFile {
    fileId: string;
    file: File;
    mimetype: string;
    name: string;

    constructor(id:string,file: File,mimetype:string,name:string){
        this.fileId = id;
        this.file = file;
        this.mimetype = mimetype;
        this.name = name;
    }
}