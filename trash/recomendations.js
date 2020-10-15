let recomendations = async (category)=>{
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= subject:${category}&langRestrict=en&printType=books&maxResults=3`)
    const data = await response.json();
    const section2 = document.querySelector('.section2');
    section2.innerHTML += `
    <h2>${category}</h2>`;
    data.items.map(result=>{
        const id = result.id;
        const section = document.createElement('section');
        console.log(result);
        section.id = id;
        section2.append(section);
        section.innerHTML +=`
        <p>${result.volumeInfo.title}</p>
        <img src=${result.volumeInfo.imageLinks.smallThumbnail} />`
        document.getElementById(id).addEventListener('click', ()=>{
            result.volumeInfo.description ? section.innerHTML += `<p>${result.volumeInfo.description}</p>` : null;
            result.saleInfo.listPrice ? section.innerHTML += `<p>${result.saleInfo.listPrice.amount}${result.saleInfo.listPrice.currencyCode} <a href=${result.saleInfo.buyLink} target="_blank">Buy</a></p>` : null;
            result.volumeInfo.previewLink ? section.innerHTML += `<a href=${result.volumeInfo.previewLink} target="_blank">Read preview</a>` : null;
            section.innerHTML += '<button onClick="window.location.reload();" class="return-btn">Return</button>';
            section2.innerHTML = section.innerHTML;
        });
    });
};

let getThreeRand =()=>{
    let recomendationsArr = ['Romance','Fiction', 'Fantasy', 'Suspense', 'Horror', 'Mystery', 'Science Fiction','Humor', 'Nonfiction', 'Poetry', 'Food'];
    let newRecomendationsArr = [];
    while(newRecomendationsArr.length<3){
            var rand = Math.floor(Math.random() * (recomendationsArr.length));
            !newRecomendationsArr.includes(recomendationsArr[rand]) ? newRecomendationsArr.push(recomendationsArr[rand]) : null;
            console.log(newRecomendationsArr, 'newArr');
    }
    return newRecomendationsArr;
};
let randomThree = getThreeRand();

    recomendations(randomThree[0]);
    recomendations(randomThree[1]);
