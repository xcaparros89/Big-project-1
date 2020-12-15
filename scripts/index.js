let leftStack = [];
let rightStack = [document.querySelector('.page4'),document.querySelector('.page3'),document.querySelector('.page2'),document.querySelector('.page1'), document.querySelector('.page0')]; // [p4,p3,p2,p1,p0]
let toTheLeft = document.querySelector('.to-the-left');
let toTheRight = document.querySelector('.to-the-right');
let goToHome = document.querySelector('#home-link');
let goToAdvanceSearch = document.querySelector('#adv-link');
let goToSignUp = document.querySelector('#sign-up-link');
let goToLogin = document.querySelector('#login-link');
let goTofaq = document.querySelector('#faq-link');

//updatePagesDepth(rightStack, false);

toTheLeft.addEventListener('click',()=>{
  console.log(leftStack, rightStack)
  if(leftStack.length>1){
    const page = leftStack.pop();
    rightStack.push(page);
    updatePagesDepth(rightStack);
  }
})

toTheRight.addEventListener('click',()=>{
  console.log(leftStack, rightStack)
  console.log('hi')
  if(rightStack.length>1){
    const page = rightStack.pop();
    leftStack.push(page);
    updatePagesDepth(leftStack);
  }
})

function goTo(page){
  let pageToGo = document.querySelector(page);
  if(rightStack.includes(pageToGo)){
    while(leftStack[leftStack.length-1] !== pageToGo){
      console.log(leftStack, 'leftStack');
      console.log(rightStack, 'rightStack');
      const pageLast = rightStack.pop();
      leftStack.push(pageLast);
      console.log(leftStack, 'nLeftStack');
      console.log(rightStack, 'nRightStack');
      updatePagesDepth(leftStack);
    }
  } else{
    while(leftStack[leftStack.length-1] !== pageToGo){
      const page = leftStack.pop();
      rightStack.push(page);
      updatePagesDepth(rightStack);
    }
  }
}

goToHome.addEventListener('click', ()=>{
  goTo('.page0')
})
goToAdvanceSearch.addEventListener('click', ()=>{
  goTo('.page1')
})
goToSignUp.addEventListener('click', ()=>{
  goTo('.page2')
})
goToLogin.addEventListener('click', ()=>{
  goTo('.page2')
})
goTofaq.addEventListener('click', ()=>{
  goTo('.page3')
})

function updatePagesDepth(stack, sound=true) {
    console.log(stack.length)
    if(sound){
      new Audio('./sound/page-turn.wav').play();
    }
    stack.forEach((page, i)=> {
      if (stack == leftStack) {
          //translateZ els posa mes aprop o lluny de la pantalla
          //rotateY els gira sobre si mateixos, pero al tenir l'estil transform-origin:left center ho fa cap a l'esquerra quan -180deg i torna a la posicio inicial amb 0
        page.style.transform = `rotateY(-180deg) translateZ(${-i}px)`;//flip them to the left and move it towards the screen
      }
      else {
        page.style.transform = `rotateY(0) translateZ(${i}px)`;//flip them to the right and move it away of the screen (original position)
      }
    })
  }

  window.addEventListener("load", ()=>{
    setTimeout(()=>goTo('.page0'), 1500);
  })