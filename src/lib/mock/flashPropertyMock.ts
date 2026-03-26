import type {
  BrokerProfile,
  RegionKey,
  UserCondition,
} from "@/lib/flashProperty/types";

export const regionOptions: Array<{ value: RegionKey; label: string }> = [
  { value: "서울 강남구", label: "서울 강남구" },
  { value: "서울 서초구", label: "서울 서초구" },
  { value: "서울 송파구", label: "서울 송파구" },
  { value: "경기 성남시", label: "경기 성남시" },
  { value: "경기 용인시", label: "경기 용인시" },
  { value: "인천 부평구", label: "인천 부평구" },
  { value: "서울", label: "서울 전체(광역)" },
  { value: "경기", label: "경기 전체(광역)" },
  { value: "인천", label: "인천 전체(광역)" },
];

export const mockBrokerProfile: BrokerProfile = {
  brokerUserId: "broker_001",
  brokerName: "Flash중개팀",
  phone: "010-1234-5678",
  offers: [
    {
      id: "prop_001",
      brokerPropertyTitle: "강남 급매 3억대(초역세권)",
      url: "https://new.land.naver.com/complexes/129829?ms=37.511277,127.107799,17&a=OPST:PRE&b=A1&e=RETAIL&f=50000&g=59999&articleNo=2616448749",
      region: "서울 강남구",
      price: 32500,
      aptArea: 59,
    },
    {
      id: "prop_002",
      brokerPropertyTitle: "서초 급매 4억대(학군좋음)",
      url: "https://search.naver.com/search.naver?query=%EC%84%9C%EC%B4%88+%EA%B8%89%EB%A7%A4+4%EC%96%B5%EB%8C%80",
      region: "서울 서초구",
      price: 39800,
      aptArea: 74,
    },
    {
      id: "prop_003",
      brokerPropertyTitle: "송파 급매 5억대(한강뷰)",
      url: "https://search.naver.com/search.naver?query=%EC%86%A1%ED%8C%8C+%EA%B8%89%EB%A7%A4+5%EC%96%B5%EB%8C%80",
      region: "서울 송파구",
      price: 49500,
      aptArea: 84,
    },
    {
      id: "prop_004",
      brokerPropertyTitle: "성남 급매 3억중후반(역세권)",
      url: "https://example.com/flashproperty/prop_004",
      region: "경기 성남시",
      price: 36500,
      aptArea: 62,
    },
    {
      id: "prop_005",
      brokerPropertyTitle: "용인 급매 2억후반(신축급)",
      url: "https://example.com/flashproperty/prop_005",
      region: "경기 용인시",
      price: 28500,
      aptArea: 59,
    },
  ],
};

export const mockInitialUserConditions: UserCondition[] = [
  {
    id: "cond_001",
    userId: "user_101",
    userName: "김민지",
    region: "서울 강남구",
    budgetMax: 34000,
    aptAreaMin: 55,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "cond_002",
    userId: "user_102",
    userName: "박지훈",
    region: "서울",
    budgetMax: 42000,
    aptAreaMin: 70,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "cond_003",
    userId: "user_103",
    userName: "이수아",
    region: "경기 성남시",
    budgetMax: 39000,
    aptAreaMin: 60,
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "cond_004",
    userId: "user_104",
    userName: "정하린",
    region: "경기",
    budgetMax: 30000,
    aptAreaMin: 58,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
];

