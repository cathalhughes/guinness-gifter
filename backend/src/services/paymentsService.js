const stripe = require('stripe')('sk_test_3cJsDJW6yKPIWO1tMolUXH0I00S2qw90bw');
const MODEL_PATH = '../models/'
const UserModel =  require(MODEL_PATH + 'User');
const feePercentage = Number(process.env.APP_FEE)

const addCard = async ({ user, body: { cardToken } }) => {
    if (!user.stripeCustomerId) {
        const stripeCustomerId = await createCustomer(user.email);
        
        await UserModel.collection.findOneAndUpdate(
            { _id: user._id },
            { $set: { stripeCustomerId } },
        );
        
        return addCustomerCard(stripeCustomerId, cardToken);
    }
    
    return addCustomerCard(user.stripeCustomerId, cardToken);
};

const getCards = async ({ user }) => {
    if (!user.stripeCustomerId) return [];
    return await listCustomerCards(user.stripeCustomerId);
};

const createCustomer = async email => { 
    const stripeCustomerId = await stripe.customers.create({ email })
    return stripeCustomerId
}

const addCustomerCard = async (stripeCustomerId, stripeToken) => {
    return await stripe.customers.createSource(stripeCustomerId, { source: stripeToken });
}

const listCustomerCards = async stripeCustomerId => {
    return await stripe.customers.listCards(stripeCustomerId);
}

const findOrCreateStripeCustomer = async (user, tokenId) => {
    if(!!user.stripeCustomerId) {
      const newSource = await stripe.customers.createSource(user.stripeCustomerId, { source: tokenId })
      return await stripe.customers.update(user.stripeCustomerId, { default_source: newSource.id })
    } else { // First payment
      return await stripe.customers.create({
        email: user.email,
        source: tokenId
      })
    }
}

const getAccountSetUpLink = async (stripeAccountId) => {
    const accountLinks = await stripe.accountLinks.create({
        account: stripeAccountId,
        failure_url: 'http://localhost:8080/',
        success_url: 'http://localhost:8080/',
        type: 'custom_account_verification',
        collect: 'eventually_due',
    });
    return accountLinks
}

const addExternalAccount = async (stripeAccountId, token) => {
    const accountUpdate = await stripe.accounts.createExternalAccount(
        stripeAccountId,
        {
          external_account: token,
        }
    )
    return accountUpdate
}

const createPayment = async ({amount = 0,stripeAccountId, stripeCustomer}) => {
    // const fee = amount * feePercentage
    const payment = await stripe.charges.create({
        amount, // Unit: cents
        currency: 'eur',
        customer: stripeCustomer.id,
        source: stripeCustomer.default_source.id,
        description: 'Test payment',
        application_fee_amount: 123,
        on_behalf_of: stripeAccountId,
        transfer_data: {
            destination: stripeAccountId,
        },
    })
    return payment
}

module.exports = {
    findOrCreateStripeCustomer,
    getAccountSetUpLink,
    addExternalAccount,
    createPayment
}
