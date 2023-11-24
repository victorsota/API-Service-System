// jwtUtils.ts
import * as jwt from "jsonwebtoken";

export class JwtUtils {
  private static readonly secretKey = process.env.JWT_SECRET || "chave_secreta";

  static generateToken(payload: any, expiresIn: string): string {
    return jwt.sign(payload, JwtUtils.secretKey, { expiresIn });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JwtUtils.secretKey);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}
