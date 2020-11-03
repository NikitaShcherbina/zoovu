# zoovu

Hey! 


I created 3 branches. 

The first one with the source code.

The second page is for the github (so that you can see the work online).


And the third is for local viewing with the I-want-to-play-game file.

Instructions on how to view the local version:

	1. Clone the repository.
	2. Go the folder repository.
	3. Use command  "git checkout forLocalViewing" and run the file "i-want-to-play-a-game.html".
	4. Enjoy it ! :)

### Short readme with sum up / short elaboration on the technical solution.

- I used the built-in API to implement drag and drop and data exchange between arrays.

- I used Vuetify to create a beautiful appearance and save time on developing the layout.

- I hung up the watcher to track the state of the array-slots, and when all slots are filled correctly, functions such as:
 Stop the counters, start the timer to reload the page, display a notification about the successful completion of the game.

- I carried out checks for the correct position of the picture in the slot by comparing the pre-written position of the picture and the waiting position of the slot;
 in case of inconsistencies, the counter increased by 10 seconds.
 
> Nikita 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
