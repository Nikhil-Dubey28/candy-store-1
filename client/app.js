const candyForm = document.getElementById('candyForm');
  const candyList = document.getElementById('candyList');

  const BASE_URL = 'http://localhost:3000/api/candy';

  // Function to create a new candy item and add it to the UI
  const addCandyItemToUI = (candy) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <p>Candy Name: ${candy.name}</p>
      <p>Description: ${candy.description}</p>
      <p>Price: ${candy.price}</p>
      <p>Quantity: ${candy.quantity}</p>
      <button class="btn btn-success" onclick="buyCandy(${candy.id},1)">Buy 1</button>
      <button class="btn btn-success" onclick="buyCandy(${candy.id},2)">Buy 2</button>
      <button class="btn btn-success" onclick="buyCandy(${candy.id},3)">Buy 3</button>
      <button class="btn btn-danger float-right" onclick="deleteCandy(${candy.id})">Delete</button>
      
    `;
    candyList.appendChild(li);
  };

  // Function to fetch candies from the backend API
  const fetchCandies = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const candies = response.data;
      candyList.innerHTML = ''; // Clear the previous list

      if (candies.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = 'No candies available';
        candyList.appendChild(li);
      } else {
        candies.forEach((candy) => {
          addCandyItemToUI(candy);
        });
      }
    } catch (error) {
      console.error('Error while fetching candies:', error);
    }
  };

  // Function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const candyName = document.getElementById('candyName').value;
    const candyDescription = document.getElementById('candyDescription').value;
    const candyPrice = document.getElementById('candyPrice').value;
    const candyQuantity = document.getElementById('candyQuantity').value;

    const newCandy = {
      name: candyName,
      description: candyDescription,
      price: candyPrice,
      quantity: candyQuantity,
    };

    try {
      await axios.post(BASE_URL, newCandy);
      fetchCandies();
      candyForm.reset();
    } catch (error) {
      console.error('Error while adding candy:', error);
    }
  };



const buyCandy = async (id, quantity) => {
    try {
     
      const response = await axios.get(`${BASE_URL}/${id}`);
      const candy = response.data;

      if (!candy) {
        alert('Candy not found');
        return;
      }

      // Check if the candy is available (quantity > 0) before buying
      if (candy.quantity <= 0) {
        alert('Candy not available');
        return;
      }
      else if(candy.quantity < quantity){
        alert ('Not enough candies')
        return
      }

      
      await axios.put(`${BASE_URL}/${id}/buy`, { quantity });

      fetchCandies();
    } catch (error) {
      console.error('Error while buying candy:', error);
    }
  };



  async function deleteCandy(id) {
    try {
        await axios.delete(`${BASE_URL}/${id}`)
        fetchCandies()
    }
    catch (err) {
        console.log(err)
    }
}
  // Event listeners
  candyForm.addEventListener('submit', handleFormSubmit);

  // Initial fetch of candies when the page loads
  fetchCandies();