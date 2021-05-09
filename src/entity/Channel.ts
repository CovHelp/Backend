import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base/Base';
import { NeedHelp } from './NeedHelp';
import { Post } from './base/Post';
import { ProvideHelp } from './ProvideHelp';
import { User } from './User';

@Entity()
export class Channel extends Base{
    @OneToOne(() => User)
    @JoinColumn()
    user1: User;

    @OneToOne(() => User)
    @JoinColumn()
    user2: User;

    @OneToOne(() => ProvideHelp)
    @JoinColumn()
    provideHelp: Post;

    @OneToOne(() => NeedHelp)
    @JoinColumn()
    needHelp: Post;

    @Column()
    postType: number;
}