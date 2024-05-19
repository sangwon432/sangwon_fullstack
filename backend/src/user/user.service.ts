import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  // async getUserByEmail(email: string) {
  //   const user = await this.userRepository.findOneBy({ email });
  //   if (user) return user;
  //   throw new HttpException('no user', HttpStatus.NOT_FOUND);
  // }

  async getUserBy(key: 'id' | 'email', value: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ [key]: value });
    if (user) return user;
    throw new HttpException(
      `User with this ${key} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async setCurrentRefreshTokenToRedis(refreshToken: string, userId: string) {
    console.log('set refresh token called');
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.cacheManager.set(userId, currentHashedRefreshToken);
  }

  async removeRefreshTokenFromRedis(userId: string) {
    console.log('remove refresh token called');
    await this.cacheManager.del(userId);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getUserBy('id', userId);
    const getUserdFromRedis = await this.cacheManager.get(userId);
    const isRefreshTokenMatched = await bcrypt.compare(
      refreshToken,
      getUserdFromRedis,
    );
    if (isRefreshTokenMatched) return user;
  }
}
