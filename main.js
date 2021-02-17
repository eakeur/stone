
const outputCents = process.argv.slice(2).includes("output=cents");
const inputCents = process.argv.slice(2).includes("input=cents");
const live = process.argv.slice(2).includes("live=false");

try {
    var file;
    // Imports JSON file with the products list and emails list. If it fails, throws an error and inform the path that the file should be located.
    try {file = require("./shopping_list.json");} catch (error) {
        throw new Error('Impossible to read file. Please check if you put it in the right place, which is: ' + __dirname);}
    
    //This is where the magic happens! The function is called with the JSON file as a parameter. It validates it, handles it and returns an object
    // containing information about the shopping list input.
    validateInput(file);
    const list = shoppingList(file);

    // If the user has not shut down live interaction with the "live=false" parameter, it will start a shell where te user can type which information
    // he wants to get from the shopping list and it will return it. Otherwise it will just show everything at once.
    console.log(`PURCHASE VALUE: ${!outputCents? "R$" : ""}${list.total}${ outputCents ? " cents" : ""}\n`);
    if (!live) { interactWithUser(list.debts);} 
    else {
        console.log('\n\nPURCHASE DETAILS');
        console.table(file.items);
        console.log('\n\nVALUE TO BE PAID PER PERSON');
        console.table(list.debts);
    }
} catch (error) {console.log(error.message);}



/**
 * Holds all information of the shopping list in an object and validates it. This is the main function of the solution and stores many procedures
 * to achieve the desired response.
 * @returns {{debts: {[string]: number}, total: number}}
 * @param {{emails: string[], items:{name: string, price: number, quantity: number}[]}} list 
 */
function shoppingList(list){
    var total = list.items.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr);
    let convertInput = inputCents ? 1 : 100;
    let convertOutput = outputCents ? inputCents ? 1 : 100 : inputCents ? 100 : 1;
    return {debts: divideDebtWithPeople(Math.floor(total * convertInput), list.emails), total: total / convertOutput};
}

function validateInput(list){
    if (list == undefined) 
    throw new Error("Oops! Couldn't read the shopping list. Please check if it is correct.");
    if (list.emails == undefined || list.emails.length == 0)
    throw new Error("Oops! Couldn't divide the purchase because there was nobody to divide with. Please add at least one person.");
    if (list.items == undefined || list.items.length == 0)
    throw new Error("Oops! There aren't any products in this list. Please check if the shopping list is correct.");
    if (!list.items.every( item => item.quantity > 0 && item.price > 0 && Number.isInteger(item.quantity)))
    throw new Error('Oops! Null values are not allowed for quantities or prices. Please check if every product has a price and quantity different from 0.');
    if (process.argv.slice(2).includes("input=cents") && !list.items.every( item => Number.isInteger(item.price)))
    throw new Error('Oops! If you choose cents as the input type, all prices must be integers.');
}

/**
 * Here's where the magin happens! It receives a number and a list of people and divides it with each other
* @returns {{[string]: number}} A map in which the key is one of the emails provided 
* and the value is an abject containing the debt in cents (raw) and in Real (due) 
* @param {number} totalDebt A numeric value representing the whole amount of money involved in the purchase. Must be integer and in cents.
* @param {string[]} people An array containing the email or any other unique key of the payers
*/
function divideDebtWithPeople(totalDebt, people) {
    var remainder = totalDebt % people.length; var remPayers = 0;
    if (remainder != 0) {
        for (var index = people.length; index > 0; index--) {if (remainder % index == 0){remPayers = index; break;}}
        if (remPayers == 0) remPayers = 1;
    }
    var prices = {
        base: Math.floor(totalDebt / people.length), 
        remPayers: remPayers, remainder: remPayers == 0 ? 0 : remainder / remPayers
    };

    let divider = outputCents ? 1 : 100
    let dues = {}
    people.forEach((person, index) =>
        dues[person] =
        index < prices.remPayers ? (prices.base + prices.remainder) / divider : prices.base / divider
    );
    return dues;
}


/**
 * Starts interacting with the user in order to show every aspect of the shopping list
 * @param {{[string]: number}} list The shopping list to be prompted
 */
function interactWithUser(list){
    console.log("Type an email to see how much the e-mail owner will pay\n or press Enter to see everyone's debt.\nIf you don't remember any e-mail, press Tab twice.:\n");
    require('readline').createInterface(process.stdin, process.stdout, (email) => [Object.keys(list).filter( x => x.startsWith(email)), email])
    .on("line", (email) => {
        if (email.trim() === "") {
            console.log(`\n`); console.table(list);
            console.log("Type an email to see its owner's debt, or Ctrl + C to leave\n\n");
        } else {
            if (Object.keys(list).includes(email)){
                console.log(`\nPERSON KEY: ${email} | DEBT => R$${list[email]}`);
                console.log('Type another email or Enter to see all email-debt relations, or Ctrl + C to leave\n\n');
            } else {
                console.log(`\nPERSON NOT FOUND. Press Tab twice to see all available people.`);
                console.log('Type another email or Enter to see all email-debt relations, or Ctrl + C to leave \n\n');
            }
        }
    });
}