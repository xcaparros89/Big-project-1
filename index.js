

// let page = 0;


// //BASIC SEARCH
// let basicSearch = async (searchString)=>{
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${searchString}&langRestrict=en&printType=books&startIndex=${page*10}`)
//     const data = await response.json();
//     console.log(data.items)
//     return data.items;
// }
// let resultsSearch
// page=0;
// let myFunction = async()=>{
//     resultsSearch = await basicSearch('inauthor:'+authorInput.value);
//     console.log(resultsSearch)
//     showResults(resultsSearch)
// }
// //AUTHOR SEARCH
// let authorBtn = document.querySelector('.author-btn');
// let authorInput = document.querySelector('.author-input');

// authorBtn.addEventListener('click', async ()=>{
//     resultsSearch = await basicSearch('inauthor:'+authorInput.value);
//     console.log(resultsSearch)
//     showResults(resultsSearch)
// })

// //CATEGORY SEARCH
// let categoryBtn = document.querySelector('.category-btn');
// let categoryInput = document.querySelector('.category-input');
// page=0;
// categoryBtn.addEventListener('click', async ()=>{
//     let resultsSearch = await basicSearch('subject:'+categoryInput.value);
//     console.log(resultsSearch)
//     showResults(resultsSearch)
// })

// let showResults = data => {
//     const section2 = document.querySelector('.section2');
//     section2.innerHTML = '';
//     if(data){
//     data.map(result=>{
//         const section = document.createElement('section');
//         section2.append(section);
//         section.innerHTML =`
//             <div class='like-nav'> <button class='dismiss'>
//                 <i class="fas fa-heart"></i>
//             </button>
//             <h2>${result.volumeInfo.title}</h2>
//             <button class='save'>
//                 <i class="fas fa-heart-broken"></i>
//             </button>`;
//         if(result.volumeInfo.authors){
//             let authors = result.volumeInfo.authors.join(', ');

//             section.innerHTML +=`<p>Authors: ${authors}</p>`;
//         };
//         if(result.volumeInfo.categories){
//             let categories = result.volumeInfo.categories.join(', ');
//             section.innerHTML +=`<p>Categories: ${categories}</p>`;
//         };
//         let averageRating = result.volumeInfo.averageRating? result.volumeInfo.averageRating : 'Not found';
//         section.innerHTML +=`<p>Rating: ${averageRating}</p>`;
//         section.addEventListener('click', ()=>{
//             result.volumeInfo.description ? section.innerHTML += `<p>${result.volumeInfo.description}</p>` : null;
//             result.volumeInfo.imageLinks.smallThumbnail ? section.innerHTML += `<img src=${result.volumeInfo.imageLinks.smallThumbnail} />`: null;
//             result.saleInfo.listPrice ? section.innerHTML += `<p>${result.saleInfo.listPrice.amount}${result.saleInfo.listPrice.currencyCode} <a href=${result.saleInfo.buyLink} target="_blank">Buy</a></p>` : null;
//             result.volumeInfo.previewLink ? section.innerHTML += `<a href=${result.volumeInfo.previewLink} target="_blank">Read preview</a>` : null;
//             section.innerHTML += '<button onClick="myFunction()" class="return-btn">Return to search</button>'
//             section2.innerHTML = section.innerHTML;
//         });
//     })
//     let returnBtn = document.createElement('button');
//         returnBtn.innerText= 'Show more results'
//         returnBtn.addEventListener('click', async ()=>{
//             page++;
//             resultsSearch = await basicSearch('inauthor:'+authorInput.value);
//             console.log(resultsSearch)
//             showResults(resultsSearch)
//         })
//         section2.append(returnBtn)
// } else{
//         section2.innerHTML = '<p>No data found, try searching something else</p>'
//     };
// };

// window.addEventListener("load", ()=>{
//     if(localStorage.getItem('currentUser')){
//         document.querySelector('#login-link').innerText = 'My page';
//         document.querySelector('#sign-up-link').remove();
//         let button = document.createElement('button');
//         button.addEventListener('click', ()=>{
//             localStorage.removeItem('currentUser');
//             window.location.reload();
//         });
//         button.innerHTML = 'Log off';
//         document.querySelector('#nav-buttons').append(button);
//     }
//     } ); 

    
//intitle: Returns results where the text following this keyword is found in the title.
//inauthor: Returns results where the text following this keyword is found in the author.
//inpublisher: Returns results where the text following this keyword is found in the publisher.
//subject:
// startIndex - The position in the collection at which to start. The index of the first item is 0.
// maxResults - The maximum number of results to return. The default is 10, and the maximum allowable value is 40.
//langRestrict=en / es / fr /...


//apuntarse ids en vez de nombres para likes i dislikes
// isbn per asegurar-se que surtin llibres diferents (industry identifier)
//orderBy=newest