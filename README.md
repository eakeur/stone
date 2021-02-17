# DESCRIPTION
This solution will get a file containing a list with products and a list with e-mails. Then, it will compute how much each person of this e-mail list will pay, so that everyone pays a fair price and the whole debt is paid. 



# HOW TO PREPARE THE SHOPPING LIST FILE
The shopping list file is a JSON file named "shopping_list.json" that will be located at the same path as the main.js file.
It contains the following structure:

```json
    {
        "items": { "name": string, "price": number, "quantity": number}[],
        "emails": string[]
    }
```
That is, an array containing objects with name, price and quantity of each product,
and another array containing e-mails.
The price property can be either in Real (such as 1.99) or in cents (such as 199).
If the price is in cents, you must specify the parameter "input=cents" when executing.
Below are some examples:

**Example 1 (the price is in Reais)**
```json
    {
        "items": [
            { "name": "Rice", "price": 21.50, "quantity": 3},
            { "name": "Beans", "price": 12, "quantity": 2},
            { "name": "Pork meat (kg)", "price": 21.50, "quantity": 5}
        ],
        "emails": [ "igor@hireMe.com", "mum@hireMySon.com"]
    }
```

**Example 2 (the price is in cents)**
```json
    {
        "items": [
            { "name": "Powder", "price":129 , "quantity": 5},
            { "name": "Chocolate bar", "price": 1200, "quantity": 1},
            { "name": "Hiring papers to hire Igor", "price": 150, "quantity": 3}
        ],
        "emails": [ "igor@hireMe.com", "mum@hireMySon.com", "stone@iHireYou.com"]
    }
```

***REMEMBER: If the price input type is in cents, specify the parameter "input=cents"*** 






# HOW TO RUN THE SOLUTION
In a terminal that has access to Node.js commands, run:

    node main.js

You can specify parameters in order to change the behaviour of the module:

    input=cents --- specifies that the price inputs are in cents. 
    Use it if the prices in the shopping list are in cents.

    output=cent --- specifies that you want to receive values in cents.

    live=false --- turns off the interaction via terminal and only shows the main information at the end of the execution.


# MOTIVATION 
## Why Javascript?
I chose Javascript due to its great capability of easily modelling and
dealing with data. Its dynamic typing system allows us to do things faster.
I would also love to do this project in Go or Typescript. But Go has some limitations (compared to JS) when
it comes to dealing with arrays and Typescript was not on the scope of the requirements.

## Why this way?
Even though it is a console application, it intends to be an interactive application,
in order to make the user feel comfortable using it and accessing their data with no fear.    Thus, the app always asks for what the user wants to see after all the computing part is done.
