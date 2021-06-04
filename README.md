# React Movie App

## Description

This app is excellent for people who desire to either document their favorite movies or save any movies that they might find interesting to watch later or learn more about. This app allows users to search for movies cataloged by the [Open Movie Database](https://www.omdbapi.com/) and provided to this app through their API. Users can add a movie to their favorites directly from the search results. Clicking on the poster of a movie will grab that particular movies' unique IMDB ID and uses it to perform another API fetch from the Open Movie Database. After that, the movie's information is displayed on a page that allows the user to learn more about that movie before they decide whether or not to include that movie in their favorites list.

## Live Version

The live version of this web app can be found [HERE](https://open-movie-app.netlify.app/)

## How to download & install this app

This app does not include the Node Modules folder as a part of its public repository. Anyone who decides to clone or download this repository will need to add the Node Modules folder back into the repository to make sure it will work on their machine. The steps to do so are as follows:

1.  Open the project in its root directory in your preferred terminal.

2.  Enter the following command into the terminal

        npm install

- Note: _for this process to work properly the person who downloaded or cloned the repository will need to have NodeJS and the Node Package Manager (NPM) installed on their system. You can find both of those [HERE](https://nodejs.org/en/)_

## How to use this app

When the home page loads up any movies that the user has stored in their favorites will be pulled from their browser's local storage and be presented in a list at the bottom of the screen. Above the favorites list is the movies heading and a search bar next to that which the user will use to find any movie they want by searching for its title. Searching for a term will fetch any movies with that term in their title from the OMDB API. The list of matching movies will appear as a series of posters similar to the way the favorites list appears. Hovering over a poster image in the movies list will reveal an "Add to Favorites" button, hovering over a poster image in the favorites list will reveal a "Remove from Favorites" button. These buttons enable the user to choose which movies will be included in their favorites list with a click of a button.

Clicking on the actual poster image of a movie above the button will direct you to a page detailing various pieces of information about that particular movie including its reviews from sources like IMDB, Rotten Tomatoes, and Metacritic, its director, its actors, it's rating, it's writers, its release date, and its plot. The details page also gives the user the chance to become more informed about a movie they are curious about before they decide if they want to include it in their favorites list or not. The favorites page includes a dynamic favorites button that switches between an "Add to favorites" and a "Remove from favorites" phrase depending on whether or not that particular movie resides in the favorites array. Changing the favorites state from the details page and returning to the main page afterward will show the state change reflected accordingly.

## Limitations

The biggest flaw that this app currently has is related to the API it draws its movies and details from. The Open Movie Database has both paid and free tier API keys. While the paid tier keys have no limit on the number of daily calls they can make the free tier keys can only make up to 1,000 API calls per day. Since this app currently runs on the free tier there is a hard limit on the potential size of this app's daily user base and how many of the site's daily fetches that each user can use without impeding the others.

## Future additions to this app

Currently, the movies that users add to their favorites are added to and rendered from their browser's local storage. While this provides some benefits in regards to maintaining the user's favorites after refreshes and page exits, it isn't the most permanent or consistent solution that could be used.

In future versions of this app, the user's favorite movies will be stored within a full-scale backend. This includes a server likely built in NodeJS, and either a SQL database like MySQL or PostgreSQL or a NoSQL database like MongoDB.

Another important change that will likely eventually come for this app is a change from the free API tier to the paid API tier. This will enable the app's user base to grow substantially as the number of API calls that the app can make will no longer have a hard daily limit on them.

## License

MIT © 2021 Alex Doorlag
