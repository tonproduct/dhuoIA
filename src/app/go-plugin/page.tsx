import Image from "next/image"

export default function GoPluginPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Hero */}
      <div style={{ backgroundColor: "#7c22c0" }} className="px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
            Componente Técnico
          </span>
          <h1 className="text-3xl font-bold text-white mt-2 mb-3">Go Plugin</h1>
          <p className="text-[15px] text-white/70 max-w-2xl leading-relaxed">
            Permite escrever e executar lógica customizada em linguagem Go diretamente dentro de um fluxo de integração.
            Compilado em tempo de implantação, oferece performance nativa, acesso a um conjunto rico de bibliotecas e integração total ao sistema de observabilidade do DHuO.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-10 py-12 flex flex-col gap-14">

        {/* Visão Geral */}
        <section id="visao-geral">
          <H2>Visão Geral</H2>
          <P>
            O Go Plugin é o <em>escape hatch</em> da plataforma — quando nenhum componente pronto resolve, você escreve o seu.
            Casos de uso típicos:
          </P>
          <Ul items={[
            "Transformações de payload complexas que não são cobertas por componentes padrão",
            "Integrações com SDKs de terceiros (AWS, Azure, Google Cloud, Anthropic, OpenAI, etc.)",
            "Regras de negócio customizadas com alta performance",
            "Leitura/escrita em bancos de dados (PostgreSQL, MySQL, MongoDB, Redis, SQLite, MS SQL)",
            "Processamento de mensagens via MQTT, Kafka (sarama) ou AMQP",
            "Uso de templates de configuração via variáveis de ambiente (godotenv)",
          ]} />
        </section>

        <Divider />

        {/* Contrato de Execução */}
        <section id="contrato">
          <H2>Contrato de Execução</H2>
          <P>
            O DHuO carrega o plugin compilado como um <Strong>Go Plugin nativo</Strong> (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">.so</code>) via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">plugin.Open</code> + <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">plugin.Lookup</code>.
            Ele busca uma <Strong>variável exportada</Strong> com o nome do plugin e chama o método <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">Exec</code> a cada execução do fluxo.
          </P>

          <H3 className="mt-6">Assinatura da função principal</H3>
          <CodeBlock>{`func (e *NomeDoPlugin) Exec(
    msgID string,                // ID único da execução (tracing)
    ID    string,                // ID do componente no canvas
    name  string,                // Nome (label) do componente
    confs map[string]string,     // Configurações do componente
    in    map[string]interface{}, // Payload de entrada (componente anterior)
) (map[string]interface{}, error)`}</CodeBlock>

          <H3 className="mt-6">Struct e variável exportada</H3>
          <P>O DHuO carrega o plugin buscando a variável exportada pelo nome definido em <Strong>Nome do Plugin</Strong>.</P>
          <CodeBlock>{`type meuPlugin struct {
    logDev   LogFunc
    logTrace LogFunc
    logDebug LogFunc
    logInfo  LogFunc
    logWarn  LogFunc
    logError LogFunc
    // Campos adicionais persistem entre execuções:
    db       *sql.DB  // ex: connection pool seguro aqui
}

var MeuPlugin meuPlugin  // variável exportada — DHuO faz Lookup por este nome`}</CodeBlock>

          <Note>
            Campos da struct persistem enquanto o plugin estiver carregado. É seguro e recomendado guardar connection pools de banco de dados como campos da struct — eles são inicializados uma vez e reutilizados entre execuções.
          </Note>

          <H3 className="mt-6">Entrada de dados</H3>
          <Table
            headers={["Parâmetro", "Tipo", "Descrição"]}
            rows={[
              ["msgID", "string", "Identificador único da execução. Use nos logs para rastreabilidade end-to-end."],
              ["ID", "string", "ID do componente no canvas."],
              ["name", "string", "Nome (label) do componente — o mesmo exibido no canvas."],
              ["confs", "map[string]string", "Configurações estáticas do componente. Fonte exata (canvas vs. workspace) a confirmar."],
              ["in", "map[string]interface{}", "Payload desmarshallado do componente anterior. É o contexto principal de execução."],
            ]}
          />

          <Note className="mt-4">
            O template menciona também <code className="bg-purple-50 px-1 rounded">inJSON</code> como forma de acessar o payload já parseado. Como exatamente ele chega (segundo parâmetro? campo do mapa?) ainda precisa de confirmação.
          </Note>

          <H3 className="mt-6">Saída e tratamento de erro</H3>
          <CodeBlock>{`// Retorno normal — passa dados para o próximo componente
return map[string]interface{}{
    "campo": valor,
}, nil

// Interrompe o fluxo com erro
return nil, errors.New("mensagem descritiva do erro")`}</CodeBlock>

          <P>
            O <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">map[string]interface{}</code> retornado é o payload que chega no parâmetro <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">in</code> do próximo componente. Não há tipo especial de erro — <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">errors.New()</code> ou <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">fmt.Errorf()</code> são suficientes.
          </P>
        </section>

        <Divider />

        {/* FAQ */}
        <section id="faq">
          <H2>Perguntas & Respostas</H2>
          <P>Questões técnicas levantadas durante o estudo do componente — respondidas pelo template e confirmadas pelo time.</P>

          <div className="flex flex-col gap-0 mt-6 border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {[
              {
                q: "Como eu acesso o payload que chega no componente?",
                a: "Via o parâmetro in map[string]interface{} da função Exec. É o JSON do componente anterior já desmarshallado. O template menciona também inJSON para acesso ao payload parseado — forma exata a confirmar.",
                status: "partial",
              },
              {
                q: "Qual é a assinatura da função principal que o DHuO espera?",
                a: `func (e *NomeDoPlugin) Exec(msgID string, ID string, name string, confs map[string]string, in map[string]interface{}) (map[string]interface{}, error)`,
                code: true,
                status: "confirmed",
              },
              {
                q: "Como eu retorno dados para o próximo componente do fluxo?",
                a: "Retornando um map[string]interface{} como primeiro valor da função Exec. O que estiver nesse mapa é o que chega no parâmetro in do próximo componente.",
                status: "confirmed",
              },
              {
                q: "Como retornar um erro para interromper o fluxo?",
                a: 'return nil, errors.New("mensagem") — não há tipo especial de erro do DHuO. fmt.Errorf() também funciona.',
                code: true,
                status: "confirmed",
              },
              {
                q: "Como acessar variáveis de ambiente ou segredos do workspace?",
                a: "O parâmetro confs map[string]string traz configurações do componente. Se variáveis de ambiente do workspace chegam via confs ou via os.Getenv() precisa de confirmação. godotenv está disponível no go.mod.",
                status: "partial",
              },
              {
                q: "O componente é stateless entre execuções?",
                a: "Não. Campos da struct persistem enquanto o plugin estiver carregado. É seguro e recomendado guardar connection pools (ex: *sql.DB) como campos da struct — inicializados uma vez, reutilizados entre execuções.",
                status: "confirmed",
              },
              {
                q: "Existe uma função de inicialização separada da execução?",
                a: "O Go nativo tem init() que roda uma vez no startup — funciona para abrir conexões. O DHuO injeta os loggers via SetLogger() na inicialização do plugin. Não há evidência de hook proprietário adicional.",
                status: "confirmed",
              },
              {
                q: "Posso usar variáveis globais para connection pools?",
                a: "Sim, mas a forma recomendada é usar campos da struct (receptor do método Exec). Eles cumprem o mesmo papel com escopo mais seguro.",
                status: "confirmed",
              },
              {
                q: "O botão Validar Código faz só análise estática ou compila de verdade?",
                a: "Compila de verdade. O painel Output abre com o resultado da compilação real no backend do DHuO. Toast de sucesso confirma que o código passou pela compilação sem erros.",
                status: "confirmed",
              },
              {
                q: "Se eu precisar de uma biblioteca que não está no go.mod padrão, o que faço?",
                a: "Processo de solicitação de inclusão e SLA precisam ser confirmados com o time DHuO. Dependências externas não homologadas causam falha em build.",
                status: "gap",
              },
              {
                q: "Posso criar múltiplos arquivos .go no mesmo plugin?",
                a: "A interface mostra um único editor. O DHuO menciona exportação em .zip via Trigger HTTP, o que sugere que múltiplos arquivos podem ser suportados fora do editor inline. Precisa de confirmação.",
                status: "gap",
              },
              {
                q: "Os arquivos vinculados em qual path ficam disponíveis em runtime?",
                a: "Não confirmado. Em plataformas similares o padrão é /app/files/<nome> ou relativo ao working directory. Precisa de confirmação antes de usar os.Open().",
                status: "gap",
              },
              {
                q: "Os logs aparecem em qual tela do DHuO?",
                a: "Provavelmente no monitor de execução do canvas ou painel de observabilidade. O fato de subWF e msgID estarem na assinatura indica filtro por esses campos em alguma tela. Localização exata a confirmar.",
                status: "gap",
              },
              {
                q: "O timeout de execução é configurável?",
                a: "Não há campo de timeout visível na aba Dados do Componente. Pode ser configurado no nível do pipeline ou fixo por tier de conta. Precisa de confirmação.",
                status: "gap",
              },
            ].map(({ q, a, code, status }, i) => (
              <div key={i} className="px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[13px] font-semibold text-gray-900 leading-snug flex-1">{q}</p>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                    status === "confirmed" ? "bg-green-50 text-green-600 border border-green-200" :
                    status === "partial"   ? "bg-yellow-50 text-yellow-600 border border-yellow-200" :
                                            "bg-red-50 text-red-400 border border-red-200"
                  }`}>
                    {status === "confirmed" ? "confirmado" : status === "partial" ? "parcial" : "pendente"}
                  </span>
                </div>
                {code ? (
                  <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 px-4 py-3 text-[12px] leading-relaxed overflow-x-auto">
                    <code>{a}</code>
                  </pre>
                ) : (
                  <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">{a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Gaps pendentes */}
        <section id="gaps">
          <H2>Pontos Pendentes de Confirmação</H2>
          <P>As informações abaixo ainda não foram confirmadas pela documentação oficial ou pelo template. Devem ser validadas com o time DHuO antes de uso em produção.</P>
          <Table
            className="mt-4"
            headers={["Ponto", "O que precisa ser confirmado"]}
            rows={[
              ["inJSON", "Como exatamente o payload parseado chega — segundo parâmetro, campo do mapa, ou []byte?"],
              ["confs", "Fonte das configurações — são do canvas (campos do drawer), do workspace ou variáveis de ambiente?"],
              ["Arquivos em runtime", "Path onde os arquivos vinculados ficam disponíveis — como fazer os.Open()?"],
              ["Logs na UI", "Em qual tela do DHuO os logs emitidos via logInfo, logError etc. aparecem?"],
              ["Timeout", "O timeout de execução é configurável por componente ou fixo pela plataforma?"],
              ["Múltiplos arquivos .go", "O editor suporta múltiplos arquivos ou tudo precisa estar em um único arquivo?"],
            ]}
          />
        </section>

        <Divider />

        {/* Como adicionar */}
        <section id="adicionar">
          <H2>Como Adicionar o Go Plugin ao Canvas</H2>
          <P>
            No painel lateral direito do Canvas, na seção <Strong>Técnicos</Strong>, arraste o item <Strong>Go Plugin</Strong> para a área de trabalho.
            Isso abrirá automaticamente o drawer de configuração.
          </P>
        </section>

        <Divider />

        {/* Drawer */}
        <section id="drawer">
          <H2>Drawer de Configuração</H2>
          <P>O drawer é dividido em 4 abas acessíveis pelo menu lateral direito dentro do próprio painel:</P>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Dados do Componente", "Código Go", "go.mod", "Arquivos"].map((tab, i) => (
              <span key={tab} className="flex items-center gap-2">
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-full border" style={{ color: "#7c22c0", borderColor: "#e9d5ff", backgroundColor: "#faf5ff" }}>
                  {tab}
                </span>
                {i < 3 && <span className="text-gray-300 text-sm">·</span>}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* Aba 1 */}
        <section id="dados">
          <TabBadge>Aba 1</TabBadge>
          <H2 className="mt-2">Dados do Componente</H2>
          <P>Metainformações que identificam e categorizam o componente dentro do fluxo.</P>

          <Screenshot src="/go-plugin/01-dados.png" alt="Aba Dados do Componente" />

          <div className="flex flex-col gap-6 mt-6">
            <Field
              name="ID do Componente"
              required
              description="Identificador único gerado automaticamente pelo DHuO. Pode ser copiado via o ícone ao lado. Utilizado internamente para referenciar o componente em conexões e logs."
            />
            <Field
              name="Nome"
              description="Nome descritivo para identificação visual no canvas. Sem restrição de caracteres — serve apenas como label de exibição."
            />
            <Field
              name="Nome do Plugin"
              required
              description="Nome técnico do plugin Go compilado. Identificador usado pelo runtime do DHuO ao registrar o plugin."
            >
              <div className="mt-2 rounded-md bg-gray-50 border border-gray-200 px-4 py-3 text-[12px] text-gray-600">
                Regras: deve iniciar com letra · caracteres permitidos: <code className="bg-white border border-gray-200 px-1 rounded">a-z, A-Z, 0-9, _</code> · sem espaços<br />
                Exemplos válidos: <code className="bg-white border border-gray-200 px-1 rounded">processador_pedidos</code>, <code className="bg-white border border-gray-200 px-1 rounded">TransformaPayload</code>, <code className="bg-white border border-gray-200 px-1 rounded">validador_cpf_v2</code>
              </div>
            </Field>
            <Field
              name="Tipo do Plugin"
              required
              description="Define o papel do componente dentro do fluxo de execução."
            >
              <Table
                headers={["Valor", "Descrição"]}
                rows={[
                  ["Componente de Execução", "O plugin executa lógica de negócio quando acionado dentro do fluxo. Tipo padrão para processamento de dados, transformações e chamadas a serviços externos."],
                ]}
              />
              <Note>Para exportar o código gerado em formato .zip, o componente do tipo Componente de Execução deve estar conectado a um Trigger HTTP.</Note>
            </Field>
          </div>
        </section>

        <Divider />

        {/* Aba 2 */}
        <section id="codigo">
          <TabBadge>Aba 2</TabBadge>
          <H2 className="mt-2">Código Go</H2>
          <P>
            Editor de código principal com dois painéis: o editor Monaco à esquerda e o painel Output à direita (exibido após validação).
          </P>

          <Screenshot src="/go-plugin/02-codigo-vazio.png" alt="Editor de código Go vazio" caption="Estado inicial — editor vazio, Validar Código desabilitado" />
          <Screenshot src="/go-plugin/03-codigo-preenchido.png" alt="Editor com código Go preenchido" caption="Após Gerar Template — Validar Código ativo" />
          <Screenshot src="/go-plugin/04-validado.png" alt="Após validação com sucesso" caption="Após validação — Output exibido, botões Cancelar e Adicionar disponíveis" />

          <div className="flex flex-col gap-6 mt-6">
            <Field name="Gerar Template" description="Preenche o editor com o boilerplate padrão do DHuO, incluindo toda a estrutura de logging. Recomendado como ponto de partida para qualquer novo plugin." />
            <Field name="Validar Código" description="Compila o código contra o ambiente Go do DHuO e exibe erros ou sucesso no painel Output. Deve ser executado antes de salvar." />
          </div>

          <H3 className="mt-8">Estrutura do Template Padrão</H3>

          <H4>1. Declaração de pacote e imports mínimos</H4>
          <CodeBlock>{`package main

import (
    "fmt"
)`}</CodeBlock>

          <H4 className="mt-6">2. Bloco de Log Functions (DHuO Standard)</H4>
          <P>Adicionado entre os comentários <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">// ===BEGIN DHuO Log functions===</code>. Pode ser removido se não precisar de logging.</P>

          <div className="flex flex-col gap-4 mt-4">
            <Field name="LogFunc" description="Tipo que representa uma função de log no padrão DHuO. Recebe subWF (identificador do sub-workflow), msgID (identificador único da execução) e s (mensagem de log)." />
            <Field name="safeLog" description="Função auxiliar que evita panic quando o logger for nil. Deve ser usada no lugar de chamadas diretas ao LogFunc." />
            <Field name="SetLogger" description="Recebe os injetores de log do DHuO nos níveis: logDev, logTrace, logDebug, logInfo, logWarn, logError. O DHuO chama essa função automaticamente na inicialização do plugin." />
          </div>

          <Table
            className="mt-6"
            headers={["Nível", "Finalidade"]}
            rows={[
              ["logDev", "Mensagens de desenvolvimento (visíveis apenas em ambiente de dev)"],
              ["logTrace", "Rastreamento detalhado de execução"],
              ["logDebug", "Informações de depuração"],
              ["logInfo", "Eventos informativos do fluxo normal"],
              ["logWarn", "Alertas que não interrompem o fluxo"],
              ["logError", "Erros que afetam o processamento"],
            ]}
          />

          <Note className="mt-4">
            Nunca chame <code className="bg-purple-50 px-1 rounded">LogFunc</code> diretamente. Sempre use <code className="bg-purple-50 px-1 rounded">safeLog(loggerFunc, subWF, msgID, &quot;mensagem&quot;)</code> para evitar panics quando o logger não for injetado.
          </Note>
        </section>

        <Divider />

        {/* Aba 3 */}
        <section id="gomod">
          <TabBadge>Aba 3</TabBadge>
          <H2 className="mt-2">go.mod</H2>
          <P>Gerencia as dependências Go do plugin. Editor editável à esquerda e go.mod Padrão da plataforma à direita.</P>

          <Screenshot src="/go-plugin/05-gomod-vazio.png" alt="Aba go.mod vazia" caption="Estado inicial — editor vazio" />
          <Screenshot src="/go-plugin/06-gomod-padrao.png" alt="go.mod padrão exibido" caption="Após clicar em Ver go.mod Padrão" />

          <P className="mt-4">
            <Strong>Ver go.mod Padrão</Strong> — exibe o go.mod base da plataforma com todas as dependências pré-aprovadas. Possui botão Copiar. Versão Go base: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">1.24.3</code>
          </P>

          <H3 className="mt-8">Dependências Disponíveis</H3>

          {[
            {
              group: "Cloud & Infraestrutura",
              items: [
                "cloud.google.com/go/bigtable v1.37.0",
                "cloud.google.com/go/pubsub v1.47.0",
                "cloud.google.com/go/storage v1.50.0",
                "github.com/Azure/azure-sdk-for-go/sdk/azidentity v1.7.x",
                "github.com/aws/aws-sdk-go v1.55.7",
                "gitlab.engdb.com.br/dhuo-plat/gotools/g-onedrive v1.0.x (internal)",
              ],
            },
            {
              group: "Banco de Dados",
              items: [
                "github.com/lib/pq v1.10.9 — PostgreSQL",
                "github.com/go-sql-driver/mysql v1.9.2 — MySQL",
                "github.com/glebarez/go-sqlite v1.22.0 — SQLite",
                "github.com/denisenkom/go-mssqldb v0.12.3 — MS SQL Server",
                "github.com/SAP/go-hdb v1.13.6 — SAP HANA",
                "github.com/go-redis/redis/v7 v7.4.1 — Redis",
                "github.com/jmoiron/sqlx v1.4.0 — Query builder SQL",
                "github.com/godror/godror v0.40.3 — Oracle DB",
                "github.com/DATA-DOG/go-sqlmock v1.5.2 — Mock SQL para testes",
                "github.com/gopcua/opcua v0.8.0 — OPC-UA (IoT/SCADA)",
              ],
            },
            {
              group: "Mensageria & Protocolos",
              items: [
                "github.com/IBM/sarama v1.45.1 — Apache Kafka",
                "github.com/eclipse/paho.mqtt.golang v1.5.0 — MQTT",
                "github.com/streadway/amqp v1.1.0 — AMQP/RabbitMQ",
              ],
            },
            {
              group: "AI & LLMs",
              items: [
                "github.com/anthropics/anthropic-sdk-go v1.13.0 — Anthropic Claude API",
                "github.com/openai/openai-go/v2 v2.7.1 — OpenAI API",
                "github.com/modelcontextprotocol/go-sdk v1.4.0 — MCP (Model Context Protocol)",
              ],
            },
            {
              group: "HTTP & Web",
              items: [
                "github.com/gofiber/fiber/v2 v2.52.8 — HTTP framework",
                "github.com/valyala/fasthttp v1.51.0 — HTTP client/server de alta performance",
              ],
            },
            {
              group: "Utilitários & Parsing",
              items: [
                "github.com/Masterminds/sprig/v3 v3.3.0 — Funções de template",
                "github.com/PaesslerAG/gval v1.2.4 — Avaliação de expressões",
                "github.com/clbanning/mxj/v2 v2.7.0 — Manipulação de XML/JSON",
                "github.com/xeipuuv/gojsonschema v1.2.0 — Validação de JSON Schema",
                "github.com/wamuir/go-xslt v0.1.4 — Transformações XSLT",
                "github.com/joho/godotenv v1.5.1 — Variáveis de ambiente via .env",
                "github.com/google/uuid v1.6.0 — Geração de UUIDs",
                "github.com/golang/protobuf v1.5.4 — Protocol Buffers",
                "github.com/patrickmn/go-cache v2.1.0 — Cache em memória",
                "github.com/robfig/cron/v3 v3.0.1 — Agendamento de tarefas",
                "github.com/stretchr/testify v1.10.0 — Framework de testes",
              ],
            },
          ].map(({ group, items }) => (
            <div key={group} className="mt-5">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">{group}</p>
              <ul className="flex flex-col gap-1.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-gray-300" />
                    <code className="text-[12px] text-gray-700">{item}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Note className="mt-6">
            Somente as dependências listadas no go.mod Padrão estão disponíveis no ambiente de compilação do DHuO. Qualquer dependência externa não listada resultará em erro de compilação.
          </Note>
        </section>

        <Divider />

        {/* Aba 4 */}
        <section id="arquivos">
          <TabBadge>Aba 4</TabBadge>
          <H2 className="mt-2">Arquivos</H2>
          <P>
            Permite associar arquivos externos ao plugin. Ficam disponíveis em tempo de execução para leitura pelo código.
            Os arquivos devem ser cadastrados previamente em <Strong>Configurações → Arquivos da Organização</Strong>.
          </P>

          <Screenshot src="/go-plugin/07-arquivos.png" alt="Aba Arquivos" />

          <Field
            name="Arquivos"
            description="Seletor múltiplo (multi-select com tags). Cada arquivo selecionado aparece como uma tag removível. Para remover, clique no × ao lado do nome."
            className="mt-4"
          />
          <P className="mt-3">
            Caso de uso: carregar arquivos de configuração (.json, .yaml, .pem, certificados TLS, templates, schemas) que o código Go acessa via sistema de arquivos em runtime.
          </P>
        </section>

        <Divider />

        {/* Ações */}
        <section id="acoes">
          <H2>Ações do Drawer</H2>
          <Table
            headers={["Botão", "Localização", "Comportamento"]}
            rows={[
              ["Cancelar", "Rodapé", "Descarta todas as alterações e fecha o drawer sem salvar"],
              ["Adicionar", "Rodapé", "Valida os campos obrigatórios e adiciona/salva o componente no canvas"],
              ["? (Ajuda)", "Cabeçalho", "Exibe o painel contextual com instruções de uso do componente"],
              ["✕ (Fechar)", "Cabeçalho", "Fecha o drawer (equivalente a Cancelar)"],
            ]}
          />
        </section>

        <Divider />

        {/* Fluxo completo */}
        <section id="fluxo">
          <H2>Fluxo Completo: Criando um Go Plugin do Zero</H2>
          <div className="flex flex-col gap-6 mt-4">
            {[
              {
                step: "1",
                title: "Adicionar ao Canvas",
                body: "No painel lateral de componentes, na categoria Técnicos, clique ou arraste o Go Plugin para o canvas.",
              },
              {
                step: "2",
                title: "Preencher os Dados do Componente",
                body: "Preencha obrigatoriamente: ID do Componente, Nome do Plugin (a-z, A-Z, 0-9, _ começando com letra) e Tipo do Plugin (Componente de Execução). Nome é opcional.",
              },
              {
                step: "3",
                title: "Escrever o Código Go",
                body: 'Acesse a aba Código Go. Clique em "Gerar Template" para obter o boilerplate com as funções de log já configuradas. Implemente sua lógica utilizando os loggers injetados via SetLogger.',
              },
              {
                step: "4",
                title: "Validar o Código",
                body: 'Clique em "Validar Código". Verifique o painel Output à direita. Corrija eventuais erros de compilação antes de prosseguir.',
              },
              {
                step: "5",
                title: "Configurar Dependências (se necessário)",
                body: 'Acesse a aba go.mod. Clique em "Ver go.mod Padrão" para consultar as bibliotecas disponíveis. Adicione no painel esquerdo apenas as dependências que o plugin efetivamente utiliza, respeitando nomes e versões exatos do padrão.',
              },
              {
                step: "6",
                title: "Vincular Arquivos (se necessário)",
                body: "Acesse a aba Arquivos. Selecione os arquivos cadastrados na organização que seu código precisará acessar em runtime.",
              },
              {
                step: "7",
                title: "Salvar o Componente",
                body: 'Clique em "Adicionar" no rodapé. O componente aparecerá no canvas pronto para ser conectado ao fluxo.',
              },
              {
                step: "8",
                title: "Conectar ao Fluxo",
                body: "Conecte o Go Plugin ao Trigger HTTP (ou ao componente antecessor no fluxo). Para exportar o código em .zip, o componente deve estar conectado a um Trigger HTTP.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
                  style={{ backgroundColor: "#7c22c0" }}
                >
                  {step}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">{title}</p>
                  <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Boas práticas */}
        <section id="boas-praticas">
          <H2>Boas Práticas</H2>
          <Ul items={[
            "Use sempre safeLog em vez de chamar LogFunc diretamente — o logger pode ser nil em determinados contextos de execução.",
            "Mantenha o go.mod do plugin enxuto, declarando apenas as dependências que o código realmente importa — dependências não utilizadas aumentam o tempo de compilação sem benefício.",
            "Antes de usar uma biblioteca de terceiros, confirme se ela está listada no go.mod Padrão — dependências externas não homologadas causarão falha em build.",
            "Utilize os níveis de log de forma semântica: logDev e logTrace são filtrados em produção, então prefira logInfo para eventos operacionais relevantes.",
            "Nomeie o plugin com um identificador que reflita sua função (validar_nfe, enriquecer_cliente, chamar_api_legado) — facilita a rastreabilidade nos logs do DHuO.",
          ]} />
        </section>

      </div>
    </div>
  )
}

// ─── Design components ────────────────────────────────────────────────────────

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[20px] font-bold text-gray-900 ${className}`}>
      {children}
    </h2>
  )
}

function H3({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-[16px] font-bold text-gray-800 ${className}`}>
      {children}
    </h3>
  )
}

function H4({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={`text-[13px] font-semibold text-gray-700 ${className}`}>
      {children}
    </h4>
  )
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[14px] text-gray-500 leading-relaxed mt-3 ${className}`}>
      {children}
    </p>
  )
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-gray-700">{children}</strong>
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 mt-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c22c0" }} />
          <span className="text-[13px] text-gray-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Divider() {
  return <div className="border-t border-gray-100" />
}

function TabBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
      style={{ color: "#7c22c0", borderColor: "#e9d5ff", backgroundColor: "#faf5ff" }}
    >
      {children}
    </span>
  )
}

function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-[13px] leading-relaxed mt-4 ${className}`}
      style={{ backgroundColor: "#faf5ff", borderLeft: "3px solid #7c22c0", color: "#6b21a8" }}
    >
      {children}
    </div>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 px-5 py-4 text-[12px] leading-relaxed overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}

function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="mt-5">
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <Image src={src} alt={alt} width={1200} height={700} className="w-full h-auto block" />
      </div>
      {caption && (
        <p className="text-[11px] text-gray-400 mt-1.5 text-center">{caption}</p>
      )}
    </div>
  )
}

function Field({
  name, required, description, children, className = "",
}: {
  name: string; required?: boolean; description: string; children?: React.ReactNode; className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-gray-800">{name}</span>
        {required && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-500 border border-red-100">
            Obrigatório
          </span>
        )}
      </div>
      <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{description}</p>
      {children}
    </div>
  )
}

function Table({
  headers, rows, className = "",
}: {
  headers: string[]; rows: string[][]; className?: string
}) {
  return (
    <div className={`mt-3 rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-mono text-gray-800" : "text-gray-500"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
