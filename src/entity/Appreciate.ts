import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Base } from './base/Base';
import { Post } from './base/Post';
import { ProvideHelp } from './ProvideHelp';
import { User } from './User';

@Entity()
export class Appreciate extends Base {
    @ManyToOne(() => ProvideHelp, providehelp => providehelp.appreciations)
    @JoinColumn()
    proviehelp: ProvideHelp;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}