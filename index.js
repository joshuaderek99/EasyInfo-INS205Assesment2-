//blah



const API_KEY = "AIzaSyAEWPx9Wf7X5gip6--4j8bCcUuxhm37tXM";



async function fetchData(){
    
    try{

        const searchQuery = document.getElementById("searchbar").value.toLowerCase();

        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`);

        if(!response.ok){
            throw new Error("Could not fetch response.");
        }

        const data = await response.json();

        const resultsContainer = document.getElementById("resultsContainer");
        resultsContainer.innerHTML = "";

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const channel = item.snippet.channelTitle;

            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';

            videoCard.innerHTML = `
                <div class = "iframe-wrapper">
                    <iframe>
                        src="https://www.youtube.come/embed/${videoId}"
                        title = "${title}"
                        frameborder = "0"
                        allow = "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                <h3>${title}</h3>
                <p class ="channel-name">${channel}</p>
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
    }
}
