import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base/Base';
import { NeedHelp } from './NeedHelp';
import { Post } from './base/Post';
import { ProvideHelp } from './ProvideHelp';
import { User } from './User';

@Entity()
export class Comment extends Base{
    @Column()
    comment: string;

    @ManyToOne(() => NeedHelp, needhelp => needhelp.comments)
    @JoinColumn()
    needHelp: NeedHelp;

    @ManyToOne(() => ProvideHelp, providehelp => providehelp.comments)
    @JoinColumn()
    provideHelp: ProvideHelp;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn()
    user: User;
}