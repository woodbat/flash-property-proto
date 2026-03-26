"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Phone } from "lucide-react";

import type { RegionKey } from "@/lib/flashProperty/types";
import { regionOptions } from "@/lib/mock/flashPropertyMock";
import { useFlashProperty } from "@/app/providers";
import { matchPropertiesForCondition } from "@/lib/flashProperty/matching";
import { getBrokerProfileSync } from "@/lib/actions/flashPropertyActions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  userName: z.string().min(1, "이름을 입력해주세요."),
  region: z.enum([
    "서울 강남구",
    "서울 서초구",
    "서울 송파구",
    "경기 성남시",
    "경기 용인시",
    "인천 부평구",
    "서울",
    "경기",
    "인천",
  ]),
  budgetMax: z.preprocess(
    (v) => {
      if (v === undefined || v === null) return 0;
      if (typeof v === "string" && v.trim() === "") return 0;
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    },
    z.number().min(1, "예산을 입력해주세요."),
  ),
  aptAreaMin: z.preprocess(
    (v) => {
      if (v === undefined || v === null) return 0;
      if (typeof v === "string" && v.trim() === "") return 0;
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    },
    z.number().min(1, "희망면적을 입력해주세요."),
  ),
});

type FormValues = z.infer<typeof schema>;

export function ConditionForm() {
  const { addUserCondition } = useFlashProperty();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      region: "서울",
      budgetMax: 42000,
      aptAreaMin: 70,
    },
    mode: "onChange",
  });

  const watched = form.watch();
  const previewMatches = React.useMemo(() => {
    if (!watched.userName) return [];
    const safeBudgetMax = Number(watched.budgetMax);
    const safeAptAreaMin = Number(watched.aptAreaMin);
    const budgetMax = Number.isFinite(safeBudgetMax) ? safeBudgetMax : 0;
    const aptAreaMin = Number.isFinite(safeAptAreaMin) ? safeAptAreaMin : 0;
    const pseudoCondition = {
      id: "preview",
      userId: "preview",
      userName: watched.userName,
      region: watched.region as RegionKey,
      budgetMax,
      aptAreaMin,
      createdAt: new Date().toISOString(),
    };
    return matchPropertiesForCondition(
      pseudoCondition,
      getBrokerProfileSync().offers,
    );
  }, [watched.aptAreaMin, watched.budgetMax, watched.region, watched.userName]);

  function onSubmit(values: FormValues) {
    addUserCondition({
      userId: `user_${values.userName}_${Date.now()}`,
      userName: values.userName,
      region: values.region as RegionKey,
      budgetMax: values.budgetMax,
      aptAreaMin: values.aptAreaMin,
    });
    form.reset({ userName: values.userName, region: values.region, budgetMax: values.budgetMax, aptAreaMin: values.aptAreaMin });
  }

  return (
    <Card className="border-border/70 bg-background/50">
      <CardHeader>
        <CardTitle>내 급매 조건 입력</CardTitle>
        <CardDescription>
          입력하신 조건이 맞으면 중개 대시보드에서 바로 “전화하기” 버튼이 노출됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">이름</Label>
            <Input id="userName" placeholder="예: 배정훈" {...form.register("userName")} />
            {form.formState.errors.userName ? (
              <p className="text-sm text-red-600">{form.formState.errors.userName.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>선호 지역</Label>
            <Select
              value={form.watch("region")}
              onValueChange={(v) => form.setValue("region", v as RegionKey, { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="지역을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budgetMax">예산(만원)</Label>
              <Input
                id="budgetMax"
                type="number"
                inputMode="numeric"
                placeholder="예: 42000"
                {...form.register("budgetMax")}
              />
              {form.formState.errors.budgetMax ? (
                <p className="text-sm text-red-600">{form.formState.errors.budgetMax.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="aptAreaMin">희망 면적(평)</Label>
              <Input
                id="aptAreaMin"
                type="number"
                inputMode="numeric"
                placeholder="예: 70"
                {...form.register("aptAreaMin")}
              />
              {form.formState.errors.aptAreaMin ? (
                <p className="text-sm text-red-600">{form.formState.errors.aptAreaMin.message}</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 opacity-70" />
              <span className="text-sm font-semibold">미리보기 매칭</span>
              <span className="ml-auto text-sm text-foreground/70">
                {previewMatches.length > 0 ? `${previewMatches.length}개 매칭됨` : "아직 매칭 없음"}
              </span>
            </div>
            {previewMatches.length > 0 ? (
              <div className="mt-2 text-sm text-foreground/70">
                {previewMatches.slice(0, 2).map((p) => (
                  <div key={p.id} className="flex items-center gap-2 truncate">
                    <span className="shrink-0 text-foreground/50">-</span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="min-w-0 flex-1 truncate hover:text-foreground underline decoration-dotted decoration-foreground/30"
                    >
                      {p.brokerPropertyTitle}
                      <span className="ml-2 text-[11px] text-foreground/55">
                        (상세보기)
                      </span>
                    </a>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-foreground/70">
                조건을 조금 바꿔보세요(지역/예산/면적).
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            조건 등록
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

