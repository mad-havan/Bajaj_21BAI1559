document.getElementById('submitBtn').addEventListener('click', async function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const optionsDiv = document.getElementById('options');
    const filterOptions = document.getElementById('filterOptions');
  
    resultDiv.innerHTML = ''; // Clear previous results
    errorDiv.innerHTML = '';  // Clear previous errors
  
    try {
      const parsedInput = JSON.parse(jsonInput); // Validate JSON
      if (!Array.isArray(parsedInput.data)) {
        throw new Error('Invalid JSON: "data" should be an array');
      }
  
      // Send POST request to backend
      const response = await fetch('http://127.0.0.1:5000/bfhl', { // Replace with your actual backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedInput)
      });
  
      const data = await response.json();
  
      if (data.is_success) {
        optionsDiv.style.display = 'block'; // Show filter options
        filterOptions.addEventListener('change', () => displayResults(data));
        displayResults(data);
      } else {
        errorDiv.innerHTML = 'Failed to process the request';
      }
    } catch (error) {
      errorDiv.innerHTML = 'Invalid JSON format or server error: ' + error.message;
    }
  });
  
  function displayResults(data) {
    const resultDiv = document.getElementById('result');
    const filterOptions = document.getElementById('filterOptions');
    const selectedOptions = Array.from(filterOptions.selectedOptions, option => option.value);
  
    let htmlContent = '';
  
    if (selectedOptions.includes('alphabets')) {
      htmlContent += `<strong>Alphabets:</strong> ${JSON.stringify(data.alphabets)}<br>`;
    }
  
    if (selectedOptions.includes('numbers')) {
      htmlContent += `<strong>Numbers:</strong> ${JSON.stringify(data.numbers)}<br>`;
    }
  
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
      htmlContent += `<strong>Highest Lowercase Alphabet:</strong> ${JSON.stringify(data.highest_lowercase_alphabet)}<br>`;
    }
  
    resultDiv.innerHTML = htmlContent;
  }
  