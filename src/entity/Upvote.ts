import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base/Base';
import { ProvideHelp } from './ProvideHelp';
import { User } from './User';

@Entity()
export class Upvote extends Base{

    @ManyToOne(() => ProvideHelp, providehelp => providehelp.upvotes)
    @JoinColumn()
    providehelp: ProvideHelp;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}