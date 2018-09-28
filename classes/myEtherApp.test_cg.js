const chai = require('chai');
const expect = chai.expect;
const app = require('./myEtherApp');

describe("User Class", () => {

    describe('#createEtherWallet', () => {
        it('can create an account with a mnemonic', () => {
            expect(this.account).to.be.instanceof(Object);
        })
        it('')
    })
})

    // describe('Neighborhood class', () => {
    //     describe('creating a new neighborhood', () => {
    //       it('can create a new neighborhood with a name', () => {
    //         expect(neighborhood.name).to.equal('Dumbo');
    //       });
    //       it('is created with a unique id', () => {
    //         expect(typeof neighborhood.id).to.equal('number');
    //         expect(secondNeighborhood.id).to.not.equal(neighborhood.id);
    //       });
    //       it('adds the neighborhood to the store', () => {
    //         expect(store.neighborhoods[0]).to.be.instanceof(Neighborhood);
    //       });
    //     });
    //   });

    //   describe('Customer class', () => {
    //     describe('creating a new Customer', () => {
    //       it('can create a new Customer with a name', () => {
    //         expect(customer.name).to.equal('Paul Rudd');
    //       });
    //       it('can create a new customer with a neighborhoodId', () => {
    //         expect(customer.neighborhoodId).to.equal(neighborhood.id);
    //       });
  
    //       it('adds the customer to the store', () => {
    //         expect(store.customers[0]).to.be.instanceof(Customer);
    //       });
  
    //       it('adds a unique id to each customer', () => {
    //         expect(typeof customer.id).to.equal('number');
    //         expect(customer.id).to.not.equal(secondCustomer.id);
    //       });
    //     });
    //   });
