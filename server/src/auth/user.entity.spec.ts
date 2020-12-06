import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('User entity', () => {
  describe('validatePassword', () => {
    let user;
    beforeEach(() => {
      user = new User();
      user.password = 'testPassword';
      user.salt = 'testSalt';
      bcrypt.hash = jest.fn();
    });
    it('Вернуть true, если пароль валидный', async () => {
      bcrypt.hash.mockReturnValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
      expect(result).toEqual(true);
    });
    it('Вернуть false, если пароль не валидный', async () => {
      bcrypt.hash.mockReturnValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('wrongPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
