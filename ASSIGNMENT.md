# Schibsted Frontend Assignment
Your task is to develop a frontend application that will display list of article previews.
You are expected to fetch data from a mock api (`server.js`) provided along with this assignment.
We have prepared a simple skeleton app for you (check out [README.md](README.md))

The user of this app should be able to:
 1. view a list of articles containing image, title, preamble and publication date
 2. filter articles by their source (fashion, sport or both)
 3. sort articles by publication date

The basic wireframes for the app can be found in the attached `*.png` files.
Please use them as guidelines for your solution, but style it as you would style a normal production website keeping in mind web standards.
Make sure that you properly handle backend responses, as backend can never be truly trusted and may sometimes return errors.

### A couple of things we would like you to consider when writing this application:
 - it should run on the current versions of browsers (chrome/ff) and be compliant to current version of ecma script standard,
 - the code should be testable,
 - you can use any library you want as long as it's reasonable, but do not overcomplicate things,
 - try to make it look good on different devices,
 - pay attention to bundle size,
 - keep the code clean and understandable (document it if you feel it's needed),
 - do not sacrifice code quality for the sake of completeness of the task.


## Final note

Please provide a short description of what you have created and possible ways to improve your solution.

We expected the assignment to be done with GIT. Using a public github repository or private bitbucket/gitlab will be fine.
Also please don’t forget about commit messages.

Feel free to get in touch with us at any time throughout this task in case of any questions.
We realise and appreciate that you’re taking personal time out to complete this task so we’re happy to help.

###########################
Descrittion:

I decided to build this application using React (newest verion to be able use react hooks), because of the performance and the ability to handle and transfer data in application. React hooks make code very clear and finall bundle file have smaler size. Based on my knowlage even to 50% due to previous standard of code. I used the MaterialUI library, which provides ready-made styled components. The main reasons were aesthetic considerations and quick work time. I use Sass for my own styles for better code transparency and work swearing. I added Babel to transpose the code to a standard that older browsers support and so that I can use ES6 and newer specifications features. I was thinking about Redux but this application is too small for that. But by using Redux code will be more transparent and easy to debbug. 

I will gladly talk to the whole implementation in more detail at the next stage :)