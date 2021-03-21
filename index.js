const fs = require("fs"), parsed = JSON.parse(fs.readFileSync('config.json'))
var _status = 1

function main() {
    
    var fileArray = []

    function pushing(path) {

        var endArray = {path: path, files: []}
        
        fs.readdirSync(path).map(item => {

            var st = fs.statSync(path + '/' + item)
            if (st.isFile()) endArray.files.push(item)
            else pushing(path + '/' + item)

        })
        
        if (endArray.files.length !== 0) fileArray.push(endArray)

    }

    pushing(parsed.path)

    for (var i = 0; i < fileArray.length; i++) {

        for (var t = 0; t < fileArray[i].files.length; t++) {

            var rand = Math.round(Math.random() * (fileArray.length-1)),
                randFile = fileArray[rand].files[Math.round(Math.random() * (fileArray[rand].files.length-1))],
                rand2 = Math.round(Math.random() * (fileArray.length-1)),
                randFile2 = fileArray[rand2].files[Math.round(Math.random() * (fileArray[rand2].files.length-1))]

            fs.copyFileSync(fileArray[rand].path + '/' + randFile, 'boofer/timedrenaming')
            fs.copyFileSync(fileArray[rand2].path + '/' + randFile2, 'boofer/timedrenaming2')

            fs.copyFileSync('boofer/timedrenaming', fileArray[rand2].path + '/' + randFile2)
            fs.copyFileSync('boofer/timedrenaming2', fileArray[rand].path + '/' + randFile)

            console.log(`Mini mixing copmpleted ${t+1}/${
                fileArray[i].files.length
            } from ${i+1}/${fileArray.length}`)

        }

    }

    console.log(`Main mixing copmpleted ${_status}/${parsed.count}`)
    _status++

}

for (var i = 0; i < parsed.count; i++) main()