import React, { FC } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

const NaverLogin: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>네이버 로그인 테스트</title>

      {/* 네이버 로그인 자바스크립티 SDK 최신 버전 추가 */}
      <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default NaverLogin;
