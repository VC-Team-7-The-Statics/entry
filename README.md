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

**5 월 31 일 ~ 6 월 4 일 (기획 1 주)**

- 아이디어 확정
- 와이어 프레임 작성
- DB Schema 제작
- 기술 검증 (RN 과 웹뷰의 통신 등)
- GIT Flow, Lint 합의

**6 월 5 일 ~ 6 월 17 일 (개발 2 주)**

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

제작 기간이 총 3주로 짧았기 때문에 서비스를 애자일하게 만들어 나가야 했습니다. 프론트엔드 유튜버 Jack Herrington를 통해 Micro FrontEnd라는 개념에 대해 알게 되었고, 이를 통해 애자일하게 서비스를 만들 수 있다고 하여 Micro FE를 선택하여 기술 검증을 해보기 시작했습니다.

표준이 되는 프레임워크가 없기에 우리의 방식으로 각 서비스당 하나의 레포지토리를 가지고 이를 뭉쳐 하나의 FE 앱을 만드는 것으로 방향을 잡았습니다.

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

### 웹뷰에 대한 정보가 매우 적음

한국의 스타트업들이 빠른 업데이트를 위해 React Native Webview 를 통해 앱을 만든다는 이야기를 듣고 웹뷰를 사용하기로 결정했지만, 해외의 스타트업들은 그렇지 않은 것 같습니다.

구글에 웹뷰에 관한 검색어를 입력하면 아무리 결과가 많아도 두 페이지를 넘어가는 것을 보기 힘듭니다.

그만큼 웹뷰의 커뮤니티가 작고, 기술적인 지원을 바랄 수 없다는 단점이 존재합니다.

### 웹뷰에서 소켓이 작동하지 않는 문제

채팅 기능은 소켓을 통해 텍스트를 주고 받는 정도만 구현할 계획이었기에, 후반부에 작업을 짧게 진행할 예정이었습니다. 

하지만 작업을 시작하니 아무리 시도를 해봐도 소켓 연결이 안됐습니다. 이전 프로젝트에서 사용한 코드를 그대로 붙여 넣어도 안되는 것이 이상해 React Native Webview 의 이슈를 검색해보니 웹뷰에서 Socket.io 가 동작하지 않는다는 사실을 알 수 있었습니다. 더 심각한 문제는, 아무도 그에 대한 해결책을 제안하지 않았다는 것입니다.

Sinder 를 채팅 기능이 없는 소개 어플리케이션으로 남길 수 없었기에, 부족한 시간 속에서 해결책을 찾아야 했습니다.

회의 끝에 채팅창만을 네이티브로 구현하기로 결정했고, 채팅 탭의 구조는 다음과 같아졌습니다. [**채팅 목록**(웹뷰) -> **채팅방**(네이티브)]

채팅 목록에서 채팅방 A 를 터치하면 웹뷰가 가진 A 의 정보를 네이티브에 주입해주는 방식으로 작업을 완료 했습니다.

[이후 React Native WebView 깃허브에 이 문제에 대한 이슈를 생성했습니다.](https://github.com/react-native-webview/react-native-webview/issues/2540)

### 채팅의 저장 방법에 대한 고민

아무리 간단한 채팅 로직이라도 채팅 내용을 디비에 저장하는 방법은 다양합니다.

가장 간단히 떠올릴 수 있는 방법인, 소켓에 채팅 메시지가 하나 통과될 때 마다 디비에 저장하는 것은 너무나도 비효율 적이라는 생각이 들어 다른 방법을 찾고 싶었습니다. 

회의 끝에 촉박한 시간 속에서 빨리 구현할 수 있는 방법으로 레디스를 응용해보기로 결정했습니다. 저희가 고안한 방법은 아래와 같습니다.

1. 소켓에 연결된 두 사람의 메시지가 서버를 통과할 때, 레디스에 룸 아이디를 Key 로 하는 리스트에 메시지를 저장합니다.
2. 저장이 완료되면 서버에 들어온 메시지를 다른 참가자에게 Broadcast 합니다.
3. 그렇게 소켓을 통과하는 메시지들을 레디스의 리스트에 저장하다가, 둘 중 한 명이 소켓을 나간다면 레디스의 리스트를 전부 꺼내 몽고 디비에 저장하고 레디스의 Key 를 삭제(초기화)합니다.

이 방법을 통해 사용자간 지연 없는 채팅 경험을 보장하면서 안전하게 데이터를 저장할 수 있는 로직을 완성했습니다.

[해당 코드 링크](https://github.com/VC-Team-7-The-Statics/server/blob/master/services/ChatRoomService.js#L15)

### CSS 스냅

홈 화면에서 유저 카드를 스크롤하면 틱톡과 인스타 릴스처럼 카드 마다 뷰포트에 스냅이 되도록 하고 싶었습니다.

CSS 의 스냅 프로퍼티를 이용했는데, 한 번에 하나의 카드에 딱 걸리지도 않고, 스냅도 약하게 걸려서 세게 스크롤하면 여러개를 내려가는 현상이 있었습니다.

거기에 또 다른 문제도 생겨났습니다. 

유저 카드를 넘기면 서버에 다음 유저를 요청하는데, 스냅이 걸리는 동안 배열에 새로운 카드가 추가되면서 뷰포트의 길이가 카드 하나만큼 길어지고, 스냅 로직은 원래 카드의 위치를 잡아주려 해서 플리커링 현상이 일어났습니다. 리액트의 과도한 리렌더링으로 착각했지만 그것이 아니고 위치 재조정이었습니다.

이러한 문제들 때문에 홈 화면에 스냅 기능을 적용하지 않기로 결정했습니다.

하지만 개발을 끝내고 생각해보니 유저의 touchmove 이벤트에 알고리즘을 적용해서 알맞은 스냅 기능을 넣을 수 있지 않았을까 하는 생각이 들었습니다.

### 웹뷰에서 하드웨어 백 버튼을 맵핑할 때 생기는 문제

웹뷰에서 안드로이드의 백 버튼을 누르면 웹뷰 내부에서 뒤로가기가 실행되지 않고 앱이 꺼져버립니다. 이를 해결하기 위해 백 버튼과 웹뷰의 history API 를 맵핑해 주었습니다.

그렇게 뒤로가기 문제를 해결한 줄 알았더니 뒤로가기가 불규칙적으로 작동한다는 것을 알게 되었습니다. 예를 들어 로그인 한 사용자가 홈 화면에서 뒤로가기를 누르면 앱이 꺼져야 하는데 로그인 창으로 돌아간다거나, 네이티브 채팅방에서 뒤로가기를 누르면 웰컴 페이지로 가버리는 등의 현상을 발견했습니다.

오류에 일정한 패턴이 보이지 않아서 history API 와 네이티브 로직 모두에 문제가 있을 것이라 판단했고, 현재 저희의 능력으로는 네이티브 코드를 알 길이 없으니 history API 에 대해 최대한 공부해서 고칠 수 있는 만큼 고쳐보기로 결정했습니다.

우선, 비회원이 가입/로그인을 해서 홈 화면에 도달하는 라우트 이동 과정을 replace 로 바꿨습니다. 이 덕에 회원가입을 마친 사용자가 홈 화면에서 뒤로가기를 누르면 정상적으로 앱을 나갈 수 있게 됐습니다.

그 외에도 사용자의 경험을 고려하며 replace 와 push 를 알맞게 사용하도록 변경했으며, history API 만으로 수정되지 않던 문제를 추가적인 JS 코드를 통해 보완해서 문제를 봉합하는데 성공했습니다.

[history API 와 react-router 를 공부하며 스택오버플로우에 남긴 질문](https://stackoverflow.com/questions/72654324/clear-all-history-in-react-router-v6)
