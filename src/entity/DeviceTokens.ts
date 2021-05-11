import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Base } from "./base/Base";
import { User } from "./User";

@Entity()
export class DeviceToken extends Base{
    @Column({unique: true})
    token: string;

    @ManyToOne(()=>User, user => user.deviceTokens)
    @JoinColumn()
    user: User;
}