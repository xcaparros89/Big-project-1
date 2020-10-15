let recomendations = async (category, page)=>{
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= subject:${category}&langRestrict=en&printType=books&maxResults=6`)
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
        section.innerHTML +=`
        <img src=${result.volumeInfo.imageLinks.smallThumbnail} />`
        document.getElementById(id).addEventListener('click', ()=>{
            result.volumeInfo.title ? section.innerHTML += `<p>${result.volumeInfo.title}</p>` : null;
            result.volumeInfo.description ? section.innerHTML += `<p>${result.volumeInfo.description}</p>` : null;
            result.saleInfo.listPrice ? section.innerHTML += `<p>${result.saleInfo.listPrice.amount}${result.saleInfo.listPrice.currencyCode} <a href=${result.saleInfo.buyLink} target="_blank">Buy</a></p>` : null;
            result.volumeInfo.previewLink ? section.innerHTML += `<a href=${result.volumeInfo.previewLink} target="_blank">Read preview</a>` : null;
            section.innerHTML += '<button onClick="window.location.reload();" class="return-btn">Return</button>';
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
