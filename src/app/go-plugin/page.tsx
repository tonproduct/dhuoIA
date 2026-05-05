import Image from "next/image"

type Section = {
  id: string
  tab: string
  title: string
  description: string
  bullets: string[]
  image: string
  imageAlt: string
  note?: string
}

const sections: Section[] = [
  {
    id: "dados",
    tab: "Dados do Componente",
    title: "1. Dados do Componente",
    description:
      "Primeira aba. Define os metadados obrigatórios antes de qualquer código. Esses campos identificam o plugin dentro do runtime da plataforma.",
    bullets: [
      "ID do Componente — identificador único. Botão de copy ao lado para facilitar referências em outros pipelines.",
      "Nome — nome legível exibido no canvas de integração.",
      'Nome do Plugin — nome técnico Go. Regra: a-z, A-Z, 0-9, _ sem espaço, iniciando com letra. Vira o identificador real no runtime.',
      "Tipo do Plugin — dropdown que define o ponto de extensão do componente (transformer, connector, etc.).",
    ],
    image: "/go-plugin/01-dados.png",
    imageAlt: "Aba Dados do Componente",
  },
  {
    id: "codigo-vazio",
    tab: "Código Go — estado inicial",
    title: "2. Código Go — estado inicial",
    description:
      'O editor aparece vazio. O botão "Gerar Template" popula o editor com o scaffold padrão do DHuO, incluindo toda a infraestrutura de logging da plataforma.',
    bullets: [
      '"Gerar Template" — gera o boilerplate com package main, LogFunc, safeLog e SetLogger já configurados.',
      '"Validar Código" — desabilitado enquanto o editor estiver vazio.',
    ],
    image: "/go-plugin/02-codigo-vazio.png",
    imageAlt: "Editor de código Go vazio",
  },
  {
    id: "codigo-preenchido",
    tab: "Código Go — com conteúdo",
    title: "3. Código Go — com conteúdo",
    description:
      "Com o template gerado (ou código próprio inserido), o editor exibe o código com syntax highlight. O botão Validar Código fica ativo.",
    bullets: [
      "LogFunc — tipo que representa uma função de log com assinatura (subWF, msgID string, s string). Mantém rastreabilidade por subworkflow e messageID.",
      "safeLog() — wrapper que previne panic se o logger for nil. Defensivo por padrão.",
      "SetLogger() — a plataforma injeta logDev, logTrace, logDebug, logInfo, logWarn, logError em runtime. O componente não loga diretamente — ele recebe o logger como dependência (injeção de dependência).",
    ],
    image: "/go-plugin/03-codigo-preenchido.png",
    imageAlt: "Editor com código Go preenchido",
    note:
      "Arquitetura de logging: o DHuO injeta as funções de log via SetLogger. Isso garante que todos os logs carregam subWF e messageID — rastreabilidade end-to-end sem esforço do desenvolvedor.",
  },
  {
    id: "validado",
    tab: "Código Go — após validação",
    title: "4. Validação do Código",
    description:
      'Ao clicar em "Validar Código", a plataforma compila o código e exibe o resultado. Com sucesso, o fluxo de adição ao pipeline é liberado.',
    bullets: [
      "Painel Output abre ao lado do editor com o resultado da compilação.",
      'Toast "Código validado com sucesso" confirma que o código compila sem erros.',
      'Botões Cancelar e Adicionar aparecem no rodapé — o "Adicionar" só fica disponível após validação bem-sucedida.',
    ],
    image: "/go-plugin/04-validado.png",
    imageAlt: "Tela após validação com sucesso",
  },
  {
    id: "gomod-vazio",
    tab: "go.mod — estado inicial",
    title: "5. go.mod — gerenciamento de dependências",
    description:
      'Editor para o arquivo go.mod do plugin. O botão "Ver go.mod Padrão" exibe as dependências já disponíveis no runtime da plataforma — sem precisar declarar nada extra.',
    bullets: [
      '"Ver go.mod Padrão" — abre painel lateral com o go.mod base da plataforma.',
      "Se o plugin precisar de uma lib já presente no padrão, não precisa declarar — ela já está disponível.",
      "Só é necessário preencher o go.mod se o plugin usar dependências externas ao padrão.",
    ],
    image: "/go-plugin/05-gomod-vazio.png",
    imageAlt: "Aba go.mod vazia",
  },
  {
    id: "gomod-padrao",
    tab: "go.mod — padrão da plataforma",
    title: "6. go.mod Padrão — ecossistema disponível",
    description:
      "O go.mod padrão revela tudo que está disponível no runtime sem declaração adicional. Biblioteca impressionante — cobre praticamente todos os conectores do DHuO.",
    bullets: [
      "GCP: Bigtable v1.37, Pub/Sub v1.47, Storage v1.50",
      "Azure: SDK azidentity v1.7, ADLS2 v1.0",
      "AWS: aws-sdk-go v1.55",
      "Mensageria: Kafka (IBM/sarama v1.45), MQTT (paho v1.5)",
      "Banco de dados: PostgreSQL, SQL Server (go-mssqldb), SQLite, Redis v7",
      "SAP: go-hdb v1.13",
      "IA: anthropic-sdk-go v1.13 — Claude disponível nativamente",
      "Utilitários: sprig/v3 (templates), gval (expressions), orderedmap, mxj (XML/JSON)",
      'Módulo base: gitlab.engdb.com.br/dhuo-plat/integra/integraone/gone/pipeline — confirma runtime "gone" (Go + DHuO)',
    ],
    image: "/go-plugin/06-gomod-padrao.png",
    imageAlt: "go.mod padrão da plataforma exibido",
    note:
      "O anthropic-sdk-go já está disponível. É possível chamar o Claude diretamente de um Go Plugin sem configuração adicional de dependência.",
  },
  {
    id: "arquivos",
    tab: "Arquivos",
    title: "7. Arquivos — injeção de configuração",
    description:
      "Permite anexar arquivos de configuração ao componente sem hardcodar no código. Os arquivos precisam ser pré-cadastrados nas configurações da Organização.",
    bullets: [
      "Útil para injetar certificados TLS, chaves de API, arquivos de configuração externos.",
      "Os arquivos aparecem como tags selecionáveis no campo.",
      "Pré-requisito: o arquivo deve existir em Configurações → Arquivos da Organização antes de aparecer aqui.",
    ],
    image: "/go-plugin/07-arquivos.png",
    imageAlt: "Aba Arquivos com seleção de arquivo",
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  "GCP": "bg-blue-50 text-blue-700",
  "Azure": "bg-sky-50 text-sky-700",
  "AWS": "bg-orange-50 text-orange-700",
  "Mensageria": "bg-yellow-50 text-yellow-700",
  "BD": "bg-green-50 text-green-700",
  "IA": "bg-purple-50 text-purple-700",
}

export default function GoPluginPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Noto Sans, sans-serif" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#7c22c0" }} className="px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
              Componente Técnico
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Go Plugin</h1>
          <p className="text-[15px] text-white/70 max-w-2xl leading-relaxed">
            Permite escrever lógica customizada em Go nativo e plugá-la diretamente em um pipeline de integração DHuO.
            É o escape hatch da plataforma — quando nenhum componente pronto resolve, você escreve o seu.
          </p>
        </div>
      </div>

      {/* Flow */}
      <div className="border-b border-gray-100 bg-gray-50 px-10 py-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Fluxo de uso</p>
          <div className="flex items-center gap-2 flex-wrap">
            {["Dados", "Código Go", "Validar", "go.mod", "Arquivos", "Adicionar ao canvas"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-gray-300 text-sm">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-10 py-12">
        <div className="flex flex-col gap-16">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="flex flex-col gap-5">
              {/* Tab badge */}
              <div>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                  style={{ color: "#7c22c0", borderColor: "#e9d5ff", backgroundColor: "#faf5ff" }}
                >
                  {section.tab}
                </span>
              </div>

              <h2 className="text-[20px] font-bold text-gray-900 -mt-1">{section.title}</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">{section.description}</p>

              {/* Screenshot */}
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  width={1200}
                  height={700}
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2.5">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#7c22c0" }}
                    />
                    <span className="text-[13px] text-gray-600 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Note */}
              {section.note && (
                <div
                  className="rounded-lg px-4 py-3 text-[13px] leading-relaxed"
                  style={{ backgroundColor: "#faf5ff", borderLeft: "3px solid #7c22c0", color: "#6b21a8" }}
                >
                  <span className="font-semibold">NEXUS:</span> {section.note}
                </div>
              )}

              <div className="border-b border-gray-100" />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 rounded-xl bg-gray-50 border border-gray-200 px-6 py-5">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Arquitetura resumida</p>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            O Go Plugin roda dentro do runtime <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">gone</code> (módulo{" "}
            <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">integraone/gone/pipeline</code>).
            A plataforma injeta loggers, variáveis e arquivos em runtime — o código Go não depende de nada externo além do que o DHuO fornece.
            O <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">anthropic-sdk-go</code> já faz parte do go.mod padrão,
            permitindo chamar o Claude diretamente de qualquer plugin sem configuração adicional.
          </p>
        </div>
      </div>
    </div>
  )
}
