document.addEventListener('DOMContentLoaded', async () => {
  const statusElement = document.getElementById('status');

  try {
    const response = await fetch('/status/api');
    const result = await response.json();

    console.log('API Response:', result);

    if (result && result.data && result.data.data) {
      const { database, mailService, timestamp } = result.data.data;
      console.log('Parsed Data:', { database, mailService, timestamp });

      const statusHtml = `
        <p>Database: <span class="${database}">${database}</span></p>
        <p>Mail Service: <span class="${mailService}">${mailService}</span></p>
        <p>Timestamp: ${new Date(timestamp).toLocaleString()}</p>
      `;

      statusElement.innerHTML = statusHtml;
    } else {
      statusElement.innerHTML = '<p class="down">Failed to load status</p>';
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    statusElement.innerHTML = '<p class="down">Failed to load status</p>';
  }
});
