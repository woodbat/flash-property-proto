"use client";

import * as React from "react";
import { PhoneCall, RefreshCw } from "lucide-react";

import { getBrokerProfileSync } from "@/lib/actions/flashPropertyActions";
import { matchPropertiesForCondition } from "@/lib/flashProperty/matching";
import { useFlashProperty } from "@/app/providers";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function formatBudgetManwon(value: number) {
  // 프로토타입: 만원 단위 표시
  return `${value.toLocaleString("ko-KR")} 만원`;
}

function formatAreaPyeong(value: number) {
  return `${value.toLocaleString("ko-KR")} 평`;
}

function getMatchLabel(matchesCount: number) {
  if (matchesCount > 0) return { text: "매칭됨", variant: "success" as const };
  return { text: "대기", variant: "secondary" as const };
}

export function MatchDashboard() {
  const { userConditions, resetToMock } = useFlashProperty();

  const enriched = React.useMemo(() => {
    return userConditions
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((cond) => {
        const matches = matchPropertiesForCondition(cond, getBrokerProfileSync().offers);
        return { condition: cond, matches };
      });
  }, [userConditions]);

  return (
    <Card className="border-border/70 bg-background/50">
      <CardHeader className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="space-y-1">
            <CardTitle>중개사용 대시보드</CardTitle>
            <CardDescription>
              등록된 사용자 조건을 확인하고, 매칭되는 경우 “전화하기” 버튼을 바로 노출합니다.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={resetToMock}
            aria-label="Mock 초기화"
            title="Mock 초기화"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg border border-border/60 bg-muted/25 p-3">
          <div className="text-sm font-semibold">{mockBrokerProfile.brokerName}</div>
          <div className="mt-1 text-sm text-foreground/70">
            전화: <span className="font-medium text-foreground">{getBrokerProfileSync().phone}</span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사용자</TableHead>
              <TableHead>선호 지역</TableHead>
              <TableHead>예산</TableHead>
              <TableHead>면적</TableHead>
              <TableHead>매칭</TableHead>
              <TableHead className="text-right">전화하기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enriched.map(({ condition, matches }) => {
              const label = getMatchLabel(matches.length);
              const callHref = `tel:${getBrokerProfileSync().phone}`;
              return (
                <TableRow key={condition.id}>
                  <TableCell className="font-medium">{condition.userName}</TableCell>
                  <TableCell>{condition.region}</TableCell>
                  <TableCell>{formatBudgetManwon(condition.budgetMax)}</TableCell>
                  <TableCell>{formatAreaPyeong(condition.aptAreaMin)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={label.variant}>{label.text}</Badge>
                      {matches.length > 0 ? (
                        <span className="text-xs text-foreground/70">
                          {matches.length}개
                        </span>
                      ) : null}
                    </div>
                    {matches.length > 0 ? (
                      <div className="mt-2 space-y-1">
                        {matches.slice(0, 2).map((m) => (
                          <div key={m.id} className="truncate text-xs text-foreground/70">
                            - {m.brokerPropertyTitle}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    {matches.length > 0 ? (
                      <Button asChild className="justify-end bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 border border-emerald-500/20">
                        <a href={callHref}>
                          <PhoneCall className="h-4 w-4" />
                          전화하기
                        </a>
                      </Button>
                    ) : (
                      <span className="text-sm text-foreground/40">-</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {enriched.length === 0 ? (
          <p className="mt-6 text-center text-sm text-foreground/60">
            아직 등록된 사용자 조건이 없습니다.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

