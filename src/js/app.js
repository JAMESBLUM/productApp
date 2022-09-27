class Product{
    constructor(name,price,year){
        this.name = name;
        this.price = price; 
        this.year = year;
    }//Metodo que se ejecuta al crear un objeto
}
class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('DIV');

        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product:</strong> ${product.name}
                    <strong>Product price:</strong> ${product.price}
                    <strong>Year product:</strong> ${product.year}
                    <a href="#" class="btn btn-primary" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }
    deleteProduct(element){
        if(element.name == 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted successfully', 'danger')
        }
    }
    resetForm(){
        document.getElementById('product-form').reset();
    }
    showMessage(message, cssClass){
        const div = document.createElement('DIV');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        // SHOWING IN THE DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 1000)
    }
}

// DOM EVENTS
document.getElementById('product-form')
        .addEventListener('submit', function(e){
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            const year = document.getElementById('year').value;
            //Definir un nuevo producto
            const product = new Product(name,price,year);
            //Creamos una nueva instancia
            const ui = new UI();
            if(name ==='' || price === ''|| year ===''){
               return ui.showMessage('Complete fields, please', 'warning'); //Impide que el resto del codigo se ejecute.
            }
            ui.addProduct(product);
            ui.resetForm();
            ui.showMessage('Product added successfull', 'success');

            e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
}); 