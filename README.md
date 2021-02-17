HOW TO PREPARE THE SHOPPING LIST FILE
The shopping list file is a JSON file that will be located at the same path as the main.js file.
It contains the following structure:
    {
        items: { name: string, price: number, quantity: number}[],
        emails: string[]
    }
That is, an array containing objects with name, price and quantity of each product,
and another array containing e-mails.
The price property can be either in Real (such as 1.99) or in cents (such as 199).
If the price is in cents, you must specify the parameter "input=cents" when executing.




HOW TO RUN THE SOLUTION
In a terminal that has access to Node.js commands, run:
    node main.js
You can specify parameters in order to change the behaviour of the module:

    input=cents --- specifies that the price inputs are in cents. 
    Use it if the prices in the shopping list are in cents.

    output=cent --- specifies that you want to receive values in cents.

    live=false --- turns off the interaction via terminal and only shows the main information at the end of the execution.
