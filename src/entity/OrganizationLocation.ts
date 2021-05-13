import { Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Location } from "./base/Location";
import { Organization } from "./Organization";

@Entity()
export class OrganizationLocation extends Location {
    
    @ManyToOne(() => Organization, organization => organization.locations)
    @JoinColumn()
    organization: Organization;
}