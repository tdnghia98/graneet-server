import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postCode: string;

  @Column()
  communeCode: string;

  @Column()
  communeLabel: string;

  @Column()
  name: string;

  @Column()
  isMetropolitan: boolean;
}
