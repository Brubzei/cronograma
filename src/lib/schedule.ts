export type DayKind = "study" | "mini" | "full" | "review" | "holiday" | "exam";
export interface Day { id: string; date: string; label: string; kind: DayKind; tasks: string[]; dayNum?: number; note?: string }
export interface Week { id: string; range: string; phase: 1 | 2 | 3; days: Day[] }

const R = ["Revisão da semana (1–2h)", "Erros da semana (10 min)", "Refazer erros + flashcards (40–60 min)", "Discursiva da semana (20–30 min)"];
const D = "Discursiva (30 min)";
const SIM = ["SIMULADO COMPLETO (4h): 50 objetivas + discursiva", "Correção + caderno de erros (2h)"];

type Raw = [string, DayKind, string[]] | [string, "holiday"];
const raw: { range: string; phase: 1 | 2 | 3; days: Raw[]; sun: string }[] = [
  { range: "23/11 a 29/11", phase: 1, sun: "dados, BD, SQL", days: [
    ["2026-11-25", "study", ["Dado, informação, conhecimento; estruturados, abertos; coleta, ETL/ELT, ingestão", "Big Data, NoSQL, bancos vetoriais"]],
    ["2026-11-26", "study", ["BD: conceitos, arquitetura, modelagem C/L/F, normalização, integridade", "Modelagem dimensional + BD na análise"]],
    ["2026-11-27", "study", ["SQL: DDL e DML (muita questão)", "Índices, plano de execução, concorrência, transações"]],
  ]},
  { range: "30/11 a 06/12", phase: 1, sun: "PL/SQL, Python, eng. software, DevOps, LGPD", days: [
    ["2026-11-30", "study", ["Oracle PL/SQL: procedures, functions, triggers, packages, jobs, views", "DBA, armazenamento, performance"]],
    ["2026-12-01", "mini", ["Mini-simulado de dados (30 questões)", "Python p/ análise, exploratória, visualização", D]],
    ["2026-12-02", "study", ["Projeto de software, iterativo, ágil, Scrum/Kanban, MVP", "Requisitos, UX, histórias, critérios, prototipação"]],
    ["2026-12-03", "study", ["Testes (tipos, automação, SonarQube)", "DevOps, CI/CD, Docker, Kubernetes, observabilidade"]],
    ["2026-12-04", "mini", ["Gestão de projetos/processos, BPMN, LGPD", "Mini-simulado de eng. software + gestão", D]],
  ]},
  { range: "07/12 a 13/12", phase: 1, sun: "IA, agentes, MCP, arquitetura, padrões", days: [
    ["2026-12-07", "study", ["Fundamentos de IA, ML, IA generativa", "Redes neurais/DL, PLN, agentes e multiagentes"]],
    ["2026-12-08", "study", ["MLOps, deploy, nuvem, ética, explicabilidade, viés", "Engenharia de prompt + IA no desenvolvimento"]],
    ["2026-12-09", "mini", ["Arquitetura de agentes, MCP e A2A", "Mini-simulado de IA", D]],
    ["2026-12-10", "study", ["Arquitetura: MVC, camadas, microsserviços, eventos, refatoração", "APIs, cloud native, patterns, gateway, mensageria"]],
    ["2026-12-11", "study", ["SOAP, REST, gRPC, XML, XSLT, WSDL, JSON, W3C, mobile", "SOLID, padrões de projeto, SSO, cache, sínc./assínc."]],
  ]},
  { range: "14/12 a 20/12", phase: 1, sun: "OO, C#/WPF, ASP.NET, APIs/JWT, front, Git", days: [
    ["2026-12-14", "mini", ["Mini-simulado de arquitetura", "Algoritmos, estrutura de dados, OO", D]],
    ["2026-12-15", "study", ["C#, VB6/VB/VB.NET, Visual Studio, Windows Forms", "WPF + OO aplicado em C#"]],
    ["2026-12-16", "study", ["ASP.NET, MVC, MVVM, Razor, Entity Framework/ORM", "REST API, OData, Web Services, OAuth, JWT"]],
    ["2026-12-17", "study", ["Front: HTML5, CSS3, JS, jQuery, Vue, Node, Bootstrap, Quasar, SPA (rápido)", "Git, TFS, Azure DevOps, Docker"]],
    ["2026-12-18", "mini", ["Mini-simulado de dev, .NET e front-end", "Revisão do caderno de erros da Fase 1", D]],
  ]},
  { range: "21/12 a 27/12", phase: 2, sun: ".NET, OAuth/JWT, PL/SQL, SQL, arquitetura", days: [
    ["2026-12-21", "study", ["Questões: C#, WinForms, WPF", "Questões: ASP.NET, EF, MVVM", D]],
    ["2026-12-22", "study", ["Questões: REST, OData, OAuth, JWT", "Questões: Oracle PL/SQL", D]],
    ["2026-12-23", "study", ["Questões: SQL, DDL e DML", "Questões: índices, transações", D]],
    ["2026-12-24", "study", ["Questões: microsserviços, camadas, eventos", "Questões: padrões, SOLID, APIs, SOAP/REST", D]],
    ["2026-12-25", "holiday"],
  ]},
  { range: "28/12 a 03/01", phase: 2, sun: "IA/MCP, modelagem, eng. software, DevOps, front", days: [
    ["2026-12-28", "study", ["Questões: MCP, A2A, agentes", "Questões: IA, ML, MLOps, ética, prompt", D]],
    ["2026-12-29", "study", ["Questões: modelagem, normalização, NoSQL", "Questões: ETL, Big Data, Python", D]],
    ["2026-12-30", "study", ["Questões: eng. software, testes, DevOps", "Questões: ágil, requisitos, LGPD, BPMN", D]],
    ["2026-12-31", "study", ["Questões: front, Git, Docker, OO", "Mix do caderno de erros", D]],
    ["2027-01-01", "holiday"],
  ]},
  { range: "04/01 a 10/01", phase: 3, sun: "erros da semana + simulado 1 (08/01)", days: [
    ["2027-01-04", "study", ["Erros: .NET, C#, EF, OAuth/JWT", "Erros: SQL e PL/SQL"]],
    ["2027-01-05", "study", ["Erros: arquitetura e padrões", "Erros: IA, MCP, A2A"]],
    ["2027-01-06", "study", ["Erros: dados, modelagem, NoSQL", "Erros: eng. software, testes, DevOps"]],
    ["2027-01-07", "study", ["Gestão, LGPD, BPMN, front, Git", "Mix aleatório de 40 questões"]],
    ["2027-01-08", "full", SIM],
  ]},
  { range: "11/01 a 17/01", phase: 3, sun: "erros da semana + simulado 2 (15/01)", days: [
    ["2027-01-11", "study", ["Fracos do simulado 1 (tema A)", "Fracos do simulado 1 (tema B)"]],
    ["2027-01-12", "study", ["Questões do tema mais errado", "Mix de questões por assunto"]],
    ["2027-01-13", "study", ["Refazer erros acumulados (1)", "Refazer erros acumulados (2)"]],
    ["2027-01-14", "study", ["Flashcards + mix de questões", "Mix de questões por assunto", D]],
    ["2027-01-15", "full", SIM],
  ]},
  { range: "18/01 a 24/01", phase: 3, sun: "fechamento dos pontos fracos e revisão do simulado 3", days: [
    ["2027-01-18", "study", ["Fracos do simulado 2 (tema A)", "Fracos do simulado 2 (tema B)"]],
    ["2027-01-19", "study", ["Questões do tema mais errado", "Mix de questões por assunto"]],
    ["2027-01-20", "study", ["Refazer erros acumulados (1)", "Refazer erros acumulados (2)"]],
    ["2027-01-21", "study", ["Flashcards + mix de questões", "Mix de questões por assunto", D]],
    ["2027-01-22", "full", SIM],
  ]},
  { range: "25/01 a 31/01", phase: 3, sun: "", days: [
    ["2027-01-25", "study", ["Caderno de erros: dados, SQL, PL/SQL", "Caderno de erros: .NET, APIs, front"]],
    ["2027-01-26", "study", ["Caderno de erros: arquitetura, software", "Caderno de erros: IA, MCP, gestão, LGPD"]],
    ["2027-01-27", "study", ["Fracos do simulado 3", "Flashcards e resumos", D]],
    ["2027-01-28", "study", ["Flashcards e resumos (leve)", "Fechamento: erros que mais se repetem"]],
    ["2027-01-29", "study", ["Leitura leve do caderno de erros (máx. 2h)"]],
  ]},
];

const WD = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const fmt = (iso: string) => { const [, m, d] = iso.split("-"); const w = new Date(iso + "T12:00:00").getDay(); return `${WD[w]} · ${d}/${m}`; };
const addDays = (iso: string, n: number) => { const t = new Date(iso + "T12:00:00"); t.setDate(t.getDate() + n); return t.toISOString().slice(0, 10); };

let n = 0;
export const weeks: Week[] = raw.map((w, i) => {
  const days: Day[] = w.days.map((r) => {
    const [date, kind] = r;
    if (kind === "holiday") return { id: date, date, label: fmt(date), kind, tasks: [] };
    n++;
    return { id: date, date, label: fmt(date), kind, tasks: r[2] as string[], dayNum: n };
  });
  const last = w.days[w.days.length - 1]![0];
  const sunday = addDays(last, 7 - new Date(last + "T12:00:00").getDay());
  if (w.sun) days.push({ id: sunday, date: sunday, label: fmt(sunday), kind: "review", tasks: R, note: w.sun });
  else days.push({ id: "2027-01-31", date: "2027-01-31", label: fmt("2027-01-31"), kind: "exam", tasks: [] });
  return { id: `S${i + 1}`, range: w.range, phase: w.phase, days };
});

export const EXAM_DATE = "2027-01-31";
export const taskKey = (dayId: string, i: number) => `${dayId}#${i}`;
export const allTaskKeys = weeks.flatMap((w) => w.days.flatMap((d) => d.tasks.map((_, i) => taskKey(d.id, i))));
export const progressOf = (keys: string[], done: Record<string, boolean>) =>
  keys.length === 0 ? 0 : Math.round((keys.filter((k) => done[k]).length / keys.length) * 100);
