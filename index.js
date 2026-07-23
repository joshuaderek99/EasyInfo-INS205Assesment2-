//blah



const API_KEY = "AIzaSyAEWPx9Wf7X5gip6--4j8bCcUuxhm37tXM";


//im sooooo tired :(

async function fetchData(){
    const searchQuery = document.getElementById("searchbar").value.toLowerCase();
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = `<p class="info-text">Searching for Videos...</p>`
    try{


        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`);

        if(!response.ok){
            throw new Error("Could not fetch response.");
        }

        const data = await response.json();

        resultsContainer.innerHTML = "";

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const channel = item.snippet.channelTitle;
            const thumbnailUrl = item.snippet.thumbnails.high.url;

            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';

            videoCard.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${videoId}"  target="_blank" rel="onopener noreferrer" class="video-link">
                    <div class="thumbnail-container">
                        <img src="${thumbnailUrl}" alt="${title}">
                        <span class="play-badge">Watch</span>
                    </div>

                    <div class="video-info">
                        <h3 class="video-title">${title}</h3>
                        <p class="channel-name">${channel}</p> 
                </a>
          
                `;
            
            resultsContainer.appendChild(videoCard);
            
            
            
            console.log(`Title:${item.snippet.title}`);
            console.log(`Video ID: ${item.id.videoId}`);
            console.log(`Thumbnail: ${item.snippet.thumbnails.default.url}`);
            console.log('-----------')
        });
        
        
        console.log(data);
        
    }
    
    catch(error){
        console.error(error);
        resultsContainer.innerHTML= `<p class="info-text">Failed to load Videos, Check connection or Change Browser and Try Again</p>`
    }
    finally{
        searchBooks(searchQuery);
    }
}

// for the books

async function searchBooks(searchQuery){
    const booksContainer = document.getElementById("booksContainer")
    booksContainer.innerHTML = `<p class="info-text">Searching for books</p>`
    try{

        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=50`);
        const bookdata = await response.json();


        booksContainer.innerHTML="";
        if(!bookdata.docs || bookdata.docs.length===0){
            booksContainer.innerHTML =`<p class="info-text">Books not Found</p>`
            return;
        }

        console.log(bookdata.docs)
        console.log(bookdata)
        bookdata.docs.forEach(book=>{
            const title = book.title;
            const author = book.author_name ? book.author_name[0] : "Unknown Author";
            const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover";

            const bookCard = document.createElement("div");
            bookCard.className = "video-card";

            bookCard.innerHTML=`
            <div class = thumbnail-container>
                <img src="${coverUrl}" alt="${title}" class = "video-thumbnail">
            </div>
            <div class="video-info">
                <h3 class="video-title">${title}</h3>
                <p class="channel-name">${author}</p>
            </div>
            `;

            booksContainer.appendChild(bookCard)
            
        })       
    }

    catch(error){
        console.error(error);
        booksContainer.innerHTML = `<p class="info-text">Failed to load books, check internet connection or change browser and try again</p>`
    }
}

//(T_T) finally