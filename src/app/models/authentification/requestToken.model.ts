export interface RequestToken {
  username: string;
  password: string;
  withRefreshToken: boolean;
  grantType: string;
}
