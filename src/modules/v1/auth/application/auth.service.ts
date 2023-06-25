import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { errors, globalEventEmitter, utils } from '../../shared';
import { DTO, UserService } from '../../users/application';
import { User, UserRepository, UserSignInOptions } from '../../users/domain';

const { Jwt, googleAuth } = utils;
const { NotFoundError, UnauthorizedError } = errors;


export class AuthService extends UserService {

  constructor(
    protected readonly repository: UserRepository
  ){

    super(repository);
  }

  /**
   * Signin an user by username and password.
   * @param {UserSignInOptions} credentials
   * @returns {Promise<User>}
   */
  async signIn(credentials: UserSignInOptions): Promise<User> {

    const { username, password } = credentials;

    const user = await this.repository.findByIndex(username);
    const validPassword = await bcrypt.compare(password, user.password);
    if(!user || !validPassword) throw new UnauthorizedError('You username/password isn\'t valid.');

    user.accessToken = await Jwt.generate({ id: user.id });
    return DTO.single(user);
  }

  /**
   * Sign in or up with google depending on user existence.
   * @param {string} idToken
   * @returns {Promise<User>}
   */
  async google(googleToken: string): Promise<User> {

    const { given_name: firstname, family_name: lastname, email, sub: password } = await googleAuth(googleToken);

    let user = await this.repository.findByIndex(email);

    if(!user){

      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
      user = await this.repository.create({
        firstname,
        lastname,
        username: email.split('@')[0],
        email,
        password: hashedPassword,
      });
    }

    const validPassword = bcrypt.compare(password, user.password);
    if(!validPassword) throw new UnauthorizedError('You username/password isn\'t valid.');

    const mailToken = await Jwt.generate({ id: user.id }, { expiresIn: '1y' });
    globalEventEmitter.emit('verifyEmail', { version: 'v1', token: mailToken, to: user.email });

    user.accessToken = await Jwt.generate(user);
    return DTO.single(user);
  }

  /**
   * Send a email solution to forgot password.
   * @param {string} email
   * @returns {Promise<string>}
   */
  async forgotPassword(username: string): Promise<string> {

    const user = await this.repository.findByIndex(username);
    if(!user) throw new NotFoundError();

    const mailToken = await Jwt.generate({ id: user.id }, { expiresIn: '7d' });
    globalEventEmitter.emit('resetPassword', { version: 'v1', to: user.email, token: mailToken });

    return 'Password reset email was sent to your email.';
  }

  /**
   * Reset password.
   * @param {string} token
   * @param {string} password
   * @returns {Promise<IUser>}
   */
  async resetPassword(token: string, password: string): Promise<User> {

    const { id } = await Jwt.verify(token) as JwtPayload;

    const user = await this.repository.update(id, { password });
    if(!user) throw new NotFoundError();

    user.accessToken = await Jwt.generate(user);
    return DTO.single(user);
  }

  /**
   * Send a notification to an authenticated user email to get verified.
   * @param {string} id
   * @returns {Promise<string>}
   */
  async sendEmailVerifyNotification(id: string): Promise<string> {

    const user = await this.repository.findByIndex(id);
    if(!user) throw new NotFoundError();

    const mailToken = await Jwt.generate({ id: user.id }, { expiresIn: '7d' });
    globalEventEmitter.emit('verifyEmail', { version: 'v1', to: user.email, token: mailToken });

    return 'Email verification was sent to your email.';
  }

  /**
   * Verify an email.
   * @param {string} token
   * @returns {Promise<User>}
   */
  async verifyEmail(token: string): Promise<User> {

    const { id } = await Jwt.verify(token) as JwtPayload;

    const user = await this.repository.update(id, { emailVerifiedAt: new Date(Date.now()) });

    if(!user) throw new NotFoundError();
    return user;
  }
}