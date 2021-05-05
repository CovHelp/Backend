import {Entity, Column} from 'typeorm'
import { Base } from './Base';


export abstract class Location extends Base{
    @Column()
    country: string;
    
    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    lat: number

    @Column()
    long: number;
}