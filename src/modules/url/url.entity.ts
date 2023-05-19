import { Type } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Hit } from "../hit/hit.entity";
import { User } from "../user/user.entity";

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

    @Column({ default : true })
    isActive : boolean;
    
    @OneToMany( () => Hit, (hit) => hit.url)
    @JoinColumn()
    hits : Hit[];

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
 
}