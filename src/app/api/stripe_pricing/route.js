import { stripe } from "@/utils/stripe";

export async function GET() {
  try {
    // Fetch all products
    const products = await stripe.products.list();

    // Create an array to store the products along with their prices
    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        // Fetch prices for each product
        const prices = await stripe.prices.list({ product: product.id });

        // Return the product along with its prices
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          prices: prices.data.map((price) => ({
            id: price.id,
            unit_amount: price.unit_amount,
            currency: price.currency,
          })),
        };
      })
    );

    // Return the combined data as JSON
    return new Response(JSON.stringify(productsWithPrices), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(` ${error.message}`, {
      status: 400,
    });
  }
}
