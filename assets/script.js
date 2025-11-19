// Timeline modal
document.querySelectorAll('article[data-index]').forEach(article=>{
    article.addEventListener('click', ()=>{
        const title = article.querySelector('h2').innerText;
        const text = article.querySelector('p').innerText;
        const modal = document.getElementById('modalWrap');
        modal.querySelector('#modalTitle').innerText = title;
        modal.querySelector('#modalText').innerText = text;
        modal.classList.remove('hidden');
    });
});

document.getElementById('closeModal')?.addEventListener('click', ()=>{
    document.getElementById('modalWrap').classList.add('hidden');
});

// Cartas envelopes
document.querySelectorAll('.envelope').forEach(env=>{
    env.querySelector('.front').addEventListener('click', ()=>{
        const inside = env.querySelector('.inside');
        inside.classList.toggle('hidden');
    });
});




// Presente especial com todas as fotos e mensagem emocionante
document.querySelectorAll('.gift').forEach(gift => {

    gift.addEventListener('click', () => {
        // Criar overlay escuro
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 overflow-auto p-6';

        // Mensagem emocionante
        const message = document.createElement('div');
        message.innerText = "💜 Feliz 1 ano de namoro vida! Obrigado por cada momento incrível ao seu lado. Eu te amooooooo muito e que venham muitos anos mais juntos com voçê minha princesa! 💜";
        message.className = 'text-center text-2xl md:text-3xl font-bold text-purple-300 bg-[#0b0520]/80 p-6 rounded shadow-lg mb-8 fade-in';
        overlay.appendChild(message);

        // Array de fotos
        const photos = ['img/foto1.jpg', 'img/foto2.jpg', 'img/foto3.jpg', 'img/foto4.jpg'];
        const photosContainer = document.createElement('div');
        photosContainer.className = 'grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center';

        photos.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'max-w-48 max-h-48 rounded-lg border-4 border-purple-500 shadow-xl fade-in';
            photosContainer.appendChild(img);
        });

        overlay.appendChild(photosContainer);

        // Partículas mágicas
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'w-2 h-2 bg-purple-400 rounded-full absolute animate-float';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '0%';
            particle.style.animationDuration = (2 + Math.random() * 3) + 's';
            overlay.appendChild(particle);
        }

        // Fechar overlay ao clicar
        overlay.addEventListener('click', () => overlay.remove());

        document.body.appendChild(overlay);
    });
});

const mazeData = [
  [0,1,0,0,0,1,0,0,0,1,0,0],
  [0,1,0,1,0,1,0,1,1,1,0,0],
  [0,0,0,1,0,0,0,1,0,0,0,0],
  [1,1,0,1,1,1,0,1,0,1,1,0],
  [0,0,0,0,0,0,0,1,0,0,0,0],
  [0,1,1,1,1,1,0,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,1,0,1,0,1,0,1,0,0]
];

const stars = [
  {x:2, y:0, question:"Quando foi nosso primeiro beijo?", answer:"2024-10-16"},
  {x:7, y:2, question:"Qual foi nossa primeira viagem juntos?", answer:"Coreia"},
  {x:1, y:9, question:"Qual música marcou nosso início?", answer:"Entregador de flores"},
  {x:10, y:5, question:"Qual é o nosso apelido especial?", answer:"Zero foco"}
];

const maze = document.getElementById('maze');
const rows = mazeData.length;
const cols = mazeData[0].length;
const cells = [];

// Cria grid
for(let r=0;r<rows;r++){
  cells[r]=[];
  for(let c=0;c<cols;c++){
    const div = document.createElement('div');
    div.className='cell';
    if(mazeData[r][c]===1) div.style.backgroundColor='#3b0764';
    maze.appendChild(div);
    cells[r][c]=div;
  }
}

// Jogador inicial
let playerPos={x:0,y:0};
cells[playerPos.y][playerPos.x].classList.add('player','animate-heart');

// Controla qual estrela está visível
let activeStarIndex = 0;

// Mostra apenas a estrela ativa
function renderStar(){
  // limpa todas
  stars.forEach((s,idx)=>{
    const cell = cells[s.y][s.x];
    cell.innerText='';
    cell.style.backgroundColor='#d8b4fe';
    cell.style.boxShadow='none';
  });
  if(activeStarIndex < stars.length){
    const s = stars[activeStarIndex];
    const cell = cells[s.y][s.x];
    cell.innerText='⭐';
    cell.style.backgroundColor='#d8b4fe';
    cell.style.boxShadow='0 0 15px 5px #a855f7';
  }
}
renderStar();

// Movimentação
function move(dx,dy){
  let newX=playerPos.x+dx;
  let newY=playerPos.y+dy;
  if(newX>=0 && newX<cols && newY>=0 && newY<rows && mazeData[newY][newX]===0){
    cells[playerPos.y][playerPos.x].classList.remove('player');
    playerPos={x:newX,y:newY};
    const playerCell = cells[playerPos.y][playerPos.x];
    playerCell.classList.add('player','animate-heart');
    checkActiveStar();
  }
}

// Checa se jogador encostou na estrela visível
function checkActiveStar(){
  if(activeStarIndex >= stars.length) return;
  const s = stars[activeStarIndex];
  if(playerPos.x === s.x && playerPos.y === s.y){
    showQuestionModal(s);
  }
}

// Teclado
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowUp'||e.key==='w') move(0,-1);
  if(e.key==='ArrowDown'||e.key==='s') move(0,1);
  if(e.key==='ArrowLeft'||e.key==='a') move(-1,0);
  if(e.key==='ArrowRight'||e.key==='d') move(1,0);
});

// Botões móveis
document.querySelectorAll('.control').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const dir=btn.getAttribute('data-dir');
    if(dir==='up') move(0,-1);
    if(dir==='down') move(0,1);
    if(dir==='left') move(-1,0);
    if(dir==='right') move(1,0);
  });
});

// Modal de pergunta
function showQuestionModal(star){
  const overlay = document.createElement('div');
  overlay.className='fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-6';

  const container = document.createElement('div');
  container.className='bg-[#1b073f] p-6 rounded-lg shadow-xl flex flex-col items-center gap-4';

  const questionText = document.createElement('p');
  questionText.innerText=star.question;
  questionText.className='text-white text-lg text-center';

  const input = document.createElement('input');
  input.type='text';
  input.placeholder='Digite sua resposta';
  input.className='p-2 rounded text-black w-full text-center';

  const submit = document.createElement('button');
  submit.innerText='Responder';
  submit.className='px-4 py-2 bg-purple-700 rounded text-white font-bold';

  submit.addEventListener('click',()=>{
    if(input.value.trim().toLowerCase()===star.answer.toLowerCase()){
      createParticles(star.x,star.y);
      overlay.remove();
      activeStarIndex++;
      renderStar();

      if(activeStarIndex >= stars.length){
        setTimeout(showCelebration,100);
      }
    } else {
      alert('Resposta incorreta! Tente novamente.');
    }
  });

  container.appendChild(questionText);
  container.appendChild(input);
  container.appendChild(submit);
  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

// Partículas
function createParticles(x,y){
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='w-2 h-2 bg-purple-400 rounded-full absolute animate-float';
    const cell = cells[y][x].getBoundingClientRect();
    p.style.left=(cell.left+Math.random()*30)+'px';
    p.style.top=(cell.top+Math.random()*30)+'px';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),3000);
  }
}

// Final romântico
function showCelebration(){
  const overlay=document.createElement('div');
  overlay.className='fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-6 overflow-auto';

  const message=document.createElement('div');
  message.innerText="💜 Parabéns! Você coletou todas as estrelas! 💜\nNosso primeiro ano juntos foi mágico. Te amo muito!";
  message.className='text-center text-2xl md:text-3xl font-bold text-purple-300 bg-[#0b0520]/80 p-6 rounded shadow-lg mb-6 fade-in';
  overlay.appendChild(message);

  const photos=['img/foto4.jpg','img/foto2.jpg','img/foto3.jpg'];
  const container=document.createElement('div');
  container.className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center';
  photos.forEach(src=>{
    const img=document.createElement('img');
    img.src=src;
    img.className='max-w-48 max-h-48 rounded-lg border-4 border-purple-500 shadow-xl fade-in';
    container.appendChild(img);
  });
  overlay.appendChild(container);

  for(let i=0;i<50;i++){
    const particle=document.createElement('div');
    particle.className='w-2 h-2 bg-purple-400 rounded-full absolute animate-float';
    particle.style.left=Math.random()*window.innerWidth+'px';
    particle.style.bottom='0%';
    particle.style.animationDuration=(2+Math.random()*3)+'s';
    overlay.appendChild(particle);
  }

  overlay.addEventListener('click',()=>overlay.remove());
  document.body.appendChild(overlay);
}
