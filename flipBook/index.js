const pages = Array.from(document.querySelectorAll(".page"));
const book = document.querySelector(".book");
let leftStack = [];
let rightStack = Array.from(pages).reverse(); // [p3,p2,p1,p0]
let toTheLeft = document.querySelector('.to-the-left');
let toTheRight = document.querySelector('.to-the-right');

updatePagesDepth(rightStack);

toTheLeft.addEventListener('click',()=>{
  if(leftStack.length){
    const page = leftStack.pop();
    rightStack.push(page);
    updatePagesDepth(rightStack);
  }
})
toTheRight.addEventListener('click',()=>{
  if(rightStack.length){
    const page = rightStack.pop();
    leftStack.push(page);
    updatePagesDepth(leftStack);
  }
})

function updatePagesDepth(stack) {
    console.log(stack.length)
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




  // pages.forEach(page=>{
  //   let toThe = document.querySelector('.to-the');
  //   toThe.addEventListener("click", function(e){
  //     //change position of page from flipped to normal
  //     if (e.currentTarget.classList.contains("flipped")) { 
  //       console.log('flipped')
  //       const page = leftStack.pop();
  //       rightStack.push(page);
  //       toThe.classList.remove("flipped");
  //       updatePagesDepth(rightStack);
  //     }
  //     //change position of page from normal to flipped
  //     else {
  //       console.log('normal')
  //       const page = rightStack.pop();
  //       leftStack.push(page);
  //       toThe.classList.add("flipped");
  //       updatePagesDepth(leftStack);
  //     }
  //   });
  // })
  