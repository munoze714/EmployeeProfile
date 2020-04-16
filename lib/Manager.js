// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        this.officeNumber = officeNumber
        super(name, id, email)
    }
    getOffice() {
        return this.officeNumber
    }
    getRole() {
        return "Manager"
    }
}
module.exports = Manager