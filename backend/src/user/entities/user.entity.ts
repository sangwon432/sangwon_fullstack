import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Provider } from './provider.enum';

@Entity()
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  @BeforeInsert()
  async beforeSaveFunction(): Promise<void> {
    const saltValue = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltValue);
  }
}
