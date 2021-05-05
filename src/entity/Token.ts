import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Base } from "./base/Base";
import { User } from "./User";

@Entity()
export class Token extends Base{
    @Column()
    token: string

    @OneToOne(() => User, user => user.token)
    @JoinColumn()
    user: User;
}