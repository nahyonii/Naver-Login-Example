import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import Router from 'next/router';

const Wrapper = styled.div`
  max-width: 720px;

  margin: 0 auto;
`;

const Header = {
  Container: styled.div`
    text-align: center;
  `,

  Title: styled.h2``,
};

const Button = {
  Container: styled.div``,

  ButtonList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  NaverButton: styled.div``,
};

const Index: NextPage = () => {
  React.useEffect(() => {
    const { naver } = window as any;
    let naverLogin: any;

    const login = () => {
      naverLogin = new naver.LoginWithNaverId({
        clientId: '네이버에서 발급받은 Client ID를 입력해주세요', // ClientID
        callbackUrl: '어플리케이션 등록 시 입력했던 Callback URL을 입력해주세요.', // Callback URL
        isPopup: false, // 팝업 형태로 인증 여부
        loginButton: {
          color: 'green', // 색상
          type: 3, // 버튼 크기
          height: '60', // 버튼 높이
        }, // 로그인 버튼 설정
      });

      naverLogin.init();
    };

    const getToken = () => {
      const hash = Router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
      if (hash) {
        const token = hash.split('=')[1].split('&')[0]; // token값 확인
        naverLogin.getLoginStatus((status: any) => {
          if (status) {
            // 로그인 상태 값이 있을 경우
            console.log(naverLogin.user); // 사용자 정보 조회

            // if (!naverLogin.user.getAge()) {
            //   // 나이정보 제공을 동의하지 않았을 경우
            //   alert('나이 정보는 필수입니다.');
            //   naverLogin.reprompt(); // 정보제공창 다시 보여주기

            //   return;
            // }

            /* 여기 부분에서 성공적으로 사용자 인증이 진행되었다면 서버로 토큰을 전달할 부분 */

            // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
            Router.push({
              pathname: '/naver',
              query: {
                token,
              },
            });
          }
        });
      }
    };

    login();
    getToken();
  }, []);

  return (
    <Wrapper>
      <Header.Container>
        <Header.Title>로그인할 방법을 선택해주세요.</Header.Title>
      </Header.Container>

      <Button.Container>
        <Button.ButtonList>
          <Button.NaverButton id="naverIdLogin" />
        </Button.ButtonList>
      </Button.Container>
    </Wrapper>
  );
};

export default Index;
