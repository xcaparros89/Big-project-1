let recomendations = async (category, page)=>{
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= subject:${category}&langRestrict=en&printType=books&maxResults=4`)
    let data = await response.json();
    let section2 = document.querySelector(page);
    section2.innerHTML += `
    <h2>${category}</h2>
    <div class='flex-recomendations'></div>`;
    data.items.map(result=>{
        let id = result.id;
        let section = document.createElement('section');
        document.querySelector(`${page} .flex-recomendations`).append(section);
        section.id = id;
        const infoBook = `info-book-${id}`
        section.innerHTML +=`
        <img src=${result.volumeInfo.imageLinks.smallThumbnail} />`
        document.getElementById(id).addEventListener('click', ()=>{
            section.innerHTML = `
            <div id='flex-img-info'><img src=${result.volumeInfo.imageLinks.smallThumbnail} />
            <div  id=${infoBook} class='info-book'>
            <h2 class='title-book-info'>${result.volumeInfo.title}</h2>`;
            if(JSON.parse(localStorage.getItem('currentUser'))){
                `<select id='save-${id}'>
                <option value=wannaread>Wanna read</option>
                <option value=reading>Reading</option>
                <option value=readed>Readed</option>
                </select>
                <button class='save-btn' onClick='db.addBook(document.getElementById("save-${id}").value, "${id}")'><i class="fas fa-bookmark"></i></button>
                </div>`
            }
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
            //let basicSearch;
            //if(typeof author1 !== 'undefined'){basicSearch = 'author1.basicSearch()'} else if (typeof authorB !== 'undefined'){basicSearch = 'authorB.basicSearch()'} else {basicSearch = 'categoryB.basicSearch()'}
            infoBookEl.innerHTML += `<button id="${id}" onClick='window.location.reload()'} class="return-btn">Return</button>`;
            result.volumeInfo.description ? section.innerHTML += `<p class='book-description'>${result.volumeInfo.description}</p>` : null;
            section2.innerHTML = section.innerHTML;
        });
    });
};

let getThreeRand =()=>{
    let recomendationsArr = ['Romance','Fiction', 'Fantasy', 'Suspense', 'Horror', 'Mystery', 'Historical', 'Science-Fiction','Humor', 'Nonfiction', 'Poetry', 'Food'];
    let newRecomendationsArr = [];
    while(newRecomendationsArr.length<4){
            var rand = Math.floor(Math.random() * (recomendationsArr.length));
            !newRecomendationsArr.includes(recomendationsArr[rand]) ? newRecomendationsArr.push(recomendationsArr[rand]) : null;
    }
    return newRecomendationsArr;
};

let randomThree = getThreeRand();

     recomendations(randomThree[0], '.basic-recomendations');
     recomendations(randomThree[1], '.advance-recomendations');
     if(!localStorage.getItem('currentUser')){recomendations(randomThree[2], '#recomendations3');}
     recomendations(randomThree[3], '#recomendations4');
