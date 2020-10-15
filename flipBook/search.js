class SearchParameters {
    constructor(author, category, publisher, order, language, recomendationSection){
        this.author = author? `inauthor:${author}` : '';
        this.category = category? `+subject:${category}` : '';
        this.publisher = publisher? `+inpublisher:${publisher}` : '';
        this.language = language ? language : 'en';
        this.order = order? order : 'relevance';
        this.page = 0;
        this.resultsSearch = '';
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.recomendationSection = recomendationSection
    }
     async basicSearch(){
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${this.author}${this.category}${this.publisher}&orderBy=${this.order}&langRestrict=${this.language}&printType=books&maxResults=8&startIndex=${this.page*10}`)
        console.log(`https://www.googleapis.com/books/v1/volumes?q= ${this.author}${this.category}${this.publisher}&orderBy=${this.order}&langRestrict=${this.language}&printType=books&maxResults=8&startIndex=${this.page*10}`)
        const data = await response.json();
        return this.showResults(data.items)
         }

    showResults(data) {
            this.resultsSearch = data;
            const section2 = document.querySelector(this.recomendationSection);
            section2.innerHTML = '';
            if(data){
                data.map(result=>{
                    const id = result.id;
                    const section = document.createElement('section');
                    section.id = id;
                    const title = document.createElement('h3');
                    title.innerText = result.volumeInfo.title;
                    section2.append(title);
                    section2.append(section);
                    const infoBook = `info-book-${id}`
                    if(this.user){
                        section.innerHTML +=`            
                    <select id='save-${id}'>
                        <option value=wannaread>Wanna read</option>
                        <option value=reading>Reading</option>
                        <option value=readed>Readed</option>
                    </select>
                    <button onClick='db.addBook(document.getElementById("save-${id}").value, "${id}")'>save</button>`;
                    }
                    title.addEventListener('click', ()=>{
                        result.volumeInfo.imageLinks.smallThumbnail ? section.innerHTML = `<div id='flex-img-info'><img src=${result.volumeInfo.imageLinks.smallThumbnail} />
                        <div  id=${infoBook} class='info-book'>
                        <h2 class='title-book-info'>${result.volumeInfo.title}</h2>
                        <select id='save-${id}'>
                        <option value=wannaread>Wanna read</option>
                        <option value=reading>Reading</option>
                        <option value=readed>Readed</option>
                        </select>
                        <button onClick='db.addBook(document.getElementById("save-${id}").value, "${id}")'>save</button>
                        </div>`: 
                        `<div  id=${infoBook} class='info-book'></div><div>`;
                        let infoBookEl = document.getElementById(infoBook)
                        if(result.volumeInfo.authors){
                            let authors = result.volumeInfo.authors.join(', ');
                            infoBookEl.innerHTML +=`<p>Authors: ${authors}</p>`;
                        };
                        if(result.volumeInfo.categories){
                            let categories = result.volumeInfo.categories.join(', ');
                            infoBookEl.innerHTML +=`<p>Categories: ${categories}</p>`;
                        };
                        result.volumeInfo.averageRating? result.volumeInfo.averageRating : 'Not found';
                        result.saleInfo.listPrice ? infoBookEl.innerHTML += `<p>${result.saleInfo.listPrice.amount}${result.saleInfo.listPrice.currencyCode} <a href=${result.saleInfo.buyLink} target="_blank">Buy</a></p>` : null;
                        result.volumeInfo.previewLink ? infoBookEl.innerHTML += `<a href=${result.volumeInfo.previewLink} target="_blank">Read preview</a>` : null;
                        let basicSearch;
                        if(typeof author1 !== 'undefined'){basicSearch = 'author1.basicSearch()'} else if (typeof authorB !== 'undefined'){basicSearch = 'authorB.basicSearch()'} else {basicSearch = 'categoryB.basicSearch()'}
                        infoBookEl.innerHTML += `<button id="${id}" onClick=${basicSearch} class="return-btn">Return to search</button>`;
                        result.volumeInfo.description ? section.innerHTML += `<p class='book-description'>${result.volumeInfo.description}</p>` : null;
                        section2.innerHTML = section.innerHTML
                    });
                })
                let returnBtn = document.createElement('button');
                    returnBtn.innerText= 'Show more results'
                    returnBtn.setAttribute('class', 'return-btn')
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
author1 = new SearchParameters(author, category, publisher, order, language, '.advance-recomendations')
author1.basicSearch()
}

//Advance search button
if(document.querySelector('.advance-btn')){
    document.querySelector('.advance-btn').addEventListener('click', ()=>{
        newSearch()
    })
}

//AUTHOR SEARCH
if(document.querySelector('.author-btn-b')){
    let authorBtn = document.querySelector('.author-btn-b');
    let author = document.querySelector('.author-input-b').value;
    authorB = new SearchParameters(author, null, null, null, null, '.basic-recomendations')
    authorBtn.addEventListener('click', async ()=>{
        authorB.author = `inauthor:${document.querySelector('.author-input-b').value}`;
        authorB.page = 0;
        await authorB.basicSearch();
    })
}

//CATEGORY SEARCH
if(document.querySelector('.category-btn-b')){
    let categoryBtn = document.querySelector('.category-btn-b');
    let category = document.querySelector('.category-input-b').value;
    categoryB = new SearchParameters(null, category, null, null, null, '.basic-recomendations')
    categoryBtn.addEventListener('click', async ()=>{
        categoryB.category = `subject:${document.querySelector('.category-input-b').value}`;
        categoryB.page = 0;
        await categoryB.basicSearch();
    })
}

window.addEventListener("load", ()=>{
    if(localStorage.getItem('currentUser')){
        document.querySelector('#login-link').innerText = 'My page';
        document.querySelector('#sign-up-link').remove();
        let button = document.createElement('button');
        button.addEventListener('click', ()=>{
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
        button.innerHTML = 'Log off';
        document.querySelector('#nav-buttons').append(button);
    }
    } ); 