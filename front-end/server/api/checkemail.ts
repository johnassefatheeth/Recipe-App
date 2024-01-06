// Import necessary modules from Apollo Client
import { useApolloClient, useMutation, gql } from '@apollo/client';

// Define your GraphQL mutation
const CHECK_EMAIL_MUTATION = gql`
  mutation CheckEmail($email: String!) {
    check_user_by_email(email: $email)
  }
`;

// Define your function to check existing email
const existingEmail = async (value: string) => {
  const apolloClient = useApolloClient();

  // Use the useMutation hook
  const [checkEmailMutation, { loading, error }] = useMutation(CHECK_EMAIL_MUTATION, {
    client: apolloClient,
  });

  try {
    const { data } = await checkEmailMutation({
      variables: { email: value },
    });

    // Assuming your function returns a boolean, update this accordingly based on the actual response structure.
    return data.check_user_by_email;
  } catch (error) {
    console.error('Error calling check_user_by_email:', error);
    
    // Handle different error scenarios if needed
    // if (error.message.includes('Email not found')) {
    //   return false;
    // }

    throw error;
  }
};

export default existingEmail;
