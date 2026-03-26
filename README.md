# FlashProperty (프로토타입)

개인화된 부동산 급매 추천 서비스 `FlashProperty` 화면 중심 프로토타입입니다.

## 포함 기능(Mock 데이터)
- 사용자: `급매 조건` 입력 폼 (`src/components/flash/ConditionForm.tsx`)
- 중개사용(BM): 등록된 사용자 조건을 리스트로 보여주고, 매칭되는 경우 `전화하기` 버튼 노출 (`src/components/flash/MatchDashboard.tsx`)
- 조건 매칭 로직: `src/lib/flashProperty/matching.ts`
- Mock 데이터/중개 offers: `src/lib/mock/flashPropertyMock.ts`

## Supabase 연동 준비
- 데이터 접근 지점을 모으기 위해 `src/lib/actions/flashPropertyActions.ts` 를 만들어 두었습니다.
- 추후 Supabase로 바꿀 때는 아래 함수만 교체하면 됩니다.
  - `fetchUserConditions()`
  - `createUserCondition()`
  - `fetchBrokerProfile()` (현재는 `getBrokerProfileSync()`로 동기 사용)

## 실행 방법
```bash
npm i
npm run dev
```
브라우저에서 `http://localhost:3000` 접속 후 탭을 전환해 동작을 확인하세요.

