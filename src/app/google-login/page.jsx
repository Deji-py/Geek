"use client"
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const RedirectComponent = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Convert the searchParams object to a query string
    const queryString = searchParams.toString();

    if (queryString) {
      // Define the new domain
      const newDomain = 'https://geekbackend-c73d99faff92.herokuapp.com/google-login';

      // Construct the new URL with the current query string
      const newUrl = `${newDomain}?${queryString}`;

      // Redirect to the new URL
      window.location.href = newUrl;
    }
  }, [searchParams]);

  return null; // This component doesn’t need to render anything
};

export default RedirectComponent
