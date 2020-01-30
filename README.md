Train Scheduler

The intent of this project is to use user input data to append to the 'Current Train Schedule' table. This data must use the current time to calculate when the next train will be and how long until that next train. These values must also be stored in a database for future use.

This is solved by taking the user input storing it in a firebase database. When the page is refreshed the input will load, unless the user overwrites the current data. Once the data is input moment.js is used to calculate nextArrival and minutesAway. These are both appended to the table under 'Current Train Schedule' in their respective columns. 

Process:

The first step in the process was figuring out moment.js and the logic to take the current time and train frequency to calculate the next arrival and minutes away. 

Once this was done, storing the user input into a database with calculated information. 

Also, adding this information to 'Current Train Schedule'.

Then styling using Bootstrap.
