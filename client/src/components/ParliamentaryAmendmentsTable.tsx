import {
  ExternalLink,
  User,
  Landmark,
  FileText,
  MapPin,
  Calendar,
  CreditCard,
  Link as LinkIcon,
  Activity,
} from "lucide-react";

export default function ParliamentaryAmendmentsTable({
  data,
}: {
  data: any[];
}) {
  return (
    <section className="w-full bg-card border border-border rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:border-primary/30">
      <div className="p-10 border-b border-border flex items-center justify-between bg-background/20">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">
            Detalhamento de{" "}
            <span className="text-primary">Emendas Parlamentares</span>
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] mt-2">
            Protocolo de Transparência // Lei Orçamentária 2026
          </p>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse text-left min-w-[2200px]">
          <thead>
            <tr className="bg-background/40 ">
              {[
                {
                  label: "Origem",
                  icon: <MapPin size={14} />,
                },
                {
                  label: "Tipo de Emenda",
                  icon: <Activity size={14} />,
                },
                {
                  label: "Parlamentar",
                  icon: <User size={14} />,
                },
                {
                  label: "Partido",
                  icon: <Landmark size={14} />,
                },
                {
                  label: "Programa",
                  icon: <FileText size={14} />,
                },
                {
                  label: "Código do Programa",
                  icon: <LinkIcon size={14} />,
                },
                {
                  label: "Tipo de Instrumento",
                  icon: <Calendar size={14} />,
                },
                {
                  label: "Nº Proposta",
                  icon: <LinkIcon size={14} />,
                },
                { label: "Valor Previsto", icon: <CreditCard size={14} /> },
                { label: "Objeto", icon: <FileText size={14} /> },
              ].map((col, idx) => (
                <th
                  key={idx}
                  className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border whitespace-nowrap"
                >
                  <div className="flex items-center gap-3 ">
                    <span className="text-primary">{col.icon}</span>
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-primary/[0.03] transition-colors group/row"
              >
                {/* I - Origem */}
                <td className="p-6">
                  <p className="text-sm font-black text-foreground leading-tight uppercase italic">
                    {item.origem}
                  </p>
                </td>

                {/* I - Tipo de Emenda */}
                <td className="p-6 max-w-sm text-xs text-muted-foreground leading-relaxed font-medium">
                  {item.tipo_emenda}
                </td>

                {/* I - Parlamentar */}
                <td className="p-6">
                  <p className="text-sm font-black text-foreground leading-tight uppercase italic">
                    {item.autor}
                  </p>
                </td>

                {/* II - Partido */}
                <td className="p-6">
                  <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {item.partido}
                  </span>
                </td>

                {/* II - Programa */}
                <td className="p-6 max-w-sm text-xs text-muted-foreground leading-relaxed font-medium">
                  {item.programa}
                </td>

                {/* III - Código do Programa */}
                <td className="p-6 max-w-sm text-xs text-muted-foreground leading-relaxed font-medium text-center">
                  {item.codigo_programa}
                </td>

                {/* III - Tipo de Instrumento */}
                <td className="p-6 max-w-sm text-xs text-muted-foreground leading-relaxed font-medium text-center">
                  {item.tipo_instrumento}
                </td>

                {/* IV - Número da Proposta */}
                <td className="p-6 max-w-sm text-xs text-muted-foreground leading-relaxed font-medium text-center">
                  {item.n_proposta}
                </td>

                {/* V - Valor */}
                <td className="p-6 text-center">
                  <p className="text-lg font-black text-primary italic tracking-tighter">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor_previsto)}
                  </p>
                </td>

                {/* IX - Objeto */}
                <td className="p-6 max-w-sm text-xs text-muted-foreground leading-relaxed font-medium">
                  {item.objeto}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-background/40 border-t border-border flex justify-between items-center">
        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
          Mostrando {data.length} registros de emendas parlamentares ativas
        </p>
        <div className="flex gap-1">
          <div className="w-8 h-1 bg-primary" />
          <div className="w-2 h-1 bg-primary/30" />
          <div className="w-2 h-1 bg-primary/30" />
        </div>
      </div>
    </section>
  );
}
