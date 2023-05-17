import { Type } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    shortUrlCode : string;
    
    @Column()
    longUrl : string;

    @Type( () => Date )
    @Column('text')
    expiry : Date;

    @Column({ default : 0 })
    hit : number;

    @Column({ default : true })
    isActive : boolean;


}