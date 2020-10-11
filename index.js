
let searchString = '';
let makeSearchString = (kind, string)=>{
    searchString += `+${kind}${string}`;
}

let findBooks = (searchString)=>{
    fetch(`https://www.googleapis.com/books/v1/volumes?q= ${searchString}`).then(response => response.json()).then(data=>console.log(data))
}

array = [['intitle:', 'final empire'],['inauthor:', 'Sanderson']]

array.forEach(arr=>{
    makeSearchString(arr[0], arr[1])
})

//findBooks(searchString)

//BASIC SEARCH
let basicSearch = async (searchString)=>{
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q= ${searchString}&langRestrict=en&printType=books`)
    const data = await response.json();
    console.log(data.items)
    return data.items;
}

//AUTHOR SEARCH
let authorBtn = document.querySelector('.author-btn');
let authorInput = document.querySelector('.author-input');
authorBtn.addEventListener('click', async ()=>{
    let results = await basicSearch('inauthor:'+authorInput.value);
    console.log(results)
    showResults(results)
})

//CATEGORY SEARCH
let categoryBtn = document.querySelector('.category-btn');
let categoryInput = document.querySelector('.category-input');
categoryBtn.addEventListener('click', async ()=>{
    let results = await basicSearch('subject:'+categoryInput.value);
    console.log(results)
    showResults(results)
})

let showResults = data => {
    const section2 = document.querySelector('.section2');
    section2.innerHTML = '';
    data.map(result=>{
        const section = document.createElement('section');
        section2.append(section);
        section.innerHTML =`<h2>${result.volumeInfo.title}</h2>`;
        if(result.volumeInfo.authors){
            let authors = result.volumeInfo.authors.join(', ');

            section.innerHTML +=`<p>Authors: ${authors}</p>`;
        }
        result.volumeInfo.description ? section.innerHTML += `<p>${result.volumeInfo.description}</p>` : null;
    });
};


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