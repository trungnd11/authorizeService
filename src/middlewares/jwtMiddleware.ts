import { Request, Response, NextFunction } from "express";
import JwtService from "../services/config/JwtService";
import ResponseEntity from "../dto/response/ResponseEntity";
import { HttpCodeEnum } from "../enum/HttpCodeEnum";
import JwtDto from "../dto/response/jwt/JwtDto";
import ArrayUtils from "../utils/ArrayUtils";

export const verifyTokenAndRole = (roles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")?.[1];

    if (!token) {
      return ResponseEntity.error(res, HttpCodeEnum.UNAUTHORIZED, "Unauthorized: Not token");
    }

    try {
      const decoded = JwtService.verifyToken(token) as JwtDto;
      checkRole(decoded, roles, next, res);
    } catch (error) {
      return ResponseEntity.error(res, HttpCodeEnum.UNAUTHORIZED, "Unauthorized: Invalid token");
    }
  };
};

const checkRole = (jwt: JwtDto, roles: unknown, next: NextFunction, res: Response) => {
  const userRoles = jwt.roles.map(role => role?.split("_")?.[1]);
  if (ArrayUtils.isArray(roles)) {
    const rolesCheck = roles as string[];
    const findRole = userRoles.find(role => rolesCheck.includes(role));
    if (!findRole) return ResponseEntity.error(res, HttpCodeEnum.FORBIDDEN,
      `UnAuthen: Forbidden role ${rolesCheck.join(", ")}`);
  } else {
    const rolesCheck = roles as string;
    const findRole = userRoles.find(role => role === rolesCheck);
    if (!findRole) return ResponseEntity.error(res, HttpCodeEnum.FORBIDDEN, `UnAuthen: Forbidden role ${roles}`);
  }
  next();
}