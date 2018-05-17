const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// connection.connect();




function purchase() {
  // var custQuery = "SELECT * FROM products;"
  connection.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;
    var table = new Table({
      head: ["Item ID", "Product Name", "Price", "Quantity"],
      chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
      }
    });

    console.log("Check out our inventory:")
    console.log("************************")

    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
      )
    };
    console.log(table.toString());
    // }) expanding function test


    inquirer.prompt([
      {
        type: "input",
        name: "itemID",
        message: "What item number would you like to buy?",
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?",
      }
    ]).then(function (ans) {

      connection.query("SELECT * FROM products;", function (err, res) {
        if (err) throw err;
        //})   //expanding connection from here
        // console.log('what is my response after the inquirer query')
        // console.log(res)
        var purchaseItem = parseInt(ans.itemID - 1);
        var purchaseQuantity = parseInt(ans.quantity);
        var total = parseFloat( res[purchaseItem].price * purchaseQuantity ).toFixed(2);

        if (purchaseQuantity <= parseInt(res[purchaseItem].stock_quantity)) {
          connection.query("UPDATE products Set ? Where ?", [
            { stock_quantity: (res[purchaseItem].stock_quantity - purchaseQuantity) },
            { item_id: purchaseItem }
          ],
            function (err, result) {
              if (err) throw err;
              console.log("Your purchase is complete for $" + total + ".  Your items will ship soon.")
              shopAgain();
            }
          )
        }
        else {
          console.log("Sorry, we don't have that much in inventory")
          shopAgain();
        }
      }) ///expanding connection to here
    })
  })
}



//asks if they would like to purchase another item
function shopAgain() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function (ans) {
    if (ans.reply) {
      purchase();
    } else {
      console.log("See you soon!");
      connection.end()
    }
  })
};

purchase();