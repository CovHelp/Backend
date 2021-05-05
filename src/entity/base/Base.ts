import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, CreateDateColumn } from 'typeorm';

export abstract class Base extends BaseEntity{
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamp with time zone', name: 'created_at',})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp with time zone', name: 'updated_at',})
    updatedAt: Date;
}