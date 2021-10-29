//Dependencies
const Express_Param = require("express-param")
const Simple_Exec = require("simple-exec")
const Express = require("express")

//Variables
const Port = process.env.PORT || 8080
const Web = Express()

///Configurations
//Express
Web.use(Express_Param())

//Main
Web.get("/exec", function(req, res){
    var command = req.fetchParameter(["cmd"]).cmd
    command = decodeURI(command)

    Main()
    async function Main(){
        const results = await Simple_Exec.executeSync(command)

        if(results.err){
            res.send("Invalid command or something went wrong.")
        }else{
            res.json(results.output.split("\n"))
        }
    }
})

Web.listen(Port, ()=>{
    console.log(`Server is running in ${Port}`)
})
