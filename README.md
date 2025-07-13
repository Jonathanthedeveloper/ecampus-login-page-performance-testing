# eCampus Login Performance Monitor

An automated performance monitoring tool that measures RSU eCampus login page performance at regular intervals using Puppeteer and GitHub Actions.

## Overview

This project monitors the complete login flow performance including:

- Login page loading time
- Authentication process duration
- Dashboard loading time
- Total end-to-end performance

## Features

- ✅ Automated login performance testing
- ✅ Multi-stage timing measurement
- ✅ CSV data export for analysis
- ✅ GitHub Actions automation (every 10 minutes)
- ✅ Error handling and logging
- ✅ TypeScript support with Bun runtime

## Performance Metrics

The tool measures these key performance indicators:

1. **Login Page Load**: Time to load the initial login form
2. **Login Process**: Time from form submission to successful authentication
3. **Dashboard Load**: Time for dashboard to fully load with all data
4. **Total Duration**: Complete end-to-end user experience time

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime
- Node.js 18+ (for GitHub Actions)
- Valid RSU eCampus credentials

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jonathanthedeveloper/ecampus-login-page-performance-testing.git
   cd ecampus-login-page-performance-testing
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file:

   ```env
   USERNAME=your_username
   PASSWORD=your_password
   ```

4. **Run the monitor**
   ```bash
   bun start
   ```

### GitHub Actions Setup

1. **Add Repository Secrets**
   Go to Settings → Secrets and variables → Actions:

   - `LOGIN_USERNAME`: Your eCampus username
   - `LOGIN_PASSWORD`: Your eCampus password

2. **Enable Actions**
   The workflow will automatically run every 10 minutes and commit results to `results.csv`

## Data Output

### CSV Format

```csv
timestamp,loginPageLoadMs,loginPageLoadSeconds,loginProcessMs,loginProcessSeconds,dashboardLoadMs,dashboardLoadSeconds,totalMs,totalSeconds,status
2025-01-15T10:30:00.000Z,2340,2.34,1870,1.87,4230,4.23,8440,8.44,SUCCESS
```

### Analysis Fields

- **timestamp**: ISO 8601 timestamp
- **loginPageLoadMs/Seconds**: Login page loading performance
- **loginProcessMs/Seconds**: Authentication performance
- **dashboardLoadMs/Seconds**: Dashboard loading performance
- **totalMs/Seconds**: End-to-end performance
- **status**: SUCCESS or FAILED with error details

## Project Structure

```
├── .github/
│   └── workflows/
│       └── monitor.yml          # GitHub Actions workflow
├── src/
│   └── index.ts                 # Main monitoring script
├── .env                         # Environment variables (local)
├── .gitignore                   # Git ignore rules
├── bun.lockb                    # Bun lock file
├── package.json                 # Project dependencies
├── results.csv                  # Performance data output
└── README.md                    # This file
```

## Configuration

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

### Monitoring Frequency

Edit `.github/workflows/monitor.yml` to change the schedule:

```yaml
schedule:
  - cron: "*/10 * * * *" # Every 10 minutes
  - cron: "0 * * * *" # Every hour
  - cron: "0 9-17 * * 1-5" # Business hours only
```

### Timeout Settings

Adjust timeouts in `src/index.ts`:

```typescript
await page.waitForNavigation({
  timeout: 60000, // 60 seconds
  waitUntil: "domcontentloaded",
});
```

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

## Troubleshooting

### Common Issues

1. **Login Failures**

   - Verify credentials in repository secrets
   - Check if eCampus site is accessible
   - Review error messages in Actions logs

2. **Timeout Errors**

   - Network latency may require longer timeouts
   - eCampus server may be experiencing high load

3. **GitHub Actions Quota**
   - Free tier: 2,000 minutes/month
   - 10-minute intervals use ~1,440 minutes/month
   - Monitor usage in Settings → Billing

### Local Debugging

Run with visible browser for debugging:

```typescript
const browser = await puppeteer.launch({
  headless: false, // Set to false for debugging
  // ...existing args
});
```

## Data Analysis

### Import to Excel/Google Sheets

1. Download `results.csv` from the repository
2. Import as CSV with comma delimiter
3. Create charts for performance trends

### Python Analysis Example

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('results.csv')
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Plot total performance over time
plt.figure(figsize=(12, 6))
plt.plot(df['timestamp'], df['totalSeconds'])
plt.title('eCampus Login Performance Over Time')
plt.ylabel('Total Time (seconds)')
plt.xlabel('Timestamp')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for educational and monitoring purposes only. Use responsibly and in accordance with RSU eCampus terms of service.
