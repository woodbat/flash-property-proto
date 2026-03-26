export type RegionKey =
  | "서울 강남구"
  | "서울 서초구"
  | "서울 송파구"
  | "경기 성남시"
  | "경기 용인시"
  | "인천 부평구"
  | "서울"
  | "경기"
  | "인천";

export type UserCondition = {
  id: string;
  userId: string;
  userName: string;
  region: RegionKey;
  budgetMax: number; // 최대 예산
  aptAreaMin: number; // 희망(최소) 전용면적(평)
  createdAt: string; // ISO
};

export type BrokerProperty = {
  id: string;
  brokerPropertyTitle: string;
  url: string;
  region: Exclude<RegionKey, "서울" | "경기" | "인천">;
  price: number; // 제시 가능한 가격(급매가 느낌)
  aptArea: number; // 전용면적(평)
};

export type BrokerProfile = {
  brokerUserId: string;
  brokerName: string;
  phone: string;
  offers: BrokerProperty[];
};

