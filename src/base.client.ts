import Axios, { AxiosInstance } from 'axios';

export abstract class BaseClient {
  protected axios: AxiosInstance;

  constructor(apiKey: string) {
    this.axios = Axios.create({
      baseURL: 'https://api.lexoffice.io/v1',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
