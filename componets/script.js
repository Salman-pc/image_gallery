const displayimgcard = document.getElementById("displayimgcard");
const imageURL = document.getElementById("imageURL");
const imageTitle = document.getElementById("imageTitle");
const popupMenu = document.getElementById("popupMenu");

let account = JSON.parse(sessionStorage.getItem("logindatas")) 

    // nav3dotesbuttonclick
    const togglePopup = () => {
        popupMenu.classList.toggle("hidden");
    };

    document.addEventListener("click", (event) => {
        
        if (!popupMenu.contains(event.target) && !event.target.closest(".fa-ellipsis-vertical")) {
            popupMenu.classList.add("hidden");
        }
    });

    // Function to navigate to the main page
    const mainpages = () => {
        window.location = "index.html";
    };

    // Function to navigate to the add image page
    const gotoAddimgtogallary = () => {
        window.location = "addimg.html";
    };

    // Function to add a new image
    const Addimg = () => {
        if (imageURL.value && imageTitle.value) {
            // Retrieve existing images from sessionStorage
            let images = JSON.parse(sessionStorage.getItem("images") )|| [];

            console.log("imjh",images);
            
            // Add the new image to the array
            images.push({
                url: imageURL.value,
                title: imageTitle.value,
            });

            sessionStorage.setItem("images", JSON.stringify(images))||[];

            window.location = "index.html";
        } else {
            alert("Please Enter The Data");
        }
    };

    // Function to display images on the main page
    const displaydata = () => {

        let images = JSON.parse(sessionStorage.getItem("images"));

        // console.log(images);

        images.forEach((image,index) => {
            displayimgcard.innerHTML += `
                <div class="relative group" id="image-${index}">
                    <i class="fa-solid fa-heart hidden absolute top-2 text-2xl text-red-500 left-2"></i>

                    <img src="${image.url}" alt="Image" class="w-full h-64 object-cover rounded-lg shadow-lg">
                    <h3 class="text-center text-md text-gray-700 mt-2">${image.title}</h3>
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-lg">
                        <button onclick="favocard(${index})" class="btn-fav bg-white show hover:bg-red-600 hover:text-white text-red-500 p-2 rounded-full m-2">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <button onclick="deletecard(${index})" class="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full m-2">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
    };

    const deletecard=(imgindex)=>{
        
        console.log("delt",imgindex);
        
        let images = JSON.parse(sessionStorage.getItem("images"))

        images.splice(imgindex,1)

        sessionStorage.setItem("images", JSON.stringify(images));

        displaydata();
        window.location="index.html"
    }

    //favorite card

const favocard = (crdind) => {
    
    const heartIcon = document.querySelector(`#image-${crdind} .fa-heart`);
    const clickheartIcon =document.querySelector(`#image-${crdind} div .btn-fav`)

    // Toggle the 'hidden' class
    heartIcon.classList.toggle('hidden');
    clickheartIcon.classList.toggle('bg-red-500');
    clickheartIcon.classList.toggle('bg-white');
    clickheartIcon.classList.toggle('text-white');

};
    // Call displaydata() only if you're on the main page
    if (displayimgcard) {
        displaydata();
    }

    const DeleteAll=()=>{
        
        console.log("Delete all");
        sessionStorage.removeItem("images");
        window.location="index.html"
        
    }
    // logout
    const Logout=()=>{
        sessionStorage.removeItem('logindatas');
        window.location.href="../login.html"
    }
