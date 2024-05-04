import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @BeforeInsert()
  async beforeSaveFunction(): Promise<void> {
    const saltValue = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltValue);
  }
}
