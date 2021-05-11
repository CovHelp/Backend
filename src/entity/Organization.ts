import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base/Base';
import { User } from './User';
import { Channel } from './Channel';

@Entity()
export class Organization extends Base{
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({default: false})
    isVisible: boolean;

    @Column()
    image: string;

    @Column()
    address: string;

    @Column()
    contact: string;

    @Column()
    website: string;

    @Column()
    howtoavail: string;

    @Column("text", {array: true})
    category: string[]

    @Column()
    donation: string;
}