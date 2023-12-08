import { sign, verify } from "jsonwebtoken";
import config from "../../config";

export default class JwtService {
  public static generateToken(value: Record<string, any>, expiresIn?: string) {
    const signature = config.jwt.secret;
    return sign(value, signature, {
      algorithm: "HS256",
      expiresIn: expiresIn ?? "1h",
    });
  }

  public static generateRefreshToken(value: Record<string, any>, expiresIn?: string) {
    const signature = config.jwt.secretRefresh;
    return sign(value, signature, {
      algorithm: "HS256",
      expiresIn: expiresIn ?? "24h",
    });
  }

  public static verifyToken(token: string) {
    const signature = config.jwt.secret;
    return verify(token, signature);
  }
}