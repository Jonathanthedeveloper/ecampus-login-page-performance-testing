# School Dashboard Monitor

A Node.js application that monitors your school dashboard by logging in every 10 minutes to collect performance data and identify peak usage times.

## Features

- 🤖 Automated login every 10 minutes
- 📊 Collects response times and user activity data
- 📁 Stores data in CSV files organized by date
- 📈 Analysis tools to identify peak times
- 🔄 Continuous monitoring with error recovery
- 📸 Optional screenshot capture for debugging

## Prerequisites

- Node.js (v14 or higher)
- Chrome/Chromium browser (for Puppeteer)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your credentials:

   ```
   DASHBOARD_URL=https://your-school-dashboard.com/login
   USERNAME=your_username
   PASSWORD=your_password
   LOG_INTERVAL=600000
   ```

3. **Customize selectors:**

   Open `index.js` and update the CSS selectors to match your dashboard:

   - `#username` - Username input field
   - `#password` - Password input field
   - `#login-button` - Login button
   - `#active-users` - Active users counter (optional)
   - `#server-load` - Server load indicator (optional)

## Usage

### Start Monitoring

```bash
npm start
```

The monitor will:

- Log in to your dashboard every 10 minutes
- Save data to `dashboard_data_YYYY-MM-DD.csv`
- Display real-time status in the console
- Continue running until stopped with Ctrl+C

### Analyze Data

```bash
npm run analyze
```

This will generate a report showing:

- Peak usage hours
- Average response times by hour/day
- Success rates
- Recommendations for optimal usage times

### Development Mode

```bash
npm run dev
```

Runs with nodemon for automatic restarts during development.

## Runtime Compatibility

This code can run on:

✅ **Node.js** (Recommended)

- Full compatibility with all features
- Best performance for automation tasks

✅ **Bun**

- Compatible with most Node.js packages
- Faster startup times

⚠️ **Deno**

- Requires syntax modifications for imports
- Limited package compatibility

❌ **Browser**

- Cannot write files to disk
- CORS restrictions prevent cross-origin requests
- Not suitable for continuous monitoring

## Data Output

### CSV Format

Each monitoring session creates a record with:

- `timestamp` - When the check occurred
- `login_success` - Whether login succeeded
- `response_time` - Time taken to complete login (ms)
- `active_users` - Number of active users (if available)
- `server_load` - Server load indicator (if available)
- `error_message` - Any error details

### Analysis Output

The analysis script provides:

- Hourly usage patterns
- Daily usage patterns
- Peak time identification
- Performance recommendations

## Customization

### Monitoring Interval

Change `LOG_INTERVAL` in `.env`:

- `300000` = 5 minutes
- `600000` = 10 minutes (default)
- `900000` = 15 minutes

### Data Collection

Modify the `collectDashboardData()` method in `index.js` to collect additional metrics specific to your dashboard.

### Screenshots

Enable screenshot capture by setting `TAKE_SCREENSHOTS=true` in `.env`.

## Troubleshooting

### Common Issues

1. **Login fails**

   - Verify CSS selectors match your dashboard
   - Check credentials in `.env`
   - Set `HEADLESS=false` to see browser actions

2. **Browser crashes**

   - The monitor automatically reinitializes the browser
   - Check available system memory

3. **Data not collected**
   - Verify dashboard elements exist after login
   - Update selectors for data elements

### Debugging

- Set `HEADLESS=false` in `.env` to see browser actions
- Enable screenshots with `TAKE_SCREENSHOTS=true`
- Check console output for detailed error messages

## Files Structure

```
├── index.js          # Main monitoring script
├── analyze.js         # Data analysis script
├── package.json       # Dependencies and scripts
├── .env.example       # Environment template
├── .env              # Your configuration (create this)
└── dashboard_data_*.csv # Generated data files
```

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- Use environment variables in production
- Consider using a dedicated monitoring account if available
- Monitor your school's terms of service regarding automated access

## License

MIT License - feel free to modify and distribute as needed.
