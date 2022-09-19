import type { NextApiRequest, NextApiResponse } from 'next';
import { propsWithAuth } from '../../utils/propsWithAuth';
import { getSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('utils/propsWithAuth', () => {
  it('returns session if it exists', () => {
    getSession.mockImplementation(() => ({ mySession: 'mock' }));
    const p = propsWithAuth({
      params: undefined,
      req: {} as unknown as NextApiRequest,
      res: {} as unknown as NextApiResponse,
      query: {},
      resolvedUrl: '',
    });
    p.then((r) => {
      expect(r).toEqual({
        props: {
          session: {
            mySession: 'mock',
          },
        },
      });
    });
  });

  it(`redirects to login if session doesn't exists`, () => {
    getSession.mockImplementation(() => undefined);
    const p = propsWithAuth({
      params: undefined,
      req: {} as unknown as NextApiRequest,
      res: {} as unknown as NextApiResponse,
      query: {},
      resolvedUrl: '',
    });
    p.then((r) => {
      expect(r).toEqual({
        redirect: {
          permanent: false,
          destination: '/login',
        },
      });
    });
  });
});
