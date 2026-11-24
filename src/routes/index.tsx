import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { weeks, allTaskKeys, taskKey, progressOf, EXAM_DATE, type Day, type DayKind } from "@/lib/schedule";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cronograma de estudos · Hospital Sarah" },
      { name: "description", content: "Meu cronograma para Analista de TI – Desenvolvimento, com progresso e contagem para a prova." },
      { property: "og:title", content: "Cronograma de estudos · Hospital Sarah" },
      { property: "og:description", content: "Marque cada bloco concluído e acompanhe sua evolução até a prova." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const STORE = "cronograma-sarah-v1";
const KIND: Record<DayKind, { tag: string; dot: string }> = {
  study: { tag: "Estudo", dot: "bg-primary" },
  mini: { tag: "Mini-simulado", dot: "bg-mini" },
  full: { tag: "Simulado completo", dot: "bg-full" },
  review: { tag: "Revisão", dot: "bg-review" },
  holiday: { tag: "Feriado", dot: "bg-muted-foreground" },
  exam: { tag: "Prova", dot: "bg-accent" },
};
const PHASES = { 1: "Fase 1 · Teoria", 2: "Fase 2 · Questões", 3: "Fase 3 · Simulados" } as const;
const MSGS = ["Bora começar! Um bloco de cada vez 💪", "Ótimo começo, continua assim!", "Você está pegando ritmo 🔥", "Metade do caminho! Orgulho!", "Reta final chegando, foco total ✨", "Pronta pra arrasar na prova! 🏆"];

const todayIso = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };

function Index() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [today, setToday] = useState("");
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(STORE) || "{}")); } catch { /* vazio */ }
    setToday(todayIso());
  }, []);
  const toggle = (k: string) => setDone((p) => { const n = { ...p, [k]: !p[k] }; localStorage.setItem(STORE, JSON.stringify(n)); return n; });

  const pct = progressOf(allTaskKeys, done);
  const doneCount = allTaskKeys.filter((k) => done[k]).length;
  const daysLeft = today ? Math.max(0, Math.round((new Date(EXAM_DATE + "T12:00:00").getTime() - new Date(today + "T12:00:00").getTime()) / 864e5)) : null;
  const daysDone = useMemo(() => weeks.flatMap((w) => w.days).filter((d) => d.tasks.length && d.tasks.every((_, i) => done[taskKey(d.id, i)])).length, [done]);
  const todayDay = weeks.flatMap((w) => w.days).find((d) => d.date === today);

  useEffect(() => { if (today) document.getElementById(`d-${today}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }, [today]);

  return (
    <main className="min-h-screen pb-24 font-sans">
      <header className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-12">
          <p className="text-sm uppercase tracking-[0.2em] opacity-80">Hospital Sarah · Analista de TI – Desenvolvimento</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">Meu caminho até a aprovação</h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">{MSGS[Math.min(5, Math.floor(pct / 20))]}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat big={`${pct}%`} label={`${doneCount} de ${allTaskKeys.length} blocos concluídos`} bar={pct} />
            <Stat big={daysLeft === null ? "–" : String(daysLeft)} label="dias para a prova (31/01)" />
            <Stat big={String(daysDone)} label="dias 100% completos" />
          </div>
        </div>
      </header>

      <div className="mx-auto -mt-8 max-w-6xl px-5">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground"><b className="text-foreground">Rotina de cada bloco de 3h:</b> 40 min de aula ou resumo em 1,5x → 2h de questões (Gran, filtrar por assunto e banca) → 20 min de caderno de erros e flashcards.</p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            {(Object.keys(KIND) as DayKind[]).map((k) => <span key={k} className="flex items-center gap-1.5"><i className={`h-2.5 w-2.5 rounded-full ${KIND[k].dot}`} />{KIND[k].tag}</span>)}
          </div>
          {todayDay && <a href={`#d-${today}`} className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">Ir para hoje →</a>}
        </div>

        {weeks.map((w, wi) => {
          const keys = w.days.flatMap((d) => d.tasks.map((_, i) => taskKey(d.id, i)));
          const wp = progressOf(keys, done);
          return (
            <section key={w.id} className="mt-12">
              {(wi === 0 || weeks[wi - 1]!.phase !== w.phase) && <p className="mb-3 font-display text-lg text-accent">{PHASES[w.phase]}</p>}
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-2xl font-bold md:text-3xl">Semana {wi + 1} <span className="text-base font-normal text-muted-foreground">· {w.range}</span></h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-36 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${wp}%` }} /></div>
                  {wp === 100 ? <span className="animate-pop">🎉</span> : `${wp}%`}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {w.days.map((d) => <DayCard key={d.id} d={d} done={done} toggle={toggle} isToday={d.date === today} />)}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function Stat({ big, label, bar }: { big: string; label: string; bar?: number }) {
  return (
    <div className="rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur">
      <div className="font-display text-5xl font-bold">{big}</div>
      <div className="mt-1 text-sm opacity-85">{label}</div>
      {bar !== undefined && <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${bar}%` }} /></div>}
    </div>
  );
}

function DayCard({ d, done, toggle, isToday }: { d: Day; done: Record<string, boolean>; toggle: (k: string) => void; isToday: boolean }) {
  const k = KIND[d.kind];
  const complete = d.tasks.length > 0 && d.tasks.every((_, i) => done[taskKey(d.id, i)]);
  if (d.kind === "holiday" || d.kind === "exam") {
    return (
      <div id={`d-${d.date}`} className={`flex min-h-32 flex-col justify-center rounded-2xl border border-dashed p-5 text-center ${d.kind === "exam" ? "border-accent bg-accent text-accent-foreground" : "bg-muted/60 text-muted-foreground"}`}>
        <p className="text-xs uppercase tracking-widest">{d.label}</p>
        <p className="mt-1 font-display text-2xl font-bold">{d.kind === "exam" ? "PROVA · Boa prova! 🍀" : "Feriado · descanse 🌿"}</p>
      </div>
    );
  }
  return (
    <div id={`d-${d.date}`} className={`rounded-2xl border bg-card p-5 transition-all ${isToday ? "ring-2 ring-accent shadow-soft" : ""} ${complete ? "border-primary/40 bg-secondary/60" : "hover:shadow-soft"}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"><i className={`h-2.5 w-2.5 rounded-full ${k.dot}`} />{d.label}{d.dayNum && ` · Dia ${d.dayNum}`}</span>
        {isToday ? <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">HOJE</span> : complete && <span className="animate-pop">✅</span>}
      </div>
      {d.note && <p className="mt-2 text-sm text-muted-foreground">Temas: {d.note}</p>}
      <ul className="mt-3 space-y-2">
        {d.tasks.map((t, i) => {
          const key = taskKey(d.id, i); const on = !!done[key];
          return (
            <li key={key}>
              <button onClick={() => toggle(key)} className="flex w-full items-start gap-3 rounded-xl p-2 text-left transition-colors hover:bg-muted">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-xs transition-all ${on ? "animate-pop border-primary bg-primary text-primary-foreground" : "border-border"}`}>{on && "✓"}</span>
                <span className={`text-sm leading-snug ${on ? "text-muted-foreground line-through" : ""}`}>{t}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
