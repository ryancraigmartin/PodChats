# PodChats

## Developed in one week at IronHack Miami - May 2018

PodChats is the first CRUD application I built during my time as a student in Ironhack's Full Stack Web Development cohort in the Spring of 2018. This app allows for users to sign up for an account and post reviews based on podcast episodes that they have listened to and can read what others are saying about the episode. 

I worked for days trying to figure out how I should go about interacting with the iTunes API, the central hub for podcast and information, in order to gather relevant podcast data when a user searches on the website. Once I was able to get the search functionality working on the backend, I quickly realized that I would need to pull information about podcast episodes from the RSS feed url provided via my initial API call. The issue that came along with that was that the RSS feed information was in XML and needed to be parsed into JSON so that I could keep a local copy in my MongoDB database and manipulate the data as needed.

The more I worked on this project throughout the week, the more I realized just how ambitious of a project it was. It still has features that need to be implemented and plenty of stlying to be done but I plan on continuing to improve upon it as I expand my skillset.

Pull requests welcome.
