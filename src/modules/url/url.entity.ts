import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Url {

    @PrimaryColumn()
    id : number;

    @Column()
    shortUrlCode : string;
    
    @Column()
    longUrl : string;

    @Column()
    expiry : Date;

}