import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Base } from "./base/Base";
import { Comment } from "./Comment";
import { NeedHelp } from "./NeedHelp";
import { Post } from "./base/Post";
import { ProvideHelp } from "./ProvideHelp";
import { Token } from "./Token";
import { isEmail } from "class-validator";
import { DeviceToken } from "./DeviceTokens";

@Entity({name: 'users'})
export class User extends Base {
    @Column({nullable: false})
    googleId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    profile_pic: string;

    @OneToMany(()=>DeviceToken, deviceToken => deviceToken.user)
    deviceTokens: DeviceToken

    @OneToOne(() => Token, token => token.user)
    token: Token;

    @OneToMany(() => NeedHelp, needhelp => needhelp.user)
    @JoinColumn()
    needHelpPosts: NeedHelp;

    @OneToMany(() => ProvideHelp, providehelp => providehelp.user)
    @JoinColumn()
    provideHelpPosts: ProvideHelp;

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment;
}
