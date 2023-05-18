import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { Url } from "../url/url.entity";

@Entity()
export class Hit {

    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne( () => Url )
    @JoinColumn()
    url : Url;

    @Column()
    ip : string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
    



}