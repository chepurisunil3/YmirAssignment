"# Ymir-Assignment" 

Technologies Used:
    NodeJS - For Backend functionalities
    MongoDB - Database for storing the user and history data
    Angular - Dynamic framework for making Single page Websites and two way data binding
    JQuery -  for interacting with HTML Views
    Javascript -  for interacting with HTML Views

Updates Done:
    -> `set GOOGLE_APPLICATION_CREDENTIALS=jsonfile.json` for windows and for mac `export GOOGLE_APPLICATION_CREDENTIALS=jsonfile.json`
    -> Initial server setup
    -> Adding required Plugins
    -> Working on Frontend APIs
    -> Designing the Pages
    -> Complete the functioning
    -> Adding basic mobile Responsive

Features:
    -> Login or registration page for saving the previous searches with their details so that the users can recheck their history
    -> Automatic Data saving when processing the image from backend
    -> Single page website with different components.
    -> Each component has unique functionalities and can communicate with parent component
    -> Basic mobile responsive


How to Run:

    1. Make sure you have mongodb in your system and it is running.
        -> To start mongodb, after installing find the path of your mongod.exe (Usual file path in windows is C:\Program Files\MongoDB\Server\version\bin\mongod.exe and in Mac ~/mongodb/bin/mongod). copy and paste the path in terminal and enter. MongoDb will be started.
    
    2. Make sure you have installed nodeJS and after pasting this complete code in a folder, go to the root of this folder i.e till Assignment in terminal and run the command -> `npm update` (This will install the required plugins and now you are ready to run the NodeJS Server Code).

    3. After the step 2, from the same path, run the command -> `node index.js` (This will start our nodeJS server and ready to listen for api calls)

    4. Now Make sure you have installed angular cli. After installing the angular, go the child folder 'Ymir/' and then run the command -> `node update` (This will install the required plugins and now we are ready to start our angular project )

    5. Now run the command -> `ng serve` (This will start the angular server and after the compiling is done, you will see the status as 'Server is listening on localhost:4200, open your browser on http://localhost:4200/').

    6. Open the browser window and type localhost:4200 and you will see the web Pages.
