# Introduce

본 문서는 _2022년 3월 20일_ 에 최초 작성되었습니다.<br>
본 문서는 _2022년 3월 20일_ 에 최종 작성되었습니다.<br>
상세한 수정 내역은 README.md 최하단 History 탭을 확인해주세요.

가장 많이 사용한 프레임워크 및 데이터베이스는 Express 와 MongoDB 입니다.<br>
Express 의 경우 최근 진행한 [**axios, cheerio 를 이용한 정적 크롤링 웹사이트**](https://github.com/unchaptered/22-01-crolling-music-charts) 와 [**jest 를 이용한 테스트 주도 개발, 웹사이트**](https://github.com/unchaptered/22-01-express-website) 에서 다시 한 번 정확히 배울 수 있었습니다.

하지만,<br>
MongoDB 의 경우 사용은 하고 있지만,<br>
Schemaless, Based on Documentation 이라는 특징을 제대로 살리지 못했습니다.

따라서,<br>
이번 프로젝트를 통해서 MongoDB 의 기본기와 성능 튜닝 등을 배워보고자 합니다.

<hr>

## Index

본 프로젝트 문서는 다음과 같은 구조를 가지고 있습니다.

1. Introduce
2. Index
3. Thoery (Node, npm / Express / MongoDB)
4. Stacks
5. APIs

<hr>

## Thoery 

### Node, npm

Node, npm 에 대한 설명은 다음 포스트를 참고해주세요.

[**Velog - unchaptered / Node Series > Node.js**](https://velog.io/@unchapterd/Node.js)<br>
[**Velog - unchaptered / Node Series > Node.js + Npm**](https://velog.io/@unchapterd/Node.js-NPM)

### Express

Express 에 대한 설명은 다음 포스트를 참고해주세요.

[**Velog - unchaptered / Node Series > Express(New)**](https://velog.io/@unchapterd/Express)

### MongoDB

MongoDB 에 대한 설명은 다음 포스트를 참고해주세요.

[**Velog - unchaptered / DB MongoDB Series**](https://velog.io/@unchapterd/series/DB-MongoDB)

<hr>

## Stacks

본 프로젝트에서 사용한 프로그램 및 서비스의 세부값은 다음과 같습니다.<br>
자세한 내용은 [**Velog - unchaptered / DB MongoDB Series**](https://velog.io/@unchapterd/series/DB-MongoDB) 를 참고해주세요.

1. Node.js 14.17.3 LTS
2. Npm 6.14.13
3. MongoDB Atlas 5.0.6 Enterprise
4. MongoDB Atlas Network AWS Seoul(ap-northeast-2)
5. MongoDB Atlas Cluster M0 Sandbox(General)
6. MongoDB Compass Version 1.30.1

### Dev/Dependencies

본 프로젝트에서 사용한 프레임워크 및 라이브러리 모듈은 다음과 같습니다.<br>
정확하지 않을 수 있으니, 확실한 내용은 package.json 을 확인해주세요.

<hr>

## APIs

- [✅][1] GET         /user           로그인
- [✅][2] POST        /user           회원가입 (req.body 필요)

- [✅][3] GET        /user/:_id      유저 정보
- [✅][4] PUT        /user/:_id      유저 정보 수정 (req.body.after 에 변경할 password 필요)
- [✅][5] DELETE     /user/:_id      회원탈퇴

- [✅][6] GET       /users?limit    모든 유저

- [✅][7] POST       /blog           블로그 작성
- [✅][8] GET        /blog/:_blogId  블로그 보기
- [✅][9] PATCH      /blog/:_blogId  블로그 수정
- [✅][10] DELETE     /blog/:_blogId  블로그 삭제

- [✅][11] GET        /blogs?limit    모든 게시글

<hr>

# History

1. 2022-03-20 프로젝트 시작
