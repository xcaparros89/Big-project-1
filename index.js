
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

findBooks(searchString)

//intitle: Returns results where the text following this keyword is found in the title.
//inauthor: Returns results where the text following this keyword is found in the author.
//inpublisher: Returns results where the text following this keyword is found in the publisher.
//subject:


//apuntarse ids en vez de nombres para likes i dislikes
// isbn per asegurar-se que surtin llibres diferents (industry identifier)