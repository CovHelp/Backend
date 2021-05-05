import { Entity, ManyToOne } from "typeorm";
import { Location } from "./base/Location";
import { NeedHelp } from "./NeedHelp";

@Entity()
export class NeedHelpLocation extends Location{
    @ManyToOne(() => NeedHelp, needHelp => needHelp.location)
    needHelpPost: NeedHelp;
}