# Scroll Lab — 스크롤 애니메이션 도감

학생들이 스크롤 효과를 직접 비교하고 CodePen에서 수정할 수 있는 HTML · CSS · JavaScript 예제 모음입니다. Figma의 브랜드 소개, 상품, 포트폴리오 화면에 적용할 움직임을 고르는 용도로 사용할 수 있습니다. 특정 Figma 화면을 복제한 결과물은 아닙니다.

**기본 효과 12종 + 심화 활용 8종 + 실무 응용 10종, 총 30종**을 제공합니다. 상단의 전체·기본·심화·실무 버튼과 효과 유형·검색·저장 필터를 함께 사용할 수 있습니다. 과정과 코드 난이도(입문/중급/고급)는 별도로 표시합니다.

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
4. 핵심 옵션과 ‘바꿔보기’ 질문을 확인합니다. 심화 예제에서는 장면 진행 순서와 조합한 기본 효과도 확인합니다.
5. ‘CodePen에서 열기’를 누르거나 HTML · CSS · JS를 각 패널로 복사합니다.
6. 값 하나를 바꿔 원래 효과와 비교합니다.

운영체제의 ‘동작 줄이기’가 켜져 있으면 예제 애니메이션 대신 모든 콘텐츠를 정적으로 표시합니다. 효과를 관찰할 때는 해당 설정을 확인하세요. 저장한 효과는 현재 브라우저의 localStorage에 남습니다.

## 기본 효과 12종

| 번호 | 효과 | 분류 | 난이도 | 적용 위치 |
| --- | --- | --- | --- | --- |
| 01 | 페이드 업 | 기본 등장 | 입문 | 섹션 제목, 소개 |
| 02 | 순차 등장 | 기본 등장 | 입문 | 상품 목록, 서비스 카드 |
| 03 | 좌우 슬라이드 | 기본 등장 | 입문 | 이미지 + 텍스트 |
| 04 | 텍스트 리빌 | 기본 등장 | 중급 | 메인 슬로건 |
| 05 | 이미지 마스크 리빌 | 스크롤 연동 | 중급 | 프로젝트 대표 이미지 |
| 06 | 패럴랙스 | 스크롤 연동 | 중급 | 히어로, 공간 소개 |
| 07 | 스크롤 줌 | 스크롤 연동 | 입문 | 대표 상품 |
| 08 | 화면 고정 스토리 | 화면 고정 | 중급 | 기능, 브랜드 철학 |
| 09 | 가로 스크롤 | 화면 고정 | 고급 | 프로젝트 갤러리 |
| 10 | 카드 쌓기 | 화면 고정 | 고급 | 서비스, 프로세스 |
| 11 | 숫자 카운트 업 | 기본 등장 | 입문 | 성과 수치 |
| 12 | 스크롤 진행 표시 | 스크롤 연동 | 입문 | 긴 아티클 |

분류와 난이도는 수업용 가이드입니다. 사용 빈도 순위는 아닙니다. 데모의 수치와 문구는 수업용 예시입니다.

## 심화 활용 8종

| 번호 | 효과 | 구성 | 적용 위치 |
| --- | --- | --- | --- |
| 13 | 풀스크린 확장 | 작은 창 → 화면 확장 → 제목 등장 | 브랜드 히어로, 프로젝트 표지 |
| 14 | 고정형 제품 스토리 | 제품 회전 + 배경 전환 + 세 가지 메시지 | 제품 상세, 브랜드 소개 |
| 15 | 텍스트 하이라이트 | 화면 고정 + 단어별 색상 변화 | 브랜드 철학, 핵심 메시지 |
| 16 | 복합 가로 스크롤 | 가로 이동 + 패널 내부 제목·도형 움직임 | 컬렉션, 포트폴리오 |
| 17 | 이미지 시퀀스 | 48장의 제품 프레임을 Canvas에 재생 | 제품 회전, 기능 소개 |
| 18 | SVG 선 그리기 | 경로 그리기 + 단계별 설명 등장 | 제작 과정, 서비스 흐름 |
| 19 | 레이아웃 변신 | Flip으로 썸네일을 큰 비주얼로 전환 | 프로젝트, 갤러리 |
| 20 | 3D 카드 공간 이동 | perspective + 깊이·회전·순차 정렬 | 전시, 포트폴리오 |

심화 과정의 이전·다음 버튼은 현재 검색·필터 결과 안에서 이동합니다. ‘전체 도감’을 선택하면 기본·심화·실무 응용을 함께 탐색합니다. 제품 이름과 비주얼은 교육용 가상 브랜드입니다.

## 실무 응용 10종

| 번호 | 효과 | 관찰할 움직임 | 적용 위치 |
| --- | --- | --- | --- |
| 21 | 스크롤 속도 반응 | 빠르게 스크롤하면 기울고 멈추면 복원 | 이미지 중심 포트폴리오 |
| 22 | 방향 반응 마퀴 | 스크롤 방향에 따라 글자 트랙의 재생 방향·속도 변화 | 브랜드 슬로건, 배너 |
| 23 | 원형 갤러리 | 휠 회전과 카드의 반대 방향 회전 보정 | 컬렉션, 전시 |
| 24 | 곡선 경로 이동 | SVG 경로를 따라 오브젝트 이동·회전 | 서비스 여정, 제작 과정 |
| 25 | SVG 모핑 | 씨앗 → 잎 → 꽃으로 path 변형 | 브랜드 심벌, 콘셉트 소개 |
| 26 | 글자 분해·재조립 | 흩어진 글자들이 모여 문장 완성 | 캠페인, 스튜디오 소개 |
| 27 | 비포·애프터 비교 | 겹친 두 비주얼의 경계 이동 | 리모델링, 디자인 개선 |
| 28 | 스크롤 아코디언 | 설명을 순서대로 펼치고 비주얼 교체 | 서비스 기능, 제품 특징 |
| 29 | 커튼형 장면 전환 | 두 패널이 양옆으로 열리며 새 장면 공개 | 프로젝트 인트로 |
| 30 | 양방향 갤러리 | 열마다 다른 방향과 속도로 이미지 이동 | 포트폴리오, 무드보드 |

21번은 빠르게 스크롤한 뒤 멈추고, 22번은 위아래 방향을 바꾸며 관찰하세요. 위치에 따른 진행률과 속도·방향에 대한 반응의 차이를 비교할 수 있습니다. 비포·애프터의 공간과 갤러리 이미지는 CSS 일러스트이므로 별도 이미지 파일 없이 실행됩니다.

상단 과정 선택은 모바일에서 2열로 표시합니다. 각 과정의 이전·다음 버튼은 현재 검색·필터 결과 안에서 이동합니다.

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

**19번 레이아웃 변신**을 직접 복사할 때는 위 두 라이브러리 다음에 아래 주소도 추가하세요. ‘CodePen에서 열기’는 예제에 필요한 라이브러리만 자동으로 설정합니다.

```text
https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js
```

**24번 곡선 경로 이동**에는 MotionPathPlugin을, **25번 SVG 모핑**에는 MorphSVGPlugin을 추가합니다. 해당 예제에 필요한 항목만 기본 GSAP·ScrollTrigger 뒤에 추가하면 됩니다.

```text
https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js
https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js
```

## 이미지 시퀀스 교체하기

17번 예제는 `sequence-frames.js`의 생성기로 48장의 SVG 이미지를 만들고, 모든 이미지가 디코딩된 뒤 Canvas에 그립니다. CodePen과 단일 HTML에서도 같은 프레임을 생성하므로 별도 업로드 없이 실행됩니다. `assets/sequence/frame-001.svg`부터 `frame-048.svg`까지 실제 프레임 파일도 포함합니다.

실제 상품에 적용할 때는 `script.js`의 `images` 배열을 연속된 PNG/WebP 파일 URL로 교체하세요. 프레임 순서, 파일 개수, 이미지 비율을 맞추고, 외부 이미지 서버에서 제공하는 파일은 CORS 허용 여부를 확인하세요. 회전 프레임의 앞면·옆면·뒷면을 바꿔볼 수 있습니다.

```js
const urls = Array.from({ length: 48 }, (_, index) =>
  `https://your-site.example/frames/${String(index + 1).padStart(3, '0')}.webp`
);
const images = urls.map(url => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = url;
  return image;
});
```

프레임 크기에 맞춰 `canvas`의 `width`, `height`도 조정하세요. 운영체제의 동작 줄이기 설정에서는 첫 프레임을 정지 이미지로 보여줍니다.

## 수정 및 구조

- `index.html`: 도감 레이아웃과 미리보기 대화상자
- `styles.css`: 도감의 반응형 스타일
- `demos.js`: 예제 데이터, 독립 HTML · CSS · JS, 실행 문서 생성
- `advanced.js`: 심화 8종의 장면 구성, 학습 설명, 예제별 라이브러리
- `practice.js`: 실무 응용 10종의 독립 예제와 학습 설명
- `practice.css`: 실무 과정 선택과 탐색 카드의 스타일
- `sequence-frames.js`: 학습용 제품 회전 프레임 생성기
- `app.js`: 검색, 분류, 저장, 복사, 미리보기, 다운로드, CodePen 전송
- `export-examples.js`: 예제를 파일로 내보내는 Node.js 스크립트

기본 예제는 `demos.js`, 심화 예제는 `advanced.js`, 실무 예제는 `practice.js`에서 수정합니다. 수정한 뒤 `node export-examples.js`를 실행하면 30개 예제와 48개 SVG 프레임을 함께 갱신합니다. 배포나 수업용 공유 시에는 폴더 전체를 전달하세요.

사진 없이도 효과에 집중할 수 있도록 CSS 도형과 타이포그래피로 데모를 구성했습니다. 실제 디자인에 적용할 때 이미지 영역을 사진으로 교체할 수 있습니다. 가로 스크롤은 실제 넘치는 너비를 기준으로 이동 거리를 계산하며, 화면 고정은 부모 요소를 고정하고 내부 요소를 움직입니다.

## 참고 문서

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): start, end, scrub, pin, toggleActions
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): 동작 줄이기 및 미디어 쿼리 처리
- [CodePen Prefill API](https://blog.codepen.io/documentation/prefill/): 편집기로 코드와 라이브러리 설정 전달
- [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/): 레이아웃 상태 사이의 전환
- [MotionPathPlugin](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/): 경로 이동과 방향 정렬
- [MorphSVGPlugin](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/): SVG 형태 변형
- [ScrollTrigger getVelocity](https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity()/): 스크롤 속도 측정
