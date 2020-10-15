let bookPage = (result)=>{
    console.log(JSON.parse(result).volumeInfo.authors);
};

class SearchParameters {
    constructor(author, category, publisher, order, language){
        this.author = author? `inauthor:${author}` : '';
        this.category = category? `+subject:${category}` : '';
        this.publisher = publisher? `+inpublisher:${publisher}` : '';
        this.language = language ? language : 'en';
        this.order = order? order : 'relevance';
        this.page = 0;
        this.resultsSearch = '';
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
     async basicSearch(){
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${this.author}${this.category}${this.publisher}&orderBy=${this.order}&langRestrict=${this.language}&printType=books&maxResults=8&startIndex=${this.page*10}`)
        const data = await response.json();
        console.log('fetch1', data.items)
        return this.showResults(data.items)
         }

    showResults(data) {
            this.resultsSearch = data;
            const section2 = document.querySelector('.section2');
            section2.innerHTML = '';
            if(data){
                data.map(result=>{
                    const resultObj = result;
                    const id = result.id;
                    const section = document.createElement('section');
                    section.id = id;
                    const title = document.createElement('h3');
                    title.innerText = result.volumeInfo.title;
                    section2.append(title);
                    section2.append(section);
                    if(this.user){
                        section.innerHTML +=`
                    <h3 onClick='bookPage(JSON.stringify(resultObj))'>hi</h3>            
                    <select id='save-${id}'>
                        <option value=wannaread>Wanna read</option>
                        <option value=reading>Reading</option>
                        <option value=readed>Readed</option>
                    </select>
                    <button onClick='db.addBook(document.getElementById("save-${id}").value, "${id}")'>save</button>`;
                    }
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
                    title.addEventListener('click', ()=>{
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

//Advance search button
if(document.querySelector('.advance-btn')){
    document.querySelector('.advance-btn').addEventListener('click', ()=>{
        console.log(document.querySelector('#relevance').checked )
        newSearch()
    })
}

//AUTHOR SEARCH
if(document.querySelector('.author-btn-b')){
    console.log('hi')
    let authorBtn = document.querySelector('.author-btn-b');
    let author = document.querySelector('.author-input').value;
    authorB = new SearchParameters(author, null, null, null, null, null)
    authorBtn.addEventListener('click', async ()=>{
        console.log('bye')
        resultsSearch = await authorB.basicSearch();
    })
}

//CATEGORY SEARCH
if(document.querySelector('.category-btn-b')){
    let categoryBtn = document.querySelector('.category-btn-b');
    let category = document.querySelector('.category-input').value;
    categoryB = new SearchParameters(null, category, null, null, null, null)
    categoryBtn.addEventListener('click', async ()=>{
        let resultsSearch = await categoryB.basicSearch();
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