import { Type } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Hit } from "../hit/hit.entity";

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
    hits : Hit[] | null;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
 
}