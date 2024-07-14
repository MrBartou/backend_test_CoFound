document.addEventListener('DOMContentLoaded', async () => {
  const statusElement = document.getElementById('status');

  try {
    const response = await fetch('/status/api');
    const result = await response.json();

    console.log('API Response:', result);

    if (result && result.data && result.data.data) {
      const {
        cpuUsage,
        database,
        mailService,
        memoryUsage,
        timestamp,
        uptime,
      } = result.data.data;
      const { databaseError, mailServiceError } = result.data.data;
      console.log('Parsed Data:', {
        cpuUsage,
        database,
        mailService,
        memoryUsage,
        timestamp,
        uptime,
        databaseError,
        mailServiceError,
      });

      const statusHtml = `
        <p>
          <span class="icon ${database === 'up' ? 'icon-up' : 'icon-down'}"></span>
          Database: <span class="${database}">${database}</span>
          ${database === 'down' ? `<span class="arrow" id="database-arrow" onclick="toggleError('database-error')"></span>` : ''}
          <div id="database-error" class="error-details">${databaseError || ''}</div>
        </p>
        <p>
          <span class="icon ${mailService === 'up' ? 'icon-up' : 'icon-down'}"></span>
          Mail Service: <span class="${mailService}">${mailService}</span>
          ${mailService === 'down' ? `<span class="arrow" id="mail-arrow" onclick="toggleError('mail-error')"></span>` : ''}
          <div id="mail-error" class="error-details">${mailServiceError || ''}</div>
        </p>
        <p>Memory Usage: ${memoryUsage}</p>
        <p>CPU Usage: ${cpuUsage}</p>
        <p>Uptime: ${uptime}</p>
        <p>Timestamp: ${new Date(timestamp).toLocaleString()}</p>
      `;

      statusElement.innerHTML = statusHtml;
    } else {
      statusElement.innerHTML = '<p class="down">Failed to load status</p>';
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    statusElement.innerHTML = `<p class="down">Failed to load status</p><p class="error">Error: ${error.message}</p>`;
  }
});

window.toggleError = function (id) {
  const errorElement = document.getElementById(id);
  const arrowElement = document.getElementById(id.replace('error', 'arrow'));
  if (
    errorElement.style.display === 'none' ||
    errorElement.style.display === ''
  ) {
    errorElement.style.display = 'block';
    if (arrowElement) {
      arrowElement.classList.add('down');
    }
  } else {
    errorElement.style.display = 'none';
    if (arrowElement) {
      arrowElement.classList.remove('down');
    }
  }
};
