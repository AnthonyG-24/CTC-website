require 'sinatra'
require 'stripe'
# This is your test secret API key.
Stripe.api_key = 'sk_test_51Q219a082kQ12Z33gWCys3RoyDbHtdGYCtECvgVhcXtgFXVOMcVpbJEFWqtHfzMsB3psHHfAB0HLhKARfISZ94bv00Y2wiExR7'

set :static, true
set :port, 4242

# Securely calculate the order amount
def calculate_order_amount(_items)
  # Calculate the order total on the server to prevent
  # people from directly manipulating the amount on the client
  _items.sum {|h| h['amount']}
end

# An endpoint to start the payment process
post '/create-payment-intent' do
  content_type 'application/json'
  data = JSON.parse(request.body.read)

  # Create a PaymentIntent with amount and currency
  payment_intent = Stripe::PaymentIntent.create(
    amount: calculate_order_amount(data['items']),
    currency: 'usd',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  )

  {
    clientSecret: payment_intent.client_secret,
    # [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: "https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=#{payment_intent.id}",
  }.to_json
end

