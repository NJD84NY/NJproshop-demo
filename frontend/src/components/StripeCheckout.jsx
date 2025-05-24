import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51RP3YQDCrz7URzHBCiqwB8ybvpxaLqLPsQveYG6vLPFNnSG01vf9wmvVXFFhhUUtlN223oICNGT3r7Hzj4lJptN3007ZtPNyIg'
);

const StripeCheckout = () => {
  const checkoutHandler = async () => {
    try {
      const response = await fetch('htttp://localhost:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Typa': 'Application/json',
        },
      });

      const { id } = await response.json();

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button></Button>
    </div>
  );
};
export default StripeCheckout;
