class SearchParameters {
    constructor(author, category, publisher, order = 'relevance', language){
        this.author = author? `inauthor:${author}` : '';
        this.category = category? `+subject:${category}` : '';
        this.publisher = publisher? `+inpublisher:${publisher}` : '';
        this.language = language;
        this.order = order;
        this.page = 0;
        this.resultsSearch = '';
    }
     async basicSearch(){
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${this.author}${this.category}${this.publisher}&orderBy=${this.order}&langRestrict=${this.language}&printType=books&startIndex=${this.page*10}`)
        const data = await response.json();
        console.log(data.items)
        return this.showResults(data.items)
         }
    showResults = data => {
            const section2 = document.querySelector('.section2');
            section2.innerHTML = '';
            if(data){
                data.map(result=>{
                    const section = document.createElement('section');
                    section2.append(section);
                    section.innerHTML =`<h2>${result.volumeInfo.title}</h2>`;
                    if(result.volumeInfo.authors){
                        let authors = result.volumeInfo.authors.join(', ');
            
                        section.innerHTML +=`<p>Authors: ${authors}</p>`;
                    };
                    if(result.volumeInfo.categories){
                        let categories = result.volumeInfo.categories.join(', ');
                        section.innerHTML +=`<p>Categories: ${categories}</p>`;
                    };
                    let averageRating = result.volumeInfo.averageRating? result.volumeInfo.averageRating : 'Not found';
                    section.innerHTML +=`<p>Rating: ${averageRating}</p>`;
                    section.addEventListener('click', ()=>{
                        result.volumeInfo.description ? section.innerHTML += `<p>${result.volumeInfo.description}</p>` : null;
                        result.volumeInfo.imageLinks.smallThumbnail ? section.innerHTML += `<img src=${result.volumeInfo.imageLinks.smallThumbnail} />`: null;
                        result.saleInfo.listPrice ? section.innerHTML += `<p>${result.saleInfo.listPrice.amount}${result.saleInfo.listPrice.currencyCode} <a href=${result.saleInfo.buyLink} target="_blank">Buy</a></p>` : null;
                        result.volumeInfo.previewLink ? section.innerHTML += `<a href=${result.volumeInfo.previewLink} target="_blank">Read preview</a>` : null;
                        section.innerHTML += '<button onClick="author1.basicSearch()" class="return-btn">Return to search</button>'
                        section2.innerHTML = section.innerHTML;
                    });
                })
                let returnBtn = document.createElement('button');
                    returnBtn.innerText= 'Show more results'
                    returnBtn.addEventListener('click', async ()=>{
                        this.page++;
                        this.basicSearch()
                    })
                    section2.append(returnBtn)
            } else{
                    section2.innerHTML = '<p>No data found, try searching something else</p>'
                };
    }
         
}

let newSearch = ()=>{
    let author = document.querySelector('.author-input')? document.querySelector('.author-input').value : null;
    let category = document.querySelector('.category-input')?
    document.querySelector('.category-input').value : null;
    let publisher = document.querySelector('.publisher-input')?
    document.querySelector('.publisher-input').value : null;
    let language = document.querySelector('.language-input')?
    twoDigitsLanguage(document.querySelector('.language-input').value) : 'en';
    let order =  document.querySelector('#relevance').checked ?
     'relevance' : 'newest'
author1 = new SearchParameters(author, category, publisher, order, language)
author1.basicSearch()

}
document.querySelector('.advance-btn').addEventListener('click', ()=>{
    console.log(document.querySelector('#relevance').checked )
    newSearch()
})

