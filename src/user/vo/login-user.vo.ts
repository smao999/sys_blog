interface UserInfo {
    id: string;

    username: string;

    nickName: string;

    headPic: string;

    createdAt: Date;
}
export class LoginUserVo {

    userInfo: UserInfo;

    accessToken: string;

    refreshToken: string;
}

