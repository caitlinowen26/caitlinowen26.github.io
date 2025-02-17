(() => {
	const fetchBookCover = async () => {
		try {
			const response = await fetch(
				"https://covers.openlibrary.org/b/isbn/0316769177-L.jpg"
			);
			if (!response.ok) return;

			document.querySelector(".cover-art").style.cssText = `
        background: url(${response.url}) center/cover no-repeat;
        width: 100%;
        height: 100%;
      `;
		} catch (error) {
			console.error("Error fetching book cover:", error);
		}
	};

	document.addEventListener("DOMContentLoaded", fetchBookCover);
})();

/*
(() => {
    const setBookCover = () => {
      const imageFileName = "book.png"; // Replace with your image file name
      const imagePath = `./images/${imageFileName}`; // Adjust path if needed
  
      document.querySelector(".cover-art").style.cssText = `
        background: url('${imagePath}') center/cover no-repeat;
        width: 100%;
        height: 100%;
      `;
    };
  
    document.addEventListener("DOMContentLoaded", setBookCover);
  })();
*/
