Testing new Angular versions.

Write small screener app for stocks:

-   Get info from api
-   have search bar for wkn etc.
-   have localstorage based persistence for 'watchlist'
-   draw graph with d3

-   Put down clocks and have opening times highlighted

# setup

note: ive been trying different apis sinc some are very limited and or very expensive.
a system for abstraction is not in place.

Generate a free API key on https://www.alphavantage.co
add file to root folder called .apikey.json with the context: { "key": "YOUR_KEY", "api": "https://www.alphavantage.co" }

For api.twelvedata.com

const apicreds: ApiCreds = {
api: 'https://api.twelvedata.com/time_series',
key: 'YOUKEY',
}
export default apicreds

next I will test with yahoo fin api since this one seems unlimited
