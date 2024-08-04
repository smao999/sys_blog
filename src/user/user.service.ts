import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/add-user.dto';
import { md5 } from 'src/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    private logger = new Logger();

    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    @Inject(ConfigService)
    private readonly configService: ConfigService;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    async register(user: RegisterUserDto) {
        const foundUser = await this.userRepository.findOneBy({username: user.username});

        if(foundUser) {
            throw new HttpException('用户已经存在', HttpStatus.BAD_REQUEST);
        };

        const newUser = new User();
        newUser.username = user.username;
        newUser.password = md5(user.password);
        newUser.nickName = user.nickName;

        try {
            await this.userRepository.save(newUser);
            return {message: '注册成功'};
        } catch (error) {
            this.logger.error(error, UserService);
            throw new HttpException('注册失败', HttpStatus.BAD_REQUEST);
        }
    }

    async login(user: LoginUserDto) {
        const foundUser = await this.userRepository.findOneBy({username: user.username});

        if(!foundUser) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        };

        if(foundUser.password !== md5(user.password)) {
            throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
        };

        const vo = new LoginUserVo();

        vo.userInfo = {
            id: foundUser.id,
            username: foundUser.username,
            nickName: foundUser.nickName,
            headPic: foundUser.headPic,
            createdAt: foundUser.createdAt
        }
        vo.accessToken = this.jwtService.sign({
            id: foundUser.id,
            username: foundUser.username
        }, {
            expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
        });
        vo.refreshToken = this.jwtService.sign({
            id: foundUser.id
        }, {
            expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
        });

        return vo;
    }

    async refresh(refreshToken: string) {
        try {
            const data = this.jwtService.verify(refreshToken);

            const foundUser = await this.userRepository.findOneBy({id: data.id});

            const access_token = this.jwtService.sign({
                id: foundUser.id,
                username: foundUser.username
            }, {
                expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
            });

            const refresh_token = this.jwtService.sign({
                id: foundUser.id
            }, {
                expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
            });

            return {
                access_token,
                refresh_token
            }
        } catch(e) {
            throw new UnauthorizedException('token 已失效，请重新登录');
        }
    };
    
}
