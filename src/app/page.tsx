import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConditionForm } from "@/components/flash/ConditionForm";
import { MatchDashboard } from "@/components/flash/MatchDashboard";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-foreground/70">FlashProperty</div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              개인화된 급매 추천 프로토타입
            </h1>
            <p className="mt-3 text-sm text-foreground/70">
              사용자 조건 입력 -> 중개 대시보드 매칭 -> “전화하기” 버튼 노출
            </p>
          </div>
          <div className="hidden rounded-xl border border-border/70 bg-muted/25 px-4 py-3 md:block">
            <div className="text-sm font-semibold">신뢰감 있는 금융/부동산 톤</div>
            <div className="mt-1 text-xs text-foreground/60">
              Next.js + Tailwind + shadcn 스타일(프로토타입)
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="user" className="flex-1 sm:flex-none">
            사용자용
          </TabsTrigger>
          <TabsTrigger value="broker" className="flex-1 sm:flex-none">
            중개사용(대시보드)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="mt-4">
          <ConditionForm />
        </TabsContent>

        <TabsContent value="broker" className="mt-4">
          <MatchDashboard />
        </TabsContent>
      </Tabs>
    </main>
  );
}

