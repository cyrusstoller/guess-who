var output = ""
$(".people_img").each(function(index){
	var temp = this.src.split("&")
	output = output + temp[0] + "&" + temp[1] + "&" + temp[4] + "&height=300&width=300\n"
})
console.log(output)


$("#people_search_results_table tbody tr:not([id]) td.item .first ul li.title a:not([class])").each(function(index){ 
	output = output + this.text + "\n"
})

$("#people_search_results_table tbody tr:not([id]) td.item .first ul li.title a:not([class])").each(function(index){ 
	output = output + this.href + "\n"
})

$("#people_search_results_table tbody tr:not([id]) td:nth-child(4) div").each(function(index){ 
	output = output + this.innerHTML.trim() + "\n"
})

// need images at 150 - fix with sed

$(".people_img").each(function(index){
	var temp = this.src.split("&")
	output = output + temp[0] + "&" + temp[1] + "&" + temp[4] + "&height=300&width=300\n"
})