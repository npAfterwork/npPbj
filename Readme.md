Pbj - Peanutbutter and JamServe
====

Ionic client for the awesome [jamserve](https://github.com/ffalt/jamserve)

Changelog
----

* v 1.0.0
  * Let's start over :D (graphQL, angular 16, ionic 7, older and wiser, maybe TDD this time)
* v 0.1.0
  * Jam-API (0.1.12)
* v 0.2.0
  * Index - Ready
  * Filter/Select UI - Ready
* v 0.3.0
  * Dashboard - Ready (Stats box)
* v 0.4.0
  * Single Views - Ready
* V 0.5.0
  * Queue - no expand only tracks - Kinda Ready
  * Queue shuffle
  * addToQueue remove from queue
* v 0.6.0
  * Start/Settings - Okayish
* v 0.7.0
  * Player - Ready
  * Cleaned up action handling... no toolbar service anymore
  * Queue as page not as popup
    * Play in Queue -> Play from here
* v 0.8.0
  * Lists - Ready
    * load more
  * Selection more, add to queue remove
  * Problems with hammerjs resolved with own directive...
* v 0.9.0
  * Dashboard box swiper !
    * Lazy loading dashboard box

Current Version (wip v 0.9.0)
----------

    * Code clean
        * clean up panel and list item again...
        * todos
        * add to selection folder recursive
        * css classes instead of attributes (mb keep flex)
        * check data service
        * clean css
        * subscriptions clear on leave??!! clean up code
    * Progressbar is working but watch out for problems ... folder recursive for e.g.
    * Features
        * Vol? + Controls
        * Error handling show user
            * grep .catch( now <- eslint cleanup
        * More
            * play track more -> play next, play from here, just play
    * Extend Settings
        * Lists from menu
        * Artist or AlbumArtist switch plz!!!
        * (enable, disable selection feature)
    * Design
        * select icon size
        * Dashboard -
            * Stats box
            * Design should be better...
            * Dashboard - Add button -> ghost panel at the end?!
        * Header lists (content)
        * Panelview list view design
            * auto size items??
            * check click outside ??
        * Makeover Single Pages - bottom -> prob. item redesign will do
        * Toolbar title check for better usage empty on single mb?
        * hard stop in folder view on bottom see 1pac folder lvl1... hmm min-height of list
    * Final Testing and New Goals for v 1.0.0

* v 1.0.0
  * Online only
  * Artists|Albums|Tracks|Folder only
  * Random|Newest|Frequent|Recent
  * Dashboard|Index|Single|Lists
  * Queue|Player
  * Browse|Play only
* v 1.1.0
  * Playlists
  * Expand?
* v 1.2.0
  * Fav|Rating|Download|Highest|Avg
* v 1.3.0
  * Podcasts
* v 1.4.0
  * Offline Mode
* v 1.5.0
  * Similar|Infos
* v 1.6.0
  * Lyrics

Minor or Later
---------

* Known Issues:
  * Image popup images
  * duplicate add to queue...
    * 2k add to queue -> url for getbyids is 100kb ;)
  * album artist will never have play state coz queue only holds tracks
    * Queue with base ? expand, shuffle keep groups ?
  * queue navigate can be triggered coz item handles it on its own...
* copy from jamberry
  * no tracks?!?
* nav track ???
* index
  * filter clear - turn on after rootfilter return not before
* display the selection
* Index
  * Scroll to next header ???
  * Scroll pos is kept on type change...
  * Sort
* Artist
  * switching tabs resets lists... if it doesn't the hidden ones are not painted correctly....
* UI-Update,
  * Expand, Collapse like selection and jamberry do would be nice
  * Single Pages
    * Artist
      * Toggle Albums like JamBerry does
  * Usability
* Selection Page
  * Collapse/Expand clean up (level by level ... artist album track ... folder...)
  * ... still need the less clickier version for the items...
* Search Page
* Start Page
* Transition cover image in queue bind to timeline
* Transition toolbar buttons in and out
* Umlaute im filter
* queue get ugly at around 100+ Items used virtual list lost reorder feature => add in another way, arrow up down mb
  * most times play modes should be enough so mb no move at all in long lists...
* Sort Queue and lists
* Check MediaSession volume..
* Hover track list indicator (Desktop)
* a-z-slider?
* Dashboard box swiper virtual -> wait for ionic i guess or try around a little
  Structure

--------------

* PWA - Make it not Cache everything....
* DataStore
  * TODO: keeping the old data is nice to collect all information step by step
    but if something gets deleted we lose this information and still have all the data.
    So there needs to be a solution for this.
    Reload the whole data on start? Keep track of errors and remove when occurs? SERVICE WORKER !!!
  * Offline Betrieb / Image Cache SERVICE WORKER !!! @PERFORMANCE BUFF

Bugs
-------

* Podcasts details
  * Polling for states refreshing and retrieving does crash server... finish stop polling
  * Duration
* Something is going on... double, tripple loading... => check this!

Jam-Berry (looks awesome :D)
-----------

* Copy Description/Similar/...
* Look&Feel is so much cleaner... why?
* Track-View is really nice
* Artist and Album View also :)

Think about
-----------

* Structure Menu: Download list, single pages, single lists, special pages
* Podcast suggestion debug only? less present?
* Controls: play, next, prev, shuffle, repeat, fav, volume where to put them
* Integrate GraphQL
* PWA and Service Worker ... would replace the cache!!!!!!!!!!!
* Playlists and Queue can only contain tracks...
* Desktop version

Questions:
---------

* There is so much image stuff going on.. Artwork? RootFolder Image? and its not image/:id
  * Artists do not have any image any more (mb coz of folder + fanart image)
  * only folder can haz multiple images ?
    * Tracks can haz that too
      * Albums probably could be generated by the tracks and therefore can haz as well
* How to search by regEx ?
* How does similar work? Last-FM? How does this work? MBZ??
* Can i use the index for something?
* Root Folder and the actual root folder folder :) do not have the same id (image)?
* Folder Parents? How can a folder have several parents?
* Ask how drag and drop with virtual list works

API-Requests ;)
---------
(if i find the time i'll try to make a pull request)

* It would be nice if Jam.SearchQuery could be a stronger base with rootId, rootIds and sortField
  * then the sortfields should somehow extend from a base with 'created'

Server - Discussion
----------------

* Playlist and Queue should be able to store any kind of items?
  * Add a Album or Artitst... to the Queue (just group by them)

Server - Problems
----------------
so far so good :D well done...

Feature List so far:
------

* Library
  * Display all Media in different sizes
  * Filter by Letter, Text, Rootfolder
  * Select any kind of items
* Home
  * Display all kinds of pre filtered lists for "each" item
  * Recent, Newest, Frequent, Random
* Player
  * Small Player Toolbar
  * Queue
* Item
  * Each one has its own page
  * Toolbelt for all (play, more)
* Artist Page
  * Top Rated Tracks

How To Update to new version of jam server:
-----------------

* in jamserve 'npm run build:jam:client'
* copy complete the generated output folder "jamserve/dist/jam" to "pb&jam/src/jam"
* adjust change errors from new api
* jam!

Check -> New Server :)
----------

* Check all :) with new server ....
  * Podcasts retrieve Additional Infos from Web (Image, Episode description, Epsiode date)
    * ETIMEDOUT 85.13.137.87:443 Error crashes the server. I guess retrieving Podcast Episode Info with retrieve crashes
      on timeout.
  * FolderIndex has no include params? why not?
  * Episodes fav no state returned
