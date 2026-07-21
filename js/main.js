/* ===== Carrossel de imagens de uma pasta de serviço =====
   Procura 1.jpg, 2.jpg, 3.jpg... dentro da pasta e gira cada uma por 1s.
   Não importa quantas fotos existam: ele detecta sozinho e para na primeira que não existir.
   Usado tanto nos cards do leque quanto na página de detalhe do serviço. */
window.DJ_startFolderCarousel=function(imgEl,folder){
  const found=[];
  let n=1;
  const MAX_PROBE=60;
  (function probe(){
    const test=new Image();
    test.onload=()=>{ found.push(`${folder}${n}.jpg`); n++; if(n<=MAX_PROBE) probe(); else start(); };
    test.onerror=()=>start();
    test.src=`${folder}${n}.jpg`;
  })();
  function start(){
    if(!found.length)return;
    let idx=0;
    imgEl.src=found[0]; imgEl.classList.add('active');
    if(found.length>1){
      setInterval(()=>{
        idx=(idx+1)%found.length;
        imgEl.classList.remove('active');
        const pre=new Image();
        pre.onload=()=>{ imgEl.src=pre.src; imgEl.classList.add('active'); };
        pre.src=found[idx];
      },1000);
    }
  }
};

/* ===== Header scroll ===== */
const header=document.getElementById('header');
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>20)});

/* ===== Mobile menu ===== */
const navToggle=document.getElementById('navToggle'),navLinks=document.getElementById('navLinks');
navToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* ===== Scroll reveal ===== */
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});
  },{threshold:.15});
  reveals.forEach(el=>io.observe(el));
  /* rede de segurança: se o observer não disparar, mostra tudo */
  setTimeout(()=>reveals.forEach(el=>el.classList.add('show')),2500);
}else{
  reveals.forEach(el=>el.classList.add('show'));
}

/* ===== Animated counters ===== */
function animateCounter(el){
  const target=+el.dataset.target,suffix=el.dataset.suffix||'';
  const dur=1600,start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/dur,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(eased*target)+suffix;
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const nums=document.querySelectorAll('.num[data-target]');
if('IntersectionObserver' in window){
  const counterIO=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);counterIO.unobserve(e.target);}});
  },{threshold:.5});
  nums.forEach(el=>counterIO.observe(el));
  /* rede de segurança */
  setTimeout(()=>nums.forEach(el=>{if(el.textContent==='0')animateCounter(el);}),2600);
}else{
  nums.forEach(el=>el.textContent=el.dataset.target+(el.dataset.suffix||''));
}

/* ===== Galeria "Processo" (bastidores) — carrega sozinha todas as fotos de images/processo/ =====
   Mesma lógica de detecção automática do carrossel dos serviços: testa 1.jpg, 2.jpg... até não
   achar mais nenhuma. Adicionar fotos na pasta é suficiente, não precisa mexer em HTML/JS. */
(function(){
  const gallery=document.getElementById('processoGallery');
  if(!gallery)return;
  let n=1;
  const MAX_PROBE=200;
  (function probe(){
    const test=new Image();
    test.onload=()=>{
      const item=document.createElement('div');
      item.className='pf-item reveal show';
      item.innerHTML=`<img src="images/processo/${n}.jpg" alt="Processo de trabalho D&J INSTATEC">`;
      gallery.appendChild(item);
      n++;
      if(n<=MAX_PROBE)probe();
    };
    test.onerror=()=>{};
    test.src=`images/processo/${n}.jpg`;
  })();
})();

/* ===== WhatsApp form ===== */
const WA_NUMBER='5511920075078';
document.getElementById('waForm')?.addEventListener('submit',function(ev){
  ev.preventDefault();
  const nome=document.getElementById('nome').value.trim();
  const servico=document.getElementById('servico').value;
  const bairro=document.getElementById('bairro').value.trim();
  const msg=document.getElementById('msg').value.trim();
  let texto=`Olá, D&J INSTATEC! Vim pelo site.%0A%0A`;
  texto+=`*Nome:* ${nome}%0A`;
  texto+=`*Serviço:* ${servico}%0A`;
  if(bairro)texto+=`*Local:* ${bairro}%0A`;
  if(msg)texto+=`*Detalhes:* ${msg}%0A`;
  texto+=`%0AGostaria de um orçamento grátis. 🙏`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`,'_blank');
});

/* ===== Deck de serviços — cards em leque (estilo Netflix) =====
   Cada card guarda uma posição CONTÍNUA (pos[i]) em vez de recalcular a
   distância circular a cada troca. Isso evita que, ao dar a volta, um card
   precise "voar" de um lado da tela pro outro (o que parecia um arrasto
   passando na frente dos demais). Quando um card sai da faixa visível de
   um lado, ele é reciclado instantaneamente (sem transição) pro lado
   oposto ENQUANTO está invisível — daí ele volta a entrar suavemente,
   como um carrossel real. */
(function(){
  const deck=document.getElementById('serviceDeck');
  if(!deck)return;
  const track=deck.querySelector('.deck-track');
  const cards=Array.from(track.querySelectorAll('.deck-card'));
  const prevBtn=deck.querySelector('.deck-nav.prev');
  const nextBtn=deck.querySelector('.deck-nav.next');
  const N=cards.length;
  const HALF=Math.floor(N/2); /* cards na posição HALF ficam invisíveis: são só o "buffer" da reciclagem */
  const AUTOPLAY_MS=3500;
  let autoplayTimer=null;

  /* slug do serviço a partir da pasta de imagens, p/ linkar a página de detalhe */
  cards.forEach(card=>{
    const folder=card.dataset.folder||'';
    const slug=folder.replace(/^images\/servicos\//,'').replace(/\/$/,'');
    card.dataset.slug=slug;
  });

  let initialActive=cards.findIndex(c=>c.classList.contains('is-center'));
  if(initialActive<0)initialActive=Math.floor(N/2);
  /* pos[i] = posição contínua do card i em relação ao centro (pode ser qualquer inteiro) */
  const pos=cards.map((_,i)=>{
    let p=i-initialActive;
    while(p>HALF)p-=N;
    while(p<-HALF)p+=N;
    return p;
  });

  function step(){ return deck.clientWidth<500?90:120; } /* px de deslocamento por card */

  function applyStyle(card,p){
    const abs=Math.abs(p);
    const spread=deck.classList.contains('is-spread')?1.15:1;
    const x=p*step()*spread;
    /* raio invertido: o card central fica menor/atrás; os das pontas crescem à frente */
    const scale=Math.min(0.72+abs*0.09,1.05);
    card.style.transform=`translateX(${x}px) scale(${scale})`;
    card.style.zIndex=String(10+abs);
    const visible=abs<HALF;
    card.style.opacity=visible?'1':'0';
    card.style.pointerEvents=visible?'auto':'none';
    card.classList.toggle('is-active',p===0);
  }

  function render(){ cards.forEach((card,i)=>applyStyle(card,pos[i])); }

  /* desloca todo o anel por "delta" posições (delta=+1 é "próximo", -1 é "anterior") */
  function shift(delta){
    if(!delta)return;
    cards.forEach((card,i)=>{
      let next=pos[i]-delta;
      if(next>HALF||next<-HALF){
        /* esse card sairia da faixa visível: recicla instantaneamente pro lado
           oposto ENQUANTO está fora de vista, sem transição, sem "voar" na tela */
        card.style.transition='none';
        next=next>HALF?next-N:next+N;
        pos[i]=next;
        applyStyle(card,pos[i]);
        void card.offsetWidth; /* força o navegador a aplicar antes de reativar a transição */
        card.style.transition='';
      }else{
        pos[i]=next;
      }
    });
    render();
  }

  function startAutoplay(){
    stopAutoplay();
    autoplayTimer=setInterval(()=>shift(1),AUTOPLAY_MS);
  }
  function stopAutoplay(){ if(autoplayTimer){clearInterval(autoplayTimer);autoplayTimer=null;} }

  cards.forEach((card,i)=>card.addEventListener('click',()=>{
    if(card.classList.contains('is-active')){
      const slug=card.dataset.slug;
      if(slug) window.location.href=`servico.html?s=${encodeURIComponent(slug)}`;
    }else{
      shift(pos[i]); /* traz esse card pro centro, andando só a distância necessária */
    }
  }));
  prevBtn?.addEventListener('click',()=>shift(-1));
  nextBtn?.addEventListener('click',()=>shift(1));
  deck.addEventListener('mouseenter',()=>{deck.classList.add('is-spread');stopAutoplay();render();});
  deck.addEventListener('mouseleave',()=>{deck.classList.remove('is-spread');startAutoplay();render();});
  window.addEventListener('resize',render);
  render();
  startAutoplay();

  /* carrossel de imagens de CADA card — ver DJ_startFolderCarousel (reaproveitado na página de serviço) */
  cards.forEach(card=>{
    const folder=card.dataset.folder, imgEl=card.querySelector('.dc-img');
    if(folder&&imgEl) window.DJ_startFolderCarousel(imgEl,folder);
  });

  /* estrelas + selo "mais pedido" + 100% satisfação, a partir dos data-attributes de cada card */
  cards.forEach(card=>{
    const n=parseInt(card.dataset.stars||'5',10);
    const starsEl=card.querySelector('.deck-stars');
    const tagEl=card.querySelector('.deck-tag');
    const ratingEl=card.querySelector('.deck-rating');
    if(starsEl) starsEl.textContent='★'.repeat(n)+'☆'.repeat(5-n);
    if(tagEl){
      if(card.dataset.tag) tagEl.textContent=card.dataset.tag;
      else tagEl.remove();
    }
    if(ratingEl){
      const sat=document.createElement('span');
      sat.className='deck-sat';
      sat.textContent='100% satisfação';
      ratingEl.appendChild(sat);
    }
  });
})();