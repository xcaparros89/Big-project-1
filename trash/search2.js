let page = 0;

async function search(author, category, publisher, order){
const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${author}${category}${publisher}&orderBy=${order}&langRestrict=en&printType=books&startIndex=${page*10}`)
const data = await response.json();
return data.items
    }
    
document.querySelector('.advance-btn').addEventListener('click', async ()=>{
let author = document.querySelector('.author-input')? `inauthor:${document.querySelector('.author-input').value}` : null;
let category = document.querySelector('.category-input')?
`+subject:${document.querySelector('.category-input').value}` : null;
let publisher = document.querySelector('.publisher-input')?
`+inpublisher:${document.querySelector('.publisher-input').value}` : null;
// let language = document.querySelector('.language-input')?
// document.querySelector('.language-input').value : 'en';
let order =  document.querySelector('#relevance').checked ?
    'relevance' : 'newest';
let resultsSearch = await search(author, category, publisher, order);
console.log(author, category, publisher, order, page)
console.log(resultsSearch)
})
