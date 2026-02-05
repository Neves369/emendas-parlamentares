import { useEffect, useState } from "react";
import MetricCard from "@/components/MetricCard";
import StructureChart from "@/components/StructureChart";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import TopResourcesChart from "@/components/TopResourcesChart";
import {
  Wallet,
  BarChart3,
  Target,
  Globe,
  Activity,
  ArrowRight,
} from "lucide-react";
import ParliamentaryAmendmentsTable from "@/components/ParliamentaryAmendmentsTable";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoriaLider, setCategoriaLider] = useState<any>(null);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
        const categoriaLider = Object.entries(
          json.raw_data?.reduce((acc: any, item: any) => {
            acc[item.categoria] =
              (acc[item.categoria] || 0) + item.valor_previsto;
            return acc;
          }, {})
        ).reduce((a: any, b: any) => (a[1] > b[1] ? a : b));
        setCategoriaLider(categoriaLider);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-1 bg-muted overflow-hidden">
            <div className="h-full bg-primary animate-slide-in-left w-full" />
          </div>
          <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">
            Iniciando...
          </span>
        </div>
      </div>
    );

  const { total_geral, total_por_autor, total_por_origem, total_por_funcao } =
    data.metrics;

  const raw_data = data.raw_data;
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {/* Header Full Width */}
      <header className="w-full border-b border-white/5 bg-background/50 backdrop-blur-2xl">
        <div className="container py-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_oklch(0.85_0.18_110_/_0.3)]">
              <Wallet className="text-background w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
                Município de Teresópolis <span className="text-primary"></span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
                  Emendas Parlamentares
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="hidden xl:block">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1">
                Total Proposto
              </p>
              <p className="text-2xl font-mono font-bold text-foreground italic leading-none">
                R$ {(total_geral / 1_000_000).toFixed(2)} Milhões
              </p>
            </div>
            <a href="/EMENDAS_2025.xlsx" download="EMENDAS_2025.xlsx">
              <button className="bg-primary text-background px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
                Download da Base de Dados <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-10 space-y-10">
        {/* KPI Grid - 100% Width */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Recurso Destinado"
            value={`R$ ${(total_geral / 1_000_000).toFixed(2)} Milhões`}
            subtitle="Volume total processado"
            icon={<Wallet />}
          />
          <MetricCard
            title="Fonte de Origem Principal"
            value={total_por_origem[0].Estrutura.replace(
              "MINISTERIO DO ESPORTE",
              "MESP"
            )}
            subtitle="O Maior Valor é Originário do Ministério do Esporte"
            icon={<BarChart3 />}
          />
          <MetricCard
            title="Maior Recurso Proposto"
            value={categoriaLider[0]}
            subtitle={`Com mais de R$ ${(categoriaLider[1] / 1_000_000).toFixed(2)}Milhões alocados`}
            icon={<Target />}
          />
          <MetricCard
            title="Proponentes"
            value={total_por_autor.length}
            subtitle="Quantidade de Proponentes das Emendas"
            icon={<Globe />}
          />
        </section>

        {/* Charts Section - 2/3 and 1/3 split */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-card border border-border p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <Activity className="text-primary w-5 h-5" />
                <h3 className="font-bold text-xl uppercase tracking-widest italic">
                  Valor dos Recursos Ano a Ano
                </h3>
              </div>
              <div className="h-px flex-1 mx-8 bg-white/5" />
            </div>
            <div className="h-[450px]">
              <TimeSeriesChart data={total_por_ano} />
            </div>
          </div>

          <div className="xl:col-span-1 bg-card border border-border p-10 rounded-[2.5rem]">
            <h3 className="font-bold text-xl uppercase tracking-widest italic mb-12 text-primary">
              Recursos por Função
            </h3>
            <div className="h-[450px]">
              <StructureChart data={total_por_funcao} />
            </div>
          </div>
        </div> */}

        {/* Bottom Banner Section */}
        <section className="bg-primary p-16 rounded-[3.5rem] flex flex-col xl:flex-row  justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-background text-3xl font-black leading-[0.85] mb-6 uppercase italic tracking-tighter">
              Parlamentares <br /> que mais contribuíram
            </h2>
            <p className="text-background/70 text-xl font-medium tracking-tight">
              3 parlamentares que mais destinaram recursos para o município.
            </p>
            <img src="images/image.png" />
          </div>
          <div className="w-full xl:flex-1 bg-background/10 backdrop-blur-3xl rounded-[2rem] p-0 border border-white/10 shadow-3xl">
            <TopResourcesChart data={total_por_autor.slice(0, 3)} />
          </div>
        </section>

        <div className="w-full mt-10">
          <ParliamentaryAmendmentsTable data={raw_data} />
        </div>
      </main>

      <footer className="w-full py-12 border-t border-white/5 mt-10">
        <div className="container flex justify-between items-center">
          <p className="text-[10px] font-mono tracking-[0.5em] text-muted-foreground uppercase">
            Prefeitura Municipal de Teresópolis // 2026 // Departamento de
            Governança de Dados
          </p>
          <div className="flex gap-4 h-1 items-center">
            <div className="w-12 h-px bg-primary/20" />
            <div className="w-4 h-px bg-primary" />
          </div>
        </div>
      </footer>
    </div>
  );
}
