

let transactions = [];
function addTransaction() {
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let type = document.getElementById("type").value;
 if (type=='Withdrawal'){
      amount=amount*(-1)

     
    }
  
  


  transactions.push({ date, description, amount, type });
  localStorage.setItem("transactions",JSON.stringify(transactions))

  updateTransactionList();
}

// Function to update the transaction list in the HTML
function updateTransactionList() {
  let dateFrom = document.getElementById("date-from").value;
  let dateTo = document.getElementById("date-to").value;
  let typeFilter = document.getElementById("type-filter").value;

  let filteredTransactions = transactions.filter((transaction) => {
    let transactionDate = new Date(transaction.date);
    let filterFromDate = new Date(dateFrom);
    let filterToDate = new Date(dateTo);

    // Filter by date range
    if (transactionDate < filterFromDate || transactionDate > filterToDate) {
      return false;
    }

    // Filter by transaction type
    if (typeFilter !== "all" && transaction.type !== typeFilter) {
      return false;
    }

    return true;
  });

  let runningTotal = 0;	
      
  let transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = "";

  filteredTransactions.forEach((transaction) => {

    
    runningTotal += transaction.amount;
    if (runningTotal<0){
      alert("NOT Enough Balance")
    }
    else{

    

   

    
    
    

    let transactionRow = document.createElement("tr");
    let dateCell = document.createElement("td");
    let descriptionCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let typeCell = document.createElement("td");
    let runningTotalCell = document.createElement("td");
    

    dateCell.innerText = transaction.date;
    descriptionCell.innerText = transaction.description;
    amountCell.innerText = transaction.amount.toFixed(2);
    typeCell.innerText = transaction.type;
    runningTotalCell.innerText = runningTotal.toFixed(2);
    
    



    transactionRow.appendChild(dateCell);
    transactionRow.appendChild(descriptionCell);
    transactionRow.appendChild(amountCell);
    transactionRow.appendChild(typeCell);
    transactionRow.appendChild(runningTotalCell);

    transactionList.appendChild(transactionRow);}
  }

   
  );
}

function historyViews() {
// Retrieve the transactions data from local storage
let datas= JSON.parse(localStorage.getItem('transactions'));
if (datas && datas.length>0){
  let html=""
  let i=0
  datas.forEach(data=>{
    i=i+1
    
    html+=`<p>transactionId:${i}</p>`

    html+=`<p>date:${data.date}</p>`
    html+=`<p>discription:${data.description}</p>`
    html+=`<p>amount:${data.amount}</p>`
    html+=`<p>Type:${data.type}</p>`
    html+=`<p>---------------</p>`
   
    
  });

  document.getElementById("historyView").innerHTML=html;
  
}
else{
  document.getElementById("historyView").innerHTML="no data found";

}


}

