import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./base/Post";
import { User } from "./User";
import { NeedHelpLocation } from "./NeedHelpLocation";


@Entity()
export class NeedHelp extends Post {
    @OneToMany(() => Comment, comment => comment.needHelp)
    @JoinColumn()
    comments: Comment

    @ManyToOne(() => User, user => user.needHelpPosts)
    @JoinColumn()
    user: User;

    @OneToOne(() => NeedHelpLocation, needHelpLocation => needHelpLocation.needHelpPost)
    @JoinColumn()
    location: NeedHelpLocation;
}