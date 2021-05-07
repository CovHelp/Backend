import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appreciate } from "./Appreciate";
import { Comment } from "./Comment";
import { Post } from "./base/Post";
import { Upvote } from "./Upvote";
import { User } from "./User";
import { ProvideHelpLocation } from "./ProvideHelpLocation";


@Entity()
export class ProvideHelp extends Post {
    @ManyToOne(() => User, user => user.provideHelpPosts)
    @JoinColumn()
    user: User;

    @OneToMany(() => Upvote, upvote => upvote.providehelp)
    @JoinColumn()
    upvotes: Upvote;

    @OneToMany(() => Appreciate, appreciate => appreciate.proviehelp)
    @JoinColumn()
    appreciations: Appreciate;

    @OneToMany(() => Comment, comment => comment.provideHelp)
    @JoinColumn()
    comments: Comment

    @OneToMany(() => ProvideHelpLocation, provideHelpLocation => provideHelpLocation.provideHelp)
    @JoinColumn()
    locations: ProvideHelpLocation;
}