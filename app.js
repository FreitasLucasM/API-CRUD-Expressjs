const express = require('express');
const {randomUUID} = require('crypto')
const fs = require('fs')

const app = express();

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello!');
// })

let products = []
fs.readFile("products.json", "utf-8", (err, data)=>{
    if(err){
        console.log(err);
    }else if(data){
        products = JSON.parse(data);
    }
})


app.post("/products", (request, response) => {
    const {name, price} = request.body
    
    const product = 
    {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)



    jsonParserProducts();
    return response.json({
        message: "Product added",
        response: product
    })
})

app.get("/products", (request, response) => {
    return response.json({
        message: "Products found",
        products: products
    })
})

app.get("/products/:id", (request, response) => {

    const product = products.find(product => product.id === request.params.id)
    if(product){
        return response.json({
            message: "Product found",
            product: product
        })
    }else{
        return response.json({
            message: "Product not found",
            product: product
        })
    }
    
})

app.put("/products/:id", (request, response) => {
    const product = products.find(product => product.id === request.params.id)
    if(product){
        product.name = request.body.name !== null && request.body.name !== undefined? request.body.name : product.name
        product.price = request.body.price != null && request.body.price !== undefined? request.body.price : product.price

        const index = products.findIndex(prod => prod.id === product.id)
        products[index] = product

        jsonParserProducts()
        return response.json({
            message: "Product updated",
            product: product
        })
    }
    else{
        return response.json({
            message: "Product ID not found"
        })
    }
})

app.delete("/products/:id", (request, response) => {
    const index = products.findIndex(prod => prod.id === request.params.id)
    if(index !== undefined && index!== -1) {
        const product = products[index]
        products.splice(index, 1)
        
        jsonParserProducts()

        return response.json({
            message: "Product deleted",
            product: product
        })
    }else{
        return response.json({
            message: "Product ID not found"
        })
    }
})

function jsonParserProducts(){
    fs.writeFile("products.json", JSON.stringify(products), (error) => {
        if(error){
            console.log(error)
        }else{
            console.log("Product saved")
        }
    })
}

app.listen(4002, ()=>{
    console.log('listening on 4002');
})