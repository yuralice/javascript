// from data.js
var tableData = data;
var text = d3.select(".form-control");
var datetime = d3.select(".datetime");
var city = d3.select(".city");
var state = d3.select(".state");
var country = d3.select(".country");
var shape = d3.select(".shape");
var duration = d3.select(".duration");
var comments = d3.select(".comments");
var i = 0;
var no_results = d3.select(".no_results");
var row_count =0;
var results = d3.select(".results");
var date_convert = "";
// var test = "test";
// console.log(test[1]);

function search(date) {
    var search_results = [];
    for(i=0;i<data.length;i++)
    {
        if (date === data[i]["datetime"])
        {
            search_results.push(data[i]);
        }
    }
     return search_results;
  }

function deleteRows(rows){
    if (rows!=0)
    {
        for(counter=0;counter<rows;counter++)
        {
            document.getElementById("UFO-table").deleteRow(rows-counter);
        }
    }
}

function format(date)
{
    //drop 0's before first two slashes
    var slashes = 0;
    for(var i = 0;i<date.length;i++)
    {
        if (date[i] === "/")
        {
            slashes = slashes + 1;
            if (slashes === 1)
            {         
                month = date.slice(0,i);
                month_orig = month;
                if (month_orig[0] === "0")
                {
                    month = month_orig[1];
                }
            }
            else if (slashes === 2)
            {
                day = date.slice(month_orig.length+1,i)
                day_orig = day;
                if (day_orig[0] === "0")
                {
                    day = day_orig[1];
                }       
            }
        }
        
    }
    if (slashes > 0)
    {
    year = date.slice(date.length-4,date.length);
    }

    else
    {
        return date_convert = "null";
    }
    date_convert = month + "/" + day + "/" + year;
}

function handleChange(event) {
    deleteRows(row_count);
    
    var inputDate = d3.event.target.value;
    format(inputDate);
    console.log(`Input date ${date_convert}`);
    
    var search_results = search(date_convert);
    console.log(`# Search results ${search_results.length}`);
    
    var counter = 0;
    row_count = search_results.length;
    results.text(`Returned ${row_count} row(s)`);
   
    if (search_results.length === 0)
    {
        //no_results.text(`No results...try again`);

    row_count = 0;
    }
    else
    {
        for(counter=0;counter<search_results.length;counter++)

        {
            
            var table = document.getElementById("UFO-table");
            var row = table.insertRow(counter+1);
            
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3)
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);          
            var cell7 = row.insertCell(6);   
            
            cell1.innerHTML = search_results[counter]["datetime"];
            cell2.innerHTML = search_results[counter]["city"];
            cell3.innerHTML = search_results[counter]["state"];
            cell4.innerHTML = search_results[counter]["country"];
            cell5.innerHTML = search_results[counter]["shape"];
            cell6.innerHTML = search_results[counter]["durationMinutes"];
            cell7.innerHTML = search_results[counter]["comments"];

            no_results.text("");
        }

        
    }
    
  }

  text.on("change", handleChange);
