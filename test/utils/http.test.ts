import axios from 'axios';
import { fetchData, postData } from '../../src/utils/http.utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  it('should fetch data successfully from a given URL', async () => {
    const data = { name: 'test' };
    mockedAxios.get.mockResolvedValue({ data });

    const result = await fetchData('https://api.example.com/data');
    expect(result).toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.example.com/data',
      undefined,
    );
  });

  it('should throw an error when the fetch fails', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchData('https://api.example.com/data')).rejects.toThrow(
      `Failed to fetch data from https://api.example.com/data: ${errorMessage}`,
    );
  });
});

describe('postData', () => {
  it('should post data successfully to a given URL', async () => {
    const data = { name: 'test' };
    const responseData = { id: 1, ...data };
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await postData('https://api.example.com/data', data);
    expect(result).toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://api.example.com/data',
      data,
      undefined,
    );
  });

  it('should throw an error when the post fails', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    await expect(
      postData('https://api.example.com/data', { name: 'test' }),
    ).rejects.toThrow(
      `Failed to post data to https://api.example.com/data: ${errorMessage}`,
    );
  });
});
