//identificar o clique no menu
//variar o item que foi clicado e fazer referencia com o alvo
//verificar a distancia entro o alvo e o topo
// animar o scroll ate o alvo

//---------------------------------//

// selecionando todos os links da barra de navegacao que tem href inicial de #
const menuItens = document.querySelectorAll('nav a[href^="#"]');

// selecionando todos os links do rodape que tem href inicial de #
const rodapeItens = document.querySelectorAll('.link-rodape a[href^="#"]');

//identificando o clique
menuItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

//identificando o clique
rodapeItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

function scrollToIdOnClick(event){
    event.preventDefault();
    const element = event.target;

    const to = getScrollTopByHref(event.target);

    scrollToPosition(to);
}

//funcao de scroll suave
function scrollToPosition(to){
    smoothScrollTo(0, to , 1000);
}

// pegar o scroll pelo href
function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
 function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== 'undefined' ? duration : 400;
  
    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  };