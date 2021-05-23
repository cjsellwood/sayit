# Sayit

A forum inspired by reddit.

## Live Site
https://cjsellwood.github.io/sayit/#/

## Back-end
https://github.com/cjsellwood/sayit_api

## Front-end Technologies
* HTML
* CSS
* Javascript
* React
* Redux

## Front-end Features
* Users can register with a new unique username or login to an existing account
* Authenticated users can create new topics, posts, comments or vote on posts.
* New posts can be text or links. If link is an image it will show in the post content or if it is a youtube link it will show an embedded player.
* List of posts, which can be sorted by votes or date and filtered by date, are displayed on the following pages:
  * Home page, display all pages.
  * Topic page, displays all posts from a specified topic.
  * User page, displays all posts from a specific user.
  * Search page, displays all posts where the title or text matches the search term.
* After the current 25 posts are shown, more posts can be loaded with a button.
* Once a post is loaded, the user can comment on it or reply to other comments and the comments nested below them.
* If the user is the creator of a post or comment, they are able to edit or delete them. Deleted comments will display as [deleted].
* The application can be viewed on both desktop and mobile with media queries to adjust as necessary.
* The sidebar contains links for interaction and information on the current topic. It is able to be toggled on mobile with a button in the navbar.
* Loading indicators and messages are displayed to the user to provide feedback or show what is currently happening.
* Redux is used for managing the state of the application and for containing the requests to be sent to the back-end with the fetch api.