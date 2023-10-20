const fs = require('fs')
const http = require('http')
const url = require('url')

//Define the server
const server = http.createServer((req, res) => {
	//Parse the response to get an URL object
	const urlObject = url.parse(req.url, true)
	//Take the URL Object and concatenate it like so: ./path.html
	const fileName = '.' + urlObject.path + '.html'
	console.log(fileName)
	//Look through the directories and read the file with the 'fileName' variable we created earlier
	fs.readFile(fileName, 'utf-8', (err, data) => {
		if (err) {
			//If there is an error then read the ./404.html file
			fs.readFile('./404.html', 'utf-8', (error, errorData) => {
				if (error) {
					//If this callback has an error just print a string
					return res.end('Error 404, page not found.')
				} else {
					//If everything is fine just serve the content of the html document to the website
					res.writeHead(404, { 'Content-Type': 'text/html' })
					res.end(errorData)
				}
			})
		} else {
			//If there isnt an error and we get a successful http code (200), then serve the data that was found by using the fileName variable
			res.writeHead(200, { 'Content-Type': 'text/html' })
			res.write(data)
			res.end()
		}
	})
})

const port = 3000
server.listen(port, () => {
	console.log(`Server running in port ${port}`)
})
