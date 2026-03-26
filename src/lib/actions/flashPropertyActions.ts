import type {
  BrokerProfile,
  UserCondition,
} from "@/lib/flashProperty/types";

import {
  mockBrokerProfile,
  mockInitialUserConditions,
} from "@/lib/mock/flashPropertyMock";

export type AddUserConditionDraft = Omit<
  UserCondition,
  "id" | "createdAt"
>;

export async function fetchBrokerProfile(): Promise<BrokerProfile> {
  // TODO: Supabase 연동 시 현재 중개사용자의 offers를 가져오도록 교체합니다.
  return mockBrokerProfile;
}

export function getBrokerProfileSync(): BrokerProfile {
  // TODO: Supabase 연동 시 이 함수를 제거하고 fetchBrokerProfile/서버컴포넌트로 대체합니다.
  return mockBrokerProfile;
}

export async function fetchUserConditions(): Promise<UserCondition[]> {
  // TODO: Supabase 연동 시 등록된 사용자 조건들을 가져오도록 교체합니다.
  return mockInitialUserConditions.map((c) => ({ ...c }));
}

export async function createUserCondition(
  draft: AddUserConditionDraft,
): Promise<UserCondition> {
  // TODO: Supabase 연동 시 insert 후 반환값(저장된 row)을 사용하도록 교체합니다.
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `cond_${Date.now()}`;
  return {
    ...draft,
    id,
    createdAt: new Date().toISOString(),
  };
}

