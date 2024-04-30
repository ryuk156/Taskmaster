import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const ErrorAlert = ({ error, status }: { error: any, status: any }) => {
  return (
<Alert status={status}>
    <AlertIcon />
   {error}
  </Alert>

  );
};

export default ErrorAlert;

