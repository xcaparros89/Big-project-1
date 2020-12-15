let searchObj

class SearchParameters {
    //we need the info from the search inputs
    constructor(searchString, recomendationSection, numResults){
        this.searchString = searchString;
        this.page = 0;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.recomendationSection = document.querySelector(recomendationSection);
        this.numResults = numResults? numResults : screen.width < 826 ? 4 : 8;
        this.bookArr = '';
    }
    //we make a fetch with the info
     async fetchArrayBooks(){
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${this.searchString}&printType=books&maxResults=${this.numResults}&startIndex=${this.page*10}`)
        console.log(`https://www.googleapis.com/books/v1/volumes?q= ${this.searchString}&printType=books&maxResults=${this.numResults}&startIndex=${this.page*10}`)
        const data = await response.json();
        //retorna un obj amb nomes la info que necesites en comtes de tot
        this.bookArr = data.items;
         }
    //we show the results of the fetch in the page
    showResults() {
            this.recomendationSection.innerHTML = '';
            if(this.bookArr){
                this.bookArr.map(result=>{
                    const {id, volumeInfo} = result;
                    const section = document.createElement('section');
                    section.id = id;
                    const title = document.createElement('h3');
                    title.innerText = volumeInfo.title;
                    this.recomendationSection.append(title);
                    this.recomendationSection.append(section);
                    const infoBook = `info-book-${id}`
                    if(this.user){
                        section.innerHTML +=`       
                    <select id='save-${id}'><option value=wannaread>Wanna read</option><option value=reading>Reading</option><option value=readed>Readed</option></select>
                    <button class='save-btn' onClick='db.addBook(document.getElementById("save-${id}").value, "${id}")'><i class="fas fa-bookmark"></i></button>`;
                    }
                    title.addEventListener('click', ()=>this.showOneBook(result));
                })
                let returnBtn = document.createElement('button');
                    returnBtn.innerText= 'Show more results';
                    returnBtn.setAttribute('class', 'more-btn');
                    returnBtn.addEventListener('click', async ()=>{
                        this.page++;
                        await this.fetchArrayBooks();
                        this.showResults();
                    })
                    this.recomendationSection.append(returnBtn);
            } else{
                this.recomendationSection.innerHTML = '<p>No data found, try searching something else</p>'
                }
    }
    showOneBook(result){
        const {id, volumeInfo, saleInfo} = result;
        this.recomendationSection.innerHTML = `<h2 class='title-book-info'>${volumeInfo.title}</h2><div id='flex-img-info'><img src=${volumeInfo.imageLinks.smallThumbnail} /><div  id='info-book-${id}' class='info-book'></div></div>`;
        let infoBookEl = document.getElementById(`info-book-${id}`);
        if(this.user){infoBookEl.innerHTML +=
        `<select id='save-${id}'><option value=wannaread>Wanna read</option><option value=reading>Reading</option><option value=readed>Readed</option></select>
        <button class='save-btn' onClick='db.addBook(document.getElementById("save-${id}").value, "${id}")'><i class="fas fa-bookmark"></i></button>
        `;}
        if(volumeInfo.authors) infoBookEl.innerHTML +=`<p>Authors: ${volumeInfo.authors.join(', ')}</p>`;
        if(volumeInfo.categories) infoBookEl.innerHTML +=`<p>Categories: ${volumeInfo.categories.join(', ')}</p>`;
        infoBookEl.innerHTML += volumeInfo.averageRating? `<p>Rating: ${volumeInfo.averageRating}<p>` : '<p>Not found</p>';
        if(saleInfo.listPrice) infoBookEl.innerHTML += `<p>${saleInfo.listPrice.amount}${saleInfo.listPrice.currencyCode} <a href=${saleInfo.buyLink} target="_blank">Buy</a></p>`;
        if(volumeInfo.previewLink) infoBookEl.innerHTML += `<a href=${volumeInfo.previewLink} target="_blank">Read preview</a>`;
        infoBookEl.innerHTML += `<button id="${id}" onClick=${'console.log(searchObj.showResults())'} class="return-btn">Return</button>`;
        if(volumeInfo.description) this.recomendationSection.innerHTML += `<p class='book-description'>${volumeInfo.description}</p>`;
    }
}
//SEARCH

let search = async (type, section, numberResults = null)=>{
    let searchString ='';
    let searchObj
    //Advance search
if(type === 'advance'){
    searchString += document.querySelector('.author-input').value? `+inauthor:${document.querySelector('.author-input').value}` : '';
    searchString += document.querySelector('.category-input').value? `+subject:${document.querySelector('.category-input').value}` : '';
    searchString += document.querySelector('.publisher-input').value?`+inpublisher:${document.querySelector('.publisher-input').value}` : '';
    searchString += document.querySelector('.language-input').value? `&langRestrict=${twoDigitsLanguage(document.querySelector('.language-input').value)}` : '&langRestrict=en';
    searchString += document.querySelector('#relevance').checked ?'&orderBy=relevance' : '&orderBy=newest';
    //Basic search by author
} else if(type === 'author'){
    searchString = `inauthor:${document.querySelector('.author-input-b').value}&orderBy=relevance&langRestrict=en`;
    //Basic search by category
}else if(type ==='category'){
    searchString = `subject:${document.querySelector('.category-input-b').value}&orderBy=relevance&langRestrict=en`;
}else{
    searchString = `subject:${searchString}&orderBy=relevance&langRestrict=en`;
}
    searchObj = new SearchParameters(searchString, section, numberResults);
    await searchObj.fetchArrayBooks();
    searchObj.showResults();
    return searchObj
};

//Add search function to buttons
document.querySelector('.advance-btn').addEventListener('click', async ()=>{
    searchObj = await search('advance','.advance-recomendations')
});
document.querySelector('.author-btn-b').addEventListener('click', async ()=>{
    searchObj = await search('author','.basic-recomendations');
    console.log(searchObj)
    });
document.querySelector('.category-btn-b').addEventListener('click', async ()=>{
    searchObj = await search('category','.basic-recomendations');
    });

window.addEventListener("load", ()=>{
    if(screen.width<652){document.querySelectorAll('.btn-b').forEach(button=> button.innerHTML = '<i class="fas fa-search"></i>')}
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