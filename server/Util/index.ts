import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashpassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

const comparepassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};


const generateToken = (user: any): string => {
  const token = jwt.sign({
    id: user.id,
  }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  });
  return token;
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export {
  hashpassword,
  comparepassword,
  generateToken,
  verifyToken
}