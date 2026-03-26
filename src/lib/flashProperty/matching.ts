import type { BrokerProperty, RegionKey, UserCondition } from "@/lib/flashProperty/types";

function isRegionMatch(userRegion: RegionKey, propertyRegion: BrokerProperty["region"]) {
  if (userRegion === propertyRegion) return true;

  // 광역 키워드는 prefix 매칭으로 간단 처리(프로토타입)
  if (userRegion === "서울") return propertyRegion.startsWith("서울 ");
  if (userRegion === "경기") return propertyRegion.startsWith("경기 ");
  if (userRegion === "인천") return propertyRegion.startsWith("인천 ");

  return false;
}

export function matchPropertiesForCondition(
  condition: UserCondition,
  offers: BrokerProperty[],
) {
  return offers.filter((offer) => {
    const regionOk = isRegionMatch(condition.region, offer.region);
    const budgetOk = condition.budgetMax >= offer.price;
    const areaOk = condition.aptAreaMin <= offer.aptArea;
    return regionOk && budgetOk && areaOk;
  });
}

