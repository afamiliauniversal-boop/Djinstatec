/* ===== Página de detalhe do serviço =====
   Lê ?s=<slug> da URL, busca o conteúdo em DJ_SERVICES (js/servicos-data.js)
   e preenche a página, incluindo o mesmo carrossel de imagens do card. */
(function(){
  const params=new URLSearchParams(window.location.search);
  const slug=params.get('s');
  const data=(window.DJ_SERVICES||{})[slug];

  if(!data){
    document.getElementById('svcTitle').textContent='Serviço não encontrado';
    document.getElementById('svcTagline').textContent='Volte para a página inicial e escolha um serviço no menu de Serviços.';
    return;
  }

  document.title=`${data.title} | D&J INSTATEC`;
  document.getElementById('pageTitle').textContent=`${data.title} | D&J INSTATEC`;
  document.getElementById('pageDescription').setAttribute('content',data.tagline);

  document.getElementById('svcEyebrow').textContent=data.eyebrow||'// serviço';
  document.getElementById('svcTitle').textContent=data.title;
  document.getElementById('svcTagline').textContent=data.tagline;
  document.getElementById('svcLead').textContent=data.lead;
  document.getElementById('svcNotTitle').textContent=data.notTitle||'';
  document.getElementById('svcNotText').textContent=data.notText||'';

  const ul=document.getElementById('svcBullets');
  (data.bullets||[]).forEach(b=>{
    const li=document.createElement('li');
    li.innerHTML=`<i class="fas fa-check"></i> <span></span>`;
    li.querySelector('span').textContent=b;
    ul.appendChild(li);
  });

  /* o botão flutuante de WhatsApp já existe fixo em todas as telas — aqui só
     ajustamos a mensagem dele pra já vir com o nome do serviço certo */
  const waText=encodeURIComponent(data.waMsg||`Olá! Quero saber mais sobre ${data.title}.`);
  const waFloat=document.querySelector('.wa-float');
  if(waFloat) waFloat.href=`https://wa.me/5511920075078?text=${waText}`;

  /* mesmo carrossel de imagens que roda no card do leque, agora em tela cheia */
  const folder=`images/servicos/${slug}/`;
  const imgEl=document.getElementById('svcImg');
  if(imgEl) window.DJ_startFolderCarousel(imgEl,folder);
})();
