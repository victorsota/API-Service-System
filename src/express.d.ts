declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    service: {
      id: string;
    };
  }
}
