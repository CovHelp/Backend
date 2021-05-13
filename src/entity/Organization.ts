import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base/Base';
import { User } from './User';
import { Channel } from './Channel';
import { OrganizationLocation } from './OrganizationLocation';

@Entity()
export class Organization extends Base{
    @Column()
    name: string;

    @Column({default: false})
    isVisible: boolean;

    @Column()
    image: string;

    @Column()
    address: string;

    @Column()
    contact: string;

    @Column()
    website: string;

    @Column("text", {array: true})
    category: string[]

    @Column()
    donation: string;

    @ManyToOne(()=>User)
    @JoinColumn()
    user: User

    @OneToMany(() => OrganizationLocation, organizationLocation => organizationLocation.organization)
    @JoinColumn()
    locations: OrganizationLocation
}