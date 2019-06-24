import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    //we are making a copy of our items instead of referencing them.
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });
    };
    //this gets the item according to the id
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };
    //this handles the product to display it details
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            //returning the new state 
            return { detailProduct: product }
        });
    };
    addToCart = (id) => {
        //assign all product to tempProducts
        let tempProducts = [...this.state.products];
        //get the items in the cart using the index
        const index = tempProducts.indexOf(this.getItem(id));
        //store the index in this product value
        const product = tempProducts[index];
        //chge incart to true
        product.inCart = true;
        //increase  cart by one
        product.count = 1;
        //change the total
        const price = product.price;
        product.total = price;
        //change the values in the actual state
        this.setState(() => {
            return {
                products: tempProducts, cart: [...this.state.cart, product]
            };
        },
            () => {
                this.addTotals();
            });
    };
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;
        //send the temp state in the function to the app state
        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        }, () => { this.addTotals(); })
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;

        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => { this.addTotals(); })
        }

    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, () => {
            this.addTotals();
        })
    }
    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        }, () => {
            //update the setProducts
            this.setProducts();
            //update the totals
            this.addTotals();
        })
    }
    addTotals = () => {
        let subTotal = 0;
        //looping through the cart array
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        //return the tax in float to two decimals places
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                //return the current cart values to the state
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,//getting all properties in the state
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };