# Sinder: 개발자 매칭 앱

## Entry Repository 폴더 구조

<details>
<summary>
Tree 구조 보기
</summary>

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── _redirects
│   ├── icons
│   │   ├── app-logo.png
│   │   ├── sinder-logo.png
│   │   ├── white-heart-filled.png
│   │   └── white-heart.png
│   ├── index.html
│   └── style.css
├── readme-assets
│   ├── Integration-flow.png
│   ├── chat-flow.gif
│   ├── general-flow.gif
│   ├── signup-flow.gif
│   └── structure.png
├── setupTests.js
└── src
    ├── App.js
    ├── App.scss
    ├── __mocks__
    │   └── intersectionObserverMock.js
    ├── __tests__
    │   ├── HomePage.spec.js
    │   ├── SignupPage.spec.js
    │   └── WelcomePage.spec.js
    ├── components
    │   ├── CoffeeLoading.js
    │   ├── CoffeeLoading.module.scss
    │   ├── SelectLanguage.js
    │   ├── SelectLanguage.module.scss
    │   ├── UserCard.js
    │   ├── UserCard.module.scss
    │   ├── UserCardCoffeeIcon.js
    │   ├── UserCardCoffeeIcon.module.scss
    │   ├── UserCardHeartIcon.js
    │   ├── UserCardHeartIcon.module.scss
    │   ├── UserCardLeftBar.js
    │   └── UserCardLeftBar.module.scss
    ├── constants
    │   ├── assets.js
    │   └── queryKeys.js
    ├── features
    │   └── user
    │       └── userSlice.js
    ├── hooks
    │   ├── auth.hooks.js
    │   └── user.hooks.js
    ├── index.js
    ├── pages
    │   ├── CoffeeFormPage.js
    │   ├── CoffeeFormPage.module.scss
    │   ├── HomePage.js
    │   ├── HomePage.module.scss
    │   ├── LoginPage.js
    │   ├── LoginPage.module.scss
    │   ├── SignupPage.js
    │   ├── SignupPage.module.scss
    │   ├── WelcomePage.js
    │   └── WelcomePage.module.scss
    ├── routes
    │   └── ProtectedRoutes.js
    ├── services
    │   ├── Api.js
    │   └── Validation.js
    ├── setupTests.js
    ├── store
    │   └── configureStore.js
    ├── test-utils
    │   ├── mockState.js
    │   └── wrappedRender.js
    └── utils
        └── helpers.js
```

</details>
    
## Introduction

#위치 기반, #커피챗, #사용자 매칭, #개발 직군, #React Native, #Webview, #Micro FE

## Related Links

저희 프로젝트는 React Native WebView 로 대부분의 서비스를 제공하고 있습니다.

프로젝트의 확장성과 배포의 효율성을 위해 Micro Frontend 구조를 채택했으며 그에 따라

- 3 개의 React 리포지토리
- 1 개의 React Native 리포지토리
- 1 개의 서버 리포지토리
- 1 개의 공통 컴포넌트 리포지토리

를 사용하고 있습니다.

![Structure](/readme-assets/structure.png)

1. **프론트엔드**

- Entry (Home Tab)
  - [https://github.com/VC-Team-7-The-Statics/entry](https://github.com/VC-Team-7-The-Statics/entry)
- Chats (Chat Tab)
  - [https://github.com/VC-Team-7-The-Statics/chats](https://github.com/VC-Team-7-The-Statics/chats)
- Profile (Profile Tab)
  - [https://github.com/VC-Team-7-The-Statics/profile](https://github.com/VC-Team-7-The-Statics/profile)

2. **백엔드**

- Server
  - [https://github.com/VC-Team-7-The-Statics/server](https://github.com/VC-Team-7-The-Statics/server)

**3. 리액트 네이티브 (네비게이션 바 & 채팅방)**

- react-native-host
  - [https://github.com/VC-Team-7-The-Statics/react-native-host](https://github.com/VC-Team-7-The-Statics/react-native-host)

4. **공통 컴포넌트**

- Shared Components
  - [https://github.com/VC-Team-7-The-Statics/shared-components](https://github.com/VC-Team-7-The-Statics/shared-components)
  - [https://www.npmjs.com/package/@the-statics/shared-components](https://www.npmjs.com/package/@the-statics/shared-components)

## 작업 기간 (3 주)

**6 월 31 일 ~ 7 월 4 일 (기획 1 주)**

- 아이디어 확정
- 와이어 프레임 작성
- DB Schema 제작
- 기술 검증 (RN 과 웹뷰의 통신 등)
- GIT Flow, Lint 합의

**7 월 5 일 ~ 7 월 17 일 (개발 2 주)**

- 리포지토리 생성 및 정적 사이트 미리 배포하기
- RN 에 저장된 JWT 로 세 사이트에서 로그인 상태 유지하기
- 웹뷰에서 네이티브 기능 트리거 하기
- 공통으로 사용할 컴포넌트는 공용 리포지토리에 저장해서 NPM 에 배포하기
- 채팅 기능 구현
- 회원 가입 및 로그인 기능 구현
- 사진 첨부, 위치 정보 권한 요청 기능 구현
- 디자인 작업하기
- 백엔드 AWS EB 에 배포하기
- 유닛 테스트 작성하기

## Sinder 어플리케이션

### 소개

개발자를 위한 위치 기반 소개팅 어플리케이션 입니다.

반경 1 km 내에 있는 개발자들의 프로필을 추천 받을 수 있으며, 상호간에 좋아요를 눌렀다면 채팅을 시작할 수 있습니다.

만약 추천된 유저가 나의 기술적 고민을 해결해 줄 수 있을것 같다면 좋아요 여부에 상관 없이 커피챗 요청을 보내서 채팅을 부탁할 수 있습니다.

### 특징

하나의 RN 에서 세 개의 다른 리액트 사이트를 오가며 통일된 유저 상태를 유지할 수 있습니다.

각 탭 별로 독립된 WebView 를 띄우고 있으며, 웹뷰가 로딩되면 RN 에 저장된 JWT 를 주입해서 서버에 유저의 정보를 요청합니다.

![Integration](/readme-assets/Integration-flow.png)

어플리케이션의 독창적인 기능 보다 웹뷰와 RN 사이의 원활한 소통과 매끄러운 사용자 경험을 구현하는데 힘썼습니다.

또한 공통 컴포넌트를 스토리북으로 만들고 NPM 에 배포해 사용하며 최대한 실무에 가깝게 작업하려 했습니다.

|             로그인 된 유저 경험             |            회원 가입 유저 경험            |            채팅 유저 경험             |
| :-----------------------------------------: | :---------------------------------------: | :-----------------------------------: |
| ![general](/readme-assets/general-flow.gif) | ![signup](/readme-assets/signup-flow.gif) | ![chat](/readme-assets/chat-flow.gif) |

## 사용한 기술

### Front

- React
- React Native WebView
- Expo
- Socket.io
- Joi
- Sass
- Redux Toolkit
- React Query
- Storybook

### Back

- Express
- Redis (Upstash)
- Mongo DB Atlas
- AWS S3
- Passport-JWT
- AWS Elastic Beanstalk

## 난관들

### 웹뷰에서 소켓이 작동하지 않는 문제

채팅 기능은 가장 쉽게 구현할 수 있을거라 생각해서 별 고민 없이 마지막 구현 사항으로 미뤄두었다.

하지만 작업을 시작하니 웹뷰에서 소켓이 죽어도 연결이 안됐다. 웹브라우저에서 접근하면 소켓에 연결됐다.

거의 하루를 전부 쓴 후에야 웹뷰에서 소켓이 동작하지 않는 문제가 존재한다는 것을 알았고, 급하게 대책마련을 해야 했다.

떠오른 방안은 채팅방만을 RN 으로 구현해서 채팅목록에서 채팅방을 터치했을 때 네이티브 화면으로 전환하도록 만드는 것.

다행히 네이티브에서는 소켓연결이 원활했고, 채팅방을 구현할 수 있었다.

[React Native WebView 깃허브에 이 문제에 대한 이슈를 생성했다.](https://github.com/react-native-webview/react-native-webview/issues/2540)

### 채팅의 저장 방법에 대한 고민

소켓을 거치는 모든 채팅 하나하나마다 디비에 저장하고 있는 건 굉장히 비효율적이다.

검색을 해봐도 채팅 기능을 설계하는 방법에 대해 다루는 글이 없어서 직접 방법을 떠올려야 했다.

촉박한 시간 속에서 빨리 구현할 수 있는 방법으로 레디스를 응용해보기로 했다.

소켓에 연결된 두 사람의 메시지가 서버를 통과할 때, 레디스에 룸 아이디를 Key 로 하는 리스트에 메시지를 저장한다. 저장이 완료되면 서버에 들어온 메시지를 다른 참가자에게 Broadcast 한다.

그렇게 레디스의 리스트에 저장하다가 둘 중 한 명이 소켓을 나간다면 레디스의 리스트를 전부 꺼내 몽고 디비에 저장하고 레디스의 Key 를 삭제한다.

[해당 코드 링크](https://github.com/VC-Team-7-The-Statics/server/blob/9e9d3e49646becfac74455b588e2347e85333224/services/ChatRoomService.js#L15)

### CSS 스냅

홈 화면에서 유저 카드를 스크롤하면 틱톡과 인스타 릴스처럼 카드 마다 뷰포트에 스냅이 되도록 하고 싶었다.

Css 의 스냅 프로퍼티를 이용했는데 사용자경험이 굉장히 나빴다. 딱 걸리지도 않고 부들부들 거린다. 세게 스크롤하면 여러개를 내려갔다.

또 다른 문제: 스냅 기능과 무한 스크롤 기능이 충돌하는 듯 했다. 유저 카드를 넘기면 서버에 다음 유저를 요청하는데, 스냅이 걸리는 동안 배열에 새로운 카드가 추가되면서 뷰포트의 길이가 카드 하나만큼 길어지고, 스냅 로직은 원래 카드의 위치를 잡아주려 해서 플리커링 현상이 일어났다. 리렌더링으로 착각했지만 그것이 아니고 위치 재조정이었다.

이는 버그가 아닌 두 기능이 충돌하는 현상이라고 생각했기에 스냅 기능을 포기했다. 애초에 css 스냅은 사용자 경험이 나빴기 때문에 무한스크롤을 택하는 것이 합리적이라고 판단했다.

### 웹뷰에서 하드웨어 백 버튼을 맵핑할 때 생기는 문제

안드로이드의 백 버튼을 누르면 앱이 꺼진다. 이를 해결하기 위해 백 버튼과 history API 를 맵핑해주었다.

그렇게 뒤로가기 문제를 해결한 줄 알았더니 뒤로가기가 불규칙적으로 작동한다는 것을 알게되었다. 예를 들어 로그인 한 사용자가 홈 화면에서 뒤로가기를 누르면 앱이 꺼져야 하는데 로그인 창으로 돌아간다거나, 네이티브 채팅방에서 뒤로가기를 누르면 웰컴 페이지로 간다거나..)

문제는 history API 와 네이티브 로직에 있다고 판단했다. 현재 나로서는 네이티브 코드를 알 길이 없으니 history API 를 최대한 찾아보고 고칠 수 있는 만큼 고쳐보기로 했다.

우선, 비회원이 가입/로그인을 해서 홈 화면에 도달하는 모든 라우트 이동 과정을 replace 로 바꿨다. 그렇게 하면 홈 화면에서 뒤로가기를 눌렀을 때 앱이 꺼진다. (물론 가입 도중에 뒤로가기를 눌러도 앱이 꺼지지만 전자의 경험이 더 중요하다)

그 외에도 사용자의 경험을 고려하며 replace 와 push 를 알맞게 사용하도록 변경했으며, history API 만으로 수정되지 않던 문제를 추가적인 JS 코드를 통해 보완해서 봉합하는데 성공했다.

[history API 와 react-router 를 공부하며 스택오버플로우에 남긴 질문](https://stackoverflow.com/questions/72654324/clear-all-history-in-react-router-v6)
