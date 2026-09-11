# 포트폴리오 2차 피드백 반영 — 2026-09-07

미팅 스크립트: /Users/user/.codex/attachments/d3529d1e-86a3-4016-9ab8-01105b81e797/pasted-text.txt

## 구현 결정

- 가로 캐러셀을 제거하고 6개 구획을 세로로 연결. 목차는 해당 구획으로 이동한다.
- Aside CLI가 public Notion에서 원본 이미지 45개를 다운로드했다. 메인 작업에서 프로젝트 assets/portfolio-20260907로 복사하고 PIL 디코딩/해시를 확인했다.
- 11=12, 28=31 동일 해시. 원본 파일은 모두 보관하고 웹에서는 중복 2개를 제외한 43장을 표시한다.
- 이미지 10은 Notion상 박사장 하위이나 실제 아기수면 영상이다. 콘텐츠 성과 영역으로 배치했다.
- Before/After 배치는 Notion의 비교 구획과 이미지 순서, 실제 숫자를 대조했다. 동일 게시물의 전후 추적이 아니라 서로 다른 콘텐츠 성과 비교임을 '각 콘텐츠 조회수'로 표기한다.
- 팔로워 숫자는 북마크 미리보기 대신 제공된 스크린샷 기준. 듀오링고 20.4만, 오드리겸 18.1만, 즈킁케이크 2.2만.
- 성장률이나 신규 매출 수치를 임의로 합산/추정하지 않는다. 결과 사진은 원본 비율과 숫자를 보존한다.
- 고객사 및 수강생 채널 링크는 Notion 제공 링크를 사용. 일반 콘텐츠 성과 17개와 링크가 없는 수강생 전후 5개는 비링크 이미지다.
- 기존 스토리와 홈, 서비스 변경은 이번 포트폴리오 교체 범위에 포함하지 않았다. 문의 폼은 아직 미제공이므로 마지막 CTA는 기존 홈으로 이동한다.

## 확인

- 6개 로컬 계약 테스트 통과. 새 테스트는 이미지 파일/중복/목차/외부 링크 동작을 검증한다.
- 브라우저에서 이미지 43장 로드, 깨진 이미지 0, 모바일 가로 넘침 0, 일반 콘텐츠 결과 링크 0을 확인했다.

## Aside 원문 추출 기록

# Twopeace portfolio assets — Notion extraction (2026-09-07)

Source: https://smart-jumper-b33.notion.site/2-3d1312cc7a5980288171f2ee85e87089 (page title: "2차 피드백")
Read-only. Notion was not edited. 45 images downloaded at original resolution.

Metric values below come from two places:
- **(page)** = text that literally exists in the Notion page (link-preview descriptions)
- **(img)** = numbers visible inside the downloaded screenshot

---

## 1. 대표 채널 경험 — "기획 & 촬영 & 편집 & 업로드"

| File | Case | Source link | Metrics |
|---|---|---|---|
| 01-channel-duolingo-instagram-01.png | 듀오링고 | https://www.instagram.com/duolingokorea/ | (img) 794 게시물 / 20.4만 팔로워 / 11 팔로잉 · (page) 199K Followers, 11 Following, 776 Posts |
| 02-channel-duolingo-instagram-02.png | 듀오링고 — 촬영 현장 스틸 | same | none |

Note: page link-preview (199K / 776 posts) and in-image profile (20.4만 / 794 posts) disagree — captured at different times.

## 2. 비포에프터 (heading: "비포에프터(링크 누르면 들어가게하기)")

### 2-1. 김주하 (기획 & 촬영 & 편집 & 업로드)
Source: https://www.instagram.com/baby_joohalab/

| File | Role | Metrics |
|---|---|---|
| 03-beforeafter-kimjooha-instagram-01.png | BEFORE (old account `joyfulparenting123`) | (img) 37 게시물 / 589 팔로워 / 56 팔로잉 |
| 04-beforeafter-kimjooha-instagram-02.png | AFTER (`baby_joohalab`) | (img) 186 게시물 / 9.8만 팔로워 / 25 팔로잉 · (page) 98K Followers, 25 Following, 186 Posts |
| 05-beforeafter-kimjooha-youtube.png | AFTER (YouTube @김주하아기수면연구소) | (img) 구독자 2.24만명 / 동영상 90개 |

Before/after roles are **inferred** from account handle + follower deltas; the page has no literal "before"/"after" labels.

### 2-2. 오드리겸
Source: https://www.instagram.com/audrey_gyeom/
Scope listed on page: 국내 & 해외 레퍼런스 전달 / 업로드 콘텐츠 분석 & 피드백 / 콘텐츠기획 / 촬영 디렉팅

| File | Role | Metrics |
|---|---|---|
| 06-beforeafter-audreygyeom-01.png | BEFORE (screenshot dated 2026-01-14) | (img) 413 게시물 / 10.5만 팔로워 / 695 팔로우 |
| 07-beforeafter-audreygyeom-02.png | AFTER | (img) 650 게시물 / 18.1만 팔로워 / 4 팔로잉 · (page) 182K Followers, 20 Following, 627 Posts |

### 2-3. 오프라인 매장 (기획&편집&촬영&업로드)

| File | Case | Source link | Metrics |
|---|---|---|---|
| 08-beforeafter-offline-tapshopbar.png | 탭샵바 (TSB) | https://www.instagram.com/tap.shop.bar/ | (img) 331 게시물 / 7,734 팔로워 / 2 팔로잉 · bio: 음식점, "wine is second americano" |
| 09-beforeafter-offline-parkphone-01.png | 하남휴대폰성지 도매폰센타ㅣ박사장 | https://www.instagram.com/park___phone/ | (img) 93 게시물 / 1만 팔로워 / 98 팔로잉 · bio: 【하남시 1위】 도매폰센타 · 월 300대 이상 판매 · (page) 10K Followers, 98 Following, 93 Posts |
| 10-beforeafter-offline-parkphone-02.png | **MISMATCH** — sits under the 박사장 block but the screenshot is 김주하 baby-sleep content | — | (img) 127.4만 views, "아침 9시까지 재우면 아기한테 손해입니다" |

No "before" screenshot exists for 탭샵바 or 박사장 — only current-state profiles.

## 3. 콘텐츠결과 (heading: "콘텐츠결과(링크 누르면 들어가지 않게x)")

No case names, no links, no captions in the page. Only view counts inside each thumbnail. Grouped by the page's column blocks (g1–g7).

| File | Content | Views |
|---|---|---|
| 11-contentresult-g1-left.png | 아기 최대 낮잠 시간 (김주하) | 147.9만 |
| 12-contentresult-g1-center.png | **duplicate of g1-left** (same screenshot re-uploaded) | 147.9만 |
| 13-contentresult-g1-right.png | 자다가 칭얼댈 때 안아주면 안 되는 이유 (김주하) | 192.1만 |
| 14-contentresult-g2-left.webp | 알라 가방 (오드리겸) | 115.5만 |
| 15-contentresult-g2-center.png | 시댁룩 VS 친정룩 (오드리겸) | 112만 |
| 16-contentresult-g2-right.png | 6만원대 인생백 (오드리겸) | 235.5만 |
| 17-contentresult-g3-left.png | 마감했는데 갑자기 들어오신 할머니 | 137.1만 |
| 18-contentresult-g3-center.webp | 요즘 할머니들이 등교하는 곳 (휴대폰매장) | 209.2만 |
| 19-contentresult-g3-right.webp | 이렇게 쓰지 마세요 / 하남 휴대폰성지 도매폰센타 | 199.2만 |
| 20-contentresult-g4-left.png | 상담 장면 | 45.4만 |
| 21-contentresult-g4-right.png | 다이어트 비포애프터 + 음식 | 91.2만 |
| 22-contentresult-g5-left.png | 웨딩드레스 | 252만 |
| 23-contentresult-g5-right.png | 웨딩드레스 | 296.9만 |
| 24-contentresult-g6-left.png | 사무실/장비 (재생수 표기) | 70만 |
| 25-contentresult-g6-right.png | 어두운 컷 | 25.1만 |
| 26-contentresult-g7-left.png | "가장 낮은 금리"의 주택담보대출 찾는 방법 | 20.2만 |
| 27-contentresult-g7-right.png | BANK / 대출 | 16.4만 |

## 4. 수강생교육사진

| File | Notes |
|---|---|
| 28-student-training-photo-01.png | 강의실 단체 사진 |
| 29-student-training-photo-02.png | 강의실 단체 사진 |
| 30-student-training-photo-03.png | 강의실 단체 사진 |
| 31-student-training-photo-04.png | **duplicate of 28** (same source filename IMG_9527, re-uploaded) |

No names, dates, or metrics anywhere in this section.

## 5. 수강생성과 (heading: "수강생성과 (링크 누르면 들어가게하기)")

### 5-1. 월트의 영감노트
Source: https://www.youtube.com/@월트의영감노트/videos

| File | Metrics |
|---|---|
| 32-student-result-walt-inspiration-note-youtube.png | (img) 구독자 7.41만명 / 동영상 56개 |
| 33-student-result-walt-inspiration-note-stats.png | (img) 3 videos: 조회수 89만회 / 61만회 / 61만회, all "1년 전", 7.41만 Subscribers |

### 5-2. 즈킁케이크
Source: https://www.instagram.com/jeukheung_cake/

| File | Metrics |
|---|---|
| 34-student-result-jeukheung-cake-instagram.png | (img) 1,106 게시물 / 2.2만 팔로워 / 768 팔로잉 · (page) 23K Followers, 788 Following, 1,106 Posts |
| 35-student-result-jeukheung-cake-stats.png | (img) 3 reels: 193.5만 / 407.7만 / 10.9만 views |

## 6. 수강생 비포에프터

Column pairs. Left column = first, right column = second. The page carries **no explicit before/after label per image**; the reading below is inferred from the view-count jump.

| Case | BEFORE (left) | AFTER (right) |
|---|---|---|
| 1. 오뎅바 | 36-student-ba-odengbar-left.png — 9,670 views | 37-student-ba-odengbar-right.png — 224.7만 views |
| 2. 연애코칭 | 38-student-ba-dating-coaching-left.png — 3,372 views | 39-student-ba-dating-coaching-right.png — 88.1만 views |
| 3. 레터링케이크 | 40-student-ba-lettering-cake-left.png — 9,567 views | 41-student-ba-lettering-cake-right.png — 392.6만 views |
| 4. 에스테틱 | 42-student-ba-esthetic-left.png — 1,113 views | 43-student-ba-esthetic-right.png — 24.3만 views |
| 5. 휴대폰매장 | 44-student-ba-phone-store-left.png — 1,108 views | 45-student-ba-phone-store-right.png — 113.5만 views |

No account links given for any of these 5 student cases.

---

## Missing / unreliable data

1. No image captions or alt text anywhere in the page — every description above is read off the screenshot pixels.
2. No explicit "BEFORE"/"AFTER" wording. Roles inferred from left/right column order plus metric direction.
3. 콘텐츠결과 section (17 images): no case names, no links, no dates.
4. 수강생교육사진 (4 images): no names, no dates, no context.
5. 수강생 비포에프터 (5 cases): no source links, no account handles, no dates.
6. No dates for any metric. Screenshot filenames suggest capture on 2026-09-04 (one on 2026-01-14).
7. Duplicates: 11 = 12; 28 = 31.
8. 10-beforeafter-offline-parkphone-02.png is filed under 박사장 but shows 김주하 content — likely an authoring mistake in Notion.
9. Page link-preview follower counts differ from the follower counts inside the screenshots (듀오링고, 오드리겸, 즈킁케이크) — pick one source and note the date.
10. Trailing empty heading block at the end of the page (no content).

