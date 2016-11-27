params={}
params.yearMin=1964
params.yearMax=2016
//params.countryHighlights=['Construction']

params.width=900
params.height=500
params.dom="chart"
//*

//Example code for shaping data in R http://stackoverflow.com/a/19729235/454773
params.jsondatafile="occupations.json"
params.x='income'
params.y='employed'
params.radius='employed'
params.color='red'
params.key='occupation'
params.xlabel="weekly income (dollars)"
params.ylabel="total employed (thousands)"

params.ymin=0
params.ymax=30000
params.xmin=25
params.xmax=3000
params.rmin=5
params.rmax=5e8

params.xscale='log'
params.yscale='linear'
