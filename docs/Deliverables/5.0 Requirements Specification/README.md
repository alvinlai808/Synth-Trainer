# **5.0** - Requirements Specification

- [5.0 - Requirements Specification](#50---requirements-specification)
- [5.1 - Introduction](#51---introduction)
- [5.2 - CSCI Component Breakdown](#52---csci-component-breakdown)
- [5.3 - Functional Requirements by CSC](#53---functional-requirements-by-csc)
- [5.4 - Performance Requirements by CSC](#54---performance-requirements-by-csc)
- [5.5 - Project Environment Requirements](#55---project-environment-requirements)

## **5.1** - Introduction

Synth Trainer is aimed to be an ear trainer for beginner electronic music producers. The goal of the application is to train artists to recognize sounds by their timbres and characteristics so that they can recreate sounds from their favorite songs or fleeting ideas that they may not have been able to create before. Is a sound made with sine, square, sawtooth, or triangle waves? What are the values of the ADSR(attack, decay, sustain, release) envelope? 

Dedicated ear training applications exist for things like equalization and audio compression, but there seem to be no current programs tailored towards sound synthesis. Synth Trainer will include a basicsynthesizer interface which contains various components such as an oscillator for basic waveshapes (sine,square, sawtooth, and triangle) and an ADSR envelope. The program will produce random sounds basedon the components given to the user, which the user will then attempt to recreate while solely relying onthe ears. Once the user submits his/her sound, the program then reveals the settings of the randomly generated sound.

[Jump to Top](#50---requirements-specification)

## **5.2** - CSCI Component Breakdown
 
### **5.2.1** - GUI Client CSC - This will handle displaying all needed compnents and providing a system for the user to navigate.
**5.2.1.1** - Login/Register Screen CSU - This is what the user will see when starting the application.

**5.2.1.2** - Main Menu CSU - This acts as a homepage for the user to navigate the application. The main menu will consist of Modules, Sandbox, Profile, and Settings buttons.

**5.2.1.3** - Header CSU - This is a fixed header that the user can use to navigate the application once the user is no longer on the Main Menu. The header will consist of a Homepage, Profile and Logout button.

**5.2.1.4** - Modules CSU- This page will be comprised of a list of modules that the user can choose to attempt, as well as the specific synth components that will be taught in each respective module.

**5.2.1.5** - Synth Interface CSU - This is how the synth will appear to the user. It will have two 
different appearances: one for Match/Module Mode, and one for Sandbox Mode.

**5.2.1.6** - Sandbox Mode CSU - This will consist of the synth interface, as well as a drop down menu for selecting saved sound presets.

### **5.2.2** - Server CSC - This will handle the interactions between the GUI and the database
**5.2.2.1** - Login/Register CSU - This handles creating and verifying a user.

**5.2.2.2** - Profile CSU - Handles manipulating the user data.

**5.2.2.3** - Modules CSU - Handles displaying and evaluating modules.

**5.2.2.4** - Synth CSU - This CSU produces and modifies synth sounds

### **5.2.3** - Database CSC - This will store all the information for the users and modules.
**5.2.3.1** - Profile Table - Stores data on users (i.e. username, password, email, etc.)
 
**5.2.3.2** - Modules Table - Stores list of all available modules (i.e. name, needed components, instructions).
        
[Jump to Top](#50---requirements-specification)

// TODO: remove implementation specifics (use React, use <database>, etc.)
## **5.3** - Functional Requirements by CSC

### **5.3.1** - Subsystem Divisions
      
The Synth Trainer is divided into three subsystems. The first section is the graphical user interface secion which controls what the user views. The second section is the server section which handles sending and retrieving data. The third section is the database secton. This section will store all the information for the users and modules.

### **5.3.2** - Graphical User Interface (GUI) Section
**5.3.2.1** - The GUI subsystem shall be displayed in a web page

**5.3.2.2** - The GUI subsystem shall consist of five separate pages.

**5.3.2.3** - One GUI subsystem page shall contain the main information the user has to navigate the web application<br>
This page will be known as the Main Page.

**5.3.2.4** - The Main Page shall display instructions for proper use of the web application.
      
**5.3.2.5** - The Main Page shall provide buttons which allow the user to navigate the application.
      
**5.3.2.6** - A second GUI subsection shall allow the user to input their information to login/register for the web application<br>
This page will be known as the login page.
      
**5.3.2.7** - A third GUI subsection shall list the available modules the user can attempt<br>
This page will be known as the modules page 

**5.3.2.8** - A fourth GUI subsection shall present the user with a full synth<br>
This page will be known as the sandbox page
      
**5.3.2.9** - A fifth GUI subsection shall present the user with their account information<br>
This page will be known as the profile page

**5.3.2.10** - The profile page shall list account information and a progress bar which informs the user how many modules he/she has completed. 

### **5.3.3** - Server section
**5.3.3.1** - The server section shall examine user textboxes to ensure valid data.

**5.3.3.2** - The server section shall notify the user if incorrect data is input.

**5.3.3.3** - The server section shall transition users to corresponding webpages based on the button pressed.

**5.3.3.4** - The server section shall package and submit all entered data to the Database Section.

**5.3.3.5** - The server section shall query the database and return needed data.

**5.3.3.6** - The server section shall produce tones that the user can hear.

**5.3.3.7** - The server section shall evaluate the correctness of a user submission.

### **5.3.4** - Database Section
**5.3.4.1** - This section shall store application information.

**5.3.4.2** - This section shall consist of two subsections.

**5.3.4.3** - The first subsections shall hold all needed user data.<br>
This will be known as the User table.

**5.3.4.4** - The second subsection shall hold all needed module data.<br>
This will be known as the Module table.

[Jump to Top](#50---requirements-specification)

- Synth
- GUI
- Server
- Database
## 5.4 - Performance Requirements by CSC
  **5.4.1** The synth shall be able to randomly generate sounds within 3 seconds.
  
  **5.4.2** The synth shall generate sounds without any clipping issues. 
  
  **5.4.3** The synth shall respond to parameter adjustments within 1 second.

  **5.4.4** The GUI shall respond to mouse clicks within 2 seconds.
  
  **5.4.5** The GUI shall respond to mouse scrolls within 1 second.
  
  **5.4.6** The GUI shall error-check user text inputs within 3 seconds.
            The GUI will provide input feedback if an error occurs.
  
  **5.4.7** The database shall store users login credentials within 5 seconds.

  **5.4.8** The server shall retrieve profile information within 5 seconds.
  
  **5.4.9** The application shall display button descriptions upon hovering over them with a cursor.

  **5.4.10** The header bar shall stay in a fixed position at the top of the page.
  
[Jump to Top](#50---requirements-specification)

## 5.5 - Project Environment Requirements
The following tables describe the system requirements needed to run Google Chrome on a Windows machine.

#### Hardware Requirements
| Category           | Requirements        |
|--------------------|---------------------|
| Processor          | Pentium 4           | 
| Hard Drive Space   | 100 MB              |
| RAM                | 128 MB              |
| Display            | 800x600, 256 colors |
| Sound Card         | Needed              |
| Internet Connection| At least 1 Mbps

#### Software Requirements
| Category         | Requirements        |
|------------------|---------------------|
| Operating System | Windows XP or later |
| Compiler         | V8                  |
| Graphics         | CSS3                |
| Web Browser      | Any modern          |


[Jump to Top](#50---requirements-specification)

