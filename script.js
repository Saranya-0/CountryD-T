// Select the input and result div elements
const locationInput = document.getElementById('locationInput');
const resultDiv = document.getElementById('result');

// Function to fetch date and time for a given location using World Time API
async function fetchTime(location) {
  try {
    const response = await fetch(`https://worldtimeapi.org/api/timezone/${location}`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Location not found. Please enter a valid country or city.');
    }

    // Parse the JSON data
    const data = await response.json();

    // Format the date and time
    const dateTime = new Date(data.datetime);

    // Display the date and time in a readable format
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();

    // Clear any previous result
    resultDiv.innerHTML = '';

    // Display the result
    resultDiv.innerHTML = `
      <h5>Location: ${data.timezone}</h5>
      <p><strong>Current Date:</strong> ${formattedDate}</p>
      <p><strong>Current Time:</strong> ${formattedTime}</p>
    `;

  } catch (error) {
    // Display the error message
    resultDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
}

// Function triggered by the search button
function searchTime() {
  const location = locationInput.value.trim().replace(' ', '_');
  if (location) {
    fetchTime(location);
  } else {
    resultDiv.innerHTML = '<p class="text-warning">Please enter a valid location.</p>';
  }
}
