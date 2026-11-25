# Scroll Lab — 스크롤 애니메이션 도감

학생들이 스크롤 효과를 직접 비교하고 CodePen에서 수정할 수 있는 HTML · CSS · JavaScript 예제 모음입니다. Figma의 브랜드 소개, 상품, 포트폴리오 화면에 적용할 움직임을 고르는 용도로 사용할 수 있습니다. 특정 Figma 화면을 복제한 결과물은 아닙니다.

## 온라인 데모

[Scroll Lab 열기](https://khjsbs324.github.io/scroll-animation-lab/)

GitHub Pages는 `main` 브랜치의 루트 폴더를 사용합니다. 별도 빌드나 서버가 필요 없는 정적 사이트입니다.

## 실행

`index.html`을 크롬에서 열면 도감을 사용할 수 있습니다. GSAP 3.13.0과 ScrollTrigger는 CDN으로 불러오므로 인터넷 연결이 필요합니다. 도감의 폰트가 로드되지 않아도 시스템 글꼴로 표시합니다.

로컬 서버로 실행하려면 이 폴더에서 `python -m http.server 8123 --bind 127.0.0.1`을 실행한 뒤 `http://127.0.0.1:8123`에 접속하세요.

## 수업 흐름

1. 효과의 카드를 눌러 미리보기를 엽니다.
2. 왼쪽 미리보기 **안에서** 스크롤합니다. 모바일에서는 미리보기가 위쪽에 있습니다.
3. ‘시작·끝 표시’를 켜서 ScrollTrigger의 트리거 위치를 확인합니다. ‘재시작’으로 초기화합니다.
4. 핵심 옵션과 ‘바꿔보기’ 질문을 확인합니다.
5. ‘CodePen에서 열기’를 누르거나 HTML · CSS · JS를 각 패널로 복사합니다.
6. 값 하나를 바꿔 원래 효과와 비교합니다.

운영체제의 ‘동작 줄이기’가 켜져 있으면 예제 애니메이션 대신 모든 콘텐츠를 정적으로 표시합니다. 효과를 관찰할 때는 해당 설정을 확인하세요. 저장한 효과는 현재 브라우저의 localStorage에 남습니다.

## 12가지 예제

| 번호 | 효과 | 분류 | 난이도 | 적용 위치 |
| --- | --- | --- | --- | --- |
| 01 | 페이드 업 | 기본 등장 | 입문 | 섹션 제목, 소개 |
| 02 | 순차 등장 | 기본 등장 | 입문 | 상품 목록, 서비스 카드 |
| 03 | 좌우 슬라이드 | 기본 등장 | 입문 | 이미지 + 텍스트 |
| 04 | 텍스트 리빌 | 기본 등장 | 응용 | 메인 슬로건 |
| 05 | 이미지 마스크 리빌 | 스크롤 연동 | 응용 | 프로젝트 대표 이미지 |
| 06 | 패럴랙스 | 스크롤 연동 | 응용 | 히어로, 공간 소개 |
| 07 | 스크롤 줌 | 스크롤 연동 | 입문 | 대표 상품 |
| 08 | 화면 고정 스토리 | 화면 고정 | 응용 | 기능, 브랜드 철학 |
| 09 | 가로 스크롤 | 화면 고정 | 심화 | 프로젝트 갤러리 |
| 10 | 카드 쌓기 | 화면 고정 | 심화 | 서비스, 프로세스 |
| 11 | 숫자 카운트 업 | 기본 등장 | 입문 | 성과 수치 |
| 12 | 스크롤 진행 표시 | 스크롤 연동 | 입문 | 긴 아티클 |

분류와 난이도는 수업용 가이드입니다. 사용 빈도 순위는 아닙니다. 데모의 수치와 문구는 수업용 예시입니다.

## CodePen으로 직접 옮기기

`examples/번호-효과이름/`의 파일을 사용합니다.

- `index.html`: CSS와 JS를 포함한 독립 실행 파일. 브라우저에서 바로 열 수 있습니다.
- `codepen.html`: CodePen **HTML 패널**에 붙여넣을 본문입니다.
- `style.css`: CodePen **CSS 패널**에 붙여넣습니다.
- `script.js`: CodePen **JS 패널**에 붙여넣습니다.

CodePen **Settings → JS → Add External Scripts/Pens**에 다음 주소를 순서대로 추가하세요.

```text
https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js
https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js
```

별도 CSS 전처리기나 JS 전처리기는 필요 없습니다. ‘CodePen에서 열기’는 위 설정을 포함해 새 편집기에 코드를 전송합니다. Pen을 계정에 저장하려면 CodePen 로그인이 필요할 수 있습니다.

## 수정 및 구조

- `index.html`: 도감 레이아웃과 미리보기 대화상자
- `styles.css`: 도감의 반응형 스타일
- `demos.js`: 예제 데이터, 독립 HTML · CSS · JS, 실행 문서 생성
- `app.js`: 검색, 분류, 저장, 복사, 미리보기, 다운로드, CodePen 전송
- `export-examples.js`: 예제를 파일로 내보내는 Node.js 스크립트

예제 원본은 `demos.js`에 있습니다. 수정한 뒤 `node export-examples.js`를 실행하면 `examples/`의 파일이 갱신됩니다. 배포나 수업용 공유 시에는 폴더 전체를 전달하세요.

사진 없이도 효과에 집중할 수 있도록 CSS 도형과 타이포그래피로 데모를 구성했습니다. 실제 디자인에 적용할 때 이미지 영역을 사진으로 교체할 수 있습니다. 가로 스크롤은 실제 넘치는 너비를 기준으로 이동 거리를 계산하며, 화면 고정은 부모 요소를 고정하고 내부 요소를 움직입니다.

## 참고 문서

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): start, end, scrub, pin, toggleActions
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): 동작 줄이기 및 미디어 쿼리 처리
- [CodePen Prefill API](https://blog.codepen.io/documentation/prefill/): 편집기로 코드와 라이브러리 설정 전달
