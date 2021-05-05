import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Location } from "./base/Location";
import { NeedHelp } from "./NeedHelp";

@Entity()
export class NeedHelpLocation extends Location{
    @OneToOne(() => NeedHelp, needHelp => needHelp.location)
    needHelpPost: NeedHelp;
}