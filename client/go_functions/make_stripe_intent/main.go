package main

import (
	"encoding/json"
	"os"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/stripe/stripe-go/v71"
	"github.com/stripe/stripe-go/v71/checkout/session"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	amount, err := strconv.ParseFloat(request.QueryStringParameters["amount"], 64)

	if amount < 1 || err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode:      300,
			Headers:         map[string]string{"Content-Type": "text/plain"},
			Body:            "Error: invalid amount",
			IsBase64Encoded: false,
		}, nil
	}

	amountCents := amount * 100

	sessionID, err := createCheckoutSession(amountCents)

	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode:      300,
			Headers:         map[string]string{"Content-Type": "text/plain"},
			Body:            "Error: failed: " + err.Error(),
			IsBase64Encoded: false,
		}, nil
	}

	json, _ := json.Marshal(sessionID)

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "application/json"},
		Body:            string(json),
		IsBase64Encoded: false,
	}, nil
}

func main() {
	stripe.Key = os.Getenv("STRIPE_KEY")

	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}

func createCheckoutSession(amountCents float64) (ID, error) {
	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		Mode: stripe.String(string(stripe.CheckoutSessionModePayment)),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("usd"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("Donation"),
					},
					UnitAmountDecimal: &amountCents,
				},
				Quantity: stripe.Int64(1),
			},
		},
		SuccessURL: stripe.String("https://www.yrtestingdomainfor.info/donate/thankyou"),
		CancelURL:  stripe.String("https://www.yrtestingdomainfor.info/donate/cancel"),
	}

	session, err := session.New(params)

	if err != nil {
		return ID{}, err
	}

	return ID{
		ID: session.ID,
	}, nil
}

type ID struct {
	ID string `json:"id"`
}
