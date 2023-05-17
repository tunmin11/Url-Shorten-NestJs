import { Type } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Url {

    @PrimaryColumn()
    id : number;

    @Column()
    shortUrlCode : string;
    
    @Column()
    longUrl : string;

    @Type( () => Date )
    @Column('text')
    expiry : Date;

    @Column()
    hit : number;

}