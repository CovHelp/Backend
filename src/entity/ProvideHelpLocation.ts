import { Entity, ManyToMany, ManyToOne } from "typeorm";
import { Location } from "./base/Location";
import { NeedHelp } from "./NeedHelp";
import { ProvideHelp } from "./ProvideHelp";

@Entity()
export class ProvideHelpLocation extends Location {
    @ManyToOne(() => ProvideHelp, provideHelp => provideHelp.locations)
    provideHelp: ProvideHelp;
}