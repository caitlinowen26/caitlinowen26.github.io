// Problem 1: Create JSON for each employee
const employees = [
    {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true
    },
    {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true
    },
    {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false
    }
];

console.log("Problem 1 - Employees JSON:", JSON.stringify(employees, null, 2));

// Problem 2: Create JSON for the company
const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};

console.log("Problem 2 - Company JSON:", JSON.stringify(company, null, 2));

// Problem 3: Add a new employee
const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
};

company.employees.push(newEmployee);
console.log("Problem 3 - Updated Company JSON:", JSON.stringify(company, null, 2));

// Problem 4: Calculate total salary
const totalSalary = company.employees.reduce((total, employee) => total + employee.salary, 0);
console.log("Problem 4 - Total Salary:", totalSalary);

// Problem 5: Update salary for raise eligible employees
function updateSalaries() {
    company.employees.forEach(employee => {
        if (employee.raiseEligible) {
            employee.salary *= 1.10; // Increase by 10%
            employee.raiseEligible = false; // Set eligibility to false
        }
    });
}

updateSalaries();
console.log("Problem 5 - Updated Salaries JSON:", JSON.stringify(company, null, 2));

// Problem 6: Update for employees working from home
const workingFromHome = ['Anna', 'Sam'];

company.employees.forEach(employee => {
    employee.wfh = workingFromHome.includes(employee.firstName);
});

console.log("Problem 6 - Final Company JSON with WFH:", JSON.stringify(company, null, 2));