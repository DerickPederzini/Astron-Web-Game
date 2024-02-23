(function () {
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');

  // pegar/alterar as barras do html
  let barWidth1 = 100;
  let barWidth2 = 100;

  // movimentos
  let moveLeft = false;
  let moveUp = false;
  let moveRight = false;
  let moveDown = false;
  let moveA = false;
  let moveD = false;
  let moveW = false;
  let moveS = false;
  
  // array dos quadrados  
  const quadrados = [];
  
  // quadrados

  //quadrado robô1
  const quadrado1 = new quadrado(30, 30, 100, 80, "", 2);
  quadrados.push(quadrado1);
  
  //quadrado buraco negro
  const quadrado2 = new quadrado(190, 120, 100, 100, "#000", 0);
  quadrados.push(quadrado2);

  //quadrado buraco de minhoca
  const quadrado3 = new quadrado(680, 250, 100, 100, "#000", 0);
  quadrados.push(quadrado3);

  //quadrado robô2
  const quadrado4 = new quadrado(870, 390, 100, 80, "", 2);
  quadrados.push(quadrado4)

  //criar imagem

  const millenium = new Image();
  millenium.src='/img/milleniumFalcon.png';

  const blackHole = new Image();
  blackHole.src='/img/BlackHole.png';

  const wormHole = new Image();
  wormHole.src='/img/WormHole.png';
  
  const astron = new Image();
  astron.src = '/img/ASTRON (2).png'

  // pressionar as teclas
  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'ArrowLeft':
        moveLeft = true;
        break;
      case 'ArrowUp':
        moveUp = true;
        break;
      case 'ArrowRight':
        moveRight = true;
        break;
      case 'ArrowDown':
        moveDown = true;
        break;
      case'w':
        moveW = true;
        break;
      case'a':
        moveA = true;
        break;
      case's':
        moveS = true;
        break;
      case'd':
        moveD = true;
        break;
    }

    //chamada da função collision para ser ativada
    collision();
  });

  //soltar as teclas  
  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'ArrowLeft':
        moveLeft = false;
        break;
      case 'ArrowUp':
        moveUp = false;
        break;
      case 'ArrowRight':
        moveRight = false;
        break;
      case 'ArrowDown':
        moveDown = false;   
        break;
      case'w':
        moveW = false;
        break;
      case'a':
        moveA = false;
        break;
      case's':
        moveS = false;
        break;
      case'd':
        moveD = false;
        break;
    }

    //chamada da função collision para ser ativada
    collision();
  });

  let contadorDeRounds = 0;
  //função que detecta as colisões
  function collision() {
    //faz os quadrados voltarem ao seu posto original ao se colidirem
    if( 
        (quadrado1.posX <= quadrado4.posX + quadrado4.width && quadrado1.posX + quadrado1.width >= quadrado4.posX) &&
        (quadrado1.posY <= quadrado4.posY + quadrado4.height && quadrado1.posY + quadrado1.height >= quadrado4.posY)
      ){
      quadrado1.posX = 30;
      quadrado1.posY = 30;
      quadrado4.posX = 870;
      quadrado4.posY = 390;

      
      contadorDeRounds++;

      //If que identifica o ganhador e executa o recarregamento do programa após mostrar o ganhador
      if(contadorDeRounds === 5 && barWidth1 > barWidth2){
        window.alert("MILLENIUM FALCON GANHOU")
        location. reload()
      } else if(contadorDeRounds === 5 && barWidth2 > barWidth1){
        window.alert("ASTRON GANHOU");
        location. reload()
      }


      //Math random para determinar o dano que cada robô receberá
      const damage1 = parseInt(Math.random()*20);
      const damage2 = parseInt(Math.random()*20);

      barWidth1 -= damage1;
      barWidth2 -= damage2;

      document.getElementById('bar1').style.width = barWidth1+'%';
      document.getElementById('bar2').style.width = barWidth2+'%';

    }
    
    //detecta a colisão entre o robô1 (Millenium) e o buraco negro, gerando assim um teletransporte pelo mapa
    if(
      (quadrado1.posX <= quadrado2.posX + quadrado2.width && quadrado1.posX + quadrado1.width >= quadrado2.posX) && 
      (quadrado1.posY <= quadrado2.posY + quadrado2.height && quadrado1.posY + quadrado1.height >= quadrado2.posY)
    ){
      quadrado1.posX = 800;
      quadrado1.posY = 280;
    }

    //detecta a colisão entre o robô1 (Millenium) e o buraco de minhoca, gerando assim um teletransporte pelo mapa
    if (
      (quadrado1.posX <= quadrado3.posX + quadrado3.width && quadrado1.posX + quadrado1.width >= quadrado3.posX) && 
      (quadrado1.posY <= quadrado3.posY + quadrado3.height && quadrado1.posY + quadrado1.height >= quadrado3.posY)
    ){
      quadrado1.posX = 60;
      quadrado1.posY = 120;
    }

    //detecta a colisão entre o robô2 (Astron) e o buraco negro, gerando assim um teletransporte pelo mapa
    if (
      (quadrado4.posX <= quadrado2.posX + quadrado2.width && quadrado4.posX + quadrado4.width >= quadrado2.posX) && 
      (quadrado4.posY <= quadrado2.posY + quadrado2.height && quadrado4.posY + quadrado4.height >= quadrado2.posY)
    ) {
      quadrado4.posX = 800;
      quadrado4.posY = 280;
    }

    //detecta a colisão entre o robô2 (Astron) e o buraco de minhoca, gerando assim um teletransporte pelo mapa
    if (
      (quadrado4.posX <= quadrado3.posX + quadrado3.width && quadrado4.posX + quadrado4.width >= quadrado3.posX) && 
      (quadrado4.posY <= quadrado3.posY + quadrado3.height && quadrado4.posY + quadrado4.height >= quadrado3.posY)
    ){
      quadrado4.posX = 60;
      quadrado4.posY = 120;
    }
  };

  function moverQuadrados() {
    if (moveLeft) {
      quadrado1.posX -= quadrado1.velocidade;
    }
    if (moveRight) {
      quadrado1.posX += quadrado1.velocidade;
    }
    if (moveUp) {
      quadrado1.posY -= quadrado1.velocidade;
    }
    if (moveDown) {
      quadrado1.posY += quadrado1.velocidade;
    }

    if (moveA){
      quadrado4.posX -= quadrado4.velocidade;
    }
    if (moveD) {
      quadrado4.posX += quadrado4.velocidade;
    }
    if (moveW) {
      quadrado4.posY -= quadrado4.velocidade;
    }
    if (moveS) { 
      quadrado4.posY += quadrado4.velocidade;
    }

    //Fixação dos robôs no canvas, não ultrapassa a tela
    quadrado1.posX = Math.max((0), Math.min(cnv.width - quadrado1.width, quadrado1.posX));
    quadrado1.posY = Math.max((0), Math.min(cnv.height - quadrado1.height, quadrado1.posY));

    quadrado4.posX = Math.max(0, Math.min(cnv.width - quadrado4.width, quadrado4.posX));
    quadrado4.posY = Math.max(0, Math.min(cnv.height - quadrado4.height, quadrado4.posY));
  }

  // Desenho das imagens
  function desenhaImg(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(millenium, quadrado1.posX, quadrado1.posY, quadrado1.width, quadrado1.height);
    ctx.drawImage(blackHole ,quadrado2.posX, quadrado2.posY, quadrado2.width, quadrado2.height);
    ctx.drawImage(wormHole ,quadrado3.posX, quadrado3.posY, quadrado3.width, quadrado3.height);
    ctx.drawImage(astron, quadrado4.posX, quadrado4.posY, quadrado4.width, quadrado4.height);
  }


  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in quadrados) {
      const spr = quadrados[i];
      ctx.fillStyle = spr.width;
      ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
    }
  }
  //solicitar uma animação ao browser e chamar a função
  //que é a propria função atualizarTela
  function atualizarTela() {
    window.requestAnimationFrame(atualizarTela, cnv);
    moverQuadrados();
    exibirQuadrados();
    desenhaImg();
  }
  atualizarTela();

}());