import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Base } from './base/Base';
import { NeedHelp } from './NeedHelp';
import { Post } from './base/Post';
import { ProvideHelp } from './ProvideHelp';
import { User } from './User';

@Entity()
export class Channel extends Base{
    @ManyToOne(() => User)
    @JoinColumn()
    user1: User;

    @ManyToOne(() => User)
    @JoinColumn()
    user2: User;

    @ManyToOne(() => ProvideHelp)
    @JoinColumn()
    provideHelp: Post;

    @ManyToOne(() => NeedHelp)
    @JoinColumn()
    needHelp: Post;

    @Column()
    postType: number;
}