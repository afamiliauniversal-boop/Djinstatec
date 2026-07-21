# D&J INSTATEC — Site Institucional

Landing page de alta conversão para a **D&J INSTATEC, Engenharia Elétrica e Automação** (São Paulo/SP e Grande SP).
Site estático, sem backend, hospedado no **GitHub Pages**.

🔗 **Domínio oficial:** https://djinstatec.com.br

---

## 🎯 Objetivo

Converter a visita em contato imediato pelo WhatsApp. O botão flutuante de WhatsApp fica fixo em
todas as telas, e a mensagem que ele abre já muda automaticamente conforme o serviço que a pessoa
está vendo no momento.

---

## 📁 Estrutura de pastas

```
Djinstatec-publish/
├── index.html                  ← página inicial (hero + deck de serviços + seções)
├── servico.html                ← página de detalhe (uma só, o conteúdo muda por ?s=<slug>)
├── CNAME                       ← domínio customizado do GitHub Pages (djinstatec.com.br)
├── css/
│   └── style.css               ← todos os estilos (tema escuro, deck, páginas de serviço)
├── js/
│   ├── main.js                 ← menu, scroll reveal, contadores, deck de serviços, formulário
│   ├── servico.js              ← lê ?s=<slug> e preenche a página de detalhe
│   └── servicos-data.js        ← textos de cada serviço (título, descrição, bullets, WhatsApp)
├── images/
│   ├── logo.png / logo_icon.jpg
│   ├── processo/                ← galeria de bastidores (seção Portfólio), 1.jpg, 2.jpg...
│   └── servicos/
│       ├── s_0001.jpg ...      ← banco de fotos genéricas antigo (não usado diretamente no site)
│       ├── instalacao-eletrica/1.jpg, 2.jpg...
│       ├── manutencao-eletrica/1.jpg, 2.jpg...
│       ├── automacao-eletrica/1.jpg, 2.jpg...
│       ├── cftv/1.jpg, 2.jpg...
│       ├── iluminacao/1.jpg, 2.jpg...
│       ├── iluminacao-de-moveis/1.jpg, 2.jpg...
│       ├── painel-solar/1.jpg, 2.jpg...
│       ├── alarmes-seguranca/1.jpg
│       ├── projetos-eletricos/1.jpg, 2.jpg...
│       ├── interfone/1.jpg, 2.jpg...
│       ├── controlador-de-acesso/1.jpg, 2.jpg...
│       └── trabalho-altura/1.jpg, 2.jpg...
├── videos/
│   ├── hero.mp4                ← vídeo de fundo do hero (atrás do título)
│   └── hero-poster.jpg
└── .github/workflows/          ← deploy automático no GitHub Pages a cada push na main
```

---

## 🃏 Como funciona o deck de serviços (a "roda" de cards na tela inicial)

Cada card do carrossel em leque representa um serviço e tem seu **próprio carrossel de fotos**,
que gira sozinho a cada 1 segundo. A mesma foto/vídeo aparece depois, em tamanho maior, na página
de detalhe daquele serviço (`servico.html?s=<slug>`).

### Como trocar as fotos de um serviço

1. Vá até a pasta do serviço em `images/servicos/<slug>/` (os 12 slugs estão na tabela abaixo).
2. Nomeie as fotos em sequência: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`...
3. Pronto. **Não precisa mexer em nenhum código.** O site detecta sozinho quantas fotos existem
   (ele testa `1.jpg`, `2.jpg`... até não achar mais nenhuma) e gira todas, uma a cada segundo,
   tanto no card pequeno quanto na página de detalhe.

| Slug (nome da pasta)      | Serviço                |
|---|---|
| `instalacao-eletrica`     | Instalação Elétrica    |
| `manutencao-eletrica`     | Manutenção Elétrica    |
| `automacao-eletrica`      | Automação Elétrica     |
| `cftv`                    | CFTV                   |
| `iluminacao`              | Iluminação             |
| `iluminacao-de-moveis`    | Iluminação de Móveis   |
| `painel-solar`            | Painel Solar           |
| `alarmes-seguranca`       | Alarmes e Segurança    |
| `projetos-eletricos`      | Projetos Elétricos     |
| `interfone`               | Interfone              |
| `controlador-de-acesso`   | Controlador de Acesso  |
| `trabalho-altura`         | Trabalho em Altura     |

> `alarmes-seguranca` ainda está só com uma foto placeholder — não veio pasta de fotos reais
> desse serviço, é só colocar `1.jpg`, `2.jpg`... na pasta quando tiver.

### Galeria de bastidores (seção Portfólio)

A seção "Nosso processo de trabalho" funciona igual: joga as fotos em `images/processo/`,
nomeadas `1.jpg`, `2.jpg`, `3.jpg`... e elas aparecem sozinhas na galeria, sem precisar editar
HTML. Essa galeria não é clicável (não linka pra nenhuma página de serviço), é só uma vitrine
de fotos reais do trabalho.

### Como o carrossel do deck funciona (visitante)

- Gira sozinho (autoplay a cada 3,5s) e nunca "acaba": ao chegar no último, volta a girar a partir
  do primeiro, em ciclo contínuo.
- Passar o mouse por cima pausa o giro automático e afasta um pouco mais os cards.
- Clicar num card lateral traz ele para o centro.
- Clicar no card que já está no centro abre a página de detalhe daquele serviço.

---

## 📄 Como funciona a página de cada serviço (`servico.html`)

Não existem 12 arquivos HTML separados — existe **um só template** (`servico.html`) que lê o
parâmetro `?s=` da URL (ex: `servico.html?s=automacao-eletrica`) e busca o conteúdo daquele
serviço em `js/servicos-data.js`.

### Para editar o texto de um serviço

Abra `js/servicos-data.js` e edite o bloco do slug desejado. Cada serviço tem:

- `title` — título da página
- `eyebrow` — a legenda pequena acima do título
- `tagline` — a frase de efeito logo abaixo do título
- `lead` — o parágrafo de abertura (o "gancho" persuasivo)
- `bullets` — lista do que está incluído no serviço
- `notTitle` / `notText` — a caixa lateral de esclarecimento ("o que não fazemos" / "como funciona")
- `waMsg` — a mensagem que abre no WhatsApp quando a pessoa está vendo esse serviço

---

## 🚀 Publicação (deploy automático)

O deploy é **automático** via GitHub Actions: a cada `git push` na branch **main**, o site é
reconstruído e publicado no GitHub Pages em 1–2 minutos. O domínio `djinstatec.com.br` já está
configurado via o arquivo `CNAME` na raiz do repositório.

### Atualizar o site pelo terminal
```bash
git add .
git commit -m "Atualiza conteúdo do site"
git push
```

### ⚠️ Importante ao editar `css/style.css` ou `js/main.js`

Os navegadores guardam esses dois arquivos em cache por um bom tempo. Por isso, o `index.html` e
o `servico.html` carregam eles com um número de versão no final do link, por exemplo:
`css/style.css?v=10`. **Toda vez que você editar o CSS ou o `main.js`, aumente esse número em 1**
nos dois arquivos (`index.html` e `servico.html`), senão quem já visitou o site antes vai continuar
vendo a versão antiga por um tempo.

---

## 🏢 Dados reais da empresa (usados no site)

| Campo | Valor |
|---|---|
| Nome | D&J INSTATEC, Engenharia Elétrica e Automação |
| CNPJ | 18.184.811/0001-55 (MEI ativo) |
| WhatsApp | (11) 92007-5078 → https://wa.me/5511920075078 |
| E-mail | djinstatec@gmail.com |
| Localização | São Paulo / SP e Grande SP |
| Domínio | djinstatec.com.br |
| Responsável | Eletrotécnico, cursante de Engenharia Elétrica, técnico em Eletrônica e Mecânica, AutoCAD, NR-10 |

**Números de prova social (reais):** 500+ projetos · 15 anos de experiência · 93% de satisfação ·
**6 meses de garantia** (3 meses por lei + 3 meses por conta da empresa).

**Serviços:** Instalação Elétrica · Manutenção Elétrica · Automação Elétrica · CFTV · Iluminação ·
Iluminação de Móveis · Painel Solar · Alarmes e Segurança · Projetos Elétricos · Interfone ·
Controlador de Acesso · Trabalho em Altura.

---

## 📈 Rastreamento (Google Ads)

O site já tem a tag do Google Ads (`gtag.js`, ID `AW-967355608`) instalada no `<head>` de
`index.html` e `servico.html`. Não há Google Analytics separado instalado.

---

## ✏️ O que personalizar facilmente

| O que mudar | Onde fica |
|---|---|
| Número de WhatsApp | Buscar `5511920075078` em `index.html`, `servico.html` e `js/main.js` |
| E-mail | Buscar `djinstatec@gmail.com` em `index.html` e `servico.html` |
| Fotos de cada serviço | Pastas `images/servicos/<slug>/`, arquivos `1.jpg`, `2.jpg`... (ver seção acima) |
| Fotos da galeria de bastidores | Pasta `images/processo/`, arquivos `1.jpg`, `2.jpg`... |
| Textos de cada serviço | `js/servicos-data.js` (ver seção acima) |
| Contadores (projetos, anos, %, garantia) | Atributos `data-target`/`data-suffix` na seção STATS do `index.html` |
| Depoimentos | Seção `<!-- DEPOIMENTOS -->` no `index.html` |
| Vídeo de fundo do hero | `videos/hero.mp4` (mesmo nome de arquivo) |
| Cores do tema | Bloco `:root` no topo de `css/style.css` (`--accent` é a cor laranja de destaque) |
| Espaçamento/velocidade do deck de serviços | Constantes `step()`, `AUTOPLAY_MS` em `js/main.js` |
| Logo | Substituir `images/logo.png` e `images/logo_icon.jpg` (mantendo o nome) |

---

## ♿ Robustez

- **Mobile-first** e responsivo.
- Animações com `IntersectionObserver` (scroll reveal + contadores), com **rede de segurança**:
  se o observer não disparar (ou o JS estiver desativado), todo o conteúdo é exibido normalmente
  (fallback via `<noscript>` e timeout).
- O deck de serviços usa posição contínua por card (sem recálculo circular a cada troca), evitando
  que um card "salte" de um lado da tela pro outro ao completar o ciclo.
- Sem backend: o botão de WhatsApp abre a mensagem já pronta (`wa.me`), não há formulário com envio de dados.

---

Desenvolvido para **D&J INSTATEC**, Engenharia Elétrica e Automação · São Paulo/SP
