# ArtLink Frontend

<!-- 필수 항목 -->

## 소개

**ArtLink** 프로젝트의 Frontend 코드

<!-- 필수 항목 -->

## 기술스택 및 라이브러리

| Tech       | Version | Description           |
| ---------- | ------- | --------------------- |
| TypeScript | 5.0.2   | JavaScript Superset   |
| Three.js   |         | JavaScript 3D Library |
| React      | 18.2.0  | JavaScript Framework  |
| ESLint     | 8.44.0  |                       |
| Vite       | 4.4.0   |                       |

<!-- 필수 항목 -->

## 개발 환경 구성

1. 프로젝트 다운로드

   ```
   git clone <repo URL> <folder-name>
   ```

2. frontend 폴더로 이동

   ```
   cd <folder-name>/frontend/artlink-front
   ```

3. 패키지 설치

   ```
   npm install
   ```

4. 프로젝트 실행
   ```
   npm run dev
   ```

## 컴포넌트 구조(기능 기준)

```
.
├── Entrance
│   ├── EntranceLogo
│   ├── LogIn
│   └── SignUp
├── Base
│   ├── MainLogo
│   ├── Menu
│   └── BigButton
├── ViewExhibition
│   ├── ExhibitionTable
│   ├── View3D
│   ├── ExhibitionBox
│   └── MyRecordBox
│       └── ArtworkBox
├── MyPage
│   ├── ProfileBox
│   └── MyInfoTable
│       └── MyInfoRow
├── Manage
│   ├── InfoTable
│   └── InfoRow
└── ArtworkCRUD
    ├── InputImage
    ├── InputInfo
    │   └── InputInfoRow
    └── UpdateButton
```

<!--
# Entrance
## EntranceLogo
## LogIn
## SignUp

# Base
## MainLogo
## Menu
## BigButton

# ViewExhibition
## ExhibitionTable
## View3D
## ExhibitionBox
## MyRecordBox
### ArtworkBox

# MyPage
## ProfileBox
## MyInfoTable
### MyInfoRow

# Manage
## InfoTable
## InfoRow

# ArtworkCRUD
## InputImage
## InputInfo
### InputInfoRow
## UpdateButton
-->

## 디렉토리 구조

## URL 설계 (Page 구조와 동일)

<Service start>
/ : 로고와 이동화살
/login : 로그인
/signup : 회원가입
/login-gallery : 로그인
/signup-gallery : 회원가입
/login-admin : 로그인

<User>
/home : (유저 갤러리 매니저) 공통 
/art-memory : 과거 여정들 조회
/art-memory/<pk> : 과거 여정 상세 조회
/art-memory/<pk>/edit : 선택 과거 여정 edit
/art-memory/<pk>/3d : threeJs 조회 
/mypage : 마이페이지 (유저, 갤러리 공통)
/mypage/edit : 마이페이지 수정

<Gallery>
/home : (유저 갤러리 매니저) 공통
/works-board : Artwork Manage board
/works-board/create : Artwork C
/works-board/<pk> : Artwork R
/works-board/<pk>/edit : Artwork U & D
/gallery/addiot : 히든 Url) iot 등록
/gallery/removeiot : 히든 Url) iot 해제
/mypage : 마이페이지 (유저, 갤러리 공통)
/mypage/edit : 마이페이지 수정

<Manager>
/home : (유저 갤러리 매니저) 공통 
/user-board : 유저리스트 소팅
/user-board/<pk> : 선택 유저 정보 관리
/gallery-manage : 갤러리리스트 소팅
/gallery-manage/<pk> : 선택 갤러리 정보 관리

<Kiosk>
/kiosk/home : 키오스크 홈 (최대한 원페이지로 구현하자!)
/kiosk/<pk> : 전시 여정
/kiosk/<pk>/edit : 전시 여정 수정
/kiosk/print : 전시 프린트
/kiosk/exit : 전시 종료
/kiosk/result/<pk> : 사용자 기념품

<Other>
/contact : 연락
/about : 서비스 및 팀소개
