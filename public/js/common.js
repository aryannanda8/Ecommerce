let userDataElem = document.getElementById('userData');

let user = userDataElem.getAttribute('current-user-data');


const allLikeButton = document.querySelectorAll('.like-btn');

const likeButton = async (productId, btn) => {
  try {
    if (user) {
      let response = await axios({
        method: 'post',
        url: `/product/${productId}/like`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
    }
    else {
      // User is not logged in, store like in local storage
      let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
      if (!likedProducts.includes(productId)) {
        likedProducts.push(productId);
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
      }
    }
    // Toggle heart icon class
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fas')) {
      icon.classList.remove('fas');
      icon.classList.add('far');
    } else {
      icon.classList.remove('far');
      icon.classList.add('fas');
    }


    // console.log(window.user);
  } catch (e) {
    console.log(e, 'error');
  }
};

for (let btn of allLikeButton) {
  btn.addEventListener('click', () => {
    let productId = btn.getAttribute('product-id');
    console.log('Button clicked, productId:', productId);
    likeButton(productId, btn);
  });
}

function isProductLiked(productId) {
  // Retrieve liked products from localStorage
  let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
  // Check if the product ID is in the liked products array
  return likedProducts.includes(productId);
}