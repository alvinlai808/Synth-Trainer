# 6.0 Architectural Design Document
This document explains the Architectural Design for the Synth Trainer project.

## 6.1 Introduction
Synth Trainer is aimed to be an ear trainer for beginner electronic music producers. The goal of the application is to train artists to recognize sounds by their timbres and characteristics so that they can recreate sounds from their favorite songs or fleeting ideas that they may not have been able to create before. It will train users to recognize the sounds of sine, square, sawtooth, and triangle waves. It will also train users to recognize the characteristics of different ADSR envelope settings.

### 6.1.1 System Objectives
The goal of Synth Trainer is to provide an ear training application with an easily accessable synthesizer. The app aims to ease new/beginner music producers into the world of music production and sound design and build strong foundation for them. To achieve this, we are using React to design our front end and firebase as our database to keep track of our users. The goal is to give users an intuitive interface and the ability to keep track of their sessions and progress. Specifically, for our synth, we are employing the help of the tone.js library to produce different waveforms and tones. Tone.js is a library that provides a web audio framework that is easily accessable. Our goal is to familiarize users with sounds commonly found in today's music.

### 6.1.2 Hardware, Software, and Human Interfaces
#### 6.1.2.1 Hardware: 
The hardware interface will include a working internet connection. It is also likely and advisable that the user has a working set of speakers with an average frequency response (20 Hz - 20,000 Hz).

#### 6.1.2.2 Software:
The *sign up/sign in* interface will retrieve user text input and communicate with the database to insert and match the user's credentials.

The *home page* interface will provide the user with buttons to quickly access any feature provided by Synth Trainer. Users will be able to access various training modules, the Sandbox mode, their profile, their settings, and so on.

The *sandbox* interface provides the user with a fully featured synthesizer and a virtual piano keyboard.

The *modules* interface will present the user with different sound design concepts and a custom virtual synthesizer tailored to focus on that concept. The buttons/sliders on the synthesizers will vary based on what module the user selects. The modules interface will also include a grayed out synthesizer representing the randomly generated sound for the user to try to replicate by ear. There will also be buttons that will allow users to toggle between the sound they are modifying and the sound that has been randomly generated. This interface will have a submit button, leading the user to a page that displays how far off their parameter values were off from the randomly generated sound as well as a score for that particular session.

The *profile* interface will display the user's progress as a graph and a list of the user's sessions. The interface also shows basic text information about the user as well as their profile image.

The *navbar* interface will allow the user to navigate to any other interface at any time.

#### 6.1.2.3 Human Interfaces:
The human interfaces include the user's computer, keyboard, mouse, and audio system. Users will be able to use their mouse to interact with the synthesizer sliders and buttons to change the characteristics of their sound. They will have the ability to use their computer's keyboard to interact with a virtual piano keyboard to play the sound they've created. All audio will be played through the user's selected audio output.

## 6.2 CSCI Descriptions

- GUI Client CSC
  
    The GUI client CSC utilizes ReactJS to provide an interface for the user to navigate the application. We are using a combination of react hooks and componenets, however, we are primarily using react hooks. 
    
    The GUI Client CSC is composed of the following CSUs:
    - Login/Register Screen CSU - This is what the user will see when starting the application.
    - Main Menu CSU - This acts as a homepage for the user to navigate the application. The main menu will consist of Modules, Sandbox, Profile, and Settings buttons.
    - Header CSU - This is a fixed header that the user can use to navigate the application once the user is no longer on the Main Menu. The header will consist of a Homepage, Profile and Logout button.
    - Modules CSU - This page will be comprised of a list of modules that the user can choose to attempt, as well as the specific synth components that will be taught in each respective module.
    - Synth Interface CSU - This is how the synth will appear to the user. It will have two different appearances: one for Match/Module Mode, and one for Sandbox Mode.
    - Sandbox Mode CSU - This will consist of the synth interface, as well as a drop down menu for selecting saved sound presets.
    - 
- Server  CSC
  
  Since the project is developed with React, the server CSC and the GUI client CSC work closely together. This CSC provides the functionality needed to produce sounds, naviagate the user, and package and unpackage data from the database
  
  The Server CSC is composed of the following CSUs:
    -  Server Sound CSU - This CSU will use the `Tone.js` library to produce tones.
    -  Server GUI CSU - This CSU will handle reading inputs from the user and database and converting between the two.
  
- Database CSC
  
  The database CSC is created using a connection to Google's Firebase. This means that the full capabilites of the Firebase API are potentially being used. The Firebase API can be found [here](https://firebase.google.com/docs/reference).

  The Database CSC is composed of the following CSUs:
  - Database Interface CSU - This CSU is used to send and retreive data from the databse 
  - Modules Table - Stores list of all available modules (i.e. name, needed components, instructions).
  - Profile Table - Stores data on users (i.e. username, password, email, etc.).

### 6.2.1 Concept of Execution
Our application has three main components: the GUI, the server, and the database. The GUI will handle displaying all needed compnents and provide a system for the user to navigate. The server will handle the interactions between the GUI and the database. And the database will store all the information for the users and modules. Each component has individual CSU's which comprise each component. To make our sign-in and sign-up pages as effective as possible, there will be simple cards placed in the center of the page with labeled text fields and buttons. Our sandbox and synth modules will follow a similar methodology with keeping everything that is synth related in a position of importance. Our keyboard will be placed directly under the synth controls. The synth controls will be placed in cards with labeled knobs and sliders. Our knobs and sliders will be large to follow Fitts's law. 

### 6.2.2 Interface Design
The following section specifies interactions between the different interfaces of the project

#### 6.2.2.1 Interface Identification and Diagrams
Interaction between the user and the application is handled through our React code. We have onChange handles that deal with any changes that the user might make. Specifically, we have onChange handlers for our Synth sliders and knobs, sign-in an sign-up sections, and various buttons throughout the application. Higher level components pass down handlers to lower level components through the use of react props.

The React code also has multiple functions that call functions from the `firebase` library. These functions allow for users to create accounts, sign in, and save their progress. Similarly, the functions can also recall this data in order to display it to the user.

#### 6.2.2.1.1 GUI Module
[GUI Module Diagram](img/GUI%20Module.pdf)

#### 6.2.2.1.2 Database and Server Module
[Database and Server Diagram](img/GUI%20Module.pdf)

#### 6.2.2.2 Project Interactions
The synth trainer application stores user data in a Firebase hosted database. When the user intailly loads the page, a script is run that creates an active connection to the database. There is then functions called from within the firebase module to handle sending and retrieving data.

## 6.3 Preliminary User Manual

**Setup**

First, in a modern web browser, navigate to the home URL (yet to be hosted). From there you will be directed to a Sign In page. If you have not already created an account, click the Sign Up button to be redirected to the Sign Up page.

**Sign In**

In the forms provided, please enter your account email and password, then click sign in. If you have forgotten your password, you can hit the "Forgot Password" button to recieve an email detialing how to reset your password. Once all the needed info is entered, click Sign In to be redirected to the home page on a successful login.

**Sign Up**

You can either sign up by email or by using your Google account. For email, enter the needed information into the provided forms. Make sure your passwords match. Once that is done, click Sign Up. Then click the Sign In button to be redirected to the sign in page. IF you would rather sign up with google, just click the google button and follow the prompts. Then, once your account is created, go to the sign in page.

**Home Page**

Once you are signed in, you should be redirected to the home page. Here you can see the modules you are currently working on. To go back into one, simply click the card with the module you want to enter. At the top of the screen is the Navigation Bar. Please see the reference to the Nav Bar on how to use this. There is also a button to take you to the Sandbox mode.

**Nav Bar**

At the top of every page there is a Nav Bar. On the left is the logo for Synth Trainer. You can click that at any point to go back to the home page. On the right is a dropdown menu for the modules, a profile button, and log out button. You can use the dropdown menu to navigate between the modules. The profile button will take you to your profile page so you can edit your profile. The log out button will log you out of your session and redirect you to the sign in page.

**Modules**

Once you have entered the module follow the instructions provided to you to train your ears on how to use a synth.

**Sandbox**

On this page, the full synth is available to you. You can try to create whatever sound you would like. The sliders and buttons are available to you so that you can tailor certain sounds to your liking.
