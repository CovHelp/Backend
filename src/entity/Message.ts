import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base/Base';
import { User } from './User';
import { Channel } from './Channel';

@Entity()
export class Message extends Base{
    @ManyToOne(() => Channel)
    @JoinColumn()
    channel: Channel;

    @ManyToOne(() => User)
    @JoinColumn()
    sender: User;

    @Column()
    message: string;
}