const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = []

function startProfiles() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: "list",
                name: "Role",
                message: "Whats your Role?",
                choices: ["Intern", "Engineer", "Manager"],
            }
        ])
        .then(answers => {
            // console.log(answers)
            // Use user feedback for... whatever!!
            if (answers.Role === "Engineer") {
                // console.log("ask engineer questions")
                engineer();
            } else if (answers.Role === "Manager") {
                // console.log("ask manager questions")
                manager();
            } else {
                // console.log("ask intern questions")
                intern();
            }
        })
}

function engineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What's your name?"
            },
            {
                type: "input",
                name: "email",
                message: "What's your email?"
            },
            {
                type: "input",
                name: "github",
                message: "What's your Github?"
            }
        ]).then(answers => {
            // console.log(answers)
            var createEngineer = new Engineer(answers.name, teamArray.length + 1, answers.email, answers.github)
            teamArray.push(createEngineer)
            addMultipleEmployee()

        })
}
function manager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "email",
                message: "Whats your email?"
            },
            {
                type: "input",
                name: "office",
                message: "Whats your Office Number?"
            }
        ]).then(answers => {
            // console.log(answers)
            var createManager = new Manager(answers.name, teamArray.length + 1, answers.email, answers.office)
            teamArray.push(createManager);
            addMultipleEmployee()
        })
}
function intern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "email",
                message: "Whats your email?"
            },
            {
                type: "input",
                name: "school",
                message: "Whats your School?"
            }
        ]).then(answers => {
            // console.log(answers)
            var createIntern = new Intern(answers.name, teamArray.length + 1, answers.email, answers.school);
            teamArray.push(createIntern);
            addMultipleEmployee()
        })
}
function addMultipleEmployee() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "addEmployee",
                message: "Would you like to add another Employee?",
            }
        ])
        .then(answers => {
            if (answers.addEmployee === true) {
                startProfiles()
            } else {
                var finalProfile = render(teamArray)
                console.log(finalProfile)
                fs.writeFile(outputPath, finalProfile, (err) => {

                })
            }
        })
};
startProfiles();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
