import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Url {

    @PrimaryColumn()
    id : number;

    @Column()
    shortUrl : string;
    
    @Column()
    longUrl : string;

    @Column()
    expriy : Date;

}