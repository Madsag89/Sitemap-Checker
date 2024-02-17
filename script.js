// async function fetchSitemap() {
//     const sitemapUrl = document.getElementById('sitemapUrl').value;
//     const apiUrl = `http://localhost:5501/fetch-sitemap?url=${encodeURIComponent(sitemapUrl)}`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.text();
//         displayUrls(data); // Assuming you'll adjust displayUrls to handle the data
//     } catch (error) {
//         console.error('Error fetching the sitemap:', error);
//     }
// }

// function displayUrls(sitemapContent) {
//     // Placeholder: Implement according to how you want to parse and display the URLs
//     console.log(sitemapContent); // Log the sitemap content for now
// }



// async function fetchSitemap() {
//     const sitemapUrl = document.getElementById('sitemapUrl').value;
//     const apiUrl = `http://localhost:5501/fetch-sitemap?url=${encodeURIComponent(sitemapUrl)}`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.text();
//         displayUrls(data);
//     } catch (error) {
//         console.error('Error fetching the sitemap:', error);
//     }
// }

// function displayUrls(sitemapContent) {
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(sitemapContent, "text/xml");
//     const urls = xmlDoc.querySelectorAll('url > loc');
//     const container = document.getElementById('urlsContainer');
//     container.innerHTML = ''; // Clear previous content

//     urls.forEach(url => {
//         const div = document.createElement('div');
//         div.textContent = url.textContent;
//         container.appendChild(div);
//     });
// }




// async function fetchSitemap() {
//     const sitemapUrl = document.getElementById('sitemapUrl').value;
//     const apiUrl = `http://localhost:5501/fetch-sitemap?url=${encodeURIComponent(sitemapUrl)}`;
//     document.getElementById('loader').style.display = 'block';
//     loadingIndicator.style.display = 'block'; // Show loading indicator
//     console.log(`Fetching sitemap from: ${apiUrl}`); // Log the API URL

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.text();
//         console.log('Sitemap fetched successfully:', data); // Log the fetched data
//         displayUrls(data);
//         document.getElementById('loader').style.display = 'none';
//     } catch (error) {
//         console.error('Error fetching the sitemap:', error);
//         document.getElementById('loader').style.display = 'none';
//     } finally {
//         loadingIndicator.style.display = 'none'; // Hide loading indicator
//     }
// }


async function fetchSitemap() {
    const sitemapUrl = document.getElementById('sitemapUrl').value;
    const apiUrl = `/.netlify/functions/fetch-sitemap?url=${encodeURIComponent(sitemapUrl)}`;
    // const apiUrl = `https://sitemap-checker-maj.netlify.app//fetch-sitemap?url=${encodeURIComponent(sitemapUrl)}`;
     console.log(`Fetching sitemap from: ${apiUrl}`);

    showSpinner(); // Show the spinner before starting the fetch operation

    try {
        const response = await fetch(apiUrl);
        const data = await response.text();
        displayUrls(data); // Assume this function exists to handle displaying URLs
    } catch (error) {
        console.error('Error fetching the sitemap:', error);
    } finally {
        hideSpinner(); // Hide the spinner once the operation is complete
    }
}

function showSpinner() {
    document.getElementById('spinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}

function showSpinner(shouldShow) {
    const spinner = document.getElementById('spinner');
    if (spinner) { // Check if the spinner element exists
        spinner.style.display = shouldShow ? 'block' : 'none';
    } else {
        console.error('Spinner element not found');
    }
}

function displayUrls(sitemapContent) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapContent, "text/xml");
    const urls = xmlDoc.querySelectorAll('url > loc');
    console.log(`Found ${urls.length} URLs`); // Log the number of URLs found

    const container = document.getElementById('urlsContainer');
    container.innerHTML = ''; // Clear previous content

    urls.forEach(url => {
        console.log(url.textContent); // Log each URL
        const div = document.createElement('div');
        div.textContent = url.textContent;
        container.appendChild(div);
    });
}



//Download URLS

function downloadUrls() {
    const container = document.getElementById('urlsContainer');
    const urls = container.querySelectorAll('div'); // Assuming each URL is in its own div as per your display logic
    let urlText = '';
    
    urls.forEach(div => {
        urlText += `${div.textContent}\n`; // Create a newline-separated string of URLs
    });
    
    // Create a Blob from the URL text
    const blob = new Blob([urlText], { type: 'text/plain' });
    
    // Create an invisible anchor element to trigger the download
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'urls.txt'; // Name of the file to be downloaded
    document.body.appendChild(anchor); // Append to the document
    anchor.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(anchor); // Clean up
}

//Download URLS

function formatUrls() {
    const container = document.getElementById('urlsContainer');
    const urls = container.querySelectorAll('div'); // Assuming each URL is in its own <div>

    urls.forEach(urlElement => {
        // Example formatting: Trim and decode URI
        let formattedUrl = decodeURIComponent(urlElement.textContent.trim());

        // Here you can add additional formatting as needed
        // For example, removing query parameters: formattedUrl = formattedUrl.split('?')[0];

        urlElement.textContent = formattedUrl;
    });
}


