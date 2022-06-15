
// define the URL Link
url = `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`


// *****JSON FILE READ AND PULL*******
// read json file and pull data from it
d3.json(url).then(function(data) {
  var samples = data.samples
  var metadata = data.metadata
  var names = data.names;
  var id = data.samples[0].otu_ids;
  // get first 10 values for the table
  var sampleVal = data.samples[0].sample_values.slice(0,10).reverse();
  // get first 10 OTU ids from the json file and order them. we are taking each of the items and putting Otu in front and adding number
  var OtuId = data.samples[0].otu_ids.map(i => `otu ${i}`).slice(0,10).reverse();
  var OtuId2 = data.samples[0].otu_ids.slice(0,10).reverse();

  // console.log(OtuId);
  // console.log(sampleVal);
  // console.log(id);
  // console.log(metadata);
  // console.log(metaID);
  // console.log(data.samples[0].otu_ids);

// *****DROP DOWN*******
  for (let i=0; i<names.length; i++){
    let options = d3.select("#selDataset")
    options.append("option").text(names[i]).attr("value",names[i]);
  }


  // ***BAR PLOT***
  // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  let trace1 = {
      x: sampleVal,
      y: OtuId,
      type: "bar",
      orientation: "h"
  };

  // Data trace array
  let traceData = [trace1];

  // Apply title to the layout
  let layout = {
    title: "OTU"
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", traceData, layout);

  // *******BUBBLE PLOT***
  // Create a bubble plot

  var trace2 = {
			x: sampleVal,
			y: OtuId2,
			// text: allOtuLabelsDefault,
			mode: 'markers',
			marker: {
				color: id,
				size: sampleVal,
			}
		};

		var traceData2 = [trace2];

		var layout2 = {
			xaxis: { title: "OTU Id"},
			yaxis: { title: "sample value"},
		};
		Plotly.newPlot('bubble', traceData2, layout2);
});

// You need this to link functions and link drop down menu with demo charts
function optionChanged (dropChange){
  d3.json(url).then(function(data) {
  var metadata = data.metadata
  let ex = metadata.filter( i => i.id == dropChange)
  // buildDemoInfo (dropChange)
  let keys = Object.keys(ex[0]);
  let values = Object.values(ex[0]);
  for (let i=0; i<keys.length; i++){
      let dropdownMenu = d3.select("#sample-metadata");
      dropdownMenu.append("p").text(`${keys[i]} : ${values[i]}`)


      }
  // console.log(values);
});
}

// *****DEMOGRAPHIC INFO*******

//   let para = d3.select("#sample-metadata")
//   para.append("option").text(names[i]).attr("value",names[i]);
//


// load in metadata and create a filter that shows based on the ID
// create a new function (buildDemoInfo) and miminic for the trigger d3.json and load the metadata
// create a filter that filters on the Id
