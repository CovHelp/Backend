import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "../Channel";
import { Base } from "./Base";

export abstract class Post extends Base {
    @Column()
    urgency: number;

    @Column()
    body: string;

    @Column()
    picture: string;

    @Column()
    category: number;

    @Column()
    phoneNumber: string;

    @Column()
    isPhoneNumberPublic: boolean;

    @Column()
    isClosed: boolean;
}