import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base";

export abstract class Post extends Base {
    @Column()
    type: number;

    @Column()
    urgency: number;

    @Column()
    body: string;

    @Column()
    picture: string;

    @Column()
    category: number;

    @Column()
    phoneNumber: number;

    @Column()
    isPhoneNumberPublic: boolean;

    @Column()
    isClosed: boolean;
}