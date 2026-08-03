# Memória do projeto — D&J INSTATEC

Última atualização: 2026-08-02

Este documento registra o estado conhecido do site, sua arquitetura, as decisões tomadas e os próximos cuidados. Ele serve como memória de manutenção para futuras alterações.

## 1. Identidade e objetivo

A D&J INSTATEC atua com Engenharia Elétrica, Eletrônica e Automação em São Paulo e Grande SP.

O objetivo principal do site é transformar visitas em contatos pelo WhatsApp. A campanha atual do Google Ads é voltada principalmente para serviços elétricos.

Informações públicas usadas no site:

- Empresa: D&J INSTATEC — Engenharia Elétrica e Automação
- Atendimento: São Paulo/SP e Grande SP
- WhatsApp e e-mail: mantidos nos arquivos HTML
- Serviços: instalação, manutenção, automação, CFTV, iluminação, energia solar, alarmes, projetos, interfone, controle de acesso e trabalho em altura

Não registrar neste documento público dados privados da conta do Google Ads, como e-mail de acesso, identificadores da conta, saldo ou credenciais.

## 2. Arquitetura do site

O site é estático e hospedado no GitHub Pages, com domínio personalizado configurado no arquivo `CNAME`.

Arquivos principais:

- `index.html`: página inicial, hero, carrossel, sintomas elétricos, estatísticas, serviços, diferenciais, apresentação profissional, portfólio, depoimentos e contato.
- `servicos/<slug>.html`: páginas individuais dos serviços, com conteúdo específico, canonical, Open Graph, dados estruturados e FAQ quando aplicável.
- `servico.html`: template antigo/compatibilidade para URLs anteriores com parâmetro `?s=`.
- `js/main.js`: menu, animações, contadores, galeria, carrossel, navegação dos cards, formulário, rastreamento de contatos e conversão.
- `js/servicos-data.js`: base de textos utilizada pelo template antigo.
- `js/servico.js`: preenchimento dinâmico do template antigo.
- `css/style.css`: tema visual, responsividade, cards, galeria, FAQ, seção profissional e páginas de serviço.
- `images/servicos/`: fotos específicas por serviço.
- `images/processo/`: fotos reais usadas na galeria curada de processos.
- `sitemap.xml`: página inicial e páginas individuais.
- `robots.txt`: permite indexação e aponta para o sitemap.

## 3. Carrossel da página inicial

O carrossel apresenta:

- Um card principal central;
- Dois cards semitransparentes de cada lado;
- Espaçamento amplo entre cards;
- Instalação Elétrica como primeiro card principal;
- Navegação por clique e autoplay;
- Cards ocultos carregados sob demanda para reduzir carregamento inicial.

O card central e os cards laterais são controlados em `js/main.js`. A distância entre eles é calculada pela função `step()`.

## 4. Cards e páginas de serviço

Os cards da seção de serviços:

- exibem uma foto real do respectivo serviço;
- não dependem apenas de ícones pequenos;
- são clicáveis em toda a área;
- apontam para `servicos/<slug>.html`;
- mantêm o botão/link de detalhes.

Ao criar um novo serviço, é necessário atualizar:

1. O card em `index.html`;
2. A página em `servicos/`;
3. O sitemap;
4. A lista de dados em `js/servicos-data.js`, se o template antigo continuar sendo usado;
5. As fotos da pasta correspondente.

## 5. Conteúdo de confiança

A página apresenta:

- 15 anos de experiência e empresa aberta;
- formação técnica em Eletrônica e Eletrotécnica;
- Mecânica Geral;
- Automação residencial e predial;
- Comandos Elétricos;
- Montagem de Computadores;
- NR-10 e NR-33;
- Fibra Óptica;
- Painel Solar;
- Padrão de Entrada Residencial;
- Engenharia Elétrica em andamento, no 7º módulo;
- garantia de 6 meses;
- fotos reais de processos;
- depoimentos existentes no projeto.

A seção profissional está em `index.html`, depois dos diferenciais e antes do portfólio.

Não inventar nomes, fotos, avaliações ou certificações que não tenham sido fornecidos ou comprovados.

## 6. Galeria de processos

A galeria usa uma seleção curada das fotos reais existentes:

- `7.jpg`: resultado final;
- `8.jpg`: acabamento;
- `6.jpg`: detalhe em LED;
- `5.jpg`: instalação;
- `2.jpg`: infraestrutura.

A ordem e as legendas estão em `js/main.js`. As fotos menos favoráveis foram retiradas da apresentação principal.

## 7. Rastreamento do Google Ads

A tag geral do Google Ads está instalada no `<head>` das páginas:

- ID geral: `AW-967355608`

A conversão de contato está ligada a:

- cliques no WhatsApp;
- envio do formulário;
- cliques no telefone.

O `js/main.js` também identifica acessos com `gclid` e parâmetros UTM do Google Ads e informa a origem na mensagem do WhatsApp.

A conversão deve ser validada no Tag Assistant usando o domínio publicado. Não adicionar uma segunda tag geral nem colar um snippet de conversão de carregamento de página, pois isso contaria visitas como leads.

No Google Ads:

- a conversão de contato deve ser Primária;
- deve estar incluída na meta da campanha;
- conversões auxiliares como `whatsapp_click` e `phone_click`, se existirem separadamente, devem ficar Secundárias para evitar duplicidade;
- não aumentar o orçamento sem análise de impressões, termos de pesquisa e custo por contato.

## 8. Diagnóstico conhecido da campanha

O diagnóstico compartilhado indicou que a campanha ficou sem impressões por combinação de restrições anteriores, incluindo:

- programação limitada;
- raio geográfico estreito;
- limite de CPC baixo no período inicial;
- palavras-chave específicas e algumas com baixo volume.

As correções relatadas foram:

- programação liberada;
- raio ampliado;
- limite máximo de CPC removido;
- novas palavras-chave adicionadas;
- orçamento mantido.

O status “Qualificada” não garante que o anúncio apareça em toda simulação. O Diagnóstico e Visualização testa um leilão específico. A avaliação correta deve usar as impressões reais da campanha e as colunas de parcela de impressões perdida por classificação e por orçamento.

## 9. Próximos passos recomendados

1. Confirmar no Tag Assistant que o clique no WhatsApp dispara a conversão correta.
2. Acompanhar impressões reais por 24–48 horas.
3. Conferir termos de pesquisa e adicionar negativas somente quando houver dados.
4. Verificar parcela de impressões perdida por classificação.
5. Concluir a verificação do anunciante.
6. Não pesquisar repetidamente o próprio anúncio no Google normal.
7. Não alterar orçamento, raio e palavras-chave várias vezes durante o período inicial de observação.
8. Melhorar as avaliações reais no Perfil da Empresa no Google quando houver o link público disponível.

## 10. Regras para futuras alterações

- Preservar o botão flutuante do WhatsApp.
- Não inserir CTA duplicado no topo sem uma decisão específica.
- Manter Instalação Elétrica como foco inicial da página.
- Usar fotos reais sempre que possível.
- Não publicar credenciais ou dados privados do Google Ads.
- Ao editar `main.js` ou `style.css`, atualizar a versão query string nos HTML para evitar cache antigo.
- Após publicar, validar sintaxe, links, páginas de serviço, sitemap e posição do rodapé.
