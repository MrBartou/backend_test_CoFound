import { editFileName, imageFileFilter } from '../../src/utils/file.utils';
import { Request } from 'express';
import { Multer } from 'multer';

describe('editFileName', () => {
  it('should generate a file name with the original name and a random string', () => {
    const req = {} as Request;
    const file = {
      originalname: 'testfile.jpg',
    } as Multer.File;
    const callback = jest.fn();

    editFileName(req, file, callback);

    const calledWithFilename = callback.mock.calls[0][1];
    const name = file.originalname.split('.')[0];
    const fileExtName = '.jpg';

    expect(calledWithFilename).toMatch(
      new RegExp(`${name}-[0-9a-f]{4}${fileExtName}`),
    );
    expect(callback).toHaveBeenCalledWith(null, expect.any(String));
  });
});

describe('imageFileFilter', () => {
  it('should accept valid image file types', () => {
    const req = {} as Request;
    const file = {
      originalname: 'testfile.jpg',
    } as Multer.File;
    const callback = jest.fn();

    imageFileFilter(req, file, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it('should reject invalid file types', () => {
    const req = {} as Request;
    const file = {
      originalname: 'testfile.txt',
    } as Multer.File;
    const callback = jest.fn();

    imageFileFilter(req, file, callback);

    expect(callback).toHaveBeenCalledWith(
      new Error('Only image files are allowed!'),
      false,
    );
  });
});
